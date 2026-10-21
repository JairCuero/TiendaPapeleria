# OFFIEXPRESS

E-commerce de papelería y oficina. Este proyecto nació como entrega académica de Fundamentos Web y está evolucionando hacia una tienda personal, escalable y documentada.

## Estado actual

La rama `modernizacion-mvp` inicia la modernización con Next.js, React y TypeScript. Incluye una portada de tienda responsiva, catálogo de productos de ejemplo, búsqueda, filtros por categoría y un carrito persistente en el navegador.

El checkout, las cuentas, el inventario en base de datos y el procesamiento de pagos aún no están implementados. El carrito actual es una demostración del flujo de interfaz y no debe utilizarse para transacciones reales.

## Tecnologías

- Next.js App Router
- React y TypeScript
- CSS con variables de diseño y estilos adaptables
- `localStorage` para persistir el carrito de demostración

## Ejecutar en desarrollo

Requisitos: Node.js 20.9 o superior y npm.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Comandos disponibles:

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Estructura

```text
src/
  app/                       # rutas, layout y estilos globales
  features/
    catalog/                 # modelo y datos de producto
    storefront/              # catálogo y experiencia de tienda
```

Las páginas y áreas de negocio se mantienen separadas para que catálogo, carrito y checkout puedan crecer como funcionalidades independientes. La siguiente etapa es definir el modelo persistente de productos e inventario, y después terminar el flujo de carrito y checkout de demostración.

## Proyecto original

Los archivos HTML, CSS y JavaScript de la entrega académica se conservan en el historial y en sus carpetas originales durante la migración gradual.
