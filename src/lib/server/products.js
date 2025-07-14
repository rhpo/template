import data from "../data/data.json"

/**
 * Fetch all products
 * @returns {Promise<Array>} Array of products
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
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
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
 * Search products by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Filtered products
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
