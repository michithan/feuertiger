/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
    DataExtractor,
    DataExtractorProps
} from '../components/dataExtractor/dataExtractor';

const defaultProps: DataExtractorProps = {};

storiesOf('DataExtractor', module).add('Default', () => {
    const props: DataExtractorProps = {
        ...defaultProps
    };
    return <DataExtractor {...props} />;
});
