import React, { useEffect, useState } from 'react';

import { animated, useSpring, config } from 'react-spring';
import { useSwipeable } from 'react-swipeable';

import './Carousel.scss';

type CarouselProps = {
  width: number;
  delay: number;
  slides: {
    text: string;
    image: string;
  }[];
};

const Carousel: React.FC<CarouselProps> = ({ width, delay, slides }) => {
  const [autoplay, setAutoplay] = useState(true);
  const [slide, setSlideState] = useState(0);
  const spring = useSpring({ left: -slide * width, config: config.slow });

  useEffect(() => {
    if (!autoplay)
      return;

    const interval = setInterval(() => setSlideState(s => (s + 1) % slides.length), delay);
    return () => clearInterval(interval);
  }, [autoplay]);

  const setSlide = (param: React.SetStateAction<number>) => {
    setSlideState(param);
    setAutoplay(false);
  };

  const prevSlide = () => setSlide(s => (s - 1 + slides.length) % slides.length);
  const nextSlide = () => setSlide(s => (s + 1) % slides.length);

  const swipeHandler = useSwipeable({
    onSwipedRight: prevSlide,
    onSwipedLeft: nextSlide,
  });

  return (
    <div className="carousel" style={{ width }} {...swipeHandler}>

      <svg viewBox="0 0 32 32" className="prev-slide" onClick={prevSlide}>
        <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z" fill="currentColor" />
      </svg>

      <div className="slides-container">
        <animated.div className="slider" style={spring}>
          { slides.map(({ text, image }, n) => (
            <div key={n} className="slide" style={{ width }}>

              <div className="slide-text">
                <strong>{ text }</strong>
              </div>

              <div className="slide-image">
                <img src={image} />
              </div>

            </div>
          )) }
        </animated.div>
      </div>

      <svg viewBox="0 0 32 32" className="next-slide"  onClick={nextSlide}>
        <path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z" fill="currentColor" />
      </svg>

      <div className="carousel-dots">
        { slides.map((_, n) => (
          <svg key={n} className="carousel-dot" width={16} height={16} version="1.1">
            <circle className={slide === n ? 'active' : ''} cx={8} cy={8} r={6} onClick={() => setSlide(n)} />
          </svg>
        )) }
      </div>

    </div>
  );
};

const CarouselContainer: React.FC<Omit<CarouselProps, 'width'>> = (props) => {
  const [width, setWidth] = useState<number>();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref && !width) {
      setWidth(ref.clientWidth);
    }
  }, [ref, width]);

  useEffect(() => {
    const listener = () => {
      setWidth(undefined);
    };

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [ref]);

  return (
    <div ref={setRef}>
      {width ? <Carousel width={width} {...props} /> : <div className="carousel" />}
    </div>
  );
};

export default CarouselContainer;
