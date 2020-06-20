import React from 'react';
import MaterialTable from 'material-table';
import { PersonPromotionsFragment } from '@feuertiger/schema-graphql';

import { DetailTable } from '../index';

export interface MemberPromotionsDetailProps extends PersonPromotionsFragment {}

interface State {
    editMode: boolean;
}

export class MemberPromotionsDetail extends React.Component<
    MemberPromotionsDetailProps,
    State
> {
    constructor(props: MemberPromotionsDetailProps) {
        super(props);
        this.state = { editMode: false };
    }

    private handleClickEdit = () => this.setState({ editMode: true });

    private handleClickDiscard = () => {
        this.setState({ editMode: true });
    };

    private handleClickBack = () => {
        this.setState({ editMode: false });
    };

    private handleClickSave = () => {
        this.setState({ editMode: false });
    };

    render() {
        const { promotions } = this.props;
        const { editMode } = this.state;

        return (
            <DetailTable
                label="Beförderungen"
                editMode={editMode}
                handleClickSave={this.handleClickSave}
                handleClickDiscard={this.handleClickDiscard}
                handleClickBack={this.handleClickBack}
                handleClickEdit={this.handleClickEdit}
            >
                <MaterialTable
                    options={{
                        search: true
                    }}
                    columns={[
                        { title: 'Dienstgrad', field: 'grade' },
                        { title: 'Datum', field: 'dateOfPromotion' }
                    ]}
                    data={promotions.map(promotion => ({
                        ...promotion
                    }))}
                    title="Beförderungen"
                />
            </DetailTable>
        );
    }
}
