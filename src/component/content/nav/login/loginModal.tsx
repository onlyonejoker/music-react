import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import type { FormRule } from "antd";
import {
  phoneLogin,
  getQrKey,
  getQrImg,
  emailLogin,
  sendVerCode,
  getCountryCode,
} from "@/request/index";

import { useSelector, useDispatch } from "react-redux";
import { setLoginState, setLoginInfo } from "@/store/loginModules";

import { useRequest } from "@/assets/js/publicHooks";

import "./css/loginModal.css";
const { Option } = Select;

// const [qrImg, setQrImg] = useState();
// useRequest([qrImg, setQrImg], async () => {
//   const keyRes = await getQrKey();
//   const imgRes = await getQrImg(keyRes.unikey);
//   setQrImg(imgRes.qrimg);
// });

interface propsType {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (value: boolean) => void;
}

interface useActiveReturnType {
  active: number;
  hContent: string[];
  title: JSX.Element;
  FormRules: Array<{
    accountRules: FormRule[];
    accountPlaceholder: string;
    passwordRules: FormRule[];
    passwordPlaceholder: string;
  }>;
}

const useActive = (): useActiveReturnType => {
  const [active, setActive] = useState(0);
  const hContent = ["手机号登录", "验证码登录", "邮箱登录", "二维码登录"];
  const activeFn = (activeNum: number, num: number): string => {
    return activeNum === num ? "active" : "";
  };
  const title = (
    <div className="Login_Modal_title">
      <span
        className={activeFn(active, 0)}
        onClick={() => {
          setActive(0);
        }}
      >
        手机登录
      </span>
      <span
        className={activeFn(active, 1)}
        onClick={() => {
          setActive(1);
        }}
      >
        验证码登录
      </span>
      <span
        className={activeFn(active, 2)}
        onClick={() => {
          setActive(2);
        }}
      >
        邮箱登录
      </span>
      <span
        className={activeFn(active, 3)}
        onClick={() => {
          setActive(3);
        }}
      >
        二维码登录
      </span>
    </div>
  );
  const FormRules = [
    {
      accountRules: [
        { required: true, message: "请输入正确的手机号" },
        {
          pattern:
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          message: "手机号格式不对",
        },
      ],
      accountPlaceholder: "请输入账号/手机号",
      passwordRules: [
        { required: true, message: "请输入密码" },
        {
          pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/,
          message: "请输入6-16位的密码，必须包含一个数字和一个字母",
        },
      ],
      passwordPlaceholder: "请输入密码",
    },
    {
      accountRules: [
        { required: true, message: "请输入正确的手机号" },
        {
          pattern:
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          message: "手机号格式不对",
        },
      ],
      accountPlaceholder: "请输入账号/手机号",
      passwordRules: [
        { required: true, message: "请输入密码" },
        {
          pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/,
          message: "请输入6-16位的密码，必须包含一个数字和一个字母",
        },
      ],
      passwordPlaceholder: "请输入短信验证码",
    },
  ];
  return { active, hContent, title, FormRules };
};

const useAsyncPhoneLogin = (form: any, props: propsType): any => {
  const loginStateDispatch = useDispatch();
  const loginInfoDispatch = useDispatch();

  const submit = (): any => {
    (async () => {
      const loginState = await phoneLogin(form.getFieldsValue());
      if (loginState?.loginType === 1) {
        props.setIsLoginModalOpen(false);
        loginStateDispatch(setLoginState(true));
        loginInfoDispatch(setLoginInfo(loginState));
      }
    })();
  };

  return { submit };
};

const useAsyncEmailLogin = (form: any, props: propsType): any => {
  const loginStateDispatch = useDispatch();
  const loginInfoDispatch = useDispatch();

  const submit = (): any => {
    (async () => {
      const loginState = await emailLogin(form.getFieldsValue());
      if (loginState?.loginType === 1) {
        props.setIsLoginModalOpen(false);
        loginStateDispatch(setLoginState(true));
        loginInfoDispatch(setLoginInfo(loginState));
      }
    })();
  };

  return { submit };
};
const useAsyncCountryCode = (isLoginModalOpen: boolean): any => {
  const [countryCode, setCountryCode] = useState([]);

  useEffect(() => {
    (async () => {
      if (countryCode.length > 0 || !isLoginModalOpen) return;
      const { data } = await getCountryCode();
      setCountryCode(data);
    })();
  }, [isLoginModalOpen]);

  console.log(countryCode);
  return countryCode;
};

const LoginModal = (props: propsType): JSX.Element => {
  const { active, hContent, title } = useActive();
  const [form] = Form.useForm();
  const { submit } = useAsyncPhoneLogin(form, props);
  const countryCode = useAsyncCountryCode(props.isLoginModalOpen);
  return (
    <Modal
      title={title}
      open={props.isLoginModalOpen}
      onOk={() => {
        props.setIsLoginModalOpen(false);
      }}
      onCancel={() => {
        props.setIsLoginModalOpen(false);
      }}
      maskClosable={true}
      footer={null}
    >
      <h1 className="Content_title">{hContent[active]}</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        {/* <Form.Item
          label=""
          name="phone"
          rules={[
            { required: true, message: "请输入正确的手机号" },
            {
              pattern:
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
              message: "手机号格式不对",
            },
          ]}
        >
          <Input placeholder="请输入账号/手机号" />
        </Form.Item> */}
        <Form.Item label="">
          <Input.Group compact>
            <Form.Item name={["phone", "code"]} noStyle>
              <Select placeholder="+86">
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["phone", "phone"]}
              noStyle
              rules={[
                { required: true, message: "请输入正确的手机号" },
                {
                  pattern:
                    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                  message: "手机号格式不对",
                },
              ]}
            >
              <Input placeholder="请输入账号/手机号" />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            {
              pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/,
              message: "请输入6-16位的密码，必须包含一个数字和一个字母",
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={submit}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { LoginModal };
