import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoPricetag,
  IoHome,
  IoLogOut,
  IoCar,
  IoWater
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import "./Sidebar.css"; // เพิ่มไฟล์ CSS สำหรับปรับแต่งสไตล์

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">เมนู</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> หน้าหลัก
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <ul className="menu-list">
            <li>
              <NavLink to={"/drivings"}>
                <IoCar /> การเดินรถ
              </NavLink>
            </li>
          </ul>
        )}
        {user && (user.role === "sale" || user.role === "admin") && (
          <ul className="menu-list">
            <li>
              <NavLink to={"/products"}>
                <IoPricetag /> ผลิต
              </NavLink>
            </li>
          </ul>
        )}
        {user && (user.role === "store" || user.role === "admin") && (
          <div>
            <ul className="menu-list">
              <li>
                <NavLink to={"/stores"}>
                  <IoWater /> สโตร์
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">แอดมิน</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> ผู้ใช้งาน
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">ตั้งค่า</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> ล็อกเอาท์
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;