export default function YouTube({
  youTubeId,
  alt,
}: {
  youTubeId: string;
  alt?: string;
}) {
  return (
    <div
      className="youtube-mdx-embed"
      style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}
    >
      <iframe
        title={alt ?? `youTube-${youTubeId}`}
        src={`https://www.youtube.com/embed/${youTubeId}`}
        loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </div>
  );
}
