import { useRef, SyntheticEvent, ReactNode, CSSProperties } from 'react';
import Style from './carousel.module.css';

interface CarouselProps {
  children: ReactNode;
  style?: CSSProperties
}

export default function Carousel({ children, style }: CarouselProps): JSX.Element {
  const carouselRef = useRef<HTMLElement | null>(null);

  const carouselControl = {
    isDragging: false,
    pointA: 0,
    pointB: 0,
    distance: 0,
    scrollLeft: 0,
  }

  function preventDefault(e: SyntheticEvent): void {
    e.nativeEvent instanceof MouseEvent ? e.preventDefault() : null; 
  }

  function handleStart(e: SyntheticEvent) {
    preventDefault(e);
    const event = e.nativeEvent;
    carouselControl.isDragging = true;
    event instanceof MouseEvent ? carouselControl.pointA = event.pageX : 0;
    event instanceof TouchEvent ? carouselControl.pointA = event.touches[0].pageX : 0;
    carouselControl.scrollLeft = carouselRef.current ? carouselRef.current.scrollLeft : 0;
  }

  function handleMove(e: SyntheticEvent) {
    preventDefault(e);
    const event = e.nativeEvent;

    if (!carouselControl.isDragging) return;

    event instanceof MouseEvent ? carouselControl.pointB = event.pageX : 0;
    event instanceof TouchEvent ? carouselControl.pointB = event.touches[0].pageX : 0;
    carouselControl.distance = carouselControl.pointB - carouselControl.pointA;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = carouselControl.scrollLeft - carouselControl.distance;
    }
  }

  function handleEnd(e: SyntheticEvent) {
    preventDefault(e);
    carouselControl.isDragging = false;
  }

  return(
    <section 
      ref={carouselRef}
      className={Style.C_carousel}
      style={style}

      onMouseDown={(e) => handleStart(e)}
      onMouseMove={(e) => handleMove(e)}
      onMouseUp={(e) => handleEnd(e)}
      onMouseLeave={(e) => handleEnd(e)}

      onTouchStart={(e) => handleStart(e)}
      onTouchMove={(e) => handleMove(e)}
      onTouchEnd={(e) => handleEnd(e)}
    >
      { children }
    </section>
  )
}