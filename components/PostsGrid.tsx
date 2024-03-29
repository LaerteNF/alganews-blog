import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media screen and (min-width: 767px){
    grid-template-columns: repeat(3, 1fr);
  }
`