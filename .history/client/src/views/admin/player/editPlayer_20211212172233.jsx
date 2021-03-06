import React, { useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import AdminHeader from "../header/adminHeader";
import Header from "../../../containers/header/header";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
// import { Link } from "react-router-dom";
// import PLayer from "./player";

export default function EditPlayer() {
  const [val, setValidator] = useState([]);
  const [data, setData] = useState([]);

  const [TenCT, setTenCT] = useState("");
  const [SoAo, setNumberClother] = useState("");
  const [ChieuCao, setChieuCao] = useState("");
  const [date, setDate] = useState("");
  const [idCLB, setIdCLB] = useState("");
  const [ViTri, setViTri] = useState(data.ViTri);
  const [LoaiCauThu, setPlayerType] = useState(data.LoaiCauThu);
  const [AnhDaiDien, setAnhDaiDien] = useState(data.AnhDaiDien);
  const [image, setImg] = useState(data.image);

  const [clb, setCLB] = useState([]);

  let { id } = useParams();

  console.log("<<<<<<<<<<<<<<<<<<<" + id);

  useEffect(() => {
    getCLB();
    getCauThu();
  }, []);

  async function getCLB() {
    let result = await fetch("http://127.0.0.1:8000/api/clb");
    result = await result.json();
    setCLB(result);
  }

  async function getCauThu() {
    let result = await fetch("http://127.0.0.1:8000/api/cauthu/" + id);
    result = await result.json();
    setData(result);
  }

  async function editPlayer(id) {
    
    const TenCT = document.getElementById("TenCT");
    const idCLB = document.getElementById("idCLB");
    const SoAo = document.getElementById("SoAo");
    const NgaySinh = document.getElementById("NgaySinh");
    const ChieuCao = document.getElementById("ChieuCao");
    const AnhDaiDien = document.getElementById("AnhDaiDien");
    const ViTri = document.getElementById("ViTri");
    const LoaiCauThu = document.getElementById("LoaiCauThu");
    
    const formData = new FormData();
    formData.append("TenCT", TenCT.value);
    formData.append("idCLB", idCLB.value);
    formData.append("SoAo", SoAo.value);
    formData.append("ChieuCao", ChieuCao.value);
    formData.append("LoaiCauThu", LoaiCauThu.value);
    formData.append("ViTri", ViTri.value);
    formData.append("NgaySinh", NgaySinh.value);
    formData.append("AnhDaiDien", null);
    formData.append("image", image);
    
    // console.log(idCLB.value, SoAo.value, ChieuCao.value, LoaiCauThu.value, ViTri.value, TenCT.value, NgaySinh.value, img.value);
    
    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    
    let result = await fetch(
      "http://127.0.0.1:8000/api/auth/cauthu/update/" + id,
      {
        method: "post",
        headers: {
          Authorization: "Bearer " + taikhoan.access_token,
          "X-Requested-With": "XMLHttpRequest",
          // "Content-Type": "multipart/form-data",
          // Accept: "application/json",
          // type: "formData",
        },
        body: formData,
      }
      );
  
      result = await result.json();
      
      console.log("..............." + id);
      console.log("Tr??? v??? editPlayer>>>>>>> :", JSON.stringify(result));
      
    
      // if (result.status !== 200) {
      // } else {
      // }
  
       if (result.status !== 200) {
         setTimeout(() => {
           history.push("/admin/cau-thu");
         }, 1000);
         store.addNotification({
           title: "C???p nh???t  th??nh c??ng !",
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
       } else {
         store.addNotification({
           title: "C???p nh???t  th???t b???i !",
           message:
             "H??y ki???m tra l???i th??ng tin c???a b???n, ?????m b???o th??ng tin h???p l??? v?? kh??ng b??? tr???ng !",
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
       }
       }
      //N???u c?? l???i th?? truy???n v??o cho setValidator
   
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
                <b>T??n c???u th???</b>
              </Form.Label>
              <Form.Control
                id="TenCT"
                type="text"
                placeholder="Nh???p t??n c???u th???"
                defaultValue={data.TenCT}
                maxlength="30"
                onChange={(e) => setTenCT(e.target.value)}
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
                id="AnhDaiDien"
                type="file"
                placeholder="Ch???n ???nh ?????i di???n"
                defaultValue={data.AnhDaiDien}
                // onChange={(event) => setAnhDaiDien(event.target.files[0].name)}
                onInput={(event) => setImg(event.target.files[0])}
              />

              <Form.Text className="text-muted">-</Form.Text>
              <Form.Label className="err">{val.AnhDaiDien}</Form.Label>
            </Form.Group>
            <Form.Label>
              <b>C??u l???c b???</b>
            </Form.Label>
            <br />
            <br />
            <Form.Select
              id="idCLB"
              style={{ padding: "10px 15px" }}
              aria-label="Ch???n C??u l???c b???"
              defaultValue={data.idCLB}
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
            <Form.Group className="mb-3" controlId="ngaysinh">
              <Form.Label>
                <b>Ng??y sinh c???u th???</b>
              </Form.Label>
              <Form.Control
                defaultValue={formatDate(data.NgaySinh)}
                id="NgaySinh"
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
                defaultValue={data.ChieuCao}
                id="ChieuCao"
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
                defaultValue={data.SoAo}
                id="SoAo"
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
              id="ViTri"
              defaultValue={data.ViTri}
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
              defaultValue={data.LoaiCauThu}
              id="LoaiCauThu"
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
            <Button
              onClick={() =>
                // data.NgaySinh && data.AnhDaiDien?
                //  alert('Th??ng tin ch??a ?????y ????? ho???c kh??ng h???p l???')
                editPlayer(data.idCT)
              }
              variant="outline-success"
            >
              <b>S???a ngay</b>
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
