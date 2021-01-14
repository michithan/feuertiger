import React, { ReactElement } from 'react';
import {
    PersonPromotionsFragment,
    Promotion
} from '@feuertiger/schema-graphql';

import { DetailEditTable } from '../index';

const handleSave = async (changes: Promotion[]) => {
    console.log(changes);
};

export type MemberPromotionsDetailProps = PersonPromotionsFragment;

export const MemberPromotionsDetail = ({
    promotions
}: MemberPromotionsDetailProps): ReactElement => (
    <DetailEditTable
        label="Beförderungen"
        handleSave={handleSave}
        connectionTableProps={{
            columns: [
                { title: 'Dienstgrad', field: 'grade' },
                {
                    title: 'Datum',
                    field: 'dateOfPromotion',
                    type: 'date'
                }
            ]
        }}
        columns={[
            { title: 'Dienstgrad', field: 'grade' },
            { title: 'Datum', field: 'dateOfPromotion', type: 'date' }
        ]}
        title=""
        connectionData={[]}
        data={promotions}
    />
);
