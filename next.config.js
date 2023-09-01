/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    const timestamp = new Date().getTime();
    return `build-${timestamp}`;
  },
};

module.exports = nextConfig;
