import React, { useEffect } from "react";
const useRequest = <s>(
  [state, setState]: [s, React.Dispatch<React.SetStateAction<s>>],
  callback: () => {},
  condition?: any
): any => {
  useEffect(() => {
    callback();
  }, [condition]);
  useEffect(() => {
    setState(state);
  }, [state]);
};

export { useRequest };
