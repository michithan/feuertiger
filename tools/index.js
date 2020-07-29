const meow = require('meow');
const figlet = require('figlet');
const chalk = require('chalk');
const log = console.log;

const cli = meow(
    `
    Usage
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
 
    Examples
      $ feuertiger lint --package web-client
      🔎 linting project web-client, web-components 🔍
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

const tiger = input =>
    log(
        `${chalk.red('feuer')}${chalk.yellow('t')}${chalk.grey(
            'i'
        )}${chalk.yellow('g')}${chalk.grey('e')}${chalk.yellow('r')} - ${input}`
    );

(async () => {
    switch (cli.input[0]) {
        case 'list':
            tiger('📜 list 📜');
            const utils = require('./src/utils');
            const list = await utils.list(cli.flags.package);
            console.log(list);
            break;
        case 'lint':
            tiger('🔎 lints 🔍');
            const lint = require('./src/lint');
            lint(cli.flags);
            break;
        default:
            console.log(cli.help);
            break;
    }
})();
