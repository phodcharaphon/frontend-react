import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h1 className="title">ตารางการผลิต</h1>
      <h2 className="subtitle">ข้อมูลการผลิต</h2>
      <Link to="/products/add" className="button is-primary mb-2">
        เพิ่มข้อมูล
      </Link>
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
          {products.map((product, index) => (
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
