const { nexusPrismaPlugin } = require('nexus-prisma');
const { makeSchema, queryType, objectType } = require('nexus');
const path = require('path');

const schema = makeSchema({
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [{ source: require.resolve('./dist'), alias: 'prisma' }]
    },
    outputs: {
        schema: './dist/schema.graphql',
        typegen: '/dist/types.d.ts'
    },
    plugins: [nexusPrismaPlugin()],
    types: [
        queryType({
            definition(t) {
                t.crud.persons();
            }
        }),
        objectType({
            name: 'Person',
            definition(t) {
                t.model.id();
                t.model.firstname();
                t.model.lastname();
            }
        })
    ]
});

console.log('schema: ', schema);
