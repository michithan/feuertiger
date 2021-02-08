import { MembershipRequestResolvers } from '@feuertiger/schema-graphql';
import { Context } from '../context';

const MembershipRequest: MembershipRequestResolvers = {
    department: async ({ id }, args, { db }: Context) => {
        const result = await db.membershipRequest.findFirst({
            where: {
                id
            },
            select: {
                department: true
            }
        });
        return result?.department ?? null;
    },
    user: async ({ id }, args, { db }: Context) => {
        const result = await db.membershipRequest.findFirst({
            where: {
                id
            },
            select: {
                user: true
            }
        });
        return result?.user ?? null;
    }
};

export default MembershipRequest;
