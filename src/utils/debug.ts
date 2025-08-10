// Debug utility to help with cart issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debugCartResponse = (response: any, context: string = "") => {
  console.log(`=== CART DEBUG ${context} ===`);
  console.log("Full response:", response);
  console.log("Response type:", typeof response);
  console.log("Response keys:", response ? Object.keys(response) : "No keys");

  // Check if response has a data wrapper
  if (response && response.data) {
    console.log("Response.data:", response.data);
    console.log("Response.data type:", typeof response.data);
    console.log(
      "Response.data keys:",
      response.data ? Object.keys(response.data) : "No keys"
    );
  }

  // Check for items
  if (response && response.items) {
    console.log("Items found at root level:", response.items);
    console.log("Items length:", response.items.length);
    console.log("Items type:", typeof response.items);
    console.log("Is items an array?", Array.isArray(response.items));
  }

  if (response && response.data && response.data.items) {
    console.log("Items found in data:", response.data.items);
    console.log("Data.items length:", response.data.items.length);
    console.log("Data.items type:", typeof response.data.items);
    console.log("Is data.items an array?", Array.isArray(response.data.items));
  }

  // Check for cart property
  if (response && response.cart) {
    console.log("Cart found at root level:", response.cart);
    console.log("Cart type:", typeof response.cart);
    if (response.cart.items) {
      console.log("Cart.items:", response.cart.items);
      console.log("Cart.items length:", response.cart.items.length);
    }
  }

  console.log(`=== END CART DEBUG ${context} ===`);
};
