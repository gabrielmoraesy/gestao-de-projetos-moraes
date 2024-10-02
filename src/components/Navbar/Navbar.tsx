import {
  NavbarContainer,
  NavbarContent,
  StyledLinkTitle,
  StyledLink,
  StyledNavLink,
  NavbarListContainer,
  NavbarListLinks,
  NavbarLinks,
  NavbarLink,
  NavbarAccountContainer,
  NavbarAccountImage,
  NavbarAccountName,
} from "./Navbar.styles";

import { useUser } from "../../contexts/userContext";
import { useAuth } from "../../hooks/useAuth";
import { List } from "phosphor-react";

import { ThemeToggle } from "../../contexts/themeContext";

// Context
import { useTheme } from "../../contexts/themeContext";

interface NavbarProps {
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({ setMenuIsVisible }: NavbarProps) => {
  const { isDarkMode } = useTheme();
  const { signOutWithGoogle } = useAuth();
  const { user } = useUser();

  return (
    <NavbarContainer className={isDarkMode ? "darkNavBar" : ""}>
      <NavbarContent>
        <StyledLinkTitle to="/">Gestão de Projetos</StyledLinkTitle>

        <NavbarListContainer className="menu-mobile">
          <List
            size={32}
            onClick={() => setMenuIsVisible(true)}
            className={
              isDarkMode ? "darkIcon menuMobileVisible" : "menuMobileVisible"
            }
          />
          <NavbarListLinks className={!user ? "padding" : ""}>
            <NavbarLinks>
              {user && (
                <NavbarLink>
                  <StyledLink to="/account">
                    <NavbarAccountContainer>
                      <NavbarAccountImage
                        src={user ? user.photoURL || "" : ""}
                      ></NavbarAccountImage>
                      <NavbarAccountName>{user?.displayName}</NavbarAccountName>
                    </NavbarAccountContainer>
                  </StyledLink>
                </NavbarLink>
              )}

              <NavbarLink>
                <StyledNavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "&.active" : "")}
                >
                  Projetos
                </StyledNavLink>
              </NavbarLink>

              {user && (
                <NavbarLink>
                  <StyledNavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? "&.active" : "")}
                  >
                    Meus Projetos
                  </StyledNavLink>
                </NavbarLink>
              )}

              {user && (
                <NavbarLink>
                  <StyledNavLink
                    to="/projects/create"
                    className={({ isActive }) => (isActive ? "&.active" : "")}
                  >
                    Criar projeto
                  </StyledNavLink>
                </NavbarLink>
              )}

              {!user && (
                <NavbarLink>
                  <StyledNavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "&.active" : "")}
                  >
                    Entrar
                  </StyledNavLink>
                </NavbarLink>
              )}

              <NavbarLink>
                <StyledNavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "&.active" : "")}
                >
                  Sobre
                </StyledNavLink>
              </NavbarLink>

              {user && (
                <NavbarLink>
                  <StyledLink
                    to="/"
                    onClick={() => signOutWithGoogle()}
                    className="margin"
                  >
                    Sair
                  </StyledLink>
                </NavbarLink>
              )}
            </NavbarLinks>
          </NavbarListLinks>
          <ThemeToggle />
        </NavbarListContainer>
      </NavbarContent>
    </NavbarContainer>
  );
};
