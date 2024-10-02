import {
  PopUpHelpMeContent,
  PopUpHelpMeHeader,
  PopUpHelpMeHeaderTitle,
  PopUpHelpMeHeaderActions,
  PopUpHelpMeParagraph,
} from "./PopUp.styles";

// Modal
import Modal from "react-modal";

// Context
import { useTheme } from "../../contexts/themeContext";

// Icons
import { Info, XSquare } from "phosphor-react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-40%",
    transform: "translate(-50%, -50%)",
  },
};

const customStylesDark = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-40%",
    transform: "translate(-50%, -50%)",
    background: "#1a1a1a",
    color: "#fff",
  },
};

interface PopUpProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  textTitle: string;
  textDescription: string;
}

export const PopUp = ({
  modalIsOpen,
  closeModal,
  textTitle,
  textDescription,
}: PopUpProps) => {
  const { isDarkMode } = useTheme();
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={isDarkMode ? customStylesDark : customStyles}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <PopUpHelpMeHeader>
        <PopUpHelpMeHeaderTitle>
          <Info size={32} />{" "}
          <PopUpHelpMeParagraph>{textTitle}</PopUpHelpMeParagraph>
        </PopUpHelpMeHeaderTitle>
        <PopUpHelpMeHeaderActions>
          <XSquare size={32} onClick={() => closeModal()} />
        </PopUpHelpMeHeaderActions>
      </PopUpHelpMeHeader>
      <PopUpHelpMeContent>
        <PopUpHelpMeParagraph>{textDescription}</PopUpHelpMeParagraph>
      </PopUpHelpMeContent>
    </Modal>
  );
};
