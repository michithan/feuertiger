import React, { ReactNode } from 'react';
import {
    PersonPromotionsFragment,
    Promotion
} from '@feuertiger/schema-graphql';

import { DetailEditTable } from '../index';

export type MemberPromotionsDetailProps = PersonPromotionsFragment;

export class MemberPromotionsDetail extends React.Component<
    MemberPromotionsDetailProps
> {
    private handleSave = async (changes: Promotion[]) => {
        console.log(changes);
    };

    render(): ReactNode {
        const { promotions } = this.props;

        return (
            <DetailEditTable
                label="Beförderungen"
                handleSave={this.handleSave}
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
    }
}
