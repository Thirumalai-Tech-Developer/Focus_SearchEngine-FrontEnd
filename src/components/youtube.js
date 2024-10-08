import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';

const Youtube = ({ search, length }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search && length) {
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
          setData([]);
        });
    }
  }, [search, length]);

  return (
    <div className="flex items-center justify-center flex-col h-auto bg-[#6c34af]">
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
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {data.length > 0 &&
          data.map((video, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl overflow-hidden cursor-pointer">
                <iframe
                  className="w-full h-[250px] lg:h-[400px]"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
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
