// GridDataDisplay.js

import React, { useState } from "react";
import {
    Typography,
    Button,
    Paper,
    styled,
    Grid,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";
import { ProductItemData } from "@/models/invoice.model";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const GridDataDisplay = ({ gridData, invoiceNumber, calculateTotalQTY, calculateSubtotal, sendDataToServer,onDelete }: any) => {

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "productName", headerName: "Product Name", flex: 1 },
        {
            field: "productPrice",
            headerName: "Product Price",
            flex: 1,
            renderCell: ({ value }: GridRenderCellParams<ProductItemData>) => (
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
        {
            field: "productQty",
            headerName: "QTY",
            flex: 1,
            renderCell: ({ value }: GridRenderCellParams<ProductItemData>) => (
                <Typography variant="body1">
                    <NumericFormat
                        value={value}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={2}
                        fixedDecimalScale={true}
                    />
                </Typography>
            ),
        },
        {
            field: "productSumPrice",
            headerName: "Total",
            flex: 1,
            renderCell: ({ value }: GridRenderCellParams<ProductItemData>) => (
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
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(params.row.id)}
                >
                    Delete
                </Button>
            ),
        },
    ];
 

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Item>
                    <div style={{ height: 400, width: "100%", padding: 5 }}>
                        <DataGrid
                            rows={gridData}
                            columns={columns}
                            disableRowSelectionOnClick
                        />
                    </div>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <div style={{ height: 400, width: "100%", padding: 5 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ backgroundColor: "#D3D3D3" }}
                    >
                        Invoice Number: {invoiceNumber}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Total QTY:{" "}
                        {calculateTotalQTY().toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </Typography>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ backgroundColor: "#D3D3D3" }}
                    >
                        Total Amount:{" "}
                        {calculateSubtotal().toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </Typography>
                    <Item>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={sendDataToServer}
                            disabled={!invoiceNumber}
                        >
                            PRINT INVOICE
                        </Button>
                    </Item>
                </div>
            </Grid>
        </Grid>
    );
};

export default GridDataDisplay;
