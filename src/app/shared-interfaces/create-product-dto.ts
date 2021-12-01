export interface CreateProductDTO {
  category?: string
  collectionName?: string
  description?: string
  dimensions: string
  discountPrice?: number
  inspiration?: string
  materials: string
  name: string
  price: number
  quantity: number | string,
  files: FileList
}
