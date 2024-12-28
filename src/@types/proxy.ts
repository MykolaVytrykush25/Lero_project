export type TGetProxyGeoParams = {
  provider?: string;
  country_code?: string;
  state?: string;
};

export type TTLValues = {
  [key: string]: number;
};

export type TProxyProtocol = {
  http: {
    host: string;
    port: string[];
  };
  socks5: {
    host: string;
    port: string[];
  };
};

export type TProxyPurchaseInfo = {
  protocols: {
    rotating: TProxyProtocol;
    sticky: TProxyProtocol;
  };
  login: string;
  password: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
  session: string;
  sess_time: string;
  ttl: TTLValues;
  delimiter: string;
};

export type TCountryData = {
  code: string;
  name: string;
};
