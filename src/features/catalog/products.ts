import type { Product } from "./model";

export const products: Product[] = [
  { id: "P001", name: "Agenda diaria", category: "Organización", description: "Dale espacio a tus planes y haz que cada día cuente.", price: 12000, stock: 40, accent: "lavender", icon: "📔", tag: "Favorito" },
  { id: "P002", name: "Cartulina de colores", category: "Papelería", description: "Colores vivos para proyectos, maquetas y nuevas ideas.", price: 5000, stock: 80, accent: "peach", icon: "🎨" },
  { id: "P003", name: "Pizarrón blanco", category: "Oficina", description: "Un espacio amplio para compartir ideas y organizar proyectos.", price: 53000, stock: 10, accent: "sky", icon: "▤", tag: "Para equipos" },
  { id: "P004", name: "Tijeras soft touch", category: "Oficina", description: "Corte preciso y cómodo para el uso de todos los días.", price: 2500, stock: 60, accent: "mint", icon: "✂️" },
  { id: "P005", name: "Grapadora de escritorio", category: "Oficina", description: "Mantén tus documentos juntos y tu escritorio en orden.", price: 5500, stock: 45, accent: "lemon", icon: "📎" },
  { id: "P006", name: "Carpeta organizadora", category: "Organización", description: "Lleva tus documentos importantes protegidos y a la mano.", price: 1200, stock: 120, accent: "sky", icon: "🗂️", tag: "Desde $1.200" },
  { id: "P007", name: "Notas adhesivas", category: "Papelería", description: "Pequeños recordatorios para que ninguna idea se quede atrás.", price: 1300, stock: 90, accent: "lemon", icon: "🗒️" },
  { id: "P008", name: "Regla transparente 30 cm", category: "Medición", description: "Medidas claras para trazos limpios y precisos.", price: 3200, stock: 50, accent: "mint", icon: "📏" },
  { id: "P009", name: "Marcador permanente", category: "Escritura", description: "Trazo intenso que se queda donde lo necesitas.", price: 3400, stock: 75, accent: "peach", icon: "🖊️" },
  { id: "P010", name: "Bloc de notas", category: "Papelería", description: "Cien hojas para apuntes, listas y pensamientos rápidos.", price: 3900, stock: 110, accent: "lavender", icon: "📒" },
  { id: "P011", name: "Juego de escuadras", category: "Medición", description: "Herramientas esenciales para geometría y dibujo técnico.", price: 6500, stock: 30, accent: "sky", icon: "📐" },
  { id: "P012", name: "Bolígrafo azul", category: "Escritura", description: "Escritura suave para apuntes, listas y grandes ideas.", price: 1200, stock: 150, accent: "mint", icon: "🖋️", tag: "Esencial" },
];

export const categories = ["Todos", "Papelería", "Escritura", "Organización", "Oficina", "Medición"];
