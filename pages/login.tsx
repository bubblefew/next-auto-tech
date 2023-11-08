import { Box, Button, Card, CardContent, CardMedia } from '@mui/material';
import React from 'react'
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, FormikProps } from "formik";
import Router, { useRouter } from 'next/router'
import { useAppDispatch } from '@/store/store';
import { signIn } from '@/store/slices/userSlice';

type Props = {}

const Login = ({ }: Props) => {
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
                    Login
                </Button>
                <Button
                    fullWidth
                    size="small"
                    color="primary"
                    onClick={() => router.push("/register")}
                >
                    Register
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
                                const response = await dispatch(signIn(values))
                                console.log(response);

                                if (response.meta.requestStatus === 'rejected') {
                                    alert("login failed")
                                } else {
                                    router.push('/stock')
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
                background-image: url("/static/img/login-bg.jpg");
                text-align: center;
                }
                `}
                </style>
            </Box>
        </React.Fragment>
    )
}

export default Login