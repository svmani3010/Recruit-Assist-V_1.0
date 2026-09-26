/**
 * A helper function to safely load images from the public folder
 * across different router paths in Vite.
 */
export const getImageUrl = (imagePath) => {
  // This removes the slash if you accidentally type "/image.png" instead of "image.png"
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
