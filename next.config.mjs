/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dzwimbvjh/image/upload/**",
      },
      // Poster bài viết video trích khung hình từ /video/upload/….jpg
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dzwimbvjh/video/upload/**",
      },
    ],
  },
};

export default nextConfig;
