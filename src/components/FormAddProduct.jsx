import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [locationname, setLocationname] = useState("");
  const [invioce, setInvioce] = useState("");
  const [producttype, setProducttype] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitprice, setUnitprice] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", {
        locationname: locationname,
        invioce: invioce,
        producttype: producttype,
        unit: unit,
        quantity: quantity,
        unitprice: unitprice,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    const calculatePrice = () => {
      const qty = parseFloat(quantity);
      const uprice = parseFloat(unitprice);

      if (!isNaN(qty) && !isNaN(uprice)) {
        setPrice(qty * uprice);
      } else {
        setPrice("");
      }
    };
    calculatePrice();
  }, [quantity, unitprice]);

  return (
    <div>
      <h2 className="subtitle">เพิ่มข้อมูล</h2>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">สถานที่</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={locationname}
                    onChange={(e) => setLocationname(e.target.value)}
                    placeholder="สถานที่"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">เลขที่ใบส่ง</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={invioce}
                    onChange={(e) => setInvioce(e.target.value)}
                    placeholder="เลขที่ใบส่ง"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">ชนิดสินค้า</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={producttype}
                    onChange={(e) => setProducttype(e.target.value)}
                    placeholder="ชนิดสินค้า"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">หน่วย</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="หน่วย"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">จำนวน</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="จำนวน"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">ราคาต่อหน่วย</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={unitprice}
                    onChange={(e) => setUnitprice(e.target.value)}
                    placeholder="ราคาต่อหน่วย"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">ยอดขาย</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={price}
                    placeholder="ยอดขาย"
                    disabled
                  />
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

export default FormAddProduct;
