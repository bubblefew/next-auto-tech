import React from 'react'
import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import { Box } from '@mui/material';
import styled from '@mui/system/styled';
type Props = {}



const customer = ({ }: Props) => {
    return (
        <Layout>
            <Box sx={{ flexGrow: 1, p: 2, border: '1px dashed grey' }}>
                This is a section containersasdsad
            </Box>
        </Layout>
    )
}

export default withAuth(customer)