import styled from "styled-components";

export const AboutContainer = styled.div``;

export const AboutContent = styled.div`
  padding-top: 2rem;

  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;

  font-size: 1.8rem;
`;

export const AboutTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin: 2rem;
  }
`;

export const AboutSubTitle = styled.h3`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin: 2rem;
  }
`;

export const AboutParagraph = styled.p`
  font-size: 1.8rem;

  @media (max-width: 768px) {
    margin: 2rem;
  }
`;
