import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from 'react-router-dom';

export default function Transfer() {

    const { Moralis } = useMoralis();
    const [tx,setTx] = useState('');
    const [receiver,setReceiver] = useState('');
    const navigate = useNavigate();

    const transfer = async () => {
        await Moralis.transfer({
            type: "native",
            amount: Moralis.Units.ETH(tx),
            receiver: receiver
        })
        .then(resp => {
            if(!resp) alert("Something wrong. Please login again.");
            navigate('/balance');
        })
        .catch(err => alert("Something wrong. Please login again."))
        
    }

    return (
        <>
        <div className="container">
            <div className="col-md-6">
            <div className="form-group">
                <label>Address</label>
                <input 
                    value={receiver}
                    onChange={e => setReceiver(e.target.value)}
                    type="text" className="form-control" id="address" placeholder="Enter the address" />
            </div>
            <div className="form-group">
                <label>Unit</label>
                <input 
                    value={tx}
                    onChange={e => setTx(e.target.value)}
                    type="text" className="form-control" id="unit" placeholder="Enter the unit" />
            </div>
            <div className="form-group mt-20">
                <button 
                    onClick={transfer}
                    type="button" className="btn btn-large btn-primary">
                    Transfer
                </button>
            </div>
            </div>
        </div>
        </>
    );
}