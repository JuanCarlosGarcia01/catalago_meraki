import React, { useMemo, useState } from "react";
import {
  Search,
  UserRound,
  ShoppingBag,
  Heart,
  Package,
  CreditCard,
  Sparkles,
  MessageCircle,
  X,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { products, categories } from "./data/products";

const WHATSAPP_NUMBER = "543482333052"; // <-- CAMBIÁ ESTE NÚMERO

const formatPrice = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);

function App() {
  const [category, setCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "Todos" || product.category === category;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

 const sendToWhatsApp = (product) => {
  const image = product.images?.[0] || product.image;
  const imageUrl = `${window.location.origin}${image}`;

  const message = `Hola 👋

Quiero consultar por este producto:
*${product.name}*

Precio: ${formatPrice(product.price)}
Categoría: ${product.category}

📷 Ver imagen:
${imageUrl}

¿Está disponible?`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
};
   
  const openProduct = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  return (
    <div className="app">
      <div className="topbar">
        <span>🚚 Envíos a toda Argentina</span>
        <span>💳 Todos los medios de pago</span>
      </div>

      <header className="navbar">
        <a href="#inicio" className="brand" aria-label="Ir al inicio">
          <span className="brand-main">MERAKI</span>
          <span className="brand-sub">CREACIONES</span>
        </a>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#productos" onClick={() => setMenuOpen(false)}>Tienda</a>
          <a href="#categorias" onClick={() => setMenuOpen(false)}>Categorías</a>
          <a href="#sobre-mi" onClick={() => setMenuOpen(false)}>Sobre mí</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>

        <div className="nav-icons">
          <button
            className="icon-button"
            onClick={() => document.getElementById("search-input")?.focus()}
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
          <button className="icon-button" aria-label="Usuario">
            <UserRound size={20} />
          </button>
          <button className="icon-button cart-button" aria-label="Carrito">
            <ShoppingBag size={20} />
            <span className="cart-badge">0</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <p className="eyebrow">BIENVENIDOS A ♡</p>
            <h1>
              MERAKI
              <span>Creaciones ♡</span>
            </h1>

            <h2>Regalos y souvenirs personalizados</h2>
            <p className="hero-description">
              Creamos detalles únicos para celebrar, regalar y recordar momentos especiales.
            </p>

            <div className="hero-categories">
              <span>🕯️ Velas</span>
              <span>✨ Resina</span>
              <span>🤍 Yeso</span>
              <span>🎁 Kits y souvenirs</span>
            </div>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#productos">
                Ver productos
              </a>
              <a
                className="btn btn-secondary"
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hola 👋 Quiero hacer una consulta sobre los productos de Meraki Creaciones."
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                Hacer mi pedido
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-card hero-card-main">
              <img src="/placeholder-vela.svg" alt="" />
            </div>
            <div className="hero-card hero-card-small card-heart">
              <img src="/placeholder-corazon.svg" alt="" />
            </div>
            <div className="hero-card hero-card-small card-resin">
              <img src="/placeholder-resina.svg" alt="" />
            </div>
          </div>
        </section>

        <section className="benefits">
          <article>
            <Sparkles />
            <div>
              <strong>Personalizados</strong>
              <span>Creamos cada detalle a tu gusto</span>
            </div>
          </article>

          <article>
            <Heart />
            <div>
              <strong>Hechos con amor</strong>
              <span>Dedicación y cuidado en cada creación</span>
            </div>
          </article>

          <article>
            <Package />
            <div>
              <strong>Envíos a toda Argentina</strong>
              <span>Llegamos a donde estés</span>
            </div>
          </article>

          <article>
            <CreditCard />
            <div>
              <strong>Todos los medios de pago</strong>
              <span>Compra fácil, rápida y segura</span>
            </div>
          </article>
        </section>

        <section className="catalog-section" id="productos">
          <div className="section-heading">
            <p>Nuestro catálogo</p>
            <h2>Productos destacados ♡</h2>
            <span>
              Elegí el producto que te guste y consultalo directamente por WhatsApp.
            </span>
          </div>

          <div className="catalog-controls" id="categorias">
            <div className="search-box">
              <Search size={18} />
              <input
                id="search-input"
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="category-buttons">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "category active" : "category"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="products-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <button
                  className="product-image"
                  onClick={() => openProduct(product)}
                  aria-label={`Ver ${product.name}`}
                >
                  <img src={product.images?.[0] || product.image} alt={product.name} />
                </button>

                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <div className="product-bottom">
                    <strong>{formatPrice(product.price)}</strong>
                    <button
                      className="whatsapp-button"
                      onClick={() => sendToWhatsApp(product)}
                    >
                      <MessageCircle size={17} />
                      Pedir
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="empty-state">
              No encontramos productos con esa búsqueda.
            </div>
          )}
        </section>

        <section className="about" id="sobre-mi">
          <div>
            <p className="eyebrow">SOBRE MERAKI</p>
            <h2>Detalles hechos para momentos especiales</h2>
            <p>
              Este espacio puede usarse para contar quién está detrás de Meraki,
              cómo empezó el emprendimiento y qué hace especiales a sus productos.
            </p>
          </div>
        </section>
      </main>

      <footer id="contacto">
        <div>
          <span className="brand-main">MERAKI</span>
          <span className="brand-sub">CREACIONES</span>
        </div>
        <p>Catálogo online · Pedidos y consultas por WhatsApp</p>
      </footer>

      {selectedProduct && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProduct(null);
          }}
        >
          <div className="product-modal" role="dialog" aria-modal="true">
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar"
            >
              <X size={22} />
            </button>

            <div className="modal-gallery">
  <div className="modal-image">
    <img
      src={
        selectedProduct.images?.[currentImageIndex] ||
        selectedProduct.image
      }
      alt={`${selectedProduct.name} ${currentImageIndex + 1}`}
    />

    {selectedProduct.images?.length > 1 && (
      <>
        <button
          className="gallery-arrow gallery-arrow-left"
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === 0
                ? selectedProduct.images.length - 1
                : prev - 1
            )
          }
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          className="gallery-arrow gallery-arrow-right"
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === selectedProduct.images.length - 1
                ? 0
                : prev + 1
            )
          }
          aria-label="Imagen siguiente"
        >
          <ChevronRight size={26} />
        </button>

        <span className="image-counter">
          {currentImageIndex + 1}/{selectedProduct.images.length}
        </span>
      </>
    )}
  </div>

  {selectedProduct.images?.length > 1 && (
    <div className="gallery-thumbnails">
      {selectedProduct.images.map((image, index) => (
        <button
          key={image}
          className={
            currentImageIndex === index
              ? "gallery-thumbnail active"
              : "gallery-thumbnail"
          }
          onClick={() => setCurrentImageIndex(index)}
        >
          <img
            src={image}
            alt={`${selectedProduct.name} ${index + 1}`}
          />
        </button>
      ))}
    </div>
  )}
</div>

            <div className="modal-content">
              <span className="product-category">{selectedProduct.category}</span>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <strong>{formatPrice(selectedProduct.price)}</strong>

              <button
                className="modal-whatsapp"
                onClick={() => sendToWhatsApp(selectedProduct)}
              >
                <MessageCircle size={19} />
                Pedir por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
