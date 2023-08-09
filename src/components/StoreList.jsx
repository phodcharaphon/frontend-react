import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./StoreList.css"; // ไฟล์ CSS สำหรับปรับแต่งสไตล์

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    const response = await axios.get("http://localhost:5000/stores");
    setStores(response.data);
  };

  const deleteStore = async (storesId) => {
    await axios.delete(`http://localhost:5000/stores/${storesId}`);
    getStores();
  };

  const totalItems = stores.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = stores.slice(startIndex, endIndex);

  return (
    <div className="store-list-container">
      <h2 className="title">ตารางน้ำมัน</h2>
      <div className="field is-grouped">
        <p className="control">
          <Link to="/stores/add" className="button is-primary">
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
            {currentItems.map((store, index) => (
              <tr key={store.uuid}>
                <td>{index + 1}</td>
                <td>{store.datetime}</td>
                <td>{store.nocars}</td>
                <td>{store.milesbefore}</td>
                <td>{store.milesbehind}</td>
                <td>{store.distance}</td>
                <td>{store.fuel}</td>
                <td>{store.average}</td>
                <td>{store.user.name}</td>
                <td>
                  <div className="buttons">
                    <Link
                      to={`/stores/edit/${store.uuid}`}
                      className="button is-small is-info"
                    >
                      <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>แก้ไข</span>
                    </Link>
                    <button
                      onClick={() => deleteStore(store.uuid)}
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

export default StoreList;