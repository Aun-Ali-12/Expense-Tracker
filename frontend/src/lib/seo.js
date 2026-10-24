export function buildMetadata({ title, description, path = "/", noindex = false }) {
  if (noindex) {
    return {
      title,
      description,
      robots: { index: false, follow: false },
    };
  }

  const ogTitle = `${title} | ExTrack`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: "ExTrack",
      type: "website",
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: "ExTrack expense tracker" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/og-image.png"],
    },
  };
}