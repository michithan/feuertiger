const fs = require("fs");
const { importSchema } = require("graphql-import");

const modulschema = require.resolve("./src/root.graphql");

console.log("modulschema:", modulschema);

const schema = importSchema(modulschema);

fs.existsSync("./dist") || fs.mkdirSync("./dist");
fs.writeFileSync("./dist/schema.graphql", schema, "utf8");
