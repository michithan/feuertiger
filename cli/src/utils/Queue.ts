import { ExtendedPackageInfo } from './extendedList';
import { PackageInfo } from './list';

export class Queue {
    queue: Array<{
        packageInfo: ExtendedPackageInfo;
        resolve: () => void;
    }> = [];

    packageInfos: Array<ExtendedPackageInfo> = [];

    constructor(packageInfos: Array<ExtendedPackageInfo>) {
        this.packageInfos = packageInfos;
    }

    enqueue = (packageInfo: ExtendedPackageInfo): Promise<void> =>
        new Promise(resolve => {
            this.queue.push({ packageInfo, resolve });
            this.check();
        });

    findPackageInfo = (name: string): boolean =>
        this.packageInfos.find(packageInfo => packageInfo.name === name)
            ?.completed ?? false;

    isReady = (dependencies: Array<PackageInfo>): boolean =>
        dependencies.every(({ name }) => this.findPackageInfo(name));

    check(): void {
        const readies = this.queue.filter(({ packageInfo: { dependencies } }) =>
            this.isReady(dependencies)
        );

        readies.forEach(({ resolve }) => resolve());

        this.queue = this.queue.filter(waiting => !readies.includes(waiting));
    }
}
