/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import Filter from "../filter";
import { Grid } from "@mui/material";
import CheckboxLabels from "../checkbox";
import Model from "./model";
import Loading from "../backdrop";
export default function TableDataGrid() {
  const { columns, CustomNoRowsOverlay, dataRows, classes, isLoading } =
    Model();

  return (
    <Box>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={12} md={4} sx={{ mb: 2 }}>
          <Filter />
        </Grid>
        <Grid item xs={12} md={4}>
          <CheckboxLabels />
        </Grid>
      </Grid>
      <Box sx={{ height: 615, width: "100%", mt: 2 }}>
        <DataGrid
          rows={dataRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          disableColumnMenu
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          sx={classes.dataGrid}
        />
      </Box>
      <Loading isOpen={isLoading} />
    </Box>
  );
}
