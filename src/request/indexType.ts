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

interface verificationCodeType extends timestampType {
  phone: string;
  countrycode?: string;
}

interface emailLoginType extends timestampType, passwordType {
  email: string;
}

export type {
  timestampType,
  phoneLoginType,
  emailLoginType,
  verificationCodeType,
};
