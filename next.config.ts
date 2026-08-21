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
   * SecurePulse and the routes were corrected to match.
   *
   * The Indonesia pair is product history rather than spelling history. What
   * now ships as Tuntas — its own product, its own identity, its own market —
   * was published as a SecurePulse deployment at /securepulse/indonesia and
   * /id/securepulse/indonesia. Both paths were live, indexed and sent to
   * prospects, so both redirect permanently onto the Tuntas routes, in the
   * matching language. The /securepuls spellings of them fold in through the
   * wildcard below, which resolves to the corrected path and is redirected
   * again from here — two hops for a URL nobody has used since, and one for
   * every link that actually exists.
   */
  async redirects() {
    return [
      { source: "/services", destination: "/work", permanent: true },
      { source: "/services/:path*", destination: "/work", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/team", destination: "/", permanent: true },
      { source: "/careers", destination: "/contact", permanent: true },
      { source: "/securepulse/indonesia", destination: "/tuntas", permanent: true },
      {
        source: "/id/securepulse/indonesia",
        destination: "/id/tuntas",
        permanent: true,
      },
      { source: "/securepuls", destination: "/securepulse", permanent: true },
      { source: "/securepuls/:path*", destination: "/securepulse/:path*", permanent: true },
      { source: "/id/securepuls/:path*", destination: "/id/securepulse/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
