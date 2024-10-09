import Google from "./components/google";
import Youtube from "./components/youtube";
import React, { useState, useRef } from 'react';
import { FiSearch } from 'react-icons/fi'; 
import './index.css';

function App() {
    const [search, setSearch] = useState('');
    const [videoLimit, setVideoLimit] = useState(2);  // State to control video limit
    const searchInputRef = useRef(null);

    const handleSearch = () => {
        if (searchInputRef.current) {
            setSearch(searchInputRef.current.value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLimitChange = (e) => {
        setVideoLimit(Number(e.target.value));
    };

    return (
        <div className="bg-[url('./gif/bg.gif')] h-screen flex flex-col">
            {/* Search bar section */}
            <div className="absolute top-5 right-5 flex mb-4 z-10">
                <input
                    ref={searchInputRef}
                    className="border border-gray-300 rounded-md p-2 w-60 md:w-80 lg:w-96"
                    type='text'
                    placeholder='Search'
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white rounded-md p-2 ml-2 flex items-center"
                >
                    <FiSearch className="mr-2" /> 
                    Search
                </button>
            </div>

            {/* Video limit input section */}
            <div className="absolute top-5 left-5 flex mb-4 z-10">
                <input
                    type="number"
                    value={videoLimit}
                    onChange={handleLimitChange}
                    className="border border-gray-300 rounded-md p-1 w-20"
                    placeholder="Video"
                />
            </div>
            
            {/* Main content container */}
            <div className="bg-black h-[85vh] rounded-3xl bg-opacity-35 mx-4 md:mx-10 lg:mx-20 mt-20 flex flex-col"> {/* Increased top margin */}

            <h1 style={{ fontSize: '36px', color: 'White', textAlign: 'center' }}>Youtube Video</h1>
                <div className="flex-1 overflow-y-auto p-6 bg-black bg-opacity-20">
                    {search && (
                        <div className="h-auto">
                            <Youtube search={search} length={videoLimit} />
                        </div>
                    )}
                </div>

                <h1 style={{ fontSize: '36px', color: 'White', textAlign: 'center' }}>Articles</h1>


                <div className="flex-1 gap-5 overflow-y-auto p-6 bg-black bg-opacity-20 rounded-xl"
                    style={{color: 'white'}}
                >
                    {search && (
                        <div className="h-auto items-center ">
                            <Google search={search} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
