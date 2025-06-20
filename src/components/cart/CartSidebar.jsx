import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../../redux/slices/cartSlice';
import  Button  from '../common/Button';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { items, isCartOpen } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <CartContainer
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween' }}
        >
          <CartHeader>
            <h3>Your Cart ({items.length})</h3>
            <CloseButton onClick={() => dispatch(toggleCart())}>×</CloseButton>
          </CartHeader>
          
          <CartItems>
            {items.length === 0 ? (
              <EmptyCart>Your cart is empty</EmptyCart>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => dispatch(removeFromCart(item.id))}
                  onQuantityChange={(quantity) => 
                    dispatch(updateQuantity({ id: item.id, quantity }))
                  }
                />
              ))
            )}
          </CartItems>
          
          <CartFooter>
            <Total>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </Total>
            <Button 
              fullWidth 
              onClick={() => {
                dispatch(toggleCart());
                navigate('/checkout');
              }}
              disabled={items.length === 0}
            >
              Checkout
            </Button>
          </CartFooter>
        </CartContainer>
      )}
    </AnimatePresence>
  );
};

const CartContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 20px 0;
`;

const EmptyCart = styled.p`
  text-align: center;
  color: #666;
  margin-top: 50px;
`;

const CartFooter = styled.div`
  border-top: 1px solid #eee;
  padding-top: 15px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: bold;
`;

export default CartSidebar;