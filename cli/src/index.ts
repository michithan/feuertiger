/* eslint-disable no-case-declarations */
/* eslint-disable global-require */
import meow from 'meow';
import { feuertiger, tiger } from './utils/logging';

const cli = meow(
    `
    Usage
      $ init            installs all dependencies and setups workspace
      $ list            lists all packages
      $ linkdist        links all ./dist/index.js to ./src/index.js
      $ format          formats the code
      $ lint            lints the code
      $ test            tests the code  // TODO
      $ build           builds the code
      $ e2e             e2e test all the things  // TODO
      $ dev             starts all in dev mode
      $ start           starts all in prod mode  // TODO
      $ publish         publishes all changed npm packages  // TODO
      $ dockerize       build and publishes all services as docker images  // TODO
      $ deploy          deploys docker images to kubernetes cluster  // TODO
      $ provision       provision the cloud infrastructure  // TODO
      $ clean           back to git clone  // TODO

    Options
      --package, -p  reduce scope to package
      --changed, -c  reduce scope to packages affected by changes since last publish
 
    Examples
      $ feuertiger list --package web-client
      ${feuertiger} - 📜 list 📜
`,
    {
        flags: {
            package: {
                type: 'string',
                alias: 'p'
            },
            changed: {
                type: 'boolean',
                alias: 'c'
            }
        }
    }
);

export interface Flags {
    package?: string;
    changed?: boolean;
}

(async () => {
    switch (cli.input[0]) {
        case 'init':
            tiger('🎬 init 🎬');
            const init = await import('./init');
            await init.default();
            break;
        case 'linkdist':
            tiger('🔗 linkdist 🔗');
            const linkdist = await import('./linkdist');
            await linkdist.default(cli.flags);
            break;
        case 'format':
            tiger('🧹 formats 🧹');
            const format = await import('./format');
            await format.default(cli.flags);
            break;
        case 'lint':
            tiger('🔎 lints 🔍');
            const lint = await import('./lint');
            await lint.default(cli.flags);
            break;
        case 'list':
            tiger('📜 lists 📜');
            const utils = await import('./utils/list');
            const list = await utils.list(cli.flags);
            console.log(list);
            break;
        case 'test':
            tiger('🧪 tests 🧪');
            const test = await import('./test');
            await test.default(cli.flags);
            break;
        case 'dev':
            tiger('👟🧪 running everything in development mode 🧪👟');
            const dev = await import('./dev');
            await dev.default(cli.flags);
            break;
        case 'build':
            tiger('🔧 building everything 🔧');
            const build = await import('./build');
            await build.default(cli.flags);
            break;
        case 'publish':
            tiger('🌎 publishing everything 🌎');
            const publish = await import('./publish');
            await publish.default();
            break;
        case 'dockerize':
            tiger('🐳 building docker images 🐳');
            const dockerize = await import('./dockerize');
            await dockerize.default(cli.flags);
            break;
        default:
            console.log(cli.help);
            break;
    }
})();
