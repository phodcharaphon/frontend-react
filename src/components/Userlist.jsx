import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./UserList.css"; // ไฟล์ CSS สำหรับปรับแต่งสไตล์

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);

  return (
    <div className="User-list-container">
      <h2 className="title">ตารางผู้ใช้งาน</h2>
      <div className="field is-grouped">
        <p className="control">
          <Link to="/users/add" className="button is-primary">
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
            <th className="has-text-centered">ลำดับ</th>
            <th className="has-text-centered">ชื่อ</th>
            <th className="has-text-centered">ยูสเซอร์</th>
            <th className="has-text-centered">สถานะ</th>
            <th className="has-text-centered"></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.uuid}>
              <td className="is-vcentered has-text-centered">{index + 1}</td>
              <td className="is-vcentered has-text-centered">{user.name}</td>
              <td className="is-vcentered has-text-centered">{user.username}</td>
              <td className="is-vcentered has-text-centered">{user.role}</td>
              <td>
              <div className="buttons">
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-info is-small"
                >
                      <span className="icon">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>แก้ไข</span>
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-danger is-small"
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
          disabled={currentPage === totalPages - 1}
        >
          ถัดไป
        </button>
      </div>
      </div>
  );
};

export default Userlist;
