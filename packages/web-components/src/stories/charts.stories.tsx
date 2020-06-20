import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { CountPerGroup } from '@feuertiger/schema-graphql';
import { PieChart, PieChartProps, Paper } from '../index';

faker.locale = 'de';
faker.seed(4);

const countPerGroupMock: CountPerGroup[] = [
    {
        name: 'Feuerwehrmänner',
        value: 60
    },
    {
        name: 'Löschmeister',
        value: 10
    },
    {
        name: 'Brandmeister',
        value: 5
    }
];

storiesOf('Charts', module).add('Pie', () => {
    const props: PieChartProps = {
        data: countPerGroupMock
    };
    return (
        <Paper>
            <PieChart {...props} />
        </Paper>
    );
});
