import { Box, Button, Card, CardContent, CardMedia } from '@mui/material';
import React from 'react'
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, FormikProps } from "formik";
import Router, { useRouter } from 'next/router'
import { useAppDispatch } from '@/store/store';
import { signUp } from '@/store/slices/userSlice'
import withAuth from './../components/withAuth';
type Props = {}

const Register = ({ }: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const showForm = ({
        handleSubmit,
    }: FormikProps<any>) => {
        return (
            <Form onSubmit={handleSubmit}>
                <Field
                    component={TextField}
                    name="username"
                    id="username"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoComplete="email"
                    autoFocus
                />
                <Field
                    component={TextField}
                    name="password"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />

                <Button type="submit" fullWidth variant="contained" color="primary">
                    Register
                </Button>
                <Button
                    fullWidth
                    size="small"
                    color="primary"
                    onClick={() => router.push("/login")}
                >
                    Cancel
                </Button>
            </Form>
        );
    };
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image="/static/img/logo.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={async (values) => {
                                // alert(JSON.stringify(values, null, 2));
                                const response = await dispatch(signUp(values))
                                if (response.meta.requestStatus === 'rejected') {
                                    alert("Register failed")
                                } else {
                                    router.push('/login')
                                }
                            }}
                        >
                            {(props) => showForm(props)}
                        </Formik>
                    </CardContent>
                </Card>
                <style jsx global>
                    {`
                body {
                min-height: 1vh;
                position: relative;
                margin: 0;
                background-size: cover;
                background-image: url("https://media.istockphoto.com/id/186826701/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B9%81%E0%B8%9A%E0%B8%95%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88%E0%B8%A3%E0%B8%96%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B9%8C.jpg?s=2048x2048&w=is&k=20&c=JscGEYMSCjD1hvXsc0pk1HwnnDXIgC3UwOCPqtDmZnk=");
                text-align: center;
                }
                `}
                </style>
            </Box>
        </React.Fragment>
    )
}

export default withAuth(Register)