import data from "../data/data.json"

/**
 * Fetches products with a simulated delay.
 */
export async function fetchProducts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    success: true,
    data: data.products,
    total: data.products.length,
  }
}

/**
 * Fetch a single product by ID from a simulated API.
 *
 * This function simulates an API delay using a timeout and then searches
 * for a product with the specified ID in a predefined data set. If the
 * product is found, it returns an object indicating success along with the
 * product data. If not found, it returns an object indicating failure with
 * an error message.
 *
 * @param {string} id - Product ID to fetch
 */
export async function fetchProduct(id) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const product = data.products.find((p) => p.id === id)

  if (!product) {
    return {
      success: false,
      error: "Produit non trouvé",
      data: null,
    }
  }

  return {
    success: true,
    data: product,
  }
}

/**
 * Searches for products based on a query string.
 *
 * This function filters products by checking if the query is included in the product's name,
 * description, or category. It returns an object containing a success flag, the filtered list
 * of products, and the total count of filtered products.
 */
export async function searchProducts(query) {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const filteredProducts = data.products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )

  return {
    success: true,
    data: filteredProducts,
    total: filteredProducts.length,
  }
}
