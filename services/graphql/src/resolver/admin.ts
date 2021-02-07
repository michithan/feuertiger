import { UserRole } from '@feuertiger/schema-prisma';
import { AdminResolvers } from '@feuertiger/schema-graphql';
import { Context } from '../context';

const Admin: AdminResolvers = {
    unresolvableMembershipRequests: async (parent, args, { db }: Context) => {
        const results = await db.membershipRequest.findMany({
            where: {
                department: {
                    memberships: {
                        none: {
                            userRoles: {
                                has: UserRole.ADMIN
                            }
                        }
                    }
                }
            }
        });
        return results;
    }
};

export default Admin;
