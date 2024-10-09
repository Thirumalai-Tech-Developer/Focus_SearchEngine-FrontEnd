import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/keyboard'; // Import the Swiper keyboard CSS
import 'swiper/css/navigation'; // Import navigation for next/prev buttons (optional)
import { FreeMode, Pagination, Keyboard, Navigation } from 'swiper/modules'; // Import Keyboard and Navigation module

const Youtube = ({ search, length }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search && length) {
      fetch(`https://frontendsearchengine.onrender.com/youtube?search=${search}&maxResults=${length}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setData([]);
        });
    }
  }, [search, length]);

  return (
    <div className="flex items-center justify-center flex-col h-auto">
      {error && <p className="text-red-500">{error}</p>}
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true, // Enable keyboard navigation
          onlyInViewport: true, // Only activate in viewport
        }}
        navigation={true} // Enable navigation arrows for manual control
        simulateTouch={true} // Ensures swipe gestures are enabled
        touchRatio={1} // Ensures swipe sensitivity
        modules={[FreeMode, Pagination, Keyboard, Navigation]} // Add Navigation for swiping and Keyboard module
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {data.length > 0 &&
          data.map((video , index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl overflow-hidden cursor-pointer">
                <iframe
                  className="w-full h-[250px] lg:h-[400px]"
                  src={video.embedUrl}
                  title={`YouTube video player - ${index}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Youtube;
