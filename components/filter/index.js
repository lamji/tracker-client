/** @format */

import React from "react";
import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector, useDispatch } from "react-redux";
import { SET_CATEGORY_FILTER } from "../../app/features/data/dataSlice";

function Filter() {
  const [listOfCategory, setListOfCategory] = React.useState([]);
  const [filtered, setFiltered] = React.useState("");
  const dispatch = useDispatch();
  const category = useSelector((state) => state?.data?.value);

  const [anchorEl, setAnchorEl] = React.useState(null);
  // Boolean value based on anchorEl state
  const open = anchorEl;

  /**
   * Handle click event
   * @param {*} event
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handle closing the menu
   */
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /**
   * Handle menu select
   * @param {*} selected
   */
  const handleMenuSelect = (selected) => {
    handleCloseMenu();
    setFiltered(selected);
    dispatch(SET_CATEGORY_FILTER(selected));
  };

  React.useEffect(() => {
    if (Object.keys(category).length !== 0) {
      // Get unique categories from data
      const uniqueCat = Array.from(new Set(category.categories));
      // Set the list of categories
      setListOfCategory(uniqueCat);
    }
  }, [category]);

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          border: "1px solid gray",
          width: "250px",
          borderRadius: "5px",
        }}
        id="basic-button"
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
      >
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <FilterAltIcon />
        </IconButton>
        <Typography variant="body1">
          {filtered ? `Filtered by ${filtered}` : "Filtered by All Category"}
        </Typography>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            maxHeight: 400,
          },
        }}
      >
        <MenuItem onClick={() => handleMenuSelect("")}>All</MenuItem>
        {listOfCategory &&
          listOfCategory.map((data, id) => {
            return (
              <MenuItem onClick={() => handleMenuSelect(data)} key={id}>
                {data}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
}

export default Filter;
