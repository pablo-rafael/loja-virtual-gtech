import { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Message } from 'primereact/message'
import { Button } from 'primereact/button'
import ProductCard from './ProductCard'
import ProductForm from './ProductForm'
import { createProduct, getProducts } from '../services/api'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0) // muda ao clicar em "Tentar novamente"
  const toast = useRef(null)

  // Busca os produtos na API quando o componente aparece
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')

    getProducts(controller.signal)
      .then((data) => setProducts(data))
      .catch((err) => {
        if (err.code !== 'ERR_CANCELED') {
          setError('Não foi possível carregar os produtos. Verifique a conexão e tente novamente.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [attempt])

  // Adiciona um produto novo no topo da lista
  const handleAdd = async (data) => {
    const newProduct = { ...data, id: Date.now(), rating: { rate: 0, count: 0 } }

    try {
      await createProduct(data) // a Fake Store API simula o POST
      toast.current.show({ severity: 'success', summary: 'Produto adicionado', detail: data.title, life: 3000 })
    } catch {
      toast.current.show({ severity: 'warn', summary: 'Adicionado apenas na tela', detail: 'A API não respondeu ao cadastro.', life: 4000 })
    }

    setProducts((prev) => [newProduct, ...prev])
  }

  const handleBuy = (product) =>
    toast.current.show({ severity: 'info', summary: 'Adicionado ao carrinho', detail: product.title, life: 2500 })

  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <>
      <Toast ref={toast} />

      <ProductForm categories={categories} onAdd={handleAdd} />

      {loading && (
        <div className="flex justify-content-center py-6">
          <ProgressSpinner />
        </div>
      )}

      {error && (
        <div className="flex flex-column align-items-center gap-3 py-5">
          <Message severity="error" text={error} />
          <Button label="Tentar novamente" icon="pi pi-refresh" onClick={() => setAttempt((n) => n + 1)} />
        </div>
      )}

      {!loading && !error && (
        <div className="grid">
          {products.map((product) => (
            <div key={product.id} className="col-12 sm:col-6 lg:col-4 xl:col-3">
              <ProductCard product={product} onBuy={handleBuy} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
