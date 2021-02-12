import {
    DepartmentResolvers,
    DepartmentMembership
} from '@feuertiger/schema-graphql';
import {
    buildPrismaFilter,
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
        const departmentMembershipConnectionResolver = createConnectionResolver(
            db,
            'departmentMembership'
        );

        const { search, page, pageSize, orderBy, orderDirection } = query ?? {};
        const searchFilter =
            search &&
            buildPrismaFilter(search, [
                'firstname',
                'lastname',
                'phone',
                'birthName',
                'placeOfBirth',
                'avatar'
            ]);

        return departmentMembershipConnectionResolver<DepartmentMembership>(
            query,
            {
                where: {
                    departmentId: id,
                    person: {
                        OR: searchFilter || undefined
                    }
                },
                include: {
                    person: true
                },
                orderBy:
                    (orderBy &&
                        orderDirection && {
                            [orderBy]: orderDirection
                        }) ||
                    undefined,
                take: pageSize,
                skip: page && pageSize && page * pageSize
            }
        );
    }
};

export default Department;
