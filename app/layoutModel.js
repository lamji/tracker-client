/** @format */

import { useMediaQuery } from "@mui/material";

const ViewModel = () => {
  const isMobile = useMediaQuery("(max-width:541px)");
  const isXXL = useMediaQuery("(min-width:1100px)");
  const isMedium = useMediaQuery("(max-width:800px)");
  return {
    isMobile,
    isXXL,
    isMedium,
  };
};

export default ViewModel;
