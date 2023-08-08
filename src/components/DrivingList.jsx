import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DrivingList = () => {
  const [drivings, setDrivings] = useState([]);

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

  return (
    <div>
      <h1 className="title">ตารางการวิ่งรถ</h1>
      <h2 className="subtitle">ข้อมูลการวิ่งรถ</h2>
      <Link to="/drivings/add" className="button is-primary mb-2">
        เพิ่มข้อมูล
      </Link>
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
          {drivings.map((driving, index) => (
            <tr key={driving.uuid}>
              <td>{index + 1}</td>
              <td>{driving.nocars}</td>
              <td>{driving.name}</td>
              <td>{driving.status}</td>
              <td>{driving.note}</td>
              <td>{driving.distance}</td>
              <td>{driving.department}</td>
              <td>{driving.user.name}</td>
              <td>
                <Link
                  to={`/drivings/edit/${driving.uuid}`}
                  className="button is-small is-info"
                >
                  แก้ไข
                </Link>
                <button
                  onClick={() => deleteDriving(driving.uuid)}
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

export default DrivingList;
