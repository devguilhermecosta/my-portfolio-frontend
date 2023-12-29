import { useRef, SyntheticEvent, ReactNode, CSSProperties, useState } from 'react';
import Style from './carousel.module.css';
import { carouselControl } from './conf';

interface CarouselProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function Carousel({ children, style }: CarouselProps): JSX.Element {
  const carouselRef = useRef<HTMLElement | null>(null);

  /**
   * this is not used directly for the carousel to work, 
   * but only to update the page with each scroll of the carousel. 
   * Without this, some properties will not work.
  **/
  const [isDrag, setIsDrag] = useState(false);

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

    setIsDrag(true);
  }

  function handleEnd(e: SyntheticEvent) {
    preventDefault(e);
    carouselControl.isDragging = false;
    setIsDrag(false);
  }

  return(
    <section
      ref={carouselRef}
      className={Style.C_carousel}
      style={{
        ...style,
        cursor: isDrag ? 'grab' : 'auto',
      }}

      onMouseDown={(e) => handleStart(e)}
      onMouseMove={(e) => handleMove(e)}
      onMouseUp={(e) => handleEnd(e)}
      onMouseLeave={(e) => handleEnd(e)}

      onTouchStart={(e) => handleStart(e)}
      onTouchMove={(e) => handleMove(e)}
      onTouchEnd={(e) => handleEnd(e)}
    >
      <div style={{
        pointerEvents: isDrag ? 'none' : 'all',
      }}>
        { children }
      </div>
    </section>
  )
}