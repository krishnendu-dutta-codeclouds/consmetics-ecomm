import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ProductGrid from '../../components/product/ProductGrid';
import Button from '../../components/common/Button';
import Testimonials from '../../components/common/Testimonials';
import productData from '../../product.json';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products and testimonials from src/product.json
    setProducts(productData.products || []);
    // Gather all testimonials from all products
    const allTestimonials = [];
    (productData.products || []).forEach(product => {
      if (product.testimonials && product.testimonials.length > 0) {
        product.testimonials.forEach(t =>
          allTestimonials.push({
            ...t,
            productId: product.id,
            productTitle: product.title,
            category: product.category,
          })
        );
      }
    });
    setTestimonials(allTestimonials);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Hero>
        <HeroContent>
          <h1>Welcome to ShopEase</h1>
          <p>Discover amazing products at great prices</p>
          <Button to="/products">Shop Now</Button>
        </HeroContent>
      </Hero>
      
      <FeaturedSection>
        <h2>Featured Products</h2>
        <ProductGrid products={products.slice(0, 4)} />
      </FeaturedSection>

      <Testimonials testimonials={testimonials} />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0;
`;

const Hero = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('https://via.placeholder.com/1200x400') center/cover;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 40px;
`;

const HeroContent = styled.div`
  max-width: 600px;
  padding: 0 20px;

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 36px;
    }

    p {
      font-size: 18px;
    }
  }
`;

const FeaturedSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 32px;
  }
`;

export default HomePage;