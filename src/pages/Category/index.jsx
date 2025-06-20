import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductGrid from '../../components/product/ProductGrid';
import Testimonials from '../../components/common/Testimonials';
import { useEffect, useState } from 'react';
import productData from '../../product.json';

const categoryNames = {
  makeup: 'Makeup',
  haircare: 'Haircare',
  fragrance: 'Fragrance',
  skincare: 'Skincare',
};

const categoryBanners = {
  makeup: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  haircare: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
  fragrance: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  skincare: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
};

const CategoryPage = () => {
  const { category } = useParams();
  const categoryKey = category?.toLowerCase();
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use src/product.json for products and testimonials
    const allProducts = productData.products || [];
    const filteredProducts = allProducts.filter(
      p => p.category && p.category.toLowerCase() === categoryKey
    );
    setProducts(filteredProducts);

    // Gather testimonials for this category from products
    const categoryTestimonials = [];
    filteredProducts.forEach(product => {
      if (product.testimonials && product.testimonials.length > 0) {
        product.testimonials.forEach(t =>
          categoryTestimonials.push({
            ...t,
            productId: product.id,
            productTitle: product.title,
            category: product.category,
          })
        );
      }
    });
    setTestimonials(categoryTestimonials);
    setLoading(false);
  }, [categoryKey]);

  const displayName = categoryNames[categoryKey] || category;
  const bannerUrl = categoryBanners[categoryKey];

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      {bannerUrl && (
        <Banner style={{ backgroundImage: `url(${bannerUrl})` }}>
          <BannerOverlay>
            <BannerTitle>{displayName}</BannerTitle>
          </BannerOverlay>
        </Banner>
      )}
      <h1 style={{ marginTop: bannerUrl ? 40 : 0 }}>{displayName} Products</h1>
      {products.length === 0 ? (
        <EmptyMsg>No products found in this category.</EmptyMsg>
      ) : (
        <ProductGrid products={products} />
      )}
      <Testimonials testimonials={testimonials} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
`;

const Banner = styled.div`
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
`;

const BannerOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 100%);
  display: flex;
  align-items: flex-end;
  padding: 30px;
`;

const BannerTitle = styled.h1`
  color: #fff;
  font-size: 38px;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
`;

const EmptyMsg = styled.div`
  text-align: center;
  color: #888;
  margin: 40px 0;
`;

export default CategoryPage;
