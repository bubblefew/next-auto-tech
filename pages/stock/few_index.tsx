import React from 'react'
import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import CustomNoRowsOverlay from '@/components/Reusables/CustomNoRowsOverlay';

import EditIcon from '@mui/icons-material/Edit';
type Props = {}

const Index = ({ }: Props) => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Battery ID', flex: 1 },
        { field: 'brand', headerName: 'Brand', flex: 1 },
        { field: 'voltage', headerName: 'Voltage (V)', type: 'number', flex: 1 },
        { field: 'capacity', headerName: 'Capacity (Ah)', type: 'number', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        {
            field: 'eidt', headerName: "Edit", width: 150, align: 'center', headerAlign: 'center', renderCell: (params) => (
                <EditIcon onClick={() => handleEdit(params.row.id)} />
            )
        }
    ];

    const handleEdit = (val: number) => {
        alert(val);
    }

    const rows = [
        { id: 1, brand: 'ACME', voltage: 12, capacity: 50, status: 'Good' },
        { id: 2, brand: 'PowerMax', voltage: 24, capacity: 100, status: 'Fair' },
        { id: 3, brand: 'EcoCharge', voltage: 12, capacity: 75, status: 'Excellent' },
    ];

    return (
        <Layout>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                />
            </Box>

        </Layout >
    )
}

export default withAuth(Index)