import { Link } from "react-router-dom";
import styled from "styled-components";

export const TaskDetailsContainer = styled.div``;

export const TaskDetailsContent = styled.div`
  padding: 2rem;

  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;

  font-size: 1.8rem;
  text-align: center;
`;

export const TaskDetailsBar = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ccc;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TaskDetailsBarActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const TaskDetailsTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const TaskDetailsSubTitle = styled.h3`
  font-size: 2rem;
  font-weight: 400;
  margin-top: 1rem;
`;

export const TaskDetailsParagraph = styled.p`
  font-size: 1.8rem;
  margin-top: 1rem;
`;

export const TaskDetailsLink = styled(Link)``;
