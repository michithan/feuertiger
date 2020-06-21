import React from 'react';
import {
    PersonPromotionsFragment,
    Promotion
} from '@feuertiger/schema-graphql';

import { DetailEditTable } from '../index';

export interface MemberPromotionsDetailProps extends PersonPromotionsFragment {}

interface State {}

export class MemberPromotionsDetail extends React.Component<
    MemberPromotionsDetailProps,
    State
> {
    constructor(props: MemberPromotionsDetailProps) {
        super(props);
        this.state = {};
    }

    private handleSave = async (changes: Promotion[]) => {
        console.log(changes);
    };

    render() {
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
