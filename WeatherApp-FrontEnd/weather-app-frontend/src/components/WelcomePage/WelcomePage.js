import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const WelcomePage = ({ currentUser }) => {

  const slides = [
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/3ad89154827733.596dc6164dbd1.gif",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/d8b05154827733.596dc77a0361f.gif",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/52f06c54827733.596dc6165122d.gif",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
      <div className="max-w-screen-xl h-screen w-full m-auto py-16 px-4 relative group">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
          Welcome {currentUser.username}
        </h1>
        <br />
        <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="ml-auto mr-auto mt=auto mb-auto w-1/2 h-3/4 rounded-[28px] bg-center bg-cover duration-500"
        ></div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {slides.map((slideItem, index) => (
              <div
                  key={slideItem}
                  onClick={() => goToSlide(index)}
                  className="text-2xl cursor-pointer"
              >
                <RxDotFilled />
              </div>
          ))}
        </div>
      </div>
  );
};

export default WelcomePage;
