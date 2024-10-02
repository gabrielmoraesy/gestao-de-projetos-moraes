import styled from "styled-components";

export const AccountContainer = styled.div``;

export const AccountContent = styled.div`
  padding-top: 2rem;

  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;

  font-size: 1.8rem;
`;

export const AccountImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 5rem;
  margin: 1rem 0rem;
`;

export const AccountBar = styled.div`
  width: 90%;

  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
`;

export const AccountTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const AccountInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AccountLabel = styled.label``;

export const AccountParagraph = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;

export const AccountInput = styled.input`
  width: 350px;
  font-size: 1.6rem;
  border: none;
  border-bottom: 0.1rem solid #ccc;
  background-color: transparent;

  margin-bottom: 2rem;
`;
