// /lib/projects.ts

export async function getAllProjects() {
  const res = await fetch(
    "https://o0spbb2buxzewjsk.public.blob.vercel-storage.com/projects-TfdZQWYgTXnkl4DR2epsjO6kRcqF9q.json", 
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}
