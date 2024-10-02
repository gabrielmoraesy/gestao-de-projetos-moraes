// Styles
import {
  Container,
  MenuMobileNav,
  MenuMobileLink,
  MenuMobileAccountContainer,
  MenuMobileAccountImage,
  MenuMobileAccountName,
} from "./MenuMobile.styles";

// React
import { useEffect } from "react";

// Hooks
import { useAuth } from "../../hooks/useAuth";

// Context
import { useUser } from "../../contexts/userContext";
import { ThemeToggle } from "../../contexts/themeContext";

// Icons
import { X } from "phosphor-react";

interface NavbarProps {
  menuIsVisible: boolean;
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuMobile = ({
  menuIsVisible,
  setMenuIsVisible,
}: NavbarProps) => {
  const { signOutWithGoogle } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? "hidden" : "auto";
  }, [menuIsVisible]);

  return (
    <Container className={menuIsVisible ? "visible" : ""}>
      <X size={32} onClick={() => setMenuIsVisible(false)} />
      <MenuMobileNav onClick={() => setMenuIsVisible(false)}>
        {user && (
          <MenuMobileLink to="/account">
            <MenuMobileAccountContainer>
              <MenuMobileAccountImage
                src={user ? user.photoURL || "" : ""}
              ></MenuMobileAccountImage>
              <MenuMobileAccountName>{user?.displayName}</MenuMobileAccountName>
            </MenuMobileAccountContainer>
          </MenuMobileLink>
        )}
        <MenuMobileLink to="/">Projetos</MenuMobileLink>
        {user && <MenuMobileLink to="/dashboard">Meus projetos</MenuMobileLink>}
        {user && (
          <MenuMobileLink to="/projects/create">Criar projeto</MenuMobileLink>
        )}
        {!user && <MenuMobileLink to="/login">Entrar</MenuMobileLink>}
        <MenuMobileLink to="/about">Sobre</MenuMobileLink>
        {user && (
          <MenuMobileLink to="/" onClick={() => signOutWithGoogle()}>
            Sair
          </MenuMobileLink>
        )}{" "}
      </MenuMobileNav>
    </Container>
  );
};
