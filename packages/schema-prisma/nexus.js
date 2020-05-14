const { nexusPrismaPlugin } = require('nexus-prisma');
const { makeSchema, queryType, objectType } = require('@nexus/schema');
const path = require('path');

const dist = path.resolve(__dirname, 'dist');
const source = require.resolve('./dist');

const prismaPlugin = nexusPrismaPlugin({
    inputs: {
        prismaClient: source
    }
});

makeSchema({
    plugins: [prismaPlugin],
    typegenAutoConfig: {
        contextType: '{ prisma: PrismaClient.PrismaClient }',
        sources: [{ source: `${dist}/index.d.ts`, alias: 'PrismaClient' }]
    },
    outputs: {
        schema: `${dist}/schema.graphql`,
        typegen: `${dist}/types.d.ts`
    },
    types: [
        queryType({
            definition(t) {
                t.crud.person();
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
