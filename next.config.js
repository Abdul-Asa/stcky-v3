/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sign-in",
        has: [{ type: "cookie", key: "token" }],
        destination: "/space",
        permanent: false,
      },
      {
        source: "/space",
        missing: [{ type: "cookie", key: "token" }],
        destination: "/sign-in",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
