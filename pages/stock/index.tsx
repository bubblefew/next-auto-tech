import React from 'react'
import Layout from '@/components/Layouts/Layout'
import withAuth from './../../components/withAuth';

type Props = {}

const Index = ({ }: Props) => {

    return (
        <Layout>
            <></>
        </Layout >
    )
}

export default withAuth(Index)