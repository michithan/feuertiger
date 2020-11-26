import { ViewerResolvers } from '@feuertiger/schema-graphql';

const Viewer: ViewerResolvers = {
    userRoles: async ({ id }, _, { db }) => {
        const { userRoles } = await db.user.findFirst({
            where: { id },
            select: {
                userRoles: true
            }
        });
        return userRoles;
    },
    person: async ({ id }, _, { db }) => {
        const { person } = await db.user.findFirst({
            where: { id },
            select: {
                person: true
            }
        });
        return person;
    }
};

export default Viewer;
