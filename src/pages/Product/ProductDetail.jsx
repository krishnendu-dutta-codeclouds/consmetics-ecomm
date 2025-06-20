import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import Button from '../../components/common/Button';
import productData from '../../product.json';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find product by id from productData
    const found = (productData.products || []).find(
      p => String(p.id) === String(id)
    );
    setProduct(found || null);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <ProductDetailContainer>
      <ProductImageContainer>
        <BackButton type="button" onClick={() => navigate(-1)}>
          ← Back
        </BackButton>
        <ProductImage src={product.image} alt={product.title} />
      </ProductImageContainer>
      <ProductInfo>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductCategory>{product.category}</ProductCategory>
        <ProductRating>
          <Star>★</Star>
          <RatingValue>{product.rating ? product.rating.toFixed(1) : '4.0'}</RatingValue>
        </ProductRating>
        <ProductPrice>
          {product.offerPrice && product.offerPrice < product.price ? (
            <>
              <RegularPrice>${product.price.toFixed(2)}</RegularPrice>
              <OfferPrice>${product.offerPrice.toFixed(2)}</OfferPrice>
            </>
          ) : (
            <>${product.price.toFixed(2)}</>
          )}
        </ProductPrice>
        <ProductDescription>
          {/* You can add a description field in product.json if needed */}
          This is a detailed description of the product.
        </ProductDescription>
        <QuantityControl>
          <QuantityButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</QuantityButton>
          <QuantityInput 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
          <QuantityButton onClick={() => setQuantity(quantity + 1)}>+</QuantityButton>
        </QuantityControl>
        <Button onClick={handleAddToCart} fullWidth tooltip="Add to Cart">
          Add to Cart
        </Button>
      </ProductInfo>
    </ProductDetailContainer>
  );
};

const ProductDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

const ProductImageContainer = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductTitle = styled.h1`
  font-size: 28px;
  margin: 0;
`;

const ProductCategory = styled.span`
  color: #666;
  text-transform: capitalize;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Star = styled.span`
  color: #ffc107;
  font-size: 18px;
`;

const RatingValue = styled.span`
  color: #333;
  font-size: 16px;
  font-weight: 500;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RegularPrice = styled.span`
  color: #888;
  text-decoration: line-through;
  font-size: 18px;
`;

const OfferPrice = styled.span`
  color: #e74c3c;
  font-size: 24px;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  line-height: 1.6;
  color: #333;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const BackButton = styled.button`
  position: absolute;
  top: -18px;
  left: -18px;
  background: #fff;
  border: 1px solid #eee;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  padding: 7px 18px 7px 10px;
  border-radius: 22px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 10;
  display: flex;
  align-items: center;
  transition: color 0.18s, border 0.18s, background 0.18s;
  &:hover {
    color: #e74c3c;
    border-color: #e74c3c;
    background: #fff7f5;
  }
`;

export default ProductDetail;