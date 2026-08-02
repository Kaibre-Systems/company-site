import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * The pre-redesign site exposed /services, /team, /careers and /projects.
   * Those pages are gone, but the URLs may be linked externally (LinkedIn,
   * email signatures), so each one is permanently redirected to the closest
   * surviving destination rather than 404ing.
   *
   * /securepulse is the same story for a different reason: the product is
   * spelled SecurePuls, and the route was corrected to match. Anything already
   * pointing at the misspelling — links, the search index, a signature — keeps
   * working.
   */
  async redirects() {
    return [
      { source: "/services", destination: "/work", permanent: true },
      { source: "/services/:path*", destination: "/work", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/team", destination: "/", permanent: true },
      { source: "/careers", destination: "/contact", permanent: true },
      { source: "/securepulse", destination: "/securepuls", permanent: true },
    ];
  },
};

export default nextConfig;
