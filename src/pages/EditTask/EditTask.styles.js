import styled from "styled-components";

export const EditTaskContainer = styled.div``;

export const EditTaskContent = styled.div`
  padding-top: 2rem;

  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;

  font-size: 1.8rem;
  text-align: center;
`;

export const EditTaskTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const EditTaskParagraph = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

export const EditTaskForm = styled.form`
  max-width: 65%;
  margin: 0 auto;
`;

export const EditTaskLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  font-size: 2.6rem;
`;

export const EditTaskSpan = styled.span`
  margin-bottom: 0.3rem;
  font-weight: bold;
  text-align: left;
`;

export const EditTaskInput = styled.input`
  border: none;
  border-bottom: 0.1rem solid #ccc;
  padding: 0.8rem 0rem;
  background-color: transparent;

  &::placeholder {
    color: #aaa;
  }
`;

export const EditTaskOption = styled.option`
  font-size: 1.6rem;
`;

export const EditTaskButton = styled.button`
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
