const fs = require("fs");
const { importSchema } = require("graphql-import");

const modulschema= require.resolve("./src/graphql/root.graphql");
const schema = importSchema(modulschema);
const dist= "./dist";

console.log("modulschema:", modulschema)
console.log("schema:", schema)
console.log("dist:", dist)

fs.existsSync(dist) && fs.rmdirSync(dist, { recursive:true });
fs.mkdirSync(dist);
fs.writeFileSync("./dist/schema.graphql", schema, "utf8");