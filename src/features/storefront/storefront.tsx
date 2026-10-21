"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, products } from "@/features/catalog/products";
import { formatCOP, type CartLine } from "@/features/catalog/model";

const CART_KEY = "offiexpress.cart.v1";

export function Storefront() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      if (saved) setCart(JSON.parse(saved) as CartLine[]);
    } catch {
      window.localStorage.removeItem(CART_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    return products.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLocaleLowerCase("es").includes(normalizedQuery) ||
        product.description.toLocaleLowerCase("es").includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const itemCount = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cart.reduce((total, line) => {
    const product = products.find((item) => item.id === line.productId);
    return total + (product?.price ?? 0) * line.quantity;
  }, 0);

  function addToCart(productId: string) {
    setCart((current) => {
      const existing = current.find((line) => line.productId === productId);
      if (existing) {
        return current.map((line) =>
          line.productId === productId
            ? { ...line, quantity: Math.min(line.quantity + 1, products.find((product) => product.id === productId)?.stock ?? 1) }
            : line,
        );
      }
      return [...current, { productId, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function changeQuantity(productId: string, delta: number) {
    setCart((current) =>
      current
        .map((line) => line.productId === productId
          ? { ...line, quantity: line.quantity + delta }
          : line)
        .filter((line) => line.quantity > 0),
    );
  }

  return (
    <main>
      <div className="announcement">Envío gratis en pedidos desde $80.000 <span>·</span> Hecho para tus ideas</div>
      <header className="site-header">
        <a className="brand" href="/" aria-label="OFFIEXPRESS, inicio">
          <span className="brand-mark">o</span>
          <span>OFFI<span className="brand-light">EXPRESS</span><small>PAPELERÍA Y OFICINA</small></span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#catalogo">Catálogo</a>
          <a href="#favoritos">Favoritos</a>
          <a href="#nosotros">Nuestra tienda</a>
        </nav>
        <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Abrir carrito, ${itemCount} productos`}>
          <span className="cart-icon" aria-hidden="true">▱</span><span className="cart-label">Mi carrito</span><span className="cart-count">{itemCount}</span>
        </button>
      </header>

      <section className="hero" id="nosotros">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> TODO LO QUE IMAGINAS, EMPIEZA AQUÍ</p>
          <h1>Ideas grandes.<br /><em>Útiles perfectos.</em></h1>
          <p className="hero-description">Papelería bonita y funcional para estudiar, crear y trabajar a tu manera.</p>
          <a href="#catalogo" className="primary-link">Explorar productos <span aria-hidden="true">↘</span></a>
          <div className="hero-note"><span>✳</span> Un pequeño impulso para tus grandes ideas.</div>
        </div>
        <div className="hero-art" aria-label="Selección de productos de papelería" role="img">
          <div className="art-card art-card-back"><span>✎</span><small>ideas<br />en marcha</small></div>
          <div className="art-card art-card-main"><span className="art-sun">✳</span><span className="art-pencil">✏️</span><strong>HAZ<br />ESPACIO<br />PARA CREAR</strong></div>
          <div className="art-card art-card-front"><span>✂</span><small>crear es<br />probar</small></div>
          <span className="hero-spark spark-one">✳</span><span className="hero-spark spark-two">✦</span>
        </div>
      </section>

      <section className="catalog-section" id="catalogo">
        <div className="section-heading">
          <div><p className="eyebrow">ENCUENTRA TU INSPIRACIÓN</p><h2>Pequeñas cosas,<br /><em>grandes comienzos.</em></h2></div>
          <p className="section-aside">Elegidos para acompañarte<br />en cada proyecto.</p>
        </div>
        <div className="catalog-tools">
          <div className="category-list" aria-label="Filtrar por categoría">
            {categories.map((item) => (
              <button key={item} className={category === item ? "category-chip active" : "category-chip"} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>
            ))}
          </div>
          <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Buscar productos</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en la tienda" /></label>
        </div>

        {filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <article className="product-card" key={product.id} id={index === 0 ? "favoritos" : undefined}>
                <div className={`product-art ${product.accent}`}>
                  {product.tag && <span className="product-tag">{product.tag}</span>}
                  <span className="product-illustration" aria-hidden="true">{product.icon}</span>
                  <span className="product-art-caption">{product.category}</span>
                </div>
                <div className="product-info">
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-buy"><strong>{formatCOP(product.price)}</strong><button onClick={() => addToCart(product.id)} aria-label={`Agregar ${product.name} al carrito`}>+</button></div>
                </div>
              </article>
            ))}
          </div>
        ) : <p className="empty-results">No encontramos productos con esa búsqueda. Prueba otra palabra o categoría.</p>}
      </section>

      <section className="newsletter">
        <span className="newsletter-star" aria-hidden="true">✳</span><div><p className="eyebrow">UN POCO DE INSPIRACIÓN</p><h2>Haz que tus ideas <em>tomen forma.</em></h2></div><a href="#catalogo" className="newsletter-link">Ver el catálogo <span aria-hidden="true">↗</span></a>
      </section>
      <footer className="site-footer"><a className="brand footer-brand" href="/"><span className="brand-mark">o</span><span>OFFI<span className="brand-light">EXPRESS</span><small>PAPELERÍA Y OFICINA</small></span></a><p>Un espacio para todo lo que quieres crear.</p><span>© 2026 OFFIEXPRESS</span></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
        <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}>
          <div className="drawer-heading"><div><p className="eyebrow">TU SELECCIÓN</p><h2 id="cart-title">Mi carrito <span>({itemCount})</span></h2></div><button className="close-drawer" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">×</button></div>
          {!cart.length ? <div className="cart-empty"><span aria-hidden="true">🛍️</span><h3>Tu carrito está esperando.</h3><p>Encuentra algo que te inspire y aquí lo guardamos.</p><button className="primary-link" onClick={() => setCartOpen(false)}>Seguir explorando</button></div> : <>
            <div className="cart-lines">{cart.map((line) => {
              const product = products.find((item) => item.id === line.productId);
              if (!product) return null;
              return <div className="cart-line" key={line.productId}><span className={`cart-line-art ${product.accent}`}>{product.icon}</span><div className="cart-line-copy"><strong>{product.name}</strong><span>{formatCOP(product.price)}</span><div className="quantity-control"><button onClick={() => changeQuantity(product.id, -1)} aria-label={`Quitar una unidad de ${product.name}`}>−</button><span>{line.quantity}</span><button onClick={() => changeQuantity(product.id, 1)} disabled={line.quantity >= product.stock} aria-label={`Agregar una unidad de ${product.name}`}>+</button></div></div><strong className="line-total">{formatCOP(product.price * line.quantity)}</strong></div>;
            })}</div>
            <div className="cart-summary"><div><span>Subtotal</span><strong>{formatCOP(subtotal)}</strong></div><p>Envío calculado en el siguiente paso.</p><button className="checkout-button" disabled>Continuar al pago <span aria-hidden="true">→</span></button><small>El checkout seguro será parte de la siguiente etapa.</small></div>
          </>}
        </aside>
      </div>}
    </main>
  );
}
