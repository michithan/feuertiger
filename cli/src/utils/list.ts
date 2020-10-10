import execa from 'execa';
import { Flags } from '..';
import { getLernaBinary } from './getLernaBinary';

export interface PackageInfo {
    name: string;
    version: string;
    private: boolean;
    location: string;
}

export const list = async ({
    package: packageInfo,
    changed
}: Flags): Promise<Array<PackageInfo>> => {
    const bin = await getLernaBinary();

    const args = ['list'];
    if (packageInfo) {
        args.push(...['--scope', packageInfo, '--include-dependents']);
    }
    if (changed) {
        args.push('--since');
    }
    args.push('--json');

    const { stdout } = await execa(bin, args);
    const packages = JSON.parse(stdout) as Array<PackageInfo>;
    return packages;
};
