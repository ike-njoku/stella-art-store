import { GetFileDTO } from "../shared-interfaces/get-file-dto";
export type isOnSale = 'true' | 'false'
export interface GetProductDto {
  category: string;
  collectionName: string;
  description: string;
  dimensions: string;
  discountPrice: number;
  inspiration: string;
  materials: string;
  name: string;
  price: number;
  quantity: number;
  isOnSale: isOnSale;
  cartQuantity?: number;
  __v: number;
  _id: string;
  files: GetFileDTO[];
}
