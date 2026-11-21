import ProductList from './components/ProductList'

export default function App() {
  return (
    <div className="min-h-screen surface-ground">
      <header className="surface-0 shadow-2 px-4 py-3 flex align-items-center gap-3">
        <i className="pi pi-shopping-bag text-primary text-3xl" />
        <h1 className="m-0 text-2xl font-semibold text-900">Loja Virtual</h1>
      </header>

      <main className="p-3 md:p-5">
        <ProductList />
      </main>

      <footer className="text-center text-600 text-sm pb-4">
        Dados fornecidos pela Fake Store API
      </footer>
    </div>
  )
}
