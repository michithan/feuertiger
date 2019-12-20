const fs = require('fs');
const { importSchema } = require('graphql-import');

const modulschema = require.resolve('./src/root.graphql');

const schema = importSchema(modulschema);

if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
}
fs.writeFileSync('./dist/schema.graphql', schema, 'utf8');
