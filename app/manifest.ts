import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jambayang Singye",
    short_name: "Jambayang",
    description:
      "AI-automated websites and tools for Bhutanese businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#C9A84C",
  };
}
