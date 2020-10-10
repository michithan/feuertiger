import execa from 'execa';

export const getLernaBinary = async (): Promise<string> => {
    const { stdout } = await execa('yarn', ['bin', 'lerna']);
    return stdout as string;
};
