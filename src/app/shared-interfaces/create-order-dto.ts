import { GetProductDto } from "../shared-services/get-product-dto";

export interface  DeliveryAdddress {
  firstName: string,
  lastName: string,
  emailAddress: string,
  country: string,
  state: string,
  city: string,
  primaryPhoneNumber: string,
  secondaryPhoneNumber?: string,
  address: string
};

export interface CreateOrderDTO {
  transactionReference: string;
  deliveryAddress: DeliveryAdddress;
  products: GetProductDto[]
}
