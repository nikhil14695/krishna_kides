// Auto import every image inside studio_photos folder
const modules = import.meta.glob("../assets/studio_photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

// Convert object to array
export const images = Object.values(modules);