import React, { useEffect, useState } from 'react';

const Google = ({ search }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (search) {
            fetch(`https://frontendsearchengine.onrender.com/google?search=${search}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log('Google API response:', data); // Log the response
                    if (Array.isArray(data)) {
                        setData(data);
                    } else {
                        setError("Unexpected response format");
                    }
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
            <div className='flex justify-center gap-11'>
                {error && <p>Error: {error}</p>}
                {data && (
                    <ul>
                    {data.map((item, index) => (
                        <li 
                            key={index}
                            style={{ listStyleType: 'none', marginBottom: '8px' }}
                        >
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', color: 'white' }}
                                onMouseOver={(e) => e.currentTarget.style.color = 'orange'}
                                onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                            >
                                {item.title || 'No Title Found'}
                            </a>
                        </li>
                    ))}
                </ul>                
                )}
            </div>
        </>
    );
};

export default Google;
