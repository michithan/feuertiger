import React from 'react';
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
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
                loading={!promotions}
                editMode={editMode}
                handleClickSave={this.handleClickSave}
                handleClickDiscard={this.handleClickDiscard}
                handleClickBack={this.handleClickBack}
                handleClickEdit={this.handleClickEdit}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Thema</TableCell>
                        <TableCell align="right">Datum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {promotions?.map((promotion) => (
                        <TableRow key={promotion.id}>
                            <TableCell component="th" scope="row">
                                {promotion.grade}
                            </TableCell>
                            <TableCell align="right">
                                {promotion.dateOfPromotion}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </DetailTable>
        );
    }
}
