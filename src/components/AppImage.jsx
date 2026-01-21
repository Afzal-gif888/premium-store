
import React from 'react';

function Image({
  src,
  alt = "Product Image",
  className = "",
  loading = "lazy",
  ...props
}) {
  const handleImageError = (e) => {
    // Stage 1: Try local fallback
    if (e.target.src !== "/assets/images/no_image.png") {
      e.target.src = "/assets/images/no_image.png";
    } else {
      // Stage 2: Try remote placeholder if local fails
      e.target.src = "https://via.placeholder.com/400x400?text=Image+Unavailable";
    }
    // Prevent infinite loops
    e.target.onerror = null;
  };

  return (
    <img
      src={src || "https://via.placeholder.com/400x400?text=No+Image"}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleImageError}
      style={{ objectFit: 'cover', ...props.style }}
      {...props}
    />
  );
}

export default Image;
