import type { MetadataRoute } from "next";

// Function to generate the manifest for the application
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "e-Procurement",
    short_name: "Procurement",
    theme_color: "#16a34a",
    background_color: "#000000",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "images/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "images/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "images/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "images/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "images/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "images/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "images/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "images/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
