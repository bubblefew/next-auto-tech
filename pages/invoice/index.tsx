import React from 'react'
import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { Field, Form, Formik, FormikProps } from "formik";
import { ProductData } from '@/models/product.model';
import { useRouter } from "next/router";
import { editProduct } from '@/services/product.services';
import { Card, CardContent, Typography, CardActions, Button, Box, Autocomplete } from '@mui/material';
import { TextField } from 'formik-material-ui';
import Link from 'next/link';
import DropDown from '@mui/material/TextField';
type Props = {
    product?: ProductData;
};
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }
];
const Invoice = ({ product }: Props) => {
    const router = useRouter();
    const showForm = ({
        values,
        setFieldValue,
        isValid,
    }: FormikProps<ProductData>) => {
        return (
            <Form>
                <Card>
                    <CardContent sx={{ padding: 4 }}>
                        <Typography gutterBottom variant="h3">
                            Add Invoice
                        </Typography>
                        <Box>
                            <Field
                                style={{ marginTop: 16 }}
                                component={TextField}
                                name="name"
                                type="text"
                                label="Name"

                            />
                            <Field
                                style={{ marginTop: 16 }}
                                component={TextField}
                                name="price"
                                type="number"
                                label="Price"
                            />
                        </Box>

                        <Autocomplete style={{ marginTop: 16 }}
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            sx={{ width: 300 }}
                            renderInput={(params) =>
                                <DropDown {...params} label="Movie" />
                            }
                        />

                        <Field
                            style={{ marginTop: 16 }}
                            fullWidth
                            component={TextField}
                            name="stock"
                            type="number"
                            label="Stock"
                        />

                    </CardContent>
                    <CardActions>
                        <Button
                            disabled={!isValid}
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ marginRight: 1 }}
                        >
                            Edit
                        </Button>
                        <Link href="/stock" passHref>
                            <Button variant="outlined" fullWidth>
                                Cancel
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Form>
        );
    };
    return (
        <Layout>
            <Formik
                validate={(values) => {
                    let errors: any = {};
                    if (!values.name) errors.name = "Enter name";
                    if (values.stock < 3) errors.stock = "Min stock is not lower than 3";
                    if (values.price < 3) errors.price = "Min price is not lower than 3";
                    return errors;
                }}
                initialValues={product!}
                onSubmit={async (values, { setSubmitting }) => {
                    let data = new FormData();
                    data.append("id", String(values.id));
                    data.append("name", values.name);
                    data.append("price", String(values.price));
                    data.append("stock", String(values.stock));
                    if (values.file) {
                        data.append("image", values.file);
                    }
                    await editProduct(data);
                    router.push("/stock");
                    setSubmitting(false);
                }}
            >
                {(props) => showForm(props)}
            </Formik>
        </Layout>
    )
}

export default withAuth(Invoice)