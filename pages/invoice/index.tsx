import React, { useState } from "react";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layouts/Layout";
import { Field, Form, Formik } from "formik";
import {
  Autocomplete,
  Box,
  Button,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { GridRowsProp } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import GridDataDisplay from "@/components/Invoice/GridProductInvoice";

const Invoice = () => {
  const [gridData, setGridData] = useState<GridRowsProp>([]);
  const [invoiceNumber, setInvoiceNumber] = useState(""); // Initial invoice number
  type CustomerType = {
    customerId: number | null;
    customerName: string;
  };
  type ProductType = {
    productId: number;
    productName: string;
    productQty: number;
    productPrice: number;
  };
  const initialValuesHeader = {
    transDate: dayjs(),
    customerCode: String,
    customerAddress: String,
  };
  const initialValuesDetail = {
    product: [
      {
        productId: Number,
        productName: String,
        productQty: Number,
        productSumPrice: String,
      },
    ],
    productPrice: Number,
    productQty: Number,
    productSumPrice: Number,
  };
  const productList: ProductType[] = [
    {
      productId: 1,
      productName: "Battery 3K",
      productQty: 1,
      productPrice: 2000.21,
    },
    {
      productId: 2,
      productName: "Battery GS",
      productQty: 1,
      productPrice: 2500,
    },
  ];
  const handleDelete = (idToDelete: any) => {
    if (idToDelete) {
      setGridData((prevGridData) =>
        prevGridData.filter((row) => row.id !== idToDelete)
      );
    } else {
      console.error("Invalid idToDelete:", idToDelete);
    }
  };
  const customerList: CustomerType[] = [
    {
      customerId: 1,
      customerName: "Vietnam",
    },
    {
      customerId: 2,
      customerName: "Yemen",
    },
    {
      customerId: 3,
      customerName: "Zambia",
    },
    {
      customerId: 4,
      customerName: "Zimbabwe",
    },
  ];
  const sendDataToServer = async () => {
    try {
      // Assuming you have an API endpoint '/api/insertData'
      // const response = await axios.post('/api/insertData', { data: gridData });
      console.log(gridData);
      // console.log(response.data); // Assuming the server responds with some feedback
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };
  const showFormHeader = ({
    handleSubmit,
    setFieldValue,
  }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <CardContent sx={{ padding: 4 }}>
          <Box>
            <Typography gutterBottom variant="h6">
              Customer
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <DesktopDatePicker
                format="DD/MM/YYYY"
                label="Transaction Date"
                name="transDate"
                value={initialValuesHeader.transDate}
                onChange={(date) =>
                  setFieldValue("transDate", dayjs(date).format("DD/MM/YYYY"))
                }
                slotProps={{ textField: { size: "small" } }}
              />
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                id="customerId"
                size="small"
                options={customerList}
                getOptionLabel={(option) => option.customerName}
                renderInput={(params) => (
                  <TextField {...params} label="customerId" />
                )}
                onChange={(event, value) => {
                  // Set the selected country to Formik's state
                  setFieldValue("customerId", value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                disabled={invoiceNumber != ""}
                variant="contained"
                size="large"
                color="primary"
                type="submit"
              >
                Create Invoice
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Form>
    );
  };
  const showFormDetail = ({
    handleSubmit,
    setFieldValue,
    values,
  }: FormikProps<any>) => {
    const handleQtyChange = (event: any) => {
      const newQty = parseFloat(event.target.value) || 0;
      const productSumPrice = (newQty * values.productPrice).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
      setFieldValue("productQty", newQty);
      setFieldValue("productSumPrice", productSumPrice);
    };

    const handlePriceChange = (event: any) => {
      const newPrice = parseFloat(event.target.value) || 0;
      const productSumPrice = (values.productQty * newPrice).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
      setFieldValue("productPrice", newPrice);
      setFieldValue("productSumPrice", productSumPrice);
    };

    return (
      <Form onSubmit={handleSubmit}>
        <CardContent sx={{ padding: 4 }}>
          <Box>
            <Typography gutterBottom variant="h6">
              Product
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={3} sx={{ marginTop: 2 }}>
              <Autocomplete
                id="product"
                size="small"
                options={productList}
                getOptionLabel={(option) => option.productName}
                renderInput={(params) => (
                  <TextField {...params} label="Please select product" />
                )}
                onChange={(event, value: any) => {
                  if (value) {
                    setFieldValue("product", value);
                    setFieldValue("productPrice", value.productPrice);
                    setFieldValue("productQty", value.productQty);
                    const productSumPrice = (
                      (value?.productPrice ?? 0) * (value.productQty ?? 0)
                    ).toFixed(2);
                    setFieldValue("productSumPrice", productSumPrice);
                  } else {
                    setFieldValue("product", null);
                    setFieldValue("productPrice", 0);
                    setFieldValue("productQty", 0);
                    setFieldValue("productSumPrice", 0);
                  }
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Field
                component={TextField}
                onChange={handlePriceChange}
                slotProps={{ textField: { size: "small" } }}
                name="productPrice"
                margin="normal"
                required
                fullWidth
                label="Product Price"
                id="productPrice"
                type="number"
                size="small"
                value={values.productPrice}
              />
            </Grid>
            <Grid item xs={2}>
              <Field
                component={TextField}
                onChange={handleQtyChange} // Add this line
                size="small"
                name="productQty"
                margin="normal"
                required
                fullWidth
                label="Product QTY"
                id="productQty"
                type="number"
                value={values.productQty}
              />
            </Grid>
            <Grid item xs={2}>
              <Field
                component={TextField}
                name="productSumPrice"
                margin="normal"
                required
                fullWidth
                label="Total"
                id="productSumPrice"
                type="text"
                size="small"
                value={values.productSumPrice}
              />
            </Grid>
            <Grid item xs={2} sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                disabled={!invoiceNumber}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Form>
    );
  };
  const calculateSubtotal = () => {
    return gridData.reduce(
      (subtotal, row) => subtotal + row.productQty * row.productPrice,
      0
    );
  };
  const calculateTotalQTY = () => {
    const totalQty = gridData.reduce((total, row) => total + row.productQty, 0);
    return totalQty;
  };

  return (
    <Layout>
      <Box sx={{ boxShadow: 3 }}>
        <TextField
          sx={{
            position: "absolute",
            right: 25,
            "& .MuiInputBase-root": {
              fontSize: "18px",
            },
          }}
          id="invoiceNumber"
          label="Invoice Number"
          variant="filled"
          defaultValue="123"
          InputProps={{
            readOnly: true,
          }}
          value={invoiceNumber}
        />
        <Formik
          initialValues={initialValuesHeader}
          onSubmit={async (values) => {
            const newInvoiceNumber = "222222";
            setInvoiceNumber(newInvoiceNumber);
            console.log(values);
          }}
        >
          {(props) => showFormHeader(props)}
        </Formik>
      </Box>
      <Box sx={{ boxShadow: 3, marginTop: 1 }}>
        <Formik
          initialValues={initialValuesDetail}
          onSubmit={async (values: any, { resetForm }) => {
            // add data to grid data
            const isDuplicate = gridData.some(
              (row) => row.id === values.product.productId
            );

            if (isDuplicate) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Duplicate productId. Please choose a different product.",
              });
            } else {
              setGridData((prevGridData) => [
                ...prevGridData,
                {
                  id: values.product.productId,
                  productName: values.product.productName, // You may replace this with the actual product name
                  ...values,
                },
              ]);
              resetForm();
            }
          }}
        >
          {(props) => showFormDetail(props)}
        </Formik>
        <Grid container spacing={0} style={{ marginBottom: 16 }} >
          <GridDataDisplay
            gridData={gridData}
            invoiceNumber={invoiceNumber}
            calculateTotalQTY={calculateTotalQTY}
            calculateSubtotal={calculateSubtotal}
            sendDataToServer={sendDataToServer}
            onDelete={handleDelete}
          />
        </Grid>
      </Box>
    </Layout>
  );
};

export default withAuth(Invoice);
