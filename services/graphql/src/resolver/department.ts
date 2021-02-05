import { DepartmentResolvers } from '@feuertiger/schema-graphql';
import { Context } from '../context';

const Department: DepartmentResolvers = {
    address: async ({ id }, args, { db }: Context) => {
        const department = await db.department.findFirst({
            where: {
                id
            },
            select: {
                address: true
            }
        });
        return department?.address ?? null;
    }
};

export default Department;
