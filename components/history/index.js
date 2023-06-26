/** @format */

import React from "react";

import moment from "moment";

import AddComma from "../../toString";

import {
  Alert,
  Row,
  Col,
  Image,
  Form,
  Modal,
  Table,
  Nav,
} from "react-bootstrap";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { IconButton, Box, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Model from "./model";

export default function index({ dataOut, filter }) {
  const {
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
  } = Model({
    dataOut,
    filter,
  });
  return (
    <React.Fragment>
      <Row className="m-0 p-2 align-items-center">
        <Col xs={12} md={6} className="text-center bg-dark text-white">
          <Nav
            className="justify-content-center mt-3 text-10"
            activeKey="/home"
          >
            <Form.Group controlId="expensesCheckBox">
              <Form.Check
                type="checkbox"
                checked={expenseValue}
                onChange={() => {
                  // expensesCheckbox
                  setExpenseValue(true);
                  setIncomeValue(false);
                  setAllValue(false);
                  setRefresh(!refresh);
                }}
                label="Expenses"
              />
            </Form.Group>

            <Form.Group className="ml-3" controlId="incomeCheckBox">
              <Form.Check
                type="checkbox"
                checked={incomeValue}
                onChange={() => {
                  // incomeCheckbox
                  setExpenseValue(false);
                  setIncomeValue(true);
                  setAllValue(false);
                  setRefresh(!refresh);
                }}
                label="Income"
              />
            </Form.Group>
            <Form.Group className="ml-3" controlId="allCheckBox">
              <Form.Check
                type="checkbox"
                checked={allValue}
                onChange={() => {
                  // allCheckbox
                  setExpenseValue(false);
                  setIncomeValue(false);
                  setAllValue(true);
                  setRefresh(!refresh);
                }}
                label="All"
              />
            </Form.Group>
          </Nav>
        </Col>
        <Col>
          <div>
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                border: "1px solid gray",
                width: "200px",
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
                {category ? `Filter by ${category}` : "Filter by All Category"}
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
            >
              {listOfCategory &&
                listOfCategory.map((data, id) => {
                  return (
                    <MenuItem onClick={() => handleMenuSelect(data)} key={id}>
                      {data}
                    </MenuItem>
                  );
                })}
            </Menu>
          </div>
        </Col>
      </Row>
      {transaction <= 0 ? (
        <Alert variant="success" className="text-center mt-4" id="record">
          No Records Yet!
        </Alert>
      ) : (
        <>
          <Col
            xs={12}
            lg={12}
            id="record"
            className="bodyContent overflow-auto"
          >
            <Table striped bordered hover className="w-100">
              <thead>
                <tr className="t-head fixed">
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount Added</th>
                  <th>Transacation Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody className="flex align-items-center">
                {transaction.map((record) => {
                  return (
                    <tr key={record._id}>
                      <td className=" " style={{ verticalAlign: "revert" }}>
                        {moment(record.date).format("MMMM DD YYYY")}
                      </td>
                      <td style={{ verticalAlign: "revert" }}>
                        {record.categoryName}
                      </td>
                      <td style={{ verticalAlign: "revert" }}>
                        ₱ {AddComma(record.amount)}
                      </td>
                      <td style={{ verticalAlign: "revert" }}>{record.type}</td>
                      <td style={{ verticalAlign: "revert" }}>
                        <Row
                          className="m-0 flex align-items-center"
                          style={{ verticalAlign: "revert" }}
                        >
                          <Col
                            md={8}
                            xs={12}
                            style={{ verticalAlign: "revert" }}
                          >
                            {record.description}
                          </Col>
                          <Col md={4} xs={12} className="px-2 text-right">
                            <IconButton
                              onClick={(e) => {
                                DeleteThis(record._id);
                              }}
                            >
                              <BackspaceIcon />
                            </IconButton>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </>
      )}
      {/* small*/}

      {transaction <= 0 ? (
        <Alert variant="success" className="text-center mt-4" id="recordShow">
          No Records Yet!
        </Alert>
      ) : (
        <Col
          xs={12}
          lg={12}
          id="recordShow"
          className="p-0 text-10 mt-3 bodyContent overflow-auto"
        >
          <Table striped bordered hover className="w-100 scroll">
            <thead>
              <tr>
                <th>Date</th>
                <th className="text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((record) => {
                return (
                  <tr key={record._id}>
                    <td>{moment(record.date).format("MMMM DD, YYYY")}</td>
                    <td
                      className="text-center"
                      onClick={() => {
                        handleShow();
                        setTransactionType(record.type);
                        setTransactionCategory(record.categoryName);
                        setTransactionAmount(record.amount);
                        setTransactionDescription(record.description);
                        setTransactionDate(
                          moment(record.date).format("MMMM DD, YYYY")
                        );
                      }}
                    >
                      View
                    </td>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton className="py-2"></Modal.Header>
                      <Modal.Body>
                        <Row className="pb-2 my-1 text-14 ">
                          <Col sm={12} className="py-2 bg-light">
                            Transaction <br />
                            <p className="pb-1 px-2  mb-0">
                              {" "}
                              {transactionCategory}
                            </p>
                          </Col>
                          <Col sm={12} className="py-2">
                            Amount Added
                            <br />
                            <p className="pb-1 px-2 mb-0">
                              ₱ {AddComma(transactionAmount)}.00
                            </p>
                          </Col>
                          <Col sm={12} className="py-2 bg-light">
                            Description <br />
                            <p className="pb-1 px-2 bg-light mb-0">
                              {" "}
                              {transactionDescription}
                            </p>
                          </Col>
                          <Col sm={12} className="py-2">
                            Transaction Type
                            <br />
                            <p className="pb-1 px-2 mb-0">{transactionType}</p>
                          </Col>
                          <Col sm={12} className="py-2 bg-light">
                            Transaction Date
                            <br />
                            <p className="pb-1 px-2 bg-light mb-0">
                              {" "}
                              {moment(transactionDate).format("MMMM DD, YYYY")}
                            </p>
                          </Col>
                        </Row>
                        <Col md={4} xs={12} className="px-2 text-center ">
                          <a
                            onClick={(e) => {
                              DeleteThis(record._id);
                            }}
                            className="text-muted mx-3"
                          >
                            <Image
                              src="/delete.png"
                              className="buttonimgDel mr-3"
                            />
                            Delete this Record
                          </a>
                        </Col>
                      </Modal.Body>
                    </Modal>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      )}
    </React.Fragment>
  );
}
