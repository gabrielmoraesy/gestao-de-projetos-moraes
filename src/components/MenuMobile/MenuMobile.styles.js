import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const Container = styled.section`
  position: absolute;
  backdrop-filter: blur(3px);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(17, 18, 17, 0.4);

  opacity: 0;
  pointer-events: none;
  transform: translateY(50px);

  transition: 0.5s;

  > svg {
    position: absolute;
    top: 3rem;
    right: 3rem;
    transform: rotate(45deg);
    transition: 0.7s;
    color: #fff;
  }

  &.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0px);

    > svg {
      transform: rotate(0deg);
    }

    nav {
      transform: scale(1);
    }
  }
`;

export const MenuMobileNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  transform: scale(0.7);
  transition: 0.7s;
`;

export const MenuMobileLink = styled(Link)`
  font-size: 3rem;
  color: #fff;
`;

export const MenuMobileAccountContainer = styled.div`
  min-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuMobileAccountImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 2rem;
  margin-right: 1rem;
`;

export const MenuMobileAccountName = styled.p`
  font-size: 2.4rem;
  font-weight: bold;
`;
