/** @format */

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AppHelper from "../../app-helper";
import { useSelector } from "react-redux";

/**
 * Model component for managing transaction data
 * @param {Object} props - The component props
 * @param {Function} props.dataOut - Callback function for data output
 * @param {Function} props.filter - Callback function for filtering data
 * @returns {Object} An object containing the component state and functions
 */
function Model({ dataOut, filter }) {
  // State variable for transaction data
  const [transaction, setTransaction] = useState([]);
  // State variable for transaction type
  const [transactionType, setTransactionType] = useState("");
  // State variable for transaction category
  const [transactionCategory, setTransactionCategory] = useState("");
  // State variable for transaction amount
  const [transactionAmount, setTransactionAmount] = useState(0);
  // State variable for transaction description
  const [transactionDescription, setTransactionDescription] = useState("");
  // State variable for transaction date
  const [transactionDate, setTransactionDate] = useState("");
  // State variable for income value
  const [incomeValue, setIncomeValue] = useState(false);
  // State variable for expense value
  const [expenseValue, setExpenseValue] = useState(false);
  // State variable for all value
  const [allValue, setAllValue] = useState(true);
  // State variable for list of categories
  const [listOfCategory, setListOfCategory] = useState([]);
  // State variable for selected category
  const [category, setCategory] = useState("");

  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Function to handle closing the modal
  const handleClose = () => setShow(false);
  // Function to handle showing the modal
  const handleShow = () => setShow(true);
  // Retrieve data from Redux state
  const reduxData = useSelector((state) => state?.data?.value);
  // State variable for anchor element
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
    setCategory(selected);
  };

  /**
   * Deletes a transaction
   * @param {string} userId - The user ID
   */
  function DeleteThis(userId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${AppHelper.API_URL}/users/DeleteRecords`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: userId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            Swal.fire("Deleted!", "Transaction has been deleted.", "success");
            setShow(false);
            setRefresh(!refresh);
          });
      }
    });
  }

  /**
   * Fetches initial data and sets the component state
   */
  useEffect(() => {
    // Assign reduxData to a variable called data
    const data = reduxData;

    // Check if data is not empty
    if (data !== null && data !== undefined && Object.keys(data).length !== 0) {
      // Get unique categories from data
      const uniqueCat = Array.from(new Set(data.categories));
      // Set the list of categories
      setListOfCategory(uniqueCat);

      // Filter transactions based on isActive property
      const data2 = data.transactions.filter((res) => {
        return res.isActive === true;
      });
      if (incomeValue === true) {
        // Filter and reverse the array
        const active = data2
          .filter((activeRecords) => {
            return (
              activeRecords.isActive === true && activeRecords.type === "Income"
            );
          })
          .reverse();

        // Set the transaction data
        setTransaction(active);
      }
      if (expenseValue === true) {
        // Filter and reverse the array
        const active = data2
          .filter((activeRecords) => {
            return (
              activeRecords.isActive === true &&
              activeRecords.type === "Expenses"
            );
          })
          .reverse();

        // Set the transaction data
        setTransaction(active);
      }
      if (allValue === true) {
        // Filter and reverse the array
        const active = data2
          .filter((activeRecords) => {
            return activeRecords.isActive === true;
          })
          .reverse();

        // Set the transaction data
        setTransaction(active);
      }
    }
  }, [reduxData]);

  /**
   * Real-time update for data out
   */
  useEffect(() => {
    dataOut(refresh);
    filter(category);
  }, [refresh, category]);

  return {
    expenseValue,
    incomeValue,
    allValue,
    handleClick,
    open,
    category,
    anchorEl,
    handleCloseMenu,
    listOfCategory,
    transaction,
    show,
    handleClose,
    transactionCategory,
    transactionAmount,
    transactionDescription,
    transactionType,
    transactionDate,

    // Functions
    DeleteThis,
    setTransaction,
    setTransactionType,
    setTransactionCategory,
    setTransactionAmount,
    handleShow,
    handleMenuSelect,
    setTransactionDescription,
    setTransactionDate,
    setIncomeValue,
    setExpenseValue,
    setAllValue,
    refresh,
    setRefresh,
  };
}

export default Model;
