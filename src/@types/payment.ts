export type TCryptoCurrency = {
  currency: string;
  networks: string[];
};

export type TSetInvoiceData = {
  uuid: string;
  network: string;
  currency: string;
}

export type TInvoice = {
  uuid: string;
  amount: number;
  amount_usd: number;
  expiration_dt: string;
  currency: string;
  hash: string;
  network: string;
  status: string;
  to_address: string;
  is_active: boolean;
}


