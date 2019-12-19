import React, { ReactNode } from 'react';
import Member from '../components/member';

type Props = {
    children?: ReactNode;
    index: number;
    value: number;
};

export default class MemberPage extends React.Component<Props> {
    render() {
        return <Member />;
    }
}
