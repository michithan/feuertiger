import { ESLint } from 'eslint';

import eslintrc from '../../.eslintrc';
import { Flags } from '.';
import { exec } from './utils/exec';
import { root } from './paths';
import { addPackagePrefix } from './utils/logging';
import { ExtendedPackageInfo } from './utils/extendedList';

const eslint = new ESLint({
    fix: true,
    useEslintrc: false,
    baseConfig: eslintrc,
    resolvePluginsRelativeTo: `${root}/`,
    errorOnUnmatchedPattern: false
});

const lint = (formatter: ESLint.Formatter) => async (
    packageInfo: ExtendedPackageInfo
): Promise<void> => {
    const { name, location } = packageInfo;
    const log = (text: string) =>
        console.log(addPackagePrefix(text, packageInfo).trim());

    log(`linting ${name}`);

    const results = await eslint.lintFiles(`${location}/**/*.{js,jsx,ts,tsx}`);

    await ESLint.outputFixes(results);

    const resultText = formatter.format(results);

    if (resultText) {
        log(resultText);
    }
};

export default async (flags: Flags): Promise<void> => {
    const formatter = await eslint.loadFormatter('stylish');
    await exec(flags, lint(formatter), true);
};
