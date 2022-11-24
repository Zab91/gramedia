import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Bootstrap
import Table from "react-bootstrap/Table";
import Axios from "axios";

export const TransactionPage = () => {
  const { NIM } = useSelector((state) => state.userSlice.value);

  const url = `http://localhost:2000/transaction/singular/`;

  // Transactions
  const [transaction, setTransaction] = useState();

  const getTransaction = async () => {
    try {
      //   console.log(NIM);
      const newURL = url + NIM;
      //   console.log(newURL);
      const res = await Axios.get(newURL);

      setTransaction(res.data);
        console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div className="container">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Loan</th>
          </tr>
        </thead>
        {transaction?.map((item, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{item.id}</td>
                <td>{item.Books[0]?.Title}</td>
                <td>{item.loan} days</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};
