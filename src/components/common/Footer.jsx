import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Section>
          <Title>ShopEase</Title>
          <Text>Your one-stop shop for all your needs</Text>
        </Section>
        <Section>
          <Title>Quick Links</Title>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/account">My Account</Link>
        </Section>
        <Section>
          <Title>Contact</Title>
          <Text>Email: contact@shopease.com</Text>
          <Text>Phone: +1 234 567 890</Text>
        </Section>
      </FooterContent>
      <Copyright>© {new Date().getFullYear()} ShopEase. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: #333;
  color: white;
  padding: 40px 20px 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Text = styled.p`
  margin: 0;
  color: #ccc;
  font-size: 14px;
`;

const Link = styled.a`
  color: #ccc;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: white;
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #444;
  color: #aaa;
  font-size: 14px;
`;

export default Footer;