import { readFileSync } from 'fs';

const importJson = (path: string) => JSON.parse(readFileSync(path).toString());

export const checkIfNpmScriptExists = ({
    location,
    command
}: {
    location: string;
    command: string;
}): boolean => {
    const packageJson = importJson(`${location}/package.json`);
    return !!(packageJson?.scripts && packageJson?.scripts[command]);
};
