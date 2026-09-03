import { ObjectItem } from "@/types/object";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchObjects(): Promise<ObjectItem[]> {
  const res = await fetch(`${API_URL}/objects`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch objects");
  return res.json();
}

export async function likeObject(id: string): Promise<ObjectItem> {
  const res = await fetch(`${API_URL}/objects/${id}/like`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to like object");
  return res.json();
}

export async function createObject(formData: FormData): Promise<ObjectItem> {
  const res = await fetch(`${API_URL}/objects`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create object");
  return res.json();
}

export async function deleteObject(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/objects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete object");
}