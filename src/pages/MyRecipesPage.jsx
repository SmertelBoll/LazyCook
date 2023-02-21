import React from "react";
import {
  BoxBgBlue,
  BoxBgWhite,
  StyledContainer,
} from "../components/custom/customComponents";
import SearchBlock from "../components/ItemsBlock/SearchBlock";

function MyRecipesPage() {
  return (
    <BoxBgWhite>
      <StyledContainer paddingY={true}>
        <SearchBlock />
      </StyledContainer>
      <BoxBgBlue>
        <StyledContainer paddingY={true}>123</StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default MyRecipesPage;
