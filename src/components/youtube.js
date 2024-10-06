import React, { useEffect, useState } from 'react';

const Youtube = ({ search }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [length, setLength] = useState(2);
    useEffect(() => {
        if (search) {
            fetch(`http://localhost:5000/youtube?search=${search}&maxResults=${length}`)
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
    }, [search, length]);

    return (
        <>
            <div>
                <input
                    type='number'
                    placeholder='No limit'
                    defaultValue={2}
                    onChange={(e) => setLength(Number(e.target.value))}
                />
                {error && <p>Error: {error}</p>}
                {data && (
                    <div>
                        {data.map((item) => (
                            <iframe 
                                key={item.key} 
                                width="560" 
                                height="315" 
                                src={item.embedUrl} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen>
                            </iframe>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Youtube;
