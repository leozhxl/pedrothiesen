/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Imagens otimizadas pelo next/image. Adicione aqui domínios externos
  // (ex.: CDN ou Instagram) caso as fotos não fiquem em /public.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default nextConfig;
