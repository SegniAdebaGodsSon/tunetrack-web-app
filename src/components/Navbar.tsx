import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

const NavbarContainer = styled.nav`
  padding: 10px;
  font-family: ${(props) => props.theme.fonts.heading};
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 1em;
`;

const ListItem = styled.li`
  display: inline-block;
`;

const NavLinkStyled = styled(NavLink)`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: bold; 
  color: ${(props) => props.theme.colors.primary};
  }
`;

const Logo = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20%;
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <List>
        <ListItem>
          <NavLinkStyled to="/">
            <Logo src="/logo.jpg" alt="logo" />
          </NavLinkStyled>
        </ListItem>
        <ListItem>
          <NavLinkStyled to="/">
            Home
          </NavLinkStyled>
        </ListItem>
        <ListItem>
          <NavLinkStyled to="/song/create">
            Create Song
          </NavLinkStyled>
        </ListItem>
        <ListItem>
          <NavLinkStyled to="/statistics">
            Statistics
          </NavLinkStyled>
        </ListItem>
      </List>
    </NavbarContainer>
  );
};

export default Navbar;
