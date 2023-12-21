import Layout from '@/components/Layouts/Layout'
import React from 'react'
import withAuth from '@/components/withAuth';

type Props = {}

const report = (props: Props) => {
    return (
        <Layout>
            <div> report </div>
        </Layout>

    )
}

export default withAuth(report)