import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
    GridRowId,
    GridRowModel,
    GridFilterModel,
} from '@mui/x-data-grid';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { getProducts, productSelector } from "@/store/slices/invoiceSlice";
import { useSelector } from "react-redux";
import { ProductItemData } from "@/models/invoice.model";
import { useAppDispatch } from '@/store/store';
import { NumericFormat } from 'react-number-format';

const GridProductInvoice = ({ }) => {
    const dispatch = useAppDispatch();
    const productList = useSelector(productSelector);
    const [selectedRows, setSelectedRows] = React.useState<Map<GridRowId, GridRowModel>>(
        new Map()
    );
    React.useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [],
        quickFilterExcludeHiddenColumns: false,
    });
    const handleSelectionModelChange = (selectionModel: GridRowId[] | undefined) => {
        // Extract selected row models and update the Map
        const newSelectedRows = new Map<GridRowId, GridRowModel>();
        console.log(selectionModel);

        selectionModel?.forEach((rowId) => {
            const selectedRow = productList?.find((row) => row.id === rowId);
            if (selectedRow) {
                newSelectedRows.set(rowId, selectedRow);
            }
        });
        setSelectedRows(newSelectedRows);
    };


    const handleEditCellChange = (params: any) => {
        console.log(params);
    }
    const getSelectedRows = () => {
        return selectedRows;
    };
    const columns: GridColDef[] = [
        {
            headerName: "Id",
            field: "id",
            minWidth: 120,
            maxWidth: 120
        },
        {
            headerName: "Name",
            field: "name",
            minWidth: 500,
            maxWidth: 555
            // flex: 1
        },
        {
            headerName: "Stock",
            field: "stock",
            minWidth: 120,
            maxWidth: 200,
            renderCell: ({ value }: GridRenderCellParams<ProductItemData>) => (
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
            headerName: "Qty",
            field: "qty",
            type: 'number',
            editable: true,
            minWidth: 120,
            maxWidth: 200,
            renderCell: ({ value }: GridRenderCellParams<ProductItemData>) => (
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
            headerName: "Price",
            field: "price",
            type: 'number',
            minWidth: 120,
            maxWidth: 200,
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


    ];
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        selectedRows.forEach((row) => {
            totalPrice += row.price || 0;
        });
        return (
            <Typography variant="body1">
                <NumericFormat
                    value={totalPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={"฿"}
                />
            </Typography>
        );
    };
    return (
        <Box>
            <Typography gutterBottom variant="h6">
                Product List
            </Typography>
            <Box sx={{ width: 1 }}>
                <FormControlLabel
                    checked={filterModel.quickFilterExcludeHiddenColumns}
                    onChange={(event) => {
                        setFilterModel((model: any) => ({
                            ...model,
                            quickFilterExcludeHiddenColumns: (event.target as any).checked
                        }))
                    }}
                    control={<Switch color="primary" size="small" />}
                    label="Show selected items"
                />
            </Box>
            <Box sx={{ height: 600 }}>
                <DataGrid
                    density="compact"
                    checkboxSelection
                    columns={columns}
                    // rows={productList ?? []}
                    rows={filterModel.quickFilterExcludeHiddenColumns
                        ? productList?.filter(row => selectedRows.has(row.id ?? 0)) ?? []
                        : productList ?? []
                    }
                    disableColumnFilter
                    disableDensitySelector
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: GridToolbarQuickFilter,
                        footer: () => (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '8px' }}>
                                <Typography variant="body1">
                                    Total Price {calculateTotalPrice()}
                                </Typography>
                            </div>
                        )
                    }}
                    onRowSelectionModelChange={handleSelectionModelChange}
                // onCellEditStop={handleEditCellChange}

                // rowSelectionModel={[...selectedRows.keys()]}
                />
            </Box>
            <Box>
                <Typography variant="body1">
                    Selected Rows: {Array.from(selectedRows.keys()).join(', ')}
                </Typography>
                {/* <Typography variant="body1">
                    Selected Rows Map: {JSON.stringify(Array.from(selectedRows))}
                </Typography> */}
                <Typography variant="body1">
                    Get Selected Rows Map: {JSON.stringify(Array.from(getSelectedRows()))}
                </Typography>
            </Box>
        </Box>
    )
}

export default GridProductInvoice