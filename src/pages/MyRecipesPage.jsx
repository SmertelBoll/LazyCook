import React from "react";
import {
  BoxBgBlue,
  BoxBgWhite,
  StyledContainerWithPadding,
} from "../components/custom/customComponents";
import SearchBlock from "../components/ItemsBlock/SearchBlock";

function MyRecipesPage() {
  return (
    <BoxBgWhite>
      <StyledContainerWithPadding>
        <SearchBlock />
      </StyledContainerWithPadding>
      <BoxBgBlue>
        <StyledContainerWithPadding>123</StyledContainerWithPadding>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default MyRecipesPage;
