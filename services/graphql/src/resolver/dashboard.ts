import { DashboardResolvers } from '@feuertiger/schema-graphql';
import { Grade } from '@feuertiger/schema-prisma';
import { Context } from '../context';

const Dashboard: DashboardResolvers = {
    membersByGrade: async (parent, args, context: Context) => {
        const memberGrades = await context.db.person.findMany({
            select: {
                grade: true
            }
        });
        const membersByGrade = memberGrades
            .reduce((grades, { grade }) => {
                grades.set(grade, (grades.get(grade) || 0) + 1);
                return grades;
            }, new Map<Grade, number>())
            .entries();
        return Array.from(membersByGrade).map(([grade, number]) => ({
            grade,
            members: number
        }));
    },
    exerciseByCategory: async (parent, args, context: Context) => {
        const exerciseCategorys = await context.db.exercise.findMany({
            select: {
                topic: true
            }
        });
        return [
            {
                category: 'Sonstige',
                exercises: exerciseCategorys.length
            }
        ];
    }
};

export default Dashboard;
