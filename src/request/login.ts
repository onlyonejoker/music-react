import initAxios from "./axios";
import { setParams } from "./indexPublicFunction";
import type {
  phoneLoginType,
  emailLoginType,
  timestampType,
} from "./indexType";

// 手机号登录

const phoneLogin = async (params: phoneLoginType): Promise<any> => {
  return await initAxios({
    url: "/login/cellphone",
    method: "post",
    data: setParams<phoneLoginType>(params),
  });
};

// 邮箱登录
const emailLogin = async (params: emailLoginType): Promise<any> => {
  params.timestamp = new Date().getTime();
  return await initAxios({
    url: "/login",
    method: "post",
    data: setParams<emailLoginType>(params),
  });
};

// 二维码登录
// 获取二维码Key
const getQrKey = async (): Promise<any> => {
  const { data } = await initAxios({
    url: "/login/qr/key",
    method: "post",
    data: setParams<timestampType>({}),
  });
  return data;
};

// 获取二维码图片
const getQrImg = async (params: string): Promise<any> => {
  const { data } = await initAxios({
    url: "/login/qr/create",
    method: "post",
    data: { key: params, qrimg: true },
  });
  return data;
};

export { phoneLogin, emailLogin, getQrKey, getQrImg };
