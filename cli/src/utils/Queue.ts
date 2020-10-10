import { ExtendedPackageInfo } from './extendedList';
import { PackageInfo } from './list';

export class Queue {
    queue: Array<{
        packageInfo: ExtendedPackageInfo;
        awaiter: () => void;
    }> = [];

    packageInfos: Array<ExtendedPackageInfo> = [];

    constructor(packageInfos: Array<ExtendedPackageInfo>) {
        this.packageInfos = packageInfos;
    }

    enqueue = (packageInfo: ExtendedPackageInfo): Promise<void> =>
        new Promise(resolve => {
            this.queue.push({ packageInfo, awaiter: resolve });
            this.check();
        });

    findPackageInfo = (name: string): boolean =>
        this.packageInfos.find(packageInfo => packageInfo.name === name)
            ?.completed ?? false;

    isReady = (dependencies: Array<PackageInfo>): boolean =>
        dependencies.every(({ name }) => this.findPackageInfo(name));

    check(): void {
        this.queue = this.queue.filter(
            ({ packageInfo: { dependencies }, awaiter }) => {
                const ready = this.isReady(dependencies);
                if (ready) {
                    awaiter();
                }
                return !ready;
            }
        );
    }
}
