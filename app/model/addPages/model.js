/** @format */

import AppHelper from "../../../app-helper";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ToString from "../../../toString";
import { useSelector, useDispatch } from "react-redux";
import { ADD_DATA } from "../../features/data/dataSlice";
import { getAll } from "../../api/getData";
import { updateRecord } from "../../api/updateData";
import { addRecord } from "../../api/postData";

function Model() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [balance, setBalance] = useState(0);
  const [amountButton, setAmountButton] = useState(true);
  const [expensesButton, setExpensesButton] = useState(false);
  const [amount, setAmount] = useState("");
  const [categoryTriger, setCategoryTriger] = useState(true);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isEditName, setIsEditName] = useState(false);
  const [editName, setEditName] = useState("h");
  const [isLoading, setIsLoading] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state?.data?.categoryFilter);
  const typeFilter = useSelector((state) => state?.data?.filterType);
  const dataValues = useSelector((state) => state?.data?.value);

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  /**
   * handle open dialog
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * handle close dialog
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * handle open transaction
   */
  const handleOpenTransaction = (type) => {
    setType(type);
    handleClickOpen();
  };

  /**
   * handle add record
   */
  const handleAddRecord = async (type) => {
    const reqBody = {
      categoryName: category === "new" ? newCategory : category,
      type: type,
      amount: amount,
      description: description,
      balanceAfterTransaction: balance + parseFloat(amount),
    };

    try {
      setIsLoading(true);
      const { data } = await addRecord(reqBody);
      if (data.status === true) {
        setRefresh(!refresh);
        setAmount("");
        setDescription("");
        setCategory("");
        setNewCategory("");
        Swal.fire({
          text: amount && `₱${ToString(amount)} ${data.message}`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        handleClose();
      } else {
        handleClose();
        Swal.fire("", `${data.message.message}`, "error");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handle update name integration
   */
  const handleUpdateName = async () => {
    try {
      const requestBody = {
        newUserName: editName,
      };
      const { data } = await updateRecord(requestBody);
      setIsLoading(false);
      if (data?.status) {
        setIsEditName(false);
        setRefresh(!refresh);
        Swal.fire("", `${data.message}`, "success");
      } else {
        Swal.fire("", `${data.message.message}`, "error");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  /**
   * handle update name
   */
  const handleEditName = () => {
    if (isEditName) {
      setIsLoading(true);
      handleUpdateName();
    } else {
      setIsEditName(true);
    }
  };

  /**
   * handle disabled button
   */
  useEffect(() => {
    if (amount === "" || description === "" || category === "") {
      setAmountButton(true);
    } else {
      setAmountButton(false);
    }
  }, [amount, description, category]);

  /**
   * handle get data
   */
  const handleGetInstanceData = async (filter, typeFilter) => {
    try {
      const params = {
        category: filter || undefined,
        type: typeFilter || undefined,
      };
      const { data } = await getAll(params);
      setBalance(data.balance);
      setTotalIncome(data.income);
      setTotalExpenses(data.expenses);
      var unique = Array.from(new Set(data.categories));
      setCategories(unique);
      setData(data);
      dispatch(ADD_DATA(data));
      setEditName(data?.fullName);
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * handle in getting initial data
   */
  useEffect(() => {
    handleGetInstanceData(filter, typeFilter);
  }, [refresh, filter, typeFilter, dataValues]);

  return {
    balance,
    data,
    amountButton,
    expensesButton,
    categoryTriger,
    categories,
    categoryName,
    setCategoryName,
    description,
    amount,
    setAmount,
    setExpensesButton,
    setCategoryTriger,
    setDescription,
    open,
    handleClickOpen,
    handleClose,
    handleOpenTransaction,
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
    totalIncome,
    totalExpenses,
  };
}

export default Model;
