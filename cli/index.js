const meow = require('meow');
const figlet = require('figlet');
const chalk = require('chalk');
const { feuertiger, tiger } = require('./src/utils');

const cli = meow(
    `
    Usage
      $ init            installs all dependencies and setups workspace // TODO
      $ list            lists all packages
      $ linkdist        links all ./dist/index.js to ./src/index.js
      $ format          formats the code
      $ lint            lints the code  // TODO
      $ test            tests the code  // TODO
      $ build           builds the code  // TODO
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
            }
        }
    }
);

(async () => {
    switch (cli.input[0]) {
        case 'init':
            tiger('🎬 init 🎬');
            const init = require('./src/init');
            init(cli.flags);
            break;
        case 'linkdist':
            tiger('🔗 linkdist 🔗');
            const linkdist = require('./src/linkdist');
            linkdist();
            break;
        case 'format':
            tiger('🧹 formats 🧹');
            const format = require('./src/format');
            format(cli.flags);
            break;
        case 'lint':
            tiger('🔎 lints 🔍');
            const lint = require('./src/lint');
            lint(cli.flags);
            break;
        case 'list':
            tiger('📜 list 📜');
            const utils = require('./src/utils');
            const list = await utils.list(cli.flags);
            console.log(list);
            break;
        case 'dev':
            tiger('👟🧪 running everything in development mode 🧪👟');
            const dev = require('./src/dev');
            await dev(cli.flags);
            break;
        default:
            console.log(cli.help);
            break;
    }
})();
