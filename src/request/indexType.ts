interface timestampType {
  timestamp?: number;
}

interface passwordType {
  password: string;
  md5_password?: string;
}

interface phoneLoginType extends timestampType, passwordType {
  phone: string;
  countrycode?: string;
  captcha?: string;
}

interface emailLoginType extends timestampType, passwordType {
  email: string;
}

export type { timestampType, phoneLoginType, emailLoginType };
