import axios from 'axios'

// Instância do Axios apontando para a Fake Store API
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
})

// GET /products  -> lista de produtos
export async function getProducts(signal) {
  const response = await api.get('/products', { signal })
  return response.data
}

// POST /products -> a Fake Store API simula a criação, mas não salva de verdade
export async function createProduct(product) {
  const response = await api.post('/products', product)
  return response.data
}
