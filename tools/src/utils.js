const execa = require('execa');

exports.list = scope => {
    const arguments = ['list'];
    if (scope) {
        arguments.push(`--scope "${scope}"`);
    }
    arguments.push('--json');
    return execa('lerna', arguments).then(
        ({ stdout }) => stdout && JSON.parse(stdout)
    );
};
