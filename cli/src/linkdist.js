const fs = require('fs');
const { list } = require('./utils');

const linkscript = 'module.exports = require("../src/index");';
const linktypesscript = 'export * from "../src/index";';

module.exports = async flags => {
    const packages = await list(flags);
    for (const { location } of packages) {
        const packageJsonPath = `${location}/package.json`;
        const distpath = `${location}/dist`;
        const distpathindex = `${distpath}/index.js`;
        const distpathindextypes = `${distpath}/index.d.ts`;

        const hasIndexJs =
            fs.existsSync(`${location}/src/index.ts`) ||
            fs.existsSync(`${location}/src/index.js`);

        const packageJson = require(packageJsonPath);
        const hasDistIndexJs = packageJson.main === './dist/index.js';

        if (!hasIndexJs || !hasDistIndexJs) {
            continue;
        }

        if (!fs.existsSync(distpath)) {
            fs.mkdirSync(distpath);
        }

        fs.writeFileSync(distpathindex, linkscript, {
            encoding: 'utf8',
            flag: 'w'
        });

        fs.writeFileSync(distpathindextypes, linktypesscript, {
            encoding: 'utf8',
            flag: 'w'
        });

        console.log(`linked "${distpathindex}" to "../src/index.ts"`);
    }
};
