/** @format */

export const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
  dataGrid: {
    p: 2,
    "& .MuiDataGrid-cell:focus,  .MuiDataGrid-columnHeader:focus-within": {
      outline: "none",
    },
    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
      width: "0.7em",
    },
    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
    },
    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
});
