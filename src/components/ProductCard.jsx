import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Rating } from 'primereact/rating'
import { Tag } from 'primereact/tag'

const priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

// Recebe o produto via props e exibe em um Card do PrimeReact
export default function ProductCard({ product, onBuy }) {
  const { title, price, category, description, image, rating } = product

  const header = (
    <div className="bg-white p-3 border-round-top">
      <img alt={title} src={image} className="product-card__image" />
    </div>
  )

  const footer = (
    <div className="flex align-items-center justify-content-between">
      <span className="text-xl font-bold text-primary">{priceFormat.format(price)}</span>
      <Button label="Comprar" icon="pi pi-shopping-cart" size="small" onClick={() => onBuy(product)} />
    </div>
  )

  return (
    <Card
      title={<span className="product-card__title">{title}</span>}
      subTitle={<Tag value={category} severity="info" />}
      header={header}
      footer={footer}
      className="product-card h-full shadow-2"
    >
      <p className="product-card__description m-0 text-700">{description}</p>

      {rating && (
        <div className="flex align-items-center gap-2 mt-3">
          <Rating value={Math.round(rating.rate)} readOnly cancel={false} />
          <small className="text-600">({rating.count})</small>
        </div>
      )}
    </Card>
  )
}
