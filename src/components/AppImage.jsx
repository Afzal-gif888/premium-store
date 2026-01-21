
import React from 'react';

/**
 * Helper to determine the backend API base URL.
 * In a local network dev environment, we need the computer's IP, 
 * not 'localhost', so mobile devices can reach the server.
 */
const getBackendUrl = () => {
  // If the URL is already absolute (Cloudinary), return as is
  // Otherwise, we assume it's a relative path like '/uploads/...'
  const host = window.location.hostname;
  return `http://${host}:5000`; // Port 5000 is default for backend
};

function Image({
  src,
  alt = "Product Image",
  className = "",
  loading = "lazy",
  ...props
}) {
  // Resolve source: if it starts with /uploads, prepend the backend URL
  const resolvedSrc = React.useMemo(() => {
    if (!src) return null;
    if (src.startsWith('/uploads')) {
      return `${getBackendUrl()}${src}`;
    }
    return src;
  }, [src]);

  const handleImageError = (e) => {
    const currentHost = window.location.hostname;
    const originalSrc = e.target.src;

    // Resiliency: If image fails and it points to localhost/127.0.0.1, it's a cross-device access error.
    // Replace with actual IP and try again ONCE.
    if ((originalSrc.includes('localhost') || originalSrc.includes('127.0.0.1')) && !e.target.dataset.retried) {
      const newSrc = originalSrc.replace(/localhost|127\.0\.0\.1/, currentHost);
      console.warn(`[Mobile Fix] Detected localhost image on network access. Redirecting to: ${newSrc}`);

      e.target.dataset.retried = "true";
      e.target.src = newSrc;
      return;
    }

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
      src={resolvedSrc || "https://via.placeholder.com/400x400?text=No+Image"}
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
