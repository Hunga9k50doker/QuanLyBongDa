import React, { useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import AdminHeader from "../header/adminHeader";
import Header from "../../../containers/header/header";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
// import { Link } from "react-router-dom";
// import PLayer from "./player";

export default function AddPlayer() {
  const [val, setValidator] = useState([]);
  const [TenCT, setTenCT] = useState("");
  const [idCLB, setIdCLB] = useState("");
  const [SoAo, setNumberClother] = useState("");
  const [ChieuCao, setChieuCao] = useState("");
  const [ViTri, setViTri] = useState("");
  const [LoaiCauThu, setPlayerType] = useState("");

  const [date, setDate] = useState("");
  const [img, setImg] = useState("");
  const [clb, setCLB] = useState([]);
  useEffect(() => {
    getCLB();
  }, []);

  async function getCLB() {
    let result = await fetch("http://127.0.0.1:8000/api/clb");
    result = await result.json();
    setCLB(result);
  }

  async function addPlayer() {
    const formData = new FormData();
    formData.append("TenCT", TenCT);
    formData.append("idCLB", idCLB);
    formData.append("SoAo", SoAo);
    formData.append("ChieuCao", ChieuCao);
    formData.append("LoaiCauThu", LoaiCauThu);
    formData.append("ViTri", ViTri);
    formData.append("NgaySinh", date);
    formData.append("AnhDaiDien", null);
    formData.append("image", img);

    console.log(idCLB, SoAo, ChieuCao, LoaiCauThu, ViTri, TenCT, date, img);

    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));

    let result = await fetch("http://127.0.0.1:8000/api/auth/cauthu/store", {
      method: "post",
      headers: {
        Authorization: "Bearer " + taikhoan.access_token,
        "X-Requested-With": "XMLHttpRequest",
        // "Content-Type": "multipart/form-data",
        // Accept: "application/json",
        type: "formData",
      },
      body: formData,
    });

    result = await result.json();

    console.log("Tr??? v??? addPlayer>>>>>>> :", result);

    if (result.status !== 200) {
      //N???u c?? l???i th?? truy???n v??o cho setValidator
      store.addNotification({
        title: "Th??m  th???t b???i !",
        message:
          "H??y ki???m tra l???i th??ng tin c???a b???n, ?????m b???o th??ng tin h???p l??? v?? kh??ng b??? tr??ng !",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      setValidator(result.status);
    } else {
      setTimeout(() => {
        history.push("/admin/cau-thu");
      }, 1000);
      store.addNotification({
        title: "Th??m  th??nh c??ng !",
        message: "H??y ki???m tra danh s??ch c???a b???n !",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true,
        },
      });
    }
  }

  let history = useHistory();
  function backData() {
    history.push("/admin/cau-thu");
  }

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  return (
    <Helmet title="Th??m c??u l???c b???">
      <AdminHeader />
      <Header title="Th??m c??u l???c b???" />
      <ReactNotification />
      <Row style={{ paddingTop: "50px", background: "#ccc" }}>
        <div className="btn__back" style={{ transform: "translateX(100px)" }}>
          <button onClick={backData}>
            <i class="bx bx-arrow-back"></i>
            <p>Tr??? l???i</p>
          </button>
        </div>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className="form">
            <Form.Group className="mb-3">
              <Form.Label>
                <b>T??n c??u c???u th???</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nh???p t??n c???u th???"
                onChange={(e) => setTenCT(e.target.value)}
                maxlength="30"
              />
              <Form.Text className="text-muted"></Form.Text>
              <Form.Label className="err">--</Form.Label>
              <Form.Label className="err">{val.TenCT}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>???nh ?????i di???n</b>
              </Form.Label>
              <Form.Control
                id="imgPreview"
                type="file"
                placeholder="Ch???n ???nh ?????i di???n"
                onInput={(event) => setImg(event.target.files[0])}
              />

              <Form.Text className="text-muted">-</Form.Text>
              <Form.Label className="err">{val.Logo}</Form.Label>
            </Form.Group>
            <Form.Label>
              <b>C??u l???c b???</b>
            </Form.Label>
            <br />
            <br />
            <Form.Select
              style={{ padding: "10px 15px" }}
              aria-label="Ch???n C??u l???c b???"
              onChange={(e) => setIdCLB(e.target.value)}
            >
              <option>H??y ch???n CLB</option>
              {clb.map((item) => (
                <option value={item.idCLB}>{item.TenCLB}</option>
              ))}
            </Form.Select>
            <br />
            <br />
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Ng??y sinh c???u th???</b>
              </Form.Label>
              <Form.Control
                // value="2018-07-22"
                min="1995-01-01"
                max="2010-1-1"
                name="begin"
                type="date"
                maxlength="50"
                placeholder="yyyy-mm-dd"
                onChange={(e) => setDate(formatDate(e.target.value))}
              />
              <Form.Text className="text-muted"></Form.Text>
              <Form.Label className="err">--</Form.Label>
              <Form.Label className="err">{val.date}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>Chi???u cao</b>
              </Form.Label>
              <Form.Control
                maxlength="5"
                type="number"
                placeholder="H??y nh???p chi???u cao c???u th???"
                onChange={(e) => setChieuCao(e.target.value)}
              />
              <Form.Text className="text-muted">------</Form.Text>
              <Form.Label className="err">{val.ChieuCao}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form------">
              <Form.Label>
                <b>S??? ??o</b>
              </Form.Label>
              <Form.Control
                maxlength="20"
                type="number"
                placeholder="S??? ??o c???u th???"
                onChange={(e) => setNumberClother(e.target.value)}
              />
              <Form.Text className="text-muted">------</Form.Text>
              <Form.Label className="err">{val.SoAo}</Form.Label>
            </Form.Group>
            <Form.Label>
              <b>V??? tr?? c???u th???</b>
            </Form.Label>
            <br />
            <Form.Select
              style={{ padding: " 10px 15px" }}
              onChange={(e) => setViTri(e.target.value)}
              aria-label="Ch???n v??? tr?? c???u th???"
            >
              <option>H??y ch???n v??? tr?? c???u th???</option>
              <option value="Ti???n ?????o">Ti???n ?????o</option>
              <option value="Ti???n v???">Ti???n v???</option>
              <option value="Trung v???">Trung v???</option>
              <option value="H???u v???">H???u v???</option>
              <option value="Th??? m??n">Th??? m??n</option>
            </Form.Select>
            <br />
            <br />
            <br />
            <Form.Label>
              <b>Lo???i c???u th???</b>
            </Form.Label>
            <br />
            <Form.Select
              style={{ padding: " 10px 15px" }}
              onChange={(e) => setPlayerType(e.target.value)}
              aria-label="Ch???n lo???i c???u th???"
            >
              <option>H??y ch???n lo???i c???u th???</option>
              <option value="Trong n?????c">Trong n?????c</option>
              <option value="Ngo??i n?????c">Ngo??i n?????c</option>
            </Form.Select>
            <br />
            <br />
            <br />
            <Button onClick={addPlayer} variant="outline-success">
              <b>Th??m ngay</b>
            </Button>{" "}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Form>
        </Col>
      </Row>
    </Helmet>
  );
}
