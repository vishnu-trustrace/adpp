import React, { useState, useEffect } from "react";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import Spinner from "./spinner";

export function TransactionHistory() {
  const Web3Api = useMoralisWeb3Api();
  const { user } = useMoralis();
  const [bscTransactions, setBscTransactions] = useState(null);

  useEffect(() => {
    const options = {
      chain: "polygon",
      address: user.attributes.address,
      order: "desc",
      from_block: "0",
    };

    Web3Api.account.getTransactions(options).then((resp) => {
      // console.log(resp);
      setBscTransactions(resp);
    });
  }, [Web3Api.account, user.attributes.account]);

  return (
    <>
      {!bscTransactions && <Spinner />}
      {bscTransactions && (
        <div className="row">
          <div className="container">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Block Hash</th>
                    <th>Block Number</th>
                    <th>From Address</th>
                    <th>Value</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {bscTransactions.result.map((tx, index) => {
                    return (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{tx.block_hash}</td>
                        <td>{tx.block_number}</td>
                        <td>{tx.from_address}</td>
                        <td>{tx.value}</td>
                        <td>{tx.block_timestamp}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
