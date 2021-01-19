import { FC, useState } from 'react';

import { Button } from '../Button';

export const Home: FC = () => {
    const [count, setCount] = useState(0);

    fetch('/user', {
        method: 'POST',
        body: JSON.stringify({ test: 42 }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then(console.log);

    return (
        <Button onClick={() => setCount(count + 1)}>Hello world {count}</Button>
    );
};
