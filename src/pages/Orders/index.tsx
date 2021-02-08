import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductList from "./ProductsList";
import StepsHeader from "./StepsHeader"
import './styles.css';
import { Product } from "./types";

const Orders: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        api.get('/products')
        .then(response => setProducts(response.data))
        .catch(error => console.error(error));
    },[]);
      
    return (
        <div className="orders-container">
            <StepsHeader />
            <ProductList products={products} />
        </div>
    )
}

export default Orders;