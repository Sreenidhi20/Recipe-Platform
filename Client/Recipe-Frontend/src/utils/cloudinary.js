/**
 * Optimize Cloudinary image URLs with transformations
 * Adds automatic quality, format, and width optimization
 */
export function optimizeImage(url, width = 400) {
  if (!url || !url.includes("cloudinary")) return url;

  // Insert transformation into Cloudinary URL
  // w_X = width, q_auto = auto quality, f_auto = auto format (WebP for modern browsers)
  return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
}
