import { render } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
    test('Button renders correctly', () => {
        const { container } = render(<Button>Test</Button>);

        expect(container).toBeDefined();
    });
});
