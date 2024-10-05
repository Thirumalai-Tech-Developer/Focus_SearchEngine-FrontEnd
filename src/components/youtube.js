import React, { useEffect, useState } from 'react';

const Youtube = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (search) {
            fetch(`http://localhost:5000/youtube?search=${search}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setError(null); 
                })
                .catch((err) => {
                    setError(err.message);
                    setData(null);
                });
        }
    }, [search]);

    return (
        <>
            <div>
                <input
                    type='text'
                    placeholder='Search'
                    onChange={(e) => setSearch(e.target.value)}
                />
                {error && <p>Error: {error}</p>}
                {data && (
                    <ul>
                        {data.map((item) => (
                            <li key={item.key}>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Youtube;
