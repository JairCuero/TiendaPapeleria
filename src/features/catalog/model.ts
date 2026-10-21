export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  accent: "mint" | "peach" | "lavender" | "sky" | "lemon";
  icon: string;
  tag?: string;
};

export type CartLine = {
  productId: Product["id"];
  quantity: number;
};

export const formatCOP = (amount: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
