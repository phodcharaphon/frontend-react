import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./DrivingList.css";
import * as XLSX from "xlsx";

const DrivingList = () => {
  const [drivings, setDrivings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    getDrivings();
  }, []);

  const getDrivings = async () => {
    const response = await axios.get("http://localhost:5000/drivings");
    setDrivings(response.data);
  };

  const deleteDriving = async (drivingId) => {
    await axios.delete(`http://localhost:5000/drivings/${drivingId}`);
    getDrivings();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const filteredDrivings = drivings.filter((driving) => {
    const searchKeywords = searchQuery.toLowerCase().split(" ");

    return searchKeywords.every((keyword) =>
      Object.values(driving).some((value) =>
        value.toString().toLowerCase().includes(keyword)
      )
    );
  });

  const totalFilteredItems = filteredDrivings.length;
  const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const startIndexFiltered = currentPage * itemsPerPage;
  const endIndexFiltered = startIndexFiltered + itemsPerPage;
  const currentFilteredItems = filteredDrivings.slice(
    startIndexFiltered,
    endIndexFiltered
  );

  const handleExportToExcel = () => {
    const formattedData = currentFilteredItems.map((driving, index) => [
      index + 1,
      driving.nocars,
      driving.name,
      driving.status,
      driving.note,
      driving.distance,
      driving.department,
      driving.user.name
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([
      ['ลำดับ', 'ทะเบียนรถ', 'เจ้าของรถ', 'สถานะ', 'หมายเหตุ', 'ระยะทาง', 'สาขา', 'ผู้ลงข้อมูล'],
      ...formattedData,
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'รายงานการวิ่งรถ');

    XLSX.writeFile(workbook, 'รายงานการวิ่งรถ.xlsx');
  };

  return (
    <div className="driving-list-container">
      <h2 className="title">ตารางการวิ่งรถ</h2>

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
          <Link to="/drivings/add" className="button is-primary">
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
              <th>ลำดับ</th>
              <th>ทะเบียนรถ</th>
              <th>เจ้าของรถ</th>
              <th>สถานะ</th>
              <th>หมายเหตุ</th>
              <th>ระยะทาง</th>
              <th>สาขา</th>
              <th>ผู้ลงข้อมูล</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentFilteredItems.map((driving, index) => (
              <tr key={driving.uuid}>
                <td>{startIndexFiltered + index + 1}</td>
                <td>{driving.nocars}</td>
                <td>{driving.name}</td>
                <td>{driving.status}</td>
                <td>{driving.note}</td>
                <td>{driving.distance}</td>
                <td>{driving.department}</td>
                <td>{driving.user.name}</td>
                <td>

                  <div className="buttons">
                    <Link
                      to={`/drivings/edit/${driving.uuid}`}
                      className="button is-info"
                    >
                      <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>แก้ไข</span>
                    </Link>
                    <button
                      onClick={() => deleteDriving(driving.uuid)}
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

export default DrivingList;