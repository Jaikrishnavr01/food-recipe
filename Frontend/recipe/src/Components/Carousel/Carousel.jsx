import React, { useState, useEffect } from 'react';
import './carousel.css';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img5.jpg';
import img3 from '../../assets/img4.jpg';
import arrow from '../../assets/arrow.png';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    img1,
    img2,
    img3
  ]; 

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 13000); 
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="carousel">
      <div className="label">
        <h3>Welcome to Cook book </h3>
        <p>Delight in life's pinnacle moments with delicious recipes</p>
       <div className='add-recipe'>
        <button className='add-recipe-button'>Add your Recipe</button>
       <div className='arrow-pos'>
        <img className='arrow' src={arrow} alt="arrow" />
       </div>
       <div className='p-content'>
        <p>click here to add 
new recipe</p>
       </div>
       </div>
      </div>
      <button onClick={goToPreviousSlide}>{"<"}</button>
      <div className="slide">
        <img src={slides[currentSlide]} alt='slider-img' />
      </div>
      <button onClick={goToNextSlide}> {">"} </button>
    </div>
  );
}

export default Carousel;
