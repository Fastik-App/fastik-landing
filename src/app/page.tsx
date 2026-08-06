import IndexPage from "@/views/Index";

export default function Page() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/_next/image?url=%2Fimages%2Fhero-light-bg.webp&w=828&q=75"
        fetchPriority="high"
        media="(max-width: 640px)"
      />
      <link
        rel="preload"
        as="image"
        href="/_next/image?url=%2Fimages%2Flight-cut-desktop.webp&w=1200&q=75"
        fetchPriority="high"
        media="(min-width: 641px)"
      />
      <IndexPage />
    </>
  );
}
