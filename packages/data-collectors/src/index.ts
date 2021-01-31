import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { collectLfvLocationsData } from './lfv';

const backups = {
    lfv: resolve(__dirname, '..', 'backup', 'lvf-locations.json')
};

const addBackupFallback = <T>(func: () => Promise<T>, path: string) => async (
    useBackup = false
): Promise<T> => {
    let data = useBackup ? null : await func();
    if (!data) {
        const raw = readFileSync(path, 'utf8');
        data = JSON.parse(raw) as T;
    }
    return data;
};

export const collectLocationData = {
    lfv: addBackupFallback(collectLfvLocationsData, backups.lfv)
};

export const createBackup = async (): Promise<void> => {
    const lvfLocations = await collectLocationData.lfv();

    if (lvfLocations) {
        writeFileSync(backups.lfv, JSON.stringify(lvfLocations, null, 2));
    }
};
