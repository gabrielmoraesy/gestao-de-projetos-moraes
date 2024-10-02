// Styled components
import {
  LoginContainer,
  LoginContent,
  LoginTitle,
  LoginParagraph,
  GoogleIcon,
  LoginButton,
} from "./Login.styles";

// React
import { useNavigate } from "react-router-dom";

// Context
import { useTheme } from "../../contexts/themeContext";

// Hooks
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    await signInWithGoogle();
    navigate("/");
  };

  return (
    <LoginContainer className={isDarkMode ? "darkMode" : ""}>
      <LoginContent>
        <LoginTitle>Acesse sua conta</LoginTitle>
        <LoginParagraph>
          Faça login com sua conta Google para ter acesso as funcionalidades do
          Gestão de Projetos!
        </LoginParagraph>

        <LoginButton type="button" onClick={() => handleLogin()}>
          <GoogleIcon />
          Entre com o Google
        </LoginButton>
      </LoginContent>
    </LoginContainer>
  );
};
