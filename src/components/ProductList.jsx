import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./ProductList.css"; // ไฟล์ CSS สำหรับปรับแต่งสไตล์

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex); 

  return (
    <div className="product-list-container">
      <h2 className="title">ขาย / ผลิต</h2>
      <div className="field is-grouped">
        <p className="control">
          <Link to="/products/add" className="button is-primary">
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>เพิ่มข้อมูล</span>
          </Link>
        </p>
      </div>
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>สถานที่</th>
              <th>เลขที่ใบส่ง</th>
              <th>ชนิดสินค้า</th>
              <th>หน่วย</th>
              <th>จำนวน</th>
              <th>ราคาต่อหน่วย</th>
              <th>ยอดขาย</th>
              <th>ผู้ลงข้อมูล</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={product.uuid}>
                <td>{index + 1}</td>
                <td>{product.locationname}</td>
                <td>{product.invioce}</td>
                <td>{product.producttype}</td>
                <td>{product.unit}</td>
                <td>{product.quantity}</td>
                <td>{product.unitprice}</td>
                <td>{product.price}</td>
                <td>{product.user.name}</td>
                <td>
                  <div className="buttons">
                    <Link
                      to={`/products/edit/${product.uuid}`}
                      className="button is-small is-info"
                    >
                      <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>แก้ไข</span>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.uuid)}
                      className="button is-small is-danger"
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
          Previous
        </button>
        <button
          className="button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
