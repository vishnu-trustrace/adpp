import { useWeb3Transfer, useMoralis } from "react-moralis";

export default function Transfer() {

    useWeb3Transfer({
        type: "native",
        amount: useMoralis.Moralis.Units.MATIC("0.1"),
        receiver: "0xd66BB755dfF5f33f4453544D36Ff9D8446C2f117"
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err))



    return (
        <>
        <div className="container">
            <div className="col-md-6">
            <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" id="address" placeholder="Enter the address" />
            </div>
            <div className="form-group mt-20">
                <button type="button" className="btn btn-large btn-primary">
                    Transfer
                </button>
            </div>
            </div>
        </div>
        </>
    );
}