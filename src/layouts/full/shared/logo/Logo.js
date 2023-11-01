import { Link } from 'react-router-dom';
import logo from 'src/assets/images/logos/logo.png';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  marginTop: '25px',
  width: '100%', 
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img src={logo} alt="Logo" style={{ width: '100%' }} />
    </LinkStyled>
  )
};

export default Logo;
