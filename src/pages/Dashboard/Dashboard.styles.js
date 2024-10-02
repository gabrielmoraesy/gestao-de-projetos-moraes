import styled from "styled-components";

export const DashboardContainer = styled.div``;

export const DashboardContent = styled.div`
  padding-top: 2rem;

  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;

  font-size: 1.8rem;
  text-align: center;
`;

export const DashboardTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const DashboardSubTitle = styled.h3`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

export const DashboardSpan = styled.span`
  font-size: 2rem;
`;

export const DashboardTable = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
`;

export const DashboardColumnMyProjects = styled.div``;

export const DashboardColumnProjects = styled.div``;

export const DashboardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  width: 80%;
  margin: 0 auto;
  padding: 10px;

  &button,
  &a {
    margin: 0 5px;
    height: 30px;
    width: 100px;
    font-size: 0.7em;
  }
`;

export const DashboardParagraph = styled.p`
  font-size: 2rem;
`;

export const DashboardDivision = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  font-size: 2rem;
  margin: 2rem 0rem;
`;

export const DashboardActions = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const DashboardActionsButton = styled.button`
  @media screen and (max-width: 768px) {
    width: 132px;
  }
`;

export const DashboardNoProjects = styled.div`
  background: rgba(204, 204, 204, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  width: 80%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DashboardParagraphNoProjects = styled.p`
  font-size: 2rem;
  margin: 1.5rem 0rem;
`;
