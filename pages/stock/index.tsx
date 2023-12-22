import Layout from "@/components/Layouts/Layout";
import withAuth from "@/components/withAuth";
import React from "react";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridToolbar,
    GridToolbarContainer,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useAppDispatch } from "@/store/store";
import {
    getProducts,
    productSelector,
} from "@/store/slices/productSlice";
import { useSelector } from "react-redux";
import "react-medium-image-zoom/dist/styles.css";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { NumericFormat } from 'react-number-format';
import router from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductData } from "@/models/product.model";
import Link from "next/link";
import { Add } from "@mui/icons-material";
import CustomNoRowsOverlay from "@/components/Reusables/CustomNoRowsOverlay";
import Swal from "sweetalert2";



const CustomToolbar: React.FunctionComponent<{
    setFilterButtonEl: React.Dispatch<
        React.SetStateAction<HTMLButtonElement | null>
    >;
}> = ({ setFilterButtonEl }) => (
    <GridToolbarContainer>
        <GridToolbarFilterButton ref={setFilterButtonEl} />
        <Link href="/stock/add" passHref>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                }}
            >
                <Add />
            </Fab>
        </Link>
    </GridToolbarContainer>
);

type Props = {};

const Stock = ({ }: Props) => {
    const dispatch = useAppDispatch();
    const productList = useSelector(productSelector);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] =
        React.useState<ProductData | null>(null);
    const [showAlert, setShowAlert] = React.useState(false);
    const [filterButtonEl, setFilterButtonEl] =
        React.useState<HTMLButtonElement | null>(null);

    React.useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const showDialog = () => {
        if (selectedProduct === null) {
            return;
        }

        return (
            <Dialog
                open={openDialog}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Confirm to delete the product? : {selectedProduct.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You cannot restore deleted product.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="info">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const handleDeleteConfirm = () => {
        if (selectedProduct) {
            // dispatch(deleteProduct(String(selectedProduct.id)));
            setOpenDialog(false);
            Swal.fire({
                icon: "success",
                title: "Deleted",
                showConfirmButton: true,
            });
        }
    };


    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        // {
        //     disableColumnMenu: true,
        //     headerName: "IMG",
        //     field: "image",
        //     width: 80,
        //     renderCell: ({ value }: GridRenderCellParams<ProductData>) => (
        //         <Zoom>
        //             <Image
        //                 height={500}
        //                 width={500}
        //                 objectFit="cover"
        //                 alt="product image"
        //                 src={productImageURL(value)}
        //                 style={{ width: 70, height: 70, borderRadius: "5%" }}
        //             />
        //         </Zoom>
        //     ),
        // },
        {
            field: "name",
            headerName: "Name",
            // width: 350,
            flex: 1
        },
        {
            field: "stock",
            headerName: "STOCK",
            width: 150,
            renderCell: ({ value }: GridRenderCellParams<ProductData>) => (
                <Typography variant="body1">
                    <NumericFormat
                        value={value}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={0}
                        fixedDecimalScale={true}
                    />
                </Typography>
            ),
        },
        {
            headerName: "PRICE",
            field: "price",
            width: 120,
            renderCell: ({ value }: GridRenderCellParams<ProductData>) => (
                <Typography variant="body1">
                    <NumericFormat
                        value={value}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={"฿"}
                    />
                </Typography>
            ),
        },
        // {
        //     headerName: "TIME",
        //     field: "createdAt",
        //     width: 220,
        //     renderCell: ({ value }: GridRenderCellParams<ProductData>) => (
        //         <Typography variant="body1">
        //             <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        //         </Typography>
        //     ),
        // },
        {
            headerName: "ACTION",
            field: ".",
            width: 120,
            renderCell: ({ row }: GridRenderCellParams<ProductData>) => (
                <Stack direction="row">
                    <IconButton
                        aria-label="edit"
                        size="large"
                        onClick={() => router.push("/stock/edit?id=" + row.id)}
                    >
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                            setSelectedProduct(row);
                            setOpenDialog(true);
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

            {/* Summary Icons */}
            {/* <Grid container style={{ marginBottom: 16 }} spacing={7}>
                <Grid item lg={3} md={6} sm={12}>
                    <StockCard
                        icon={AddShoppingCart}
                        title="TOTAL"
                        subtitle="112 THB"
                        color="#00a65a"
                    />
                </Grid>

                <Grid item lg={3} md={6} sm={12}>
                    <StockCard
                        icon={NewReleases}
                        title="EMPTY"
                        subtitle="9 PCS."
                        color="#f39c12"
                    />
                </Grid>

                <Grid item lg={3} md={6} sm={12}>
                    <StockCard
                        icon={AssignmentReturn}
                        title="RETURN"
                        subtitle="1 PCS."
                        color="#dd4b39"
                    />
                </Grid>

                <Grid item lg={3} md={6} sm={12}>
                    <StockCard
                        icon={Star}
                        title="LOSS"
                        subtitle="5 PCS."
                        color="#00c0ef"
                    />
                </Grid>
            </Grid> */}

            <DataGrid
                sx={{ backgroundColor: "white", height: "85vh", width: '100%' }}
                rows={productList ?? []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                disableRowSelectionOnClick
                localeText={{
                    toolbarDensity: 'Size',
                    toolbarDensityLabel: 'Size',
                    toolbarDensityCompact: 'Small',
                    toolbarDensityStandard: 'Medium',
                    toolbarDensityComfortable: 'Large',
                }}
                slots={{
                    toolbar: GridToolbar,
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
            />
            {showDialog()}
        </Layout>
    );
};

export default withAuth(Stock);
