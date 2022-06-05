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
              <div className="card">
                <div className="card-header">Balance</div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>
                      { userBalance.balance }
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
