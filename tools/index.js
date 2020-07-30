const meow = require('meow');
const figlet = require('figlet');
const chalk = require('chalk');
const log = console.log;

const feuertiger = `${chalk.red('feuer')}${chalk.yellow('t')}${chalk.grey(
    'i'
)}${chalk.yellow('g')}${chalk.grey('e')}${chalk.yellow('r')}`;

const cli = meow(
    `
    Usage
      $ list            lists all packages
      $ linkdist        links all ./dist/index.js to ./src/index.js
      $ format          formats the code
      $ lint            lints the code
      $ test            tests the code
      $ build           builds the code
      $ e2e             e2e test all the things
      $ dev             starts all in dev mode
      $ start           starts all in prod mode
      $ publish         publishes all changed npm packages
      $ dockerize       build and publishes all services as docker images
      $ deploy          deploys docker images to kubernetes cluster
      $ provision       provision the cloud infrastructure

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

const tiger = input => log(`${feuertiger} - ${input}`);

(async () => {
    switch (cli.input[0]) {
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
        default:
            console.log(cli.help);
            break;
    }
})();
