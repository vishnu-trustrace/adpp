import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import Spinner from "./spinner";

export default function Balance() {
  const Web3Api = useMoralisWeb3Api();
  const [userBalance, setUserBalance] = useState(null);

  useEffect(() => {
    Web3Api.account.getNativeBalance({ chain: "polygon" }).then((resp) => {
      setUserBalance(resp);
    });
  }, [Web3Api.account]);
  return (
    <>
      {!userBalance && <Spinner />}
      {userBalance && (
        <div className="row">
          <div className="container">
            <div className="flex-content-center">
              <div className="jumbotron">
                <h3>Balance</h3>
                <p>
                  { userBalance.balance }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
