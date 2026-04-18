export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: string; // JSON array string from backend e.g. '["egg","bacon"]'
  dietary: string;     // JSON array string from backend e.g. '["vegan"]'
}

/** DTO for create/update — same fields minus id */
export interface ProductFormDto {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: string; // JSON array string
  dietary: string;     // JSON array string
}
