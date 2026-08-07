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
   * /securepuls is the naming history: the site shipped for a period under
   * that spelling before the founders confirmed the official name is
   * SecurePulse and the routes were corrected to match. Everything that ever
   * pointed at the old slugs — shared links, the search index, signatures —
   * keeps working, including the bilingual Indonesia pair.
   */
  async redirects() {
    return [
      { source: "/services", destination: "/work", permanent: true },
      { source: "/services/:path*", destination: "/work", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/team", destination: "/", permanent: true },
      { source: "/careers", destination: "/contact", permanent: true },
      { source: "/securepuls", destination: "/securepulse", permanent: true },
      { source: "/securepuls/:path*", destination: "/securepulse/:path*", permanent: true },
      { source: "/id/securepuls/:path*", destination: "/id/securepulse/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
