import React from "react";
import { RibbonContainer, Ribbon } from "react-ribbons";

const FeaturedRibbon = ({ children }) => {
  return (
    <RibbonContainer>
      <Ribbon
        side="right"
        type="edge"
        size="large"
        backgroundColor="#ff284b"
        color="#ffffff"
        fontFamily="sans"
        withStripes={true}
      >Featured</Ribbon>
      {children}
    </RibbonContainer>
  );
};

export default FeaturedRibbon;
