import { DepartmentMembershipResolvers } from '@feuertiger/schema-graphql';

const DepartmentMembership: DepartmentMembershipResolvers = {
    department: async ({ id }, args, { db }) => {
        const departmentMembership = await db.departmentMembership.findFirst({
            where: {
                id
            },
            select: {
                department: true
            }
        });
        return departmentMembership?.department ?? null;
    }
};

export default DepartmentMembership;
