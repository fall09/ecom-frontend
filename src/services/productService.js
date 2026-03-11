const BASE_URL = "http://localhost:8080/api/product";

export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/getAll`);

  if (!response.ok) {
    throw new Error("Products could not be fetched");
  }

  return await response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/getById?id=${id}`);

  if (!response.ok) {
    throw new Error("Product could not be fetched");
  }

  return await response.json();
}