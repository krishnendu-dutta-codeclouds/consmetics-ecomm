import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = ({ children, to, ...props }) => {
  if (to) {
    return (
      <StyledLink to={to} {...props}>
        {children}
      </StyledLink>
    );
  }
  return <StyledButton {...props}>{children}</StyledButton>;
};

const baseStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.small ? '8px 16px' : '12px 24px'};
  border-radius: 4px;
  font-weight: 500;
  font-size: ${props => props.small ? '14px' : '16px'};
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  text-decoration: none;
  text-align: center;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StyledButton = styled.button`
  ${baseStyles}
  background-color: ${props => props.variant === 'outline' ? 'transparent' : '#333'};
  color: ${props => props.variant === 'outline' ? '#333' : 'white'};
  border: ${props => props.variant === 'outline' ? '1px solid #333' : 'none'};

  &:hover:not(:disabled) {
    background-color: ${props => props.variant === 'outline' ? '#f5f5f5' : '#555'};
  }
`;

const StyledLink = styled(Link)`
  ${baseStyles}
  background-color: ${props => props.variant === 'outline' ? 'transparent' : '#333'};
  color: ${props => props.variant === 'outline' ? '#333' : 'white'};
  border: ${props => props.variant === 'outline' ? '1px solid #333' : 'none'};

  &:hover:not(:disabled) {
    background-color: ${props => props.variant === 'outline' ? '#f5f5f5' : '#555'};
  }
`;

export default Button;