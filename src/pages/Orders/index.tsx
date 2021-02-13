import { useEffect, useState } from "react";
import { api } from "../../services/api";
import OrderLocation from "./OrderLocation";
import ProductList from "./ProductsList";
import StepsHeader from "./StepsHeader"
import './styles.css';
import { OrderLocationData, Product } from "./types";

const Orders: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
    
    useEffect(() => {
        api.get('/products')
        .then(response => setProducts(response.data))
        .catch(error => console.error(error));
    },[]);
      
    return (
        <div className="orders-container">
            <StepsHeader />
            <ProductList products={products} />
            <OrderLocation onChangeLocation={location => setOrderLocation(location)}/>
        </div>
    )
}

export default Orders;