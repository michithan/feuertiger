import execa from 'execa';
import { getLernaBinary } from './getLernaBinary';
import { PackageInfo } from './list';

export const listDependencies = async (
    name: string
): Promise<Array<PackageInfo>> => {
    const bin = await getLernaBinary();

    const args = ['list', '--scope', name, '--include-dependencies', '--json'];

    const { stdout } = await execa(bin, args);
    const dependencies = JSON.parse(stdout) as Array<PackageInfo>;

    return dependencies.filter(dependency => dependency.name !== name);
};
