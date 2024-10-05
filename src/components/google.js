import React, { useEffect, useState } from 'react';

const Google = (search) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (search) {
            fetch(`http://localhost:5000/google?search=${search}`)
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
                {error && <p>Error: {error}</p>}
                {data && (
                    <div>
                        {data.map((item) => (
                            <li>
                            <a key={item.key} href={item.link}>
                                {item.title}
                            </a></li>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
export default Google