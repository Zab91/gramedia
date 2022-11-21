import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export const DetailPage = () => {
  const params = useParams();

  const [detail, setDetail] = useState();

  const url = `http://localhost:2000/book/detail/`;

  const getDetails = async () => {
    try {
      const newURL = url + params.id;
      const res = await Axios.get(newURL);
      //   console.log(res.data);
      setDetail(res.data);
    //   console.log(detail);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>{detail?.title}</div>
      {/* <div>test</div> */}
    </div>
  );
};
