import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns"; // เพิ่มการ import parseISO

const FormEditStore = () => {
    const [date, setDate] = useState(""); // เริ่มต้นเป็นวันที่ปัจจุบัน
    const [time, setTime] = useState("");
    const [nocars, setNocars] = useState("");
    const [milesbefore, setMilesbefore] = useState("");
    const [milesbehind, setMilesbehind] = useState("");
    const [distance, setDistance] = useState("");
    const [fuel, setFuel] = useState("");
    const [average, setAverage] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getStoreById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/stores/${id}`);
                const storeData = response.data;
                const storeDate = parseISO(storeData.date); // ใช้ parseISO เพื่อแปลงสตริงเป็นวัตถุวันที่
                setDate(storeDate);
                setTime(storeData.time);
                setNocars(response.data.nocars);
                setMilesbefore(response.data.milesbefore);
                setMilesbehind(response.data.milesbehind);
                setDistance(response.data.distance);
                setFuel(response.data.fuel);
                setAverage(response.data.average);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getStoreById();
    }, [id]);

    const updateStore = async (e) => {
        e.preventDefault();
        try {
            const formattedDate = date.toISOString().substr(0, 10);
            await axios.patch(`http://localhost:5000/stores/${id}`, {
                date: formattedDate,
                time: time,
                nocars: nocars,
                milesbefore: milesbefore,
                milesbehind: milesbehind,
                distance: distance,
                fuel: fuel,
                average: average,
            });
            navigate("/stores");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const handleTimeChange = (e) => {
        const selectedTime = e.target.value;
        setTime(selectedTime);
    };


    useEffect(() => {
        const calculate = () => {
            const qtydistance = parseFloat(distance);
            const upfuel = parseFloat(fuel);

            if (!isNaN(qtydistance) && !isNaN(upfuel)) {
                setAverage(qtydistance / upfuel);
            } else {
                setAverage('');
            }
        };
        calculate();
    }, [distance, fuel]);

    useEffect(() => {
        const calculates = () => {
            const qtmilesbehind = parseFloat(milesbehind);
            const upmilesbefore = parseFloat(milesbefore);

            if (!isNaN(qtmilesbehind) && !isNaN(upmilesbefore)) {
                setDistance(qtmilesbehind - upmilesbefore);
            } else {
                setDistance('');
            }
        };
        calculates();
    }, [milesbehind, milesbefore]);

    return (
        <div>
            <h2 className="subtitle">แก้ไขข้อมูล</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateStore}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">วันที่</label>
                                <div className="control">
                                    <DatePicker
                                        selected={date}
                                        onChange={date => setDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="input"
                                        placeholderText="วันที่"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">เวลา</label>
                                <div className="control">
                                    <input
                                        type="time"
                                        className="input"
                                        defaultValue={time}
                                        onBlur={handleTimeChange} // เพิ่ม event handler สำหรับ onBlur ในการเปลี่ยนแปลงค่าเวลา
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
                                        value={nocars}
                                        onChange={(e) => setNocars(e.target.value)}
                                        placeholder="เจ้าของรถ"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">ไมล์ก่อน</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={milesbefore}
                                        onChange={(e) => setMilesbefore(e.target.value)}
                                        placeholder="ไมล์ก่อน"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">ไมล์หลัง</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={milesbehind}
                                        onChange={(e) => setMilesbehind(e.target.value)}
                                        placeholder="ไมล์หลัง"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">ระยะทาง</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={distance}
                                        onChange={(e) => setDistance(e.target.value)}
                                        placeholder="ระยะทาง"
                                        required
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">น้ำมัน/ลิตร</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={fuel}
                                        onChange={(e) => setFuel(e.target.value)}
                                        placeholder="น้ำมัน/ลิตร"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Average</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={average}
                                        onChange={(e) => setAverage(e.target.value)}
                                        placeholder="Average"
                                        required
                                        disabled
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

export default FormEditStore;
