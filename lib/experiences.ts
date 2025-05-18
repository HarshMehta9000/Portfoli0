export async function getAllExperiences() {
  const res = await fetch(
    "https://o0spbb2buxzewjsk.public.blob.vercel-storage.com/experience-cHkXcSsYOKt9aHGGSNUm9aE2yCiF2C.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}
