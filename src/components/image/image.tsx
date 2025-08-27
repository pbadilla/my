import React, { useState, useEffect } from "react";

import "@styles/image.scss";

import defaultImage from '@images/default_image.jpg';

const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";



interface LazyImageProps {
  src: string;
  alt?: string;
  isMovie?: boolean;
}

const Image: React.FC<LazyImageProps> = ({ src, alt, isMovie }) => {
  const [imageSrc, setImageSrc] = useState<string>(placeHolder);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const onLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.classList.add("loaded");
  };

  const onError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.classList.add("has-error");
    setImageSrc(defaultImage); 
  };

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              !didCancel &&
              (entry.intersectionRatio > 0 || entry.isIntersecting)
            ) {
              setImageSrc(src);
              observer?.unobserve(imageRef);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "75%",
        }
      );
      observer.observe(imageRef);
    } else {
      setImageSrc(src);
    }

    return () => {
      didCancel = true;

      if (observer) {
        observer.unobserve(imageRef!);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    <img
      className={`lazyImage ${isMovie ? "movie-image" : ""}`}
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default Image;
