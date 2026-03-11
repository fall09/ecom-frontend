const BASE_URL = "http://localhost:8080/api/category";

export async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/getAll`);

  if (!response.ok) {
    throw new Error("Categories could not be fetched");
  }

  return await response.json();
}