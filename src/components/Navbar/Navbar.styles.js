import styled, { css } from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -2px 10px 0px;
`;

export const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1600px;
  margin: 0 auto;
`;

export const StyledLinkTitle = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;

  @media (max-width: 768px) {
    margin-left: 2rem;
  }

  &:hover {
    color: #bbb;
  }
`;

export const StyledLink = styled(Link)`
  font-size: 1.8rem;

  &:hover {
    color: #bbb;
  }
`;

export const StyledNavLink = styled(NavLink)`
  /* Estilos padrão para o NavLink não ativo */
  font-size: 1.8rem;
  padding: 0.5rem 0rem;
  margin-right: 2rem;

  &.active {
    /* Estilos para o NavLink quando estiver ativo */
    background-color: #1a1a1a;
    color: #fff;
    padding: 1rem;
    border-radius: 1rem;
  }

  &:hover {
    color: #bbb;
  }
`;

export const NavbarListLinks = styled.ul`
  display: flex;
  list-style: none;
  padding: 1.3rem;
  padding-right: 0rem;
  gap: 2rem;

  &.padding {
    padding: 2.7rem;
    padding-right: 0rem;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const NavbarListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarLinks = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarLink = styled.a``;

export const NavbarAccountContainer = styled.div`
  min-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 2rem;
`;

export const NavbarAccountImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5rem;
  margin-right: 1rem;
`;

export const NavbarAccountName = styled.p`
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const NavBarActionsMobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
