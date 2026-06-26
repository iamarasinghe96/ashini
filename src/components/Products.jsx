import { products } from '../data/products'
import ProductCard from './ProductCard'

export default function Products() {
  return (
    <section id="tutorials" className="section py-16 sm:py-24">
      <div className="mb-10 text-center">
        <p className="eyebrow">The tutorials</p>
        <h2 className="mt-2 text-3xl font-700 text-ink sm:text-4xl">
          Pick a topper to master
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink/65">
          Each tutorial is a one-time purchase — buy only what you need. Tap a card
          to see the finished topper loop.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
