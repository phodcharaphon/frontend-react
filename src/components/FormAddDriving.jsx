import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddDriving = () => {
    const [nocars, setNocars] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");
    const [distance, setDistance] = useState("");
    const [department, setDepartment] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveDriving = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/drivings", {
                nocars: nocars,
                name: name,
                status: status,
                note: note,
                distance: distance,
                department: department,
            });
            navigate("/drivings");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h2 className="subtitle">เพิ่มข้อมูล</h2>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveDriving}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">ทะเบียนรถ</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={nocars}
                                        onChange={(e) => setNocars(e.target.value)}
                                        placeholder="ทะเบียนรถ"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">เจ้าของรถ</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="เจ้าของรถ"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">สถานะ</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            required
                                        >
                                            <option value="-">-- เลือกสาขา --</option>
                                            <option value="วิ่งงาน">วิ่งงาน</option>
                                            <option value="ไม่ได้วิ่งงาน">ไม่ได้วิ่งงาน</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">หมายเหตุ</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="หมายเหตุ"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">ระยะทาง</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={distance}
                                        onChange={(e) => setDistance(e.target.value)}
                                        placeholder="ระยะทาง"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">สาขา</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            required
                                        >
                                            <option value="-">-- เลือกสาขา --</option>
                                            <option value="เมือง">เมือง</option>
                                            <option value="สังขะ">สังขะ</option>
                                            <option value="ศรีขร">ศรีขร</option>
                                            <option value="กาบเชิง">กาบเชิง</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        บันทึก
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddDriving;