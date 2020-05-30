import React from 'react';
import { Button } from '@material-ui/core';

interface State {
    showName: boolean;
}

export interface AddExerciseComponentProps {
    name: String;
}

export class AddExerciseComponent extends React.Component<
AddExerciseComponentProps,
    State
> {
    constructor(props: AddExerciseComponentProps) {
        super(props);
        this.state = {
            showName: true
        };
    }

    render() {
        const { showName } = this.state;
        const { name } = this.props;
        return showName ? (
            <p>
                hallo {name}!
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.setState({ showName: false })}
                >
                    hide name
                </Button>
            </p>
        ) : (
            <p>
                hallo
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.setState({ showName: true })}
                >
                    Shwo name
                </Button>
            </p>
        );
    }
}

// export const AddExerciseComponent = ({ name }: ChrisComponentProps) => (
//     <p>Hallo {name}</p>
// );
