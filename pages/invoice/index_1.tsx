import Layout from '@/components/Layouts/Layout';
import React, { useState } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Autocomplete,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import withAuth from '@/components/withAuth';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import GridProductInvoice from '@/components/Invoice/GridProductInvoice';

type Props = {};

type CustomerType = {
    customerId: number | null;
    customerName: string;
}

type ProductType = {
    productId: number,
    productName: string
}

type InvoiceInfo = {
    productId: string[];
    customerId: string[] | null;
    transDate: Dayjs;
}

const productList: ProductType[] = [
    {
        productId: 1,
        productName: "Battery 3K"
    },
    {
        productId: 2,
        productName: "Battery GS"
    }
]

const customerList: CustomerType[] = [
    {
        customerId: 1,
        customerName: 'Vietnam',
    },
    {
        customerId: 2,
        customerName: 'Yemen',

    },
    {
        customerId: 3,
        customerName: 'Zambia',
    },
    {
        customerId: 4,
        customerName: 'Zimbabwe',
    },
];

const Invoice = ({ }: Props) => {
    let [product, setProduct] = useState<any[]>([]);
    const initValues: InvoiceInfo = {
        productId: [],
        customerId: null, // Add a field for selected country
        transDate: dayjs()
    };

    const showForm = ({ handleSubmit, setFieldValue }: FormikProps<InvoiceInfo>) => {

        return (
            <Form onSubmit={handleSubmit}>
                <Card>
                    <CardContent sx={{ padding: 4 }}>
                        <Box>
                            <Typography gutterBottom variant="h6">
                                Invoice
                            </Typography>
                        </Box>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <DesktopDatePicker
                                    format='DD/MM/YYYY'
                                    label="Transaction Date"
                                    name="transDate"
                                    value={initValues.transDate}
                                    onChange={(date) => setFieldValue('transDate', dayjs(date).format('DD/MM/YYYY'))}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    id="customerId"
                                    size='small'
                                    options={customerList}
                                    getOptionLabel={(option) => option.customerName}
                                    renderInput={(params) => (
                                        <TextField {...params} label="customerId" />
                                    )}
                                    onChange={(event, value) => {
                                        // Set the selected country to Formik's state
                                        console.log(value);
                                        setFieldValue('customerId', value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={7}>
                                {/* <Field
                                    component={TextField}
                                    name="productName"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Product Name"
                                    id="productName"
                                /> */}
                                <Autocomplete
                                    multiple
                                    id="productId"
                                    options={productList}
                                    getOptionLabel={(option) => option.productName}
                                    renderInput={(params) => (
                                        <TextField {...params} label="productId" />
                                    )}
                                    onChange={(event, value) => {
                                        // Set the selected country to Formik's state
                                        setFieldValue('productId', value);
                                        setProduct([value])
                                        console.log(product);

                                    }}
                                    size='small'
                                />
                            </Grid>
                        </Grid>
                        <Button variant="contained" size="large" color="primary" type="submit">
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </Form>
        );
    };

    return (
        <Layout>
            <Formik
                initialValues={initValues}
                onSubmit={async (values) => {
                    console.log('Form Values:', values);
                    // Handle form submission logic here
                }}
            >
                {(props) => showForm(props)}
            </Formik>
            <Box sx={{ paddingTop: 2 }}>
                <Card>
                    <CardContent sx={{ paddingLeft: 4, paddingRight: 4 }}>
                        <GridProductInvoice />
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    );
};

export default withAuth(Invoice);
