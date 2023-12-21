import React from 'react'
import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth';
import router from "next/router";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import CustomNoRowsOverlay from '@/components/Reusables/CustomNoRowsOverlay';
import { useAppDispatch } from '@/store/store';
import { getProducts, productSelector } from '@/store/slices/productSlice';
import { useSelector } from 'react-redux';
import { IconButton, Stack, Typography, Box, Button } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductData } from '@/models/product.model';
import sweetAlertService from '@/services/SweetAlert';
type Props = {}

const Stock = (props: Props) => {
    const dispatch = useAppDispatch();
    const productList = useSelector(productSelector);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] =
        React.useState<ProductData | null>(null);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const showDialog = async () => {
        if (selectedProduct === null) {
            return;
        }
        const result = await sweetAlertService.showConfirm('Confirmation', 'Are you sure you want to proceed?');
        if (result.isConfirmed) {
            sweetAlertService.showAlert('success', 'Action confirmed!');
        } else {
            sweetAlertService.showAlert('info', 'Action canceled.');
        }
    }
    const handleDeleteConfirm = () => {
        if (selectedProduct) {
            // dispatch(deleteProduct(String(selectedProduct.id)));
            // setOpenDialog(false);
        }
    };
    React.useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Product Code', width: 150 },
        { field: 'name', headerName: 'Name', flex: 1 },
        {
            field: 'price',
            headerName: 'Price',
            flex: 1,
            align: 'right',
            headerAlign: 'right'
            , renderCell: ({ value }: GridRenderCellParams<String>) => (
                <Typography variant='body1' >
                    <NumericFormat value={value} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />
                    {/* prefix='฿' */}
                </Typography>
            ),
        },
        {
            headerName: "stock",
            field: "stock",
            flex: 1,
            align: 'right',
            headerAlign: 'right',
            renderCell: ({ value }: GridRenderCellParams<String>) => (
                <Typography variant='body1' >
                    <NumericFormat value={value} displayType={'text'} thousandSeparator={true} decimalScale={0} fixedDecimalScale={true} />
                </Typography>
            ),
        },
        {
            headerName: 'ACTION',
            field: '.',
            width: 120,
            renderCell: ({ row }: GridRenderCellParams<ProductData>) => (
                <Stack direction="row" >
                    <IconButton
                        aria-label="edit"
                        size="medium"
                        onClick={() => router.push(`/stock/edit?id=${row.id}`)}
                    >
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        size="medium"
                        onClick={() => {
                            setSelectedProduct({
                                ...row
                            });
                            showDialog();
                        }}
                    >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <Layout>
            <DataGrid
                sx={{ backgroundColor: "white", height: "75vh" }}
                rows={productList ?? []}
                columns={columns}
                components={{
                    Toolbar: GridToolbar,
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                disableRowSelectionOnClick
            />

        </Layout >
    )
}

export default withAuth(Stock)