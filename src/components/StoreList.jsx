import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Paper, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Button } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";

const StoreList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleExportExcel = () => {
    const formattedData = products.map((product) => ({
      uuid: product.id,
      locationname: product.locationname,
      invioce: product.invioce,
      producttype: product.producttype,
      unit: product.unit,
      quantity: product.quantity,
      unitprice: product.unitprice,
      price: product.price
      // เรียกข้อมูล excel
    }));

    //export excel
    const sheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(fileData, 'data.xlsx');
  };

  return (
    <Grid item xs={6}>
      <Button variant="contained" color="primary" onClick={handleExportExcel}>
        Export
      </Button>
      {/* You can add a button for printing here */}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Locationname</TableCell>
                  <TableCell>Invioce</TableCell>
                  <TableCell>Producttype</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unitprice</TableCell>
                  <TableCell>Price</TableCell>
                  {/* Add more table headers here */}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, i) => (
                  <TableRow key={product.uuid}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{product.locationname}</TableCell>
                    <TableCell>{product.invioce}</TableCell>
                    <TableCell>{product.producttype}</TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.unitprice}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                    <Link
                  to={`/products/edit/${product.uuid}`}
                  className="button is-small is-info"
                >
                  แก้ไข
                </Link>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  className="button is-small is-danger"
                >
                  ลบ
                </button>
                    </TableCell>
                    {/* Render more table cells here */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StoreList