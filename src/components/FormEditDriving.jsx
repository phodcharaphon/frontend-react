import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditDriving = () => {
    const [nocars, setNocars] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");
    const [distance, setDistance] = useState("");
    const [department, setDepartment] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDrivingById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/drivings/${id}`);
                setNocars(response.data.nocars);
                setName(response.data.name);
                setStatus(response.data.status);
                setNote(response.data.note);
                setDistance(response.data.distance);
                setDepartment(response.data.department);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getDrivingById();
    }, [id]);

    const updateDriving = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/drivings/${id}`, {
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
            <h2 className="subtitle">แก้ไขข้อมูล</h2>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateDriving}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">ทะเบียน</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={nocars}
                                        onChange={(e) => setNocars(e.target.value)}
                                        placeholder="Driving Name"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">ชื่อผู้ขับ</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Price"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">สถานะ</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        placeholder="Price"
                                    />
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
                                        placeholder="Price"
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
                                        placeholder="Price"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">สาขา</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        placeholder="Price"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        อัพเดต
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

export default FormEditDriving;
