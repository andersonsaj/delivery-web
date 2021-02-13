import { useState } from "react";

const OrderSummary: React.FC = () => {
    const [val, setVal] = useState('');

    return (
        <div className="order-summsry-container">
            <div className="order-summary-content">
                <input id="num" type="number"
                value={val}
                onChange={e => e.target.value.length <= 6 ? setVal(e.target.value) 
                    : setVal((e.target.value.substring(0, e.target.value.length -1)))}
                />
            </div>
        </div>
    )
}

export default OrderSummary;