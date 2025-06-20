import styled from 'styled-components';
import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { useState } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Logo to="/">ShopEase</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <CategoryDropdown
          tabIndex={0}
          onMouseEnter={() => setCatDropdownOpen(true)}
          onMouseLeave={() => setCatDropdownOpen(false)}
          onFocus={() => setCatDropdownOpen(true)}
          onBlur={e => {
            // Only close if focus moves outside the dropdown
            if (!e.currentTarget.contains(e.relatedTarget)) setCatDropdownOpen(false);
          }}
        >
          <NavLink as="span" aria-haspopup="true" aria-expanded={catDropdownOpen}>Categories</NavLink>
          <CategoryMenu $open={catDropdownOpen}>
            <CategoryMenuItem to="/category/makeup">Makeup</CategoryMenuItem>
            <CategoryMenuItem to="/category/haircare">Haircare</CategoryMenuItem>
            <CategoryMenuItem to="/category/fragrance">Fragrance</CategoryMenuItem>
            <CategoryMenuItem to="/category/skincare">Skincare</CategoryMenuItem>
          </CategoryMenu>
        </CategoryDropdown>
        <NavLink to="/contact">Contact</NavLink>
      </Nav>
      <Icons>
        <UserDropdown
          tabIndex={0}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
          onFocus={() => setDropdownOpen(true)}
          onBlur={e => {
            if (!e.currentTarget.contains(e.relatedTarget)) setDropdownOpen(false);
          }}
        >
          <UserIconBtn
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            tabIndex={-1}
          >
            <FaUser />
            {isAuthenticated && user?.firstName && (
              <UserName>{user.firstName}</UserName>
            )}
          </UserIconBtn>
          <DropdownMenu $open={dropdownOpen}>
            {!isAuthenticated ? (
              <>
                <DropdownItem to="/login">Login</DropdownItem>
                <DropdownItem to="/register">Register</DropdownItem>
              </>
            ) : (
              <>
                <DropdownItem to="/account">My Account</DropdownItem>
                <DropdownButton onClick={handleLogout}>Logout</DropdownButton>
              </>
            )}
          </DropdownMenu>
        </UserDropdown>
        <WishlistButton as={Link} to="/wishlist" aria-label="Wishlist">
          <FaHeart />
        </WishlistButton>
        <CartButton onClick={() => dispatch(toggleCart())}>
          <FaShoppingCart />
          {items.length > 0 && <CartCount>{items.length}</CartCount>}
        </CartButton>
      </Icons>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #666;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  outline: none;
`;

const UserIconBtn = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #666;
  }
`;

const UserName = styled.span`
  margin-left: 8px;
  font-weight: 500;
  color: #333;
  font-size: 15px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background: white;
  border: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  min-width: 150px;
  z-index: 20;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  padding: 8px 0;
  animation: ${({ $open }) => ($open ? 'fadeInMenu 0.18s' : 'none')};

  @keyframes fadeInMenu {
    from { opacity: 0; transform: translateY(10px);}
    to { opacity: 1; transform: translateY(0);}
  }
`;

const DropdownItem = styled(Link)`
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  font-size: 15px;
  background: none;
  border: none;
  text-align: left;

  &:hover {
    background: #f5f5f5;
    color: #111;
  }
`;

const DropdownButton = styled.button`
  padding: 10px 20px;
  color: #333;
  background: none;
  border: none;
  font-size: 15px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
    color: #111;
  }
`;

const CategoryDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer; /* Show pointer on hover */
`;

const CategoryMenu = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  background: white;
  border: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  min-width: 160px;
  z-index: 20;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  padding: 8px 0;
  animation: ${({ $open }) => ($open ? 'fadeInMenu 0.18s' : 'none')};

  @keyframes fadeInMenu {
    from { opacity: 0; transform: translateY(10px);}
    to { opacity: 1; transform: translateY(0);}
  }
`;

const CategoryMenuItem = styled(Link)`
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  font-size: 15px;
  background: none;
  border: none;
  text-align: left;
  transition: background 0.15s, color 0.15s;
  cursor: pointer; /* Show pointer on hover */

  &:hover, &:focus {
    background: #f5f5f5;
    color: #e74c3c;
    outline: none;
  }
`;

const WishlistButton = styled(Link)`
  background: none;
  border: none;
  font-size: 18px;
  color: #e74c3c;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 2px;

  &:hover {
    color: #c0392b;
  }
`;

const CartButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  position: relative;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #666;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export default Header;