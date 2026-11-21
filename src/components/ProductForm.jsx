import { useState } from 'react'
import { Panel } from 'primereact/panel'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'

// Imagem usada quando o campo "imagem" fica vazio
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#e9ecef"/><text x="50%" y="50%" fill="#6c757d" font-family="sans-serif" font-size="20" text-anchor="middle">Sem imagem</text></svg>'
  )

const emptyForm = { title: '', price: null, category: '', description: '', image: '' }

// Formulário para adicionar um novo produto.
// onAdd(produto) é uma função recebida via props (definida no ProductList).
export default function ProductForm({ categories = [], onAdd }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [collapsed, setCollapsed] = useState(true)

  const setField = (field) => (value) => setForm((f) => ({ ...f, [field]: value }))

  const validate = () => {
    const found = {}
    if (!form.title.trim()) found.title = 'Informe o nome do produto.'
    if (!form.price || form.price <= 0) found.price = 'Informe um preço maior que zero.'
    if (!form.category.trim()) found.category = 'Escolha ou digite uma categoria.'
    return found
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) return

    setSaving(true)
    await onAdd({
      title: form.title.trim(),
      price: form.price,
      category: form.category.trim(),
      description: form.description.trim() || 'Sem descrição.',
      image: form.image.trim() || PLACEHOLDER,
    })
    setSaving(false)
    setForm(emptyForm)
  }

  return (
    <Panel
      header="Adicionar novo produto"
      toggleable
      collapsed={collapsed}
      onToggle={(e) => setCollapsed(e.value)}
      className="mb-4"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="formgrid grid p-fluid">
          <div className="field col-12 md:col-6">
            <label htmlFor="title">Nome</label>
            <InputText id="title" value={form.title} onChange={(e) => setField('title')(e.target.value)} className={errors.title ? 'p-invalid' : ''} />
            {errors.title && <small className="p-error">{errors.title}</small>}
          </div>

          <div className="field col-12 md:col-3">
            <label htmlFor="price">Preço</label>
            <InputNumber inputId="price" value={form.price} onValueChange={(e) => setField('price')(e.value)} mode="currency" currency="USD" locale="en-US" className={errors.price ? 'p-invalid' : ''} />
            {errors.price && <small className="p-error">{errors.price}</small>}
          </div>

          <div className="field col-12 md:col-3">
            <label htmlFor="category">Categoria</label>
            <Dropdown inputId="category" value={form.category} options={categories} onChange={(e) => setField('category')(e.value)} editable placeholder="Escolha ou digite" className={errors.category ? 'p-invalid' : ''} />
            {errors.category && <small className="p-error">{errors.category}</small>}
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="image">URL da imagem (opcional)</label>
            <InputText id="image" value={form.image} onChange={(e) => setField('image')(e.target.value)} placeholder="https://..." />
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="description">Descrição</label>
            <InputTextarea id="description" rows={2} autoResize value={form.description} onChange={(e) => setField('description')(e.target.value)} />
          </div>
        </div>

        <Button type="submit" label="Adicionar produto" icon="pi pi-plus" loading={saving} />
      </form>
    </Panel>
  )
}
