import { useState, useEffect, createElement } from "react";

export default function AsyncDataGetter({
  dataId,
  getDataFunc,
  property,
  component,
  attribute,
}) {
  const [data, setData] = useState();
  useEffect(() => {
    try {
      getDataFunc(dataId).then((res) => {
        setData(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, [dataId, getDataFunc]);

  let elem;
  if (data) {
    elem = createElement(
      component,
      attribute ? attribute : null,
      data.data[property]
    );
  }
  return elem ? elem : "";
}
