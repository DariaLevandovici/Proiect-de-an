

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}


export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
}
