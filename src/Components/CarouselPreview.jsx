import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselPreview = ({ images = [] }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="my-8 container mx-auto px-4">
      <Carousel>
        {images.map((src, idx) => (
          <Carousel.Item key={idx} interval={3500}>
            <img
              className="d-block w-100"
              src={src}
              alt={`slide-${idx}`}
              style={{ maxHeight: 500, objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselPreview;
