import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./DrivingList.css";

const DrivingList = () => {
  const [drivings, setDrivings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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

  const totalItems = drivings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = drivings.slice(startIndex, endIndex);

  return (
    <div className="driving-list-container">
      <h2 className="title">ตารางการวิ่งรถ</h2>
      <div className="field is-grouped">
        <p className="control">
          <Link to="/drivings/add" className="button is-primary">
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
            {currentItems.map((driving, index) => (
              <tr key={driving.uuid}>
                <td>{startIndex + index + 1}</td>
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
                      className="button is-small is-info"
                    >
                      <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>แก้ไข</span>
                    </Link>
                    <button
                      onClick={() => deleteDriving(driving.uuid)}
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

export default DrivingList;
