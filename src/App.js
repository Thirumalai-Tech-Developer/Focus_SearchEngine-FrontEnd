import Google from "./components/google";
import Youtube from "./components/youtube";
import React, { useState } from 'react';

function App() {
    const [search, setSearch] = useState('');

    return (
        <>
            <input
                type='text'
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
                <>
                    <Youtube search={search} />
                    <Google search={search} />
                </>
            )}
        </>
    );
}

export default App;
