import { test, describe, expect } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { SideBar } from './sideBar';
import { ThemeProvider } from '../../providers/themeProvider';
import renderer from 'react-test-renderer';

describe('Test side bar', () => {
    test('should create side bar', () => {
        const component = renderer.create(
            <ThemeProvider>
                <SideBar open={false} handleDrawerClose={() => {}} />
            </ThemeProvider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('should be open', () => {
        const component = renderer.create(
            <ThemeProvider>
                <SideBar open={true} handleDrawerClose={() => {}} />
            </ThemeProvider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('should be closed', () => {
        const component = renderer.create(
            <ThemeProvider>
                <SideBar open={false} handleDrawerClose={() => {}} />
            </ThemeProvider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('should trigger handleDrawerClose', () => {
        let triggerdClose = false;
        const { getByTestId } = render(
            <ThemeProvider>
                <SideBar
                    open={true}
                    handleDrawerClose={() => {
                        triggerdClose = true;
                    }}
                />
            </ThemeProvider>
        );
        const closeButton = getByTestId('sidebar-close-button');
        expect(closeButton).toBeTruthy();
        fireEvent.click(closeButton);
        expect(triggerdClose).toBeTruthy();
    });
});
