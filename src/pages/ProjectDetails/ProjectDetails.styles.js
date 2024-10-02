import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProjectDetailsContainer = styled.div``;

export const ProjectDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  max-width: 1000px;

  margin: 0 auto;
  padding: 2rem;
  font-size: 1.8rem;
`;

export const ProjectDetailsBar = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
`;

export const ProjectDetailsTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const ProjectDetailsSubTitle = styled.h3`
  font-size: 2rem;
  font-weight: 400;
  margin: 1rem 0rem;
`;

export const ProjectDetailsParagraph = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

export const ProjectDetailsStatistics = styled.div`
  width: 97%;
  display: flex;
  justify-content: space-between;

  padding: 1rem 2rem;
  border-radius: 2rem;

  color: #000;
  background: rgba(204, 204, 204, 0.2);

  margin: 1rem 0rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ProjectDetailsParagraphStatistics = styled.p`
  font-size: 1.8rem;
`;

// Tasks

export const ProjectDetailsBarTask = styled.div`
  margin-top: 2rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
`;

export const ProjectDetailsBarTaskActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ProjectDetailsTasks = styled.div`
  width: 100%;
`;

export const ProjectDetailsTaskForm = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  margin-bottom: 2rem;
`;

export const ProjectDetailsInput = styled.input`
  width: 100%;

  border: none;
  border-bottom: 0.1rem solid #ccc;
  font-size: 1.8rem;
  background-color: transparent;
  margin-bottom: 2rem;

  &::placeholder {
    color: #aaa;
  }
`;

export const ProjectDetailsOption = styled.option`
  font-size: 1.6rem;
`;

export const ProjectDetailsButton = styled.button`
  background-color: #1a8918;
  color: #fff;
  text-align: center;
  cursor: pointer;
  border-radius: 1rem;
  width: 30rem;
  font-weight: bold;
  border: none;
  font-size: 2rem;
  padding: 1.2rem;

  &:hover {
    background-color: #0f730c;
    color: #fff;
  }
`;

export const ProjectDetailsTasksAll = styled.div`
  min-height: 20rem;
`;

export const ProjectDetailsTask = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2rem;

  border-radius: 1rem;
  font-size: 2.8rem;
  color: #000;
  background: rgba(204, 204, 204, 0.2);

  box-shadow: 2px 2px 3px rgba(204, 204, 204, 0.5);

  &:hover {
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProjectDetailsInfo = styled.div``;

export const ProjectDetailsLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProjectDetailsLinkActions = styled(Link)``;

export const ProjectDetailsParagraphTask = styled.p`
  font-size: 2rem;
`;

export const ProjectDetailsActions = styled.div`
  margin-left: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    flex-direction: row;
  }
`;

export const SpanTask = styled.span`
  font-weight: bold;
  font-size: 2rem;
`;
