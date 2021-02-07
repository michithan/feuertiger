import { Sex, UserRole } from '@feuertiger/schema-prisma';
import { AdminMutationResolvers } from '@feuertiger/schema-graphql';
import { Context } from '../context';
import { createGlobalId } from '../utils/id';

const AdminMutation: AdminMutationResolvers = {
    resolveMembershipRequest: async (
        parent,
        { membershipRequestId },
        { db }: Context
    ) => {
        const membershipRequest = await db.membershipRequest.findFirst({
            where: {
                id: membershipRequestId,
                department: {
                    memberships: {
                        none: {
                            userRoles: {
                                has: UserRole.ADMIN
                            }
                        }
                    }
                }
            },
            include: {
                user: true,
                department: {
                    include: {
                        address: true
                    }
                }
            }
        });

        if (!membershipRequest) {
            return false;
        }

        const { user, department } = membershipRequest;

        const person = user.personId
            ? await db.person.findFirst({ where: { id: user.personId } })
            : await db.person.create({
                  data: {
                      id: createGlobalId('person'),
                      firstname: user.firstname ?? '',
                      lastname: user.lastname ?? '',
                      avatar: '',
                      birthName: '',
                      dateOfBirth: '',
                      membershipNumber: '',
                      placeOfBirth: '',
                      phone: '',
                      sex: Sex.DIVERSE,
                      User: {
                          connect: {
                              id: user.id
                          }
                      },
                      address: {
                          create: {
                              id: createGlobalId('address'),
                              city: department.address.city,
                              country: department.address.country,
                              postalCode: department.address.postalCode,
                              street: '',
                              streetNumber: ''
                          }
                      }
                  }
              });

        if (!person) {
            return false;
        }

        const success = await db.departmentMembership.create({
            data: {
                id: createGlobalId('departmentMembership'),
                active: true,
                entryDate: new Date(),
                user: {
                    connect: {
                        id: user.id
                    }
                },
                department: {
                    connect: {
                        id: department.id
                    }
                },
                userRoles: [UserRole.ADMIN],
                person: {
                    connect: {
                        id: person.id
                    }
                }
            }
        });

        return Boolean(success);
    }
};

export default AdminMutation;
