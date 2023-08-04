import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      <h1 className="title">สมาชิก</h1>
      <h2 className="subtitle">ตารางสมาชิก</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        เพิ่มข้อมูล
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th className="center">No</th>
            <th className="center">Name</th>
            <th className="center">Username</th>
            <th className="center">Role</th>
            <th className="center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td className="center">{index + 1}</td>
              <td className="center">{user.name}</td>
              <td className="center">{user.username}</td>
              <td className="center">{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  แก้ไข
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
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

export default Userlist;
