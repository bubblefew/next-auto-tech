import Layout from '@/components/Layouts/Layout';
import React from 'react';
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

type Props = {};

interface ICountry {
    label: string;
    country: string;
    iso: string;
}

const initValues = {
    productId: 0,
    productName: '',
    customerName: null, // Add a field for selected country
};

const countries: ICountry[] = [
    {
        label: 'Vietnam',
        country: 'Vietnam',
        iso: 'vn',
    },
    {
        label: 'Yemen',
        country: 'Yemen',
        iso: 'ye',
    },
    {
        label: 'Zambia',
        country: 'Zambia',
        iso: 'zm',
    },
    {
        label: 'Zimbabwe',
        country: 'Zimbabwe',
        iso: 'zw',
    },
];

const Invoice = ({ }: Props) => {
    const showForm = ({ handleSubmit, setFieldValue }: FormikProps<any>) => {
        return (
            <Form onSubmit={handleSubmit}>
                <Card>
                    <CardContent sx={{ padding: 4 }}>
                        <Box>
                            <Typography gutterBottom variant="h6">
                                Invoice
                            </Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    sx={{ paddingTop: 2 }}
                                    id="customerName"
                                    options={countries}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField {...params} label="customerName" />
                                    )}
                                    onChange={(event, value) => {
                                        // Set the selected country to Formik's state
                                        setFieldValue('country', value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    component={TextField}
                                    name="productName"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Product Name"
                                    id="productName"
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
        </Layout>
    );
};

export default withAuth(Invoice);
