/** @format */

import React from "react";
import { Card, Container } from "react-bootstrap";
import History from "../../components/history/index";
import ToString from "../../toString";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CheckIcon from "@mui/icons-material/Check";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { Box, IconButton, Typography, Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import Model from "./model";
import Loading from "../../components/backdrop";
import Variants from "../../components/skeleton";
import Grid from "@mui/material/Grid";
import TableDataGrid from "../../components/Table";
import AccountMenu from "../../components/menu";

export default function Login() {
  const {
    balance,
    data,
    amountButton,
    categories,
    description,
    setAmount,
    setDescription,
    amount,
    open,
    handleOpenTransaction,
    handleClose,
    type,
    handleChangeCategory,
    category,
    handleAddRecord,
    newCategory,
    setNewCategory,
    setRefresh,
    isEditName,
    setIsEditName,
    isLoading,
    handleEditName,
    setEditName,
    editName,
    setFilterCategory,
    totalIncome,
    totalExpenses,
  } = Model();

  if (Object.keys(data).length === 0) {
    return (
      <>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Variants />
        </Box>
      </>
    );
  }

  return (
    <React.Fragment>
      {/* <NavBar /> */}
      <Container className=" mt-4 pb-4">
        <Box
          sx={{
            backgroundColor: "#4343a4",
            borderRadius: "10px",
            height: {
              md: "350px",
              xs: "100vh",
            },
            color: "white",
            padding: "10px",
          }}
        >
          <Box sx={{ px: 5, py: 2 }}>
            <Box
              sx={{
                textAlign: "right",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                mb: 5,
              }}
            >
              <AccountMenu />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Grid
                  item
                  md={3.6}
                  xs={12}
                  sx={{
                    backgroundColor: "#F86F03",
                    p: 2,
                    borderRadius: "10px",
                    height: "110px",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    ₱ {ToString(balance.toFixed(2))}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "12px" }}>
                    Available balance
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={3.6}
                  xs={12}
                  sx={{
                    backgroundColor: "#FFA41B",
                    p: 2,
                    borderRadius: "10px",
                    height: "110px",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    ₱ {ToString(totalIncome.toFixed(2))}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "12px" }}>
                    Total Income
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={3.6}
                  xs={12}
                  sx={{
                    backgroundColor: "#FF0060",
                    p: 2,
                    borderRadius: "10px",
                    height: "110px",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    ₱ {ToString(totalExpenses.toFixed(2))}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "12px" }}>
                    Total expenses
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ mt: 3 }}>
                <IconButton onClick={() => handleOpenTransaction("Income")}>
                  <AddCircleOutlineRoundedIcon
                    style={{
                      fontSize: "60px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </IconButton>
                <IconButton onClick={() => handleOpenTransaction("Expenses")}>
                  <RemoveCircleRoundedIcon
                    style={{
                      fontSize: "60px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          {/* <History
            dataOut={(i) => setRefresh(!i)}
            filter={(i) => setFilterCategory(i)}
          /> */}
          <TableDataGrid />
        </Box>
        <Dialog
          open={open}
          onClose={null}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{type}</DialogTitle>
          <DialogContent>
            <Box sx={{ minWidth: 420 }}>
              {category === "new" ? (
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="New Category"
                  variant="outlined"
                  value={newCategory}
                  sx={{ mt: 2 }}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              ) : (
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={handleChangeCategory}
                    displayEmpty
                    renderValue={(selected) =>
                      selected ? selected : "Select a category"
                    }
                  >
                    {categories.map((categoryVal, id) => {
                      return (
                        <MenuItem key={id} value={categoryVal}>
                          {categoryVal}
                        </MenuItem>
                      );
                    })}
                    <MenuItem value="new" sx={{ color: "primary.main" }}>
                      Add Category
                    </MenuItem>
                  </Select>
                </FormControl>
              )}

              <TextField
                fullWidth
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={description}
                sx={{ mt: 2 }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                type="number"
                value={amount}
                sx={{ mt: 2 }}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleAddRecord(type)}
              variant="contained"
              disabled={amountButton}
            >
              Add {type}
            </Button>
          </DialogActions>
        </Dialog>
        <Loading isOpen={isLoading} />
      </Container>
    </React.Fragment>
  );
}
