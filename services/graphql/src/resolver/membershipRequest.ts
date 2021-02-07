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
    }
};

export default MembershipRequest;
