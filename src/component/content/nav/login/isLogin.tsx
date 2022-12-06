import React, { useState } from "react";
import { getQrKey, getQrImg } from "@/request/index";
import { useRequest } from "@/assets/js/publicHooks";

const IsLogin = (): JSX.Element => {
  const [qrImg, setQrImg] = useState();
  let [flag, setFlag] = useState(0);

  useRequest([qrImg, setQrImg], async () => {
    const keyRes = await getQrKey();
    const imgRes = await getQrImg(keyRes.unikey);
    setQrImg(imgRes.qrimg);
  });

  return <div className="Is_Login" onClick={() => setFlag(flag++)}></div>;
};

export { IsLogin };
