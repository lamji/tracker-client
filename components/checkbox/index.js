/** @format */

import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { SET_TYPE_FILTER } from "../../app/features/data/dataSlice";

export default function ControlledCheckbox() {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);
  const [checkedExp, setCheckedExp] = React.useState(false);
  const [all, setAll] = React.useState(true);

  const handleChange = () => {
    setChecked(!checked);
    all && setAll(false);
    checkedExp && setCheckedExp(false);
  };

  const handleChangeExpenses = () => {
    setCheckedExp(!checkedExp);
    checked && setChecked(false);
    all && setAll(false);
  };

  const handleChangeAll = () => {
    setAll(!all);
    checkedExp && setCheckedExp(false);
    checked && setChecked(false);
  };

  React.useEffect(() => {
    checked && dispatch(SET_TYPE_FILTER("Income"));
    checkedExp && dispatch(SET_TYPE_FILTER("Expenses"));
    all && dispatch(SET_TYPE_FILTER(""));
  }, [checked, checkedExp, all]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleChange}
      >
        <Checkbox
          checked={checked}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography variant="body1" sx={{}}>
          Income
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleChangeExpenses}
      >
        <Checkbox
          checked={checkedExp}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography variant="body1" sx={{}}>
          Expenses
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleChangeAll}
      >
        <Checkbox checked={all} inputProps={{ "aria-label": "controlled" }} />
        <Typography variant="body1" sx={{}}>
          All
        </Typography>
      </Box>
    </Box>
  );
}
