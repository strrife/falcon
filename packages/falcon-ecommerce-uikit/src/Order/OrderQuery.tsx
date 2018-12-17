export type Order = {
  incrementId: string;
  createdAt?: string;
  customerFirstname?: string;
  customerLastname?: string;
  status?: string; // list of possible statuses?
  grandTotal?: string;
  orderCurrencyCode?: string;
  items: OrderItem[];
};

export type OrderItem = {
  itemId: number;
  name: string;
};
