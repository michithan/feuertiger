import React, { ReactNode } from 'react';
import {
    Grid,
    Button,
    Stepper,
    Step,
    StepLabel,
    StepContent
} from '@material-ui/core';
import { RawDataStructure, ExtractorOptions } from './rawDataStructure';
import { FileInfo } from './fileInfo';
import { TextData } from './textData';
import { CleaningOptions } from './cleaningOptions';
import { ParsingOptions } from './parsingOptions';

interface State {
    file: File | null | undefined;
    dataStructure: RawDataStructure;
    options: ExtractorOptions;
    activeStep: number;
}

const DEFAULT_OPTIONS = {
    colSeperator: ';',
    rowSeprator: '\n',
    rowLength: null,
    cleaningRules: []
};

export class DataExtractor extends React.Component<
    Record<string, unknown>,
    State
> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            activeStep: 1,
            file: null,
            dataStructure: null,
            options: DEFAULT_OPTIONS
        };
    }

    handleChangeDropzone = async ([file]: File[]): Promise<void> => {
        if (file) {
            await this.loadFile(file);
            this.setState({
                file
            });
        } else {
            this.handleReset();
        }
    };

    handleReset = (): void =>
        this.setState({
            file: null,
            dataStructure: null,
            options: DEFAULT_OPTIONS
        });

    loadFile = async (file: File): Promise<void> => {
        const { options } = this.state;
        const dataStructure = new RawDataStructure(options);
        await dataStructure.load(file);
        this.setState({ dataStructure });
    };

    clean = async (): Promise<void> => {
        const { dataStructure, options } = this.state;
        dataStructure.setOptions(options);
        await dataStructure.clean();
        this.setState({ dataStructure });
    };

    parse = async (): Promise<void> => {
        const { dataStructure, options } = this.state;
        dataStructure.setOptions(options);
        await dataStructure.parse();
        this.setState({ dataStructure });
    };

    handleNext = (): void =>
        this.setState(({ activeStep }) => {
            const nextStep = activeStep + 1;
            switch (nextStep) {
                case 1:
                    this.clean();
                    break;
                case 2:
                    this.clean();
                    this.parse();
                    break;
                case 3:
                    this.parse();
                    break;
                default:
                    break;
            }
            return {
                activeStep: nextStep
            };
        });

    handleBack = (): void =>
        this.setState(({ activeStep }) => ({
            activeStep: activeStep - 1
        }));

    render(): ReactNode {
        const { file, dataStructure, options, activeStep } = this.state;
        return (
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step key="Select file">
                    <StepLabel>Select file</StepLabel>
                    <StepContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FileInfo
                                    file={file}
                                    handleChangeDropzone={
                                        this.handleChangeDropzone
                                    }
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    disabled={!file}
                                    onClick={this.handleReset}
                                >
                                    Reset
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    disabled={!file}
                                    onClick={this.handleNext}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
                <Step key="Clean data">
                    <StepLabel>Clean data</StepLabel>
                    <StepContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextData dataStructure={dataStructure} />
                            </Grid>
                            <Grid item xs={12}>
                                <CleaningOptions options={options} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextData
                                    dataStructure={dataStructure}
                                    showClean
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleNext}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
                <Step key="Parse data">
                    <StepLabel>Parse data</StepLabel>
                    <StepContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextData
                                    dataStructure={dataStructure}
                                    showClean
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ParsingOptions options={options} />
                            </Grid>
                            <Grid item xs={12}>
                                <FlattData dataStructure={dataStructure} />
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleNext}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
                <Step key="Structure data">
                    <StepLabel>Structure data</StepLabel>
                    <StepContent>
                        <Grid container spacing={3}>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    onClick={this.handleBack}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs="auto">
                                <Button
                                    autoFocus
                                    color="primary"
                                    variant="contained"
                                    onClick={this.handleNext}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </StepContent>
                </Step>
            </Stepper>
        );
    }
}
