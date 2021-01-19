import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
    test('Button renders correctly', () => {
        render(<Button>Test</Button>);

        expect(screen.getByText('Test')).toBeDefined();
    });

    test('Click handler get called', () => {
        const handler = jest.fn();

        render(<Button onClick={handler}>Test</Button>);

        userEvent.click(screen.getByText('Test'));

        expect(handler).toHaveBeenCalledTimes(1);
    });
});
