// Styled components
import {
  AccountContainer,
  AccountContent,
  AccountImage,
  AccountTitle,
  AccountLabel,
  AccountParagraph,
  AccountInput,
  AccountBar,
  AccountInformation,
} from "./Account.styles";

// React
import { Link } from "react-router-dom";

// Context
import { useUser } from "../../contexts/userContext";
import { useTheme } from "../../contexts/themeContext";

// Icons
import { ArrowBendUpLeft } from "phosphor-react";

// Libs
import { format } from "date-fns-tz";

export const Account = () => {
  const { isDarkMode } = useTheme();
  const { user } = useUser();

  const creationTime =
    user && user.metadata && user.metadata.creationTime
      ? new Date(user.metadata.creationTime)
      : null;

  const formatCreationTime = (date: Date | null) => {
    if (!date) return "";
    const timeZone = "America/Sao_Paulo";
    return format(date, "dd/MM/yyyy HH:mm:ss", { timeZone });
  };

  return (
    <AccountContainer className={isDarkMode ? "darkMode" : ""}>
      <AccountContent>
        <AccountBar>
          <AccountTitle>Detalhes da conta</AccountTitle>
          <Link to="/">
            <ArrowBendUpLeft size={32} />
          </Link>
        </AccountBar>

        <AccountInformation>
          <AccountImage src={user ? user.photoURL || "" : ""}></AccountImage>

          <AccountLabel>
            <AccountParagraph>Nome completo: </AccountParagraph>
            <AccountInput
              disabled
              value={`${user?.displayName}`}
            ></AccountInput>
          </AccountLabel>

          <AccountLabel>
            <AccountParagraph>E-mail:</AccountParagraph>
            <AccountInput disabled value={`${user?.email}`}></AccountInput>
          </AccountLabel>

          <AccountLabel>
            <AccountParagraph>Primeiro acesso:</AccountParagraph>
            <AccountInput
              disabled
              value={`${formatCreationTime(creationTime)}`}
            ></AccountInput>
          </AccountLabel>
        </AccountInformation>
      </AccountContent>
    </AccountContainer>
  );
};
