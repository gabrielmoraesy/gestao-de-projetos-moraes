import styled from "styled-components";
import { GoogleLogo } from "phosphor-react";

export const LoginContainer = styled.div``;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;

  font-size: 1.8rem;
`;

export const LoginTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const LoginParagraph = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const GoogleIcon = styled(GoogleLogo)`
  font-size: 2.5rem;
  fill: #4285f4;
  margin-right: 1rem;
`;

export const LoginButton = styled.button`
  margin-top: 1rem;

  display: flex;
  align-items: center;

  font-size: 2rem;
  padding: 2rem;

  background-color: #f6fcff;
  color: #000;
  border: 0.3rem solid #000;
  transition: 0.3s;
  cursor: pointer;
  border-radius: 2rem;

  &:hover {
    background: #4285f4;
    color: #fff;
  }

  &:active {
    background: #ea4335;
    border: 0.3rem solid #ea4335;
    color: #fff;
  }
`;
