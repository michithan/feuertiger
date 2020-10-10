import chalk from 'chalk';
import randomcolor from 'randomcolor';

import { Flags } from '..';
import { list, PackageInfo } from './list';
import { listDependencies } from './listDependencies';

export interface ExtendedPackageInfo extends PackageInfo {
    dependencies: Array<PackageInfo>;
    prefix: string;
    completed?: boolean;
}

export const extendedList = async (
    flags: Flags
): Promise<Array<ExtendedPackageInfo>> => {
    const packages = await list(flags);
    const longestName =
        packages
            .map(({ name }) => name.length + 1)
            .sort()
            .pop() ?? 0;
    const colors = randomcolor({
        seed: 1,
        count: packages.length
    });
    return Promise.all(
        packages.map(
            async (
                { name, ...packageInfo },
                index
            ): Promise<ExtendedPackageInfo> => {
                const dependencies = (await listDependencies(name))
                    .map(dependency =>
                        packages.find(pgk => pgk.name === dependency.name)
                    )
                    .filter(dependency => dependency) as Array<
                    ExtendedPackageInfo
                >;
                const color = colors[index];
                const distance = new Array(longestName - name.length).join('═');
                const prefix = chalk.hex(color)(`${name} ${distance}═▷ `);
                return {
                    ...packageInfo,
                    dependencies,
                    name,
                    prefix
                };
            }
        )
    );
};
