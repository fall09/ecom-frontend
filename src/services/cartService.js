const CART_ITEM_BASE_URL = "http://localhost:8080/api/cart-item";
const ORDER_BASE_URL = "http://localhost:8080/api/order";

export async function addToCart(cartId, productId, quantity) {
  const response = await fetch(`${CART_ITEM_BASE_URL}/addToCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId,
      productId,
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error("Add to cart failed");
  }

  return await response.json();
}

export async function getCartItems(cartId) {
  const response = await fetch(`${CART_ITEM_BASE_URL}/getByCartId/${cartId}`);

  if (!response.ok) {
    throw new Error("Cart items could not be fetched");
  }

  return await response.json();
}

export async function checkout(cartId) {
  const response = await fetch(`${ORDER_BASE_URL}/checkout?id=${cartId}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Checkout failed");
  }

  return await response.json();
}