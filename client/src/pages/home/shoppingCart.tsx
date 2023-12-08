import React from "react";
import { ItemProps } from "../../components/item";
import { Offcanvas, Stack } from "react-bootstrap";

interface ShoppingCartProps {
  cartItems: ItemProps[] | undefined;
  setCartItems: React.Dispatch<React.SetStateAction<ItemProps[] | undefined>>;
  openCart:()=>void
  closeCart:()=>void
  isOpen:boolean
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({isOpen, openCart, closeCart, cartItems, setCartItems }) => {
    
    const handleRemoveItem = (id: number) => {
        setCartItems(prevItems => (prevItems ? prevItems.filter(item => item.id !== id) : []));
      };
 
    const calculateTotalPrice = () => {
      if (!cartItems){
        return 0
      }
      return cartItems.reduce((total, item) => total + (item.price || 0),0)
    }

    return (
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
        <ul>
         {cartItems?.map(item => (
          <li key={item.id}>{item.name} - ${item.price} <button onClick={() => item.id && handleRemoveItem(item.id)}>X</button>
           </li>        
          ))}
      <div className="ms-auto fw-bold fs-5">
        Total ${calculateTotalPrice().toFixed(2)}
      </div>
      </ul>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    );
  };
export default ShoppingCart;