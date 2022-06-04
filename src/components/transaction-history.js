import React, { useState, useEffect } from "react";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";

export function TransactionHistory() {
    const Web3Api = useMoralisWeb3Api();
    const { user } = useMoralis();
    const [transactions, setTransactions] = useState([]);
    const [bscTransactions, setBscTransactions] = useState([]);
    
    const getTx = async () => {
      await Web3Api.account.getTransactions()
      .then(resp => resp)
    }

    const getBscTx = async () => {
        const options = {
          chain: "bsc",
          address: "0x3d6c0e79a1239df0039ec16Cc80f7A343b6C530e",
          order: "desc",
          from_block: "0",
        };
        await Web3Api.account.getTransactions(options)
            .then(resp => resp);
    }
    // getTx().then(tx => setTransactions(tx));
    // getBscTx().then(tx => setBscTransactions(tx));

    useEffect(() => {
        getTx().then(tx => {
            if(!transactions) setTransactions(tx)
        });
        getBscTx().then(tx => {
            if(!bscTransactions) setBscTransactions(tx)
        });
    },[]);
    

    return (
      <>
        <table id="datatablesSimple">
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
          <tfoot>
            <tr>
            <th>Sno</th>
              <th>Block Hash</th>
              <th>Block Number</th>
              <th>From Address</th>
              <th>Value</th>
              <th>Time</th>
            </tr>
          </tfoot>
          <tbody>
            {
                bscTransactions?.result?.map(tx => {
                    <tr key={tx.block_hash}>
                        <td>{tx.block_hash}</td>
                        <td>{tx.block_number}</td>
                        <td>{tx.from_address}</td>
                        <td>{tx.block_timestamp}</td>
                        <td>{tx.value}</td>
                        <td>{tx.block_hash}</td>
                    </tr>
                })
            }
          </tbody>
        </table>
      </>
    );
}