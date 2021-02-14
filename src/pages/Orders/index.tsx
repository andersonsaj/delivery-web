import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import { api } from '../../services/api';
import { checkIsSelected } from './helpers';
import OrderLocation from './OrderLocation';
import OrderSummary from './OrderSummary';
import ProductList from './ProductsList';
import StepsHeader from './StepsHeader';
import './styles.css';
import { OrderLocationData, Product } from './types';

const Orders: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

  useEffect(() => {
    api
      .get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const totalPrice = selectedProducts.reduce(
    (total: number, product: Product) => {
      return (total += product.price);
    },
    0,
  );

  const handleSelectProduct = useCallback(
    (product: Product) => {
      const isAlreadySelected = checkIsSelected(selectedProducts, product);

      if (isAlreadySelected) {
        const selected = selectedProducts.filter(
          item => item.id !== product.id,
        );
        setSelectedProducts(selected);
      } else {
        setSelectedProducts(previous => [...previous, product]);
      }
    },
    [selectedProducts],
  );

  const handleSubmit = useCallback(() => {
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...orderLocation,
      products: productsIds,
    };

    api
      .post('/orders', payload)
      .then(response => {
        toast.error(`Pedido enviado com sucesso! Nº ${response.data.id}`);
        setSelectedProducts([]);
      })
      .catch(() => {
        toast.warning('Erro ao enviar pedido');
      });
  }, [orderLocation, selectedProducts]);

  return (
    <>
      <div className="orders-container">
        <StepsHeader />
        <ProductList
          products={products}
          onSelectProduct={handleSelectProduct}
          selectedProducts={selectedProducts}
        />
        <OrderLocation
          onChangeLocation={location => setOrderLocation(location)}
        />
        <OrderSummary
          amount={selectedProducts.length}
          totalPrice={totalPrice}
          onSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </>
  );
};

export default Orders;
