import { MembershipRequestStatus } from '@feuertiger/schema-prisma';
import { UserResolvers } from '@feuertiger/schema-graphql';
import { Context } from '../context';

const User: UserResolvers = {
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
    },
    openMembershipRequest: async ({ id }, _, { db }: Context) => {
        const membershipRequest = await db.membershipRequest.findFirst({
            where: {
                AND: [
                    { userId: id },
                    { status: MembershipRequestStatus.PENDING }
                ]
            }
        });
        return membershipRequest;
    }
};

export default User;
