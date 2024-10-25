import styled from "styled-components";
import { Link } from "react-router-dom";

export const HomeContainer = styled.div``;

export const HomeContent = styled.div`
  padding-top: 1rem;

  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;

  font-size: 1.8rem;
`;

export const HomeSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0rem 2rem;
`;

export const HomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`;

export const HomeInputSearch = styled.input`
  width: 30%;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    width: 60%;
  }
`;

export const HomeProjects = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  gap: 2rem;

  margin: 2rem 2rem 0rem 2rem;
`;

export const HomeProject = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  min-height: 300px;

  border-radius: 2rem;
  padding: 2rem;

  background-color: #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 3px 3px 40px rgba(0, 0, 0, 0.2);
  }
`;

export const HomeProjectTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;

  margin-bottom: 1rem;
`;

export const HomeParagraph = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

export const HomeLink = styled(Link)`
  width: 200px;
  text-align: center;

  border: 2px solid #000;
  border-radius: 10px;

  padding: 15px;

  cursor: pointer;
  font-weight: bold;

  font-size: 1.6rem;
  background-color: transparent;
  color: #000;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export const HomeNoProjects = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;


export const LoadingGlobal = styled.p`
  font-size: 18px;
  margin: 1rem 2rem;
`;
