import React, { useRef, useEffect, useState } from 'react';

const useOnScreen = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      },
      {
        rootMargin,
        threshold: 0.15,
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};

const ImageTextReveal = ({ image = '', title = '', text = '', reverse = false }) => {
  const ref = useRef();
  const visible = useOnScreen(ref, '-100px');

  return (
    <section ref={ref} className={`reveal-section ${visible ? 'visible' : ''}`}>
      <div className={`reveal-inner ${reverse ? 'reverse' : ''}`}>
        <div className="reveal-media">
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="reveal-content">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-base" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            {text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImageTextReveal;
