import styled from "styled-components";

export const EditProjectContainer = styled.div``;

export const EditProjectContent = styled.div`
  padding-top: 2rem;

  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;

  font-size: 1.8rem;
  text-align: center;
`;

export const EditProjectTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const EditProjectParagraph = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

export const EditProjectForm = styled.form`
  max-width: 80%;
  margin: 0 auto;
`;

export const EditProjectLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  font-size: 2.6rem;
`;

export const EditProjectSpan = styled.span`
  margin-bottom: 0.3rem;
  font-weight: bold;
  text-align: left;
`;

export const EditProjectInput = styled.input`
  border: none;
  border-bottom: 0.1rem solid #ccc;
  padding: 0.8rem 0rem;
  background-color: transparent;

  &::placeholder {
    color: #aaa;
  }
`;

export const EditProjectButton = styled.button`
  background-color: #1a8918;
  color: #fff;
  text-align: center;
  cursor: pointer;
  border-radius: 1rem;
  width: 20rem;
  font-weight: bold;
  border: none;
  padding: 1.5rem;
  font-size: 1.8rem;

  &:hover {
    background-color: #0f730c;
    color: #fff;
  }
`;
