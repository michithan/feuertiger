import {
    DepartmentResolvers,
    DepartmentMembership
} from '@feuertiger/schema-graphql';
import {
    mapToPrismaQuery,
    createConnectionResolver
} from '@feuertiger/pagination';
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
    },
    memberships: async ({ id }, { query }, { db }: Context) => {
        const findMany = (
            args: Parameters<Parameters<typeof createConnectionResolver>[2]>[0]
        ) =>
            db.departmentMembership.findMany({
                where: {
                    departmentId: id,
                    person: args.where
                },
                include: {
                    person: true
                }
            });

        const count = (
            args: Parameters<Parameters<typeof createConnectionResolver>[1]>[0]
        ) =>
            db.departmentMembership.count({
                where: {
                    departmentId: id,
                    person: args.where
                }
            });

        const departmentMembershipConnectionResolver = createConnectionResolver<DepartmentMembership>(
            db,
            count,
            findMany
        );
        const searchProperties = [
            'firstname',
            'lastname',
            'phone',
            'birthName',
            'placeOfBirth',
            'avatar'
        ];
        const args = mapToPrismaQuery(query, searchProperties);
        return departmentMembershipConnectionResolver(query, args);
    }
};

export default Department;
