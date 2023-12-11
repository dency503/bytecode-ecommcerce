import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

const ImageLoader = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const onLoad = () => {
    setLoaded(true);
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      )}

      <Skeleton width={'100%'} height={'100%'} duration={2} style={{ display: loading ? 'block' : 'none' }} />

      <img
        alt={alt || ''}
        className={`${className || ''} ${loaded ? 'is-img-loaded' : 'is-img-loading'}`}
        onLoad={onLoad}
        src={src}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </>
  );
};

ImageLoader.defaultProps = {
  className: 'image-loader',
};

ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ImageLoader;
