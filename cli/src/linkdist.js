const fs = require('fs');
const { exec, addPackagePrefix } = require('./utils');

const linkscript = 'module.exports = require("../src/index");';
const linktypesscript = 'export * from "../src/index";';

const exists = async path => {
    try {
        await fs.promises.access(path);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = async flags => {
    await exec(flags, async packageInfo => {
        const { location } = packageInfo;
        const distpath = `${location}/dist`;
        const distpathindex = `${distpath}/index.js`;
        const distpathindextypes = `${distpath}/index.d.ts`;

        const hasIndexJs = await Promise.all([
            exists(`${location}/src/index.ts`),
            exists(`${location}/src/index.js`)
        ]).then(([ts, js]) => ts || js);

        const packageJson = require(`${location}/package.json`);
        const hasDistIndexJs = packageJson.main === './dist/index.js';

        if (!hasIndexJs || !hasDistIndexJs) {
            return;
        }

        if (!(await exists(distpath))) {
            await fs.promises.mkdir(distpath);
        }

        await Promise.all([
            fs.promises.writeFile(distpathindex, linkscript, {
                encoding: 'utf8',
                flag: 'w'
            }),
            fs.promises.writeFile(distpathindextypes, linktypesscript, {
                encoding: 'utf8',
                flag: 'w'
            })
        ]);

        console.log(
            addPackagePrefix(
                `linked "${distpathindex}" to "../src/index.ts"`,
                packageInfo
            ).trim()
        );
    });
};
