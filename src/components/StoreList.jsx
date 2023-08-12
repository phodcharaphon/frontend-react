import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./StoreList.css"; // ไฟล์ CSS สำหรับปรับแต่งสไตล์
import * as XLSX from "xlsx";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const filteredStores = stores.filter((store) => {
    const searchKeywords = searchQuery.toLowerCase().split(" ");

    return searchKeywords.every((keyword) =>
      Object.values(store).some((value) =>
        value.toString().toLowerCase().includes(keyword)
      )
    );
  });

  const totalFilteredItems = filteredStores.length;
  const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const startIndexFiltered = currentPage * itemsPerPage;
  const endIndexFiltered = startIndexFiltered + itemsPerPage;
  const currentFilteredItems = filteredStores.slice(
    startIndexFiltered,
    endIndexFiltered
  );

  const handleExportToExcel = () => {
    const formattedData = currentFilteredItems.map((store, index) => [
      index + 1,
      store.date,
      store.time,
      store.nocars,
      store.milesbefore,
      store.milesbehind,
      store.distance,
      store.fuel,
      store.average,
      store.user.name
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([
      ['ลำดับ', 'วันที่', 'เวลา', 'ทะเบียนรถ', 'ไมล์ก่อน', 'ไมล์หลัง', 'ระยะทาง', 'น้ำมัน / ลิตร', 'Average', 'ผู้ลงข้อมูล'],
      ...formattedData,
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ตารางน้ำมัน');

    XLSX.writeFile(workbook, 'ตารางน้ำมัน.xlsx');
  };


  return (
    <div className="store-list-container">
      <h2 className="title">ตารางน้ำมัน</h2>
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
            <Link to="/stores/add" className="button is-primary">
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
            <tr className="has-text-centered">
              <th>ลำดับ</th>
              <th>วันที่</th>
              <th>เวลา</th>
              <th>ทะเบียน</th>
              <th>ไมล์ก่อน</th>
              <th>ไมล์หลัง</th>
              <th>ระยะทาง</th>
              <th>น้ำมัน/ลิตร</th>
              <th>Average</th>
              <th>ผู้ลงข้อมูล</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {currentFilteredItems.map((store, index) => (
              <tr key={store.uuid}>
                <td className="is-vcentered has-text-centered">{startIndexFiltered + index + 1}</td>
                <td className="is-vcentered has-text-centered">{store.date}</td>
                <td className="is-vcentered has-text-centered">{store.time}</td>
                <td className="is-vcentered has-text-centered">{store.nocars}</td>
                <td className="is-vcentered has-text-centered">{store.milesbefore}</td>
                <td className="is-vcentered has-text-centered">{store.milesbehind}</td>
                <td className="is-vcentered has-text-centered">{store.distance}</td>
                <td className="is-vcentered has-text-centered">{store.fuel}</td>
                <td className="is-vcentered has-text-centered">{store.average}</td>
                <td className="is-vcentered has-text-centered">{store.user.name}</td>
                <td>
                  <div className="buttons">
                    <Link
                      to={`/stores/edit/${store.uuid}`}
                      className="button is-info"
                    >
                      <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>แก้ไข</span>
                    </Link>
                    <button
                      onClick={() => deleteStore(store.uuid)}
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

export default StoreList;