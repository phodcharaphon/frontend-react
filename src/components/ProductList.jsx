import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./ProductList.css"; // ไฟล์ CSS สำหรับปรับแต่งสไตล์
import * as XLSX from "xlsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const filteredProducts = products.filter((product) => {
    const searchKeywords = searchQuery.toLowerCase().split(" ");

    return searchKeywords.every((keyword) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(keyword)
      )
    );
  });

  const totalFilteredItems = filteredProducts.length;
  const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const startIndexFiltered = currentPage * itemsPerPage;
  const endIndexFiltered = startIndexFiltered + itemsPerPage;
  const currentFilteredItems = filteredProducts.slice(
    startIndexFiltered,
    endIndexFiltered
  );

  const handleExportToExcel = () => {
    const formattedData = currentFilteredItems.map((product, index) => [
      index + 1,
      product.locationname,
      product.invioce,
      product.producttype,
      product.unit,
      product.quantity,
      product.unitprice,
      product.price,
      product.user.name
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([
      ['ลำดับ', 'สถานที่', 'เลขที่ใบส่ง', 'ชนิดสินค้า', 'หน่วย', 'จำนวน', 'ราคาต่อหน่วย', 'ยอดขาย', 'ผู้ลงข้อมูล'],
      ...formattedData,
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ควบคุมการผลิต');

    XLSX.writeFile(workbook, 'ควบคุมการผลิต.xlsx');
  };


  return (
    <div className="product-list-container">
      <h2 className="title">ขาย / ผลิต</h2>
      <div className="field is-flex is-align-items-center mb-3">
        <label className="label mr-2">ค้นหา:</label>
        <div className="control is-flex-grow-1">
          <input
            type="text"
            className="input"
            style={{ maxWidth: '25%' }}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="field is-grouped">
        <div className="control">
          <Link to="/products/add" className="button is-primary">
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>เพิ่มข้อมูล</span>
          </Link>
        </div>
        <div className="control">
          <button className="button is-success" onClick={handleExportToExcel}>
            <span className="icon">
              <i className="fas fa-file-excel"></i>
            </span>
            <span>Excel</span>
          </button>
        </div>
      </div>
      </div>
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th className="has-text-centered">ลำดับ</th>
              <th className="has-text-centered">สถานที่</th>
              <th className="has-text-centered">เลขที่ใบส่ง</th>
              <th className="has-text-centered">ชนิดสินค้า</th>
              <th className="has-text-centered">หน่วย</th>
              <th className="has-text-centered">จำนวน</th>
              <th className="has-text-centered">ราคาต่อหน่วย</th>
              <th className="has-text-centered">ยอดขาย</th>
              <th className="has-text-centered">ผู้ลงข้อมูล</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentFilteredItems.map((product, index) => (
              <tr key={product.uuid}>
                <td className="is-vcentered has-text-centered">{startIndexFiltered + index + 1}</td>
                <td className="is-vcentered has-text-centered is-multiline">{product.locationname}</td>
                <td className="is-vcentered has-text-centered">{product.invioce}</td>
                <td className="is-vcentered has-text-centered">{product.producttype}</td>
                <td className="is-vcentered has-text-centered">{product.unit}</td>
                <td className="is-vcentered has-text-centered">{product.quantity}</td>
                <td className="is-vcentered has-text-centered">{product.unitprice}</td>
                <td className="is-vcentered has-text-centered">{product.price}</td>
                <td className="is-vcentered has-text-centered">{product.user.name}</td>
                <td>
                  <div className="buttons">
                    <Link
                      to={`/products/edit/${product.uuid}`}
                      className="button is-info"
                    >
                      <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>แก้ไข</span>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.uuid)}
                      className="button is-danger"
                    >
                      <span className="icon">
                        <i className="fas fa-trash-alt"></i>
                      </span>
                      <span>ลบ</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          className="button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          ย้อนกลับ
        </button>
        <button
          className="button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalFilteredPages - 1}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default ProductList;
