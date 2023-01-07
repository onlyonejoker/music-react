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
  activeData: any;
}
// 登录方式数据
const activeDataArr = [
  {
    initialValues: { phone: { code: "+86" } },
    isPhone: true,
    oneFormItemName: ["phone", "phone"],
    oneFormItemRules: [
      { required: true, message: "请输入正确的手机号" },
      {
        pattern:
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        message: "手机号格式不对",
      },
    ],
    oneFormItemPla: "请输入账号/手机号",
    twoFormItemName: "password",
    twoFormItemRules: [
      { required: true, message: "请输入密码" },
      {
        pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{5,16}$/,
        message: "请输入6-16位的密码，必须包含一个数字和一个字母",
      },
    ],
    twoFormItemPla: "请输入密码",
    isHaveBtn: false,
  },
  {
    initialValues: { phone: { code: "+86" } },
    isPhone: true,
    oneFormItemName: ["phone", "phone"],
    oneFormItemRules: [
      { required: true, message: "请输入正确的手机号" },
      {
        pattern:
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        message: "手机号格式不对",
      },
    ],
    oneFormItemPla: "请输入账号/手机号",
    twoFormItemName: "captcha",
    twoFormItemRules: [
      { required: true, message: "请输入验证码" },
      {
        pattern: /^[0-9]{4}$/,
        message: "请输入4位全数字的验证码",
      },
    ],
    twoFormItemPla: "请输入验证码",
    isHaveBtn: true,
  },
  {
    initialValues: {},
    isPhone: false,
    oneFormItemName: "email",
    oneFormItemRules: [
      { required: true, message: "请输入正确的邮箱账号" },
      {
        pattern:
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message: "邮箱账号格式不对",
      },
    ],
    oneFormItemPla: "请输入邮箱账号",
    twoFormItemName: "password",
    twoFormItemRules: [
      { required: true, message: "请输入密码" },
      {
        pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9.]{5,16}$/,
        message: "请输入6-16位的密码，必须包含数字、大小写字母",
      },
    ],
    // (?=.*[])必须包含
    twoFormItemPla: "请输入密码",
    isHaveBtn: false,
  },
  {},
];
// 登录方式
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
  return { active, hContent, title, activeData: activeDataArr[active] };
};
// 查询国家吗
const useAsyncCountryCode = (isLoginModalOpen: boolean): any => {
  const [countryCode, setCountryCode] = useState([]);
  useEffect(() => {
    (async () => {
      if (countryCode.length > 0 || !isLoginModalOpen) return;
      const { data } = await getCountryCode();
      const countryList = (data as any[])?.reduce((arr, item) => {
        arr.push(...item.countryList);
        return arr;
      }, []);
      setCountryCode(countryList);
    })();
  }, [isLoginModalOpen]);
  return countryCode;
};
// 手机登录（验证码与密码）hooks
const useAsyncPhoneLogin = (
  form: any,
  props: propsType,
  active: number
): any => {
  const loginStateDispatch = useDispatch();
  const loginInfoDispatch = useDispatch();
  const PhoneSubmit = (): any => {
    (async () => {
      const { phone, password, captcha } = form.getFieldsValue();
      const params = [
        {
          phone: phone.phone,
          password,
          countrycode: (phone.code as string).replace("+", ""),
        },
        {
          phone: phone.phone,
          captcha,
          countrycode: (phone.code as string).replace("+", ""),
        },
      ];
      const loginState = await phoneLogin(params[active]);
      if (loginState?.loginType === 1) {
        props.setIsLoginModalOpen(false);
        loginStateDispatch(setLoginState(true));
        loginInfoDispatch(setLoginInfo(loginState));
      }
    })();
  };

  return { PhoneSubmit };
};
// 发送验证码
const usePrimaryBtn = (form: any): any => {
  const [countDown, setCountDown] = useState(60);
  const [primaryBtnDis, setPrimaryBtnDis] = useState(false);
  const [primaryBtnText, setPrimaryBtnText] = useState("发送验证码");
  const onSendCode = (): any => {
    const { phone } = form.getFieldsValue();
    const params = {
      phone: phone.phone,
      countrycode: (phone.code as string).replace("+", ""),
    };
    sendVerCode(params);
  };

  return { primaryBtnText, primaryBtnDis, onSendCode };
};
// 邮箱登录
const useAsyncEmailLogin = (form: any, props: propsType): any => {
  const loginStateDispatch = useDispatch();
  const loginInfoDispatch = useDispatch();

  const EmailSubmit = (): any => {
    (async () => {
      try {
        await form.validateFields(["email"]);
        const loginState = await emailLogin(form.getFieldsValue());
        if (loginState?.loginType === 0) {
          props.setIsLoginModalOpen(false);
          loginStateDispatch(setLoginState(true));
          loginInfoDispatch(setLoginInfo(loginState));
        } else {
          console.log(loginState);
        }
      } catch (error) {}
    })();
  };

  return { EmailSubmit };
};

const LoginModal = (props: propsType): JSX.Element => {
  const { active, hContent, title, activeData } = useActive();
  const {
    initialValues,
    isPhone,
    oneFormItemName,
    oneFormItemRules,
    oneFormItemPla,
    twoFormItemName,
    twoFormItemRules,
    twoFormItemPla,
    isHaveBtn,
  } = activeData;
  const [form] = Form.useForm();

  const { PhoneSubmit } = useAsyncPhoneLogin(form, props, active);
  const { EmailSubmit } = useAsyncEmailLogin(form, props);
  const countryCode = useAsyncCountryCode(props.isLoginModalOpen);
  const { primaryBtnText, primaryBtnDis, onSendCode } = usePrimaryBtn(form);
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
        initialValues={initialValues}
        autoComplete="off"
        form={form}
      >
        <Form.Item>
          <Input.Group compact>
            {(isPhone as boolean) && (
              <Form.Item name={["phone", "code"]} noStyle>
                <Select placeholder="+86" optionLabelProp="value">
                  {(countryCode as any[]).map((item) => (
                    <Option value={"+" + item.code} key={item.locale}>
                      {item.zh} +{item.code}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item name={oneFormItemName} noStyle rules={oneFormItemRules}>
              <Input placeholder={oneFormItemPla} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item className="password_box">
          <Form.Item name={twoFormItemName} rules={twoFormItemRules}>
            <Input.Password placeholder={twoFormItemPla} />
          </Form.Item>
          {(isHaveBtn as boolean) && (
            <Button
              type="primary"
              shape="round"
              size={"large"}
              disabled={primaryBtnDis}
              className="primary_btn"
              onClick={onSendCode}
            >
              {primaryBtnText}
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={active === 2 ? EmailSubmit : PhoneSubmit}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { LoginModal };
