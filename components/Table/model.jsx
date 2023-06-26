/** @format */

import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useStyles } from "./useStyles";
import { deleteTransaction } from "../../app/api/delete";
import { ADD_DATA } from "../../app/features/data/dataSlice";

function Model() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const reduxData = useSelector((state) => state?.data?.value);
  const dispatch = useDispatch();
  const [dataRows, setDataRows] = React.useState([]);

  /**
   * Deletes a transaction
   * @param {string} userId - The user ID
   */
  function handleDelete(userId) {
    try {
      setIsLoading(true);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        const dataBody = {
          userId: userId,
        };
        if (result.isConfirmed) {
          const res = await deleteTransaction(dataBody);
          dispatch(ADD_DATA(res.data?.user));
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setRefresh(!refresh);
    }
  }

  /**
   * columns data
   */
  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleMoreOptionsClick = (event) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
        };

        const handleOptionClick = () => {
          setAnchorEl(null);
          handleDelete(params?.id);
        };

        return (
          <React.Fragment>
            <IconButton
              aria-controls={`row-actions-${params.row.id}`}
              aria-haspopup="true"
              onClick={handleMoreOptionsClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id={`row-actions-${params.row.id}`}
              anchorEl={anchorEl}
              open={anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleOptionClick()}>
                <ListItemIcon>
                  <DeleteOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      },
    },
    {
      field: "dateAdded",
      headerName: "Date",
      width: 150,
    },
    {
      field: "categoryName",
      headerName: "Category",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount Added",
      width: 200,
    },
    {
      field: "type",
      headerName: "Transaction Type",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },
  ];

  const CustomNoRowsOverlay = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6">No data available</Typography>
      </Box>
    );
  };

  React.useEffect(() => {
    if (Object.keys(reduxData).length > 0) {
      const rows = reduxData?.transactions.map((row) => {
        const amount = row.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        return {
          ...row,
          id: row?._id,
          dateAdded: moment(row?.dateAdded).format("LL"),
          amount: amount,
        };
      });
      setDataRows(rows);
    }
  }, [reduxData, refresh]);

  return {
    columns,
    CustomNoRowsOverlay,
    dataRows,
    classes,
    isLoading,
  };
}

export default Model;
