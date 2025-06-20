import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import Button from '../common/Button';
import { FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const isWished = wishlist.includes(product.id);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(stored);
  }, []);

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    let updated;
    let message;
    if (isWished) {
      updated = wishlist.filter(id => id !== product.id);
      message = 'Removed from wishlist';
    } else {
      updated = [...wishlist, product.id];
      message = 'Added to wishlist';
    }
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setToast(message);
    setTimeout(() => setToast(null), 1500);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setToast('Added to cart');
    setTimeout(() => setToast(null), 1500);
  };

  // Toast in document body, not inside card
  useEffect(() => {
    if (!toast) return;
    const toastDiv = document.createElement('div');
    toastDiv.className = 'global-toast-message';
    toastDiv.textContent = toast;
    document.body.appendChild(toastDiv);
    setTimeout(() => {
      toastDiv.classList.add('hide');
    }, 1200);
    setTimeout(() => {
      document.body.removeChild(toastDiv);
    }, 1500);
    return () => {
      if (toastDiv.parentNode) document.body.removeChild(toastDiv);
    };
  }, [toast]);

  return (
    <Card>
      <ImageContainer>
        <WishlistIcon
          onClick={handleAddToWishlist}
          wished={isWished ? 1 : 0}
          title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FaHeart />
        </WishlistIcon>
        <Image src={product.image} alt={product.title} />
      </ImageContainer>
      <Details>
        <Title>{product.title}</Title>
        <PriceRatingRow>
          <Price>
            {product.offerPrice && product.offerPrice < product.price ? (
              <>
                <RegularPrice>${product.price.toFixed(2)}</RegularPrice>
                <OfferPrice>${product.offerPrice.toFixed(2)}</OfferPrice>
              </>
            ) : (
              <>${product.price.toFixed(2)}</>
            )}
          </Price>
          <RatingLine>
            <StarIcon>★</StarIcon>
            <RatingValue>{product.rating ? product.rating.toFixed(1) : '4.0'}</RatingValue>
          </RatingLine>
        </PriceRatingRow>
        <ButtonRow>
          <ActionButton onClick={handleAddToCart} as="button" type="button">
            Add to Cart
          </ActionButton>
          <ActionButton as={Link} to={`/products/${product.id}`} variant="outline">
            View Product
          </ActionButton>
        </ButtonRow>
      </Details>
      {/* No in-card toast */}
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const WishlistIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${({ wished }) => (wished ? '#e74c3c' : '#bbb')};
  font-size: 22px;
  z-index: 2;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #e74c3c;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceRatingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 2px;
`;

const Price = styled.span`
  font-weight: bold;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RegularPrice = styled.span`
  color: #888;
  text-decoration: line-through;
  font-size: 15px;
`;

const OfferPrice = styled.span`
  color: #e74c3c;
  font-size: 18px;
  font-weight: bold;
`;

const RatingLine = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StarIcon = styled.span`
  color: #ffc107;
  font-size: 15px;
  margin-right: 2px;
`;

const RatingValue = styled.span`
  color: #333;
  font-size: 15px;
  font-weight: 500;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 6px;
`;

const ActionButton = styled(Link).attrs(props => ({
  as: props.as || Link,
}))`
  flex: 1;
  text-align: center;
  padding: 8px 0;
  border-radius: 4px;
  border: 1.5px solid #333;
  background: ${({ variant }) => (variant === 'outline' ? '#fff' : '#333')};
  color: ${({ variant }) => (variant === 'outline' ? '#333' : '#fff')};
  font-size: 14px;
  font-weight: 500;
  transition: background 0.18s, color 0.18s;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background: ${({ variant }) => (variant === 'outline' ? '#333' : '#222')};
    color: #fff;
    text-decoration: none;
  }
`;

// Add global styles for the toast
if (typeof document !== 'undefined' && !document.getElementById('global-toast-style')) {
  const style = document.createElement('style');
  style.id = 'global-toast-style';
  style.innerHTML = `
    .global-toast-message {
      position: fixed;
      top: 300px;
      right: 0;
      transform: translateX(110%);
      background: #222;
      color: #fff;
      padding: 10px 22px;
      border-radius: 6px 0 0 6px;
      font-size: 14px;
      z-index: 2000;
      box-shadow: 0 2px 12px rgba(0,0,0,0.12);
      animation: slideInRight 1.5s forwards;
      pointer-events: none;
    }
    .global-toast-message.hide {
      animation: slideOutRight 0.3s forwards;
    }
    @keyframes slideInRight {
      0% {
        opacity: 0;
        transform: translateX(110%);
      }
      10% {
        opacity: 1;
        transform: translateX(0%);
      }
      90% {
        opacity: 1;
        transform: translateX(0%);
      }
      100% {
        opacity: 1;
        transform: translateX(0%);
      }
    }
    @keyframes slideOutRight {
      0% {
        opacity: 1;
        transform: translateX(0%);
      }
      100% {
        opacity: 0;
        transform: translateX(110%);
      }
    }
  `;
  document.head.appendChild(style);
}

export default ProductCard;