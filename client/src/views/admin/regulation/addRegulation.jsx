// import React, { useState } from "react";
// import Helmet from "../../../components/Helmet/Helmet";
// import AdminHeader from "../header/adminHeader";
// import Header from "../../../containers/header/header";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

// import ReactNotification from "react-notifications-component";
// import "react-notifications-component/dist/theme.css";
// import { store } from "react-notifications-component";

// export default function AddClub() {
//   const [val, setValidator] = useState([]);
//   const [DiemThang, setDiemThang] = useState("");
//   const [DiemHoa, setDiemHoa] = useState("");
//   const [DiemThua, setDiemThua] = useState("");
//   const [TruSo, setTruSo] = useState("");
//   const [Logo, setLogo] = useState("");

//   async function addClub() {
//     const formData = new FormData();
//     formData.append("DiemThang", DiemThang);
//     formData.append("DiemHoa", DiemHoa);
//     formData.append("DiemThua", DiemThua);

//     const formData2 = new FormData();
//     formData.append("Logo", Logo);
//     formData.append("TruSo", TruSo);
//     formData.append("image", Logo);
    

//     console.log(DiemThang, DiemHoa, DiemThua, Logo, TruSo);

//     let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
//     let result = await fetch("http://127.0.0.1:8000/api/auth/clb/store", {
//       method: "post",
//       headers: {
//         Authorization: "Bearer " + taikhoan.access_token,
//         "X-Requested-With": "XMLHttpRequest",
//         // "Content-Type": "multipart/form-data",
//         // Accept: "application/json",
//         type: "formData",
//       },
//       body: formData,
//     });
//     result = await result.json();

//     // console.log(
//     //   "Trả về addClub>>>>>>> :" +
//     //     result.status +
//     //     " <<<<<<<<," +
//     //     taikhoan.access_token
//     // );

//     if (result.status !== 200) {
//       //Nếu có lối thì truyền vào cho setValidator

//       store.addNotification({
//         title: "Thêm thất bại !",
//         message: " Kiểm tra lại thông tin của bạn !",
//         type: "danger",
//         insert: "top",
//         container: "top-right",
//         animationIn: ["animate__animated", "animate__fadeIn"],
//         animationOut: ["animate__animated", "animate__fadeOut"],
//         dismiss: {
//           duration: 2000,
//           onScreen: true,
//         },
//       });
//       setValidator(result.message);
//     } else {
//       setTimeout(() => history.push("/admin"), 1000);

//       store.addNotification({
//         title: "Thêm  thành công !",
//         message: "Hãy kiểm tra danh sách của bạn !",
//         type: "success",
//         insert: "top",
//         container: "top-right",
//         animationIn: ["animate__animated", "animate__fadeIn"],
//         animationOut: ["animate__animated", "animate__fadeOut"],
//         dismiss: {
//           duration: 1000,
//           onScreen: true,
//         },
//       });
//     }
//   }

//   let history = useHistory();

//   function backData() {
//     history.push("/admin");
//   }

//   return (
//     <Helmet title="Thêm câu lạc bộ">
//       <AdminHeader />
//       <Header title="Thêm câu lạc bộ" />
//       <ReactNotification />
//       <Row style={{ paddingTop: "50px", background: "#ccc" }}>
//         <div className="btn__back" style={{ transform: "translateX(100px)" }}>
//           <button onClick={backData}>
//             <i class="bx bx-arrow-back"></i>
//             <p>Trở lại</p>
//           </button>
//         </div>
//         <Col md={{ span: 4, offset: 4 }}>
//           <Form className="form">
//             <Form.Group className="mb-3" controlId="form------">
//               <Form.Label>
//                 <b>Tên câu lạc bộ</b>
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Nhập tên câu lạc bộ"
//                 onChange={(e) => setDiemThang(e.target.value)}
//               />
//               <Form.Text className="text-muted"></Form.Text>
//               <Form.Label className="err">--</Form.Label>
//               <Form.Label className="err">{val.DiemThang}</Form.Label>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="form------">
//               <Form.Label>
//                 <b>Tên viết tắt</b>
//               </Form.Label>
//               <Form.Control
//                 maxLength="20"
//                 type="text"
//                 placeholder="Nhập tên viết tắt"
//                 onChange={(e) => setDiemHoa(e.target.value)}
//               />
//               <Form.Text className="text-muted">------</Form.Text>
//               <Form.Label className="err">{val.DiemHoa}</Form.Label>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="form------">
//               <Form.Label>
//                 <b>Sân vận động</b>
//               </Form.Label>
//               <Form.Control
//                 maxLength="11"
//                 type="text"
//                 placeholder="Hãy nhập sân vận động"
//                 onChange={(e) => setDiemThua(e.target.value)}
//               />
//               <Form.Text className="text-muted">------</Form.Text>
//               <Form.Label className="err">{val.DiemThua}</Form.Label>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="form------">
//               <Form.Label>
//                 <b>Chọn Logo câu lạc bộ</b>
//               </Form.Label>
//               <Form.Control
//                 id="Logo"
//                 type="file"
//                 placeholder="Chọn Logo câu lạc bộ"
//                 onChange={(event) => setLogo(event.target.files[0])}
//               />

//               <Form.Text className="text-muted">-</Form.Text>
//               <Form.Label className="err">{val.Logo}</Form.Label>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="form------">
//               <Form.Label>
//                 <b>Trụ sở</b>
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Trụ sở câu lạc bộ"
//                 onChange={(e) => setTruSo(e.target.value)}
//               />
//               <Form.Text className="text-muted">-</Form.Text>
//               <Form.Label className="err">{val.TruSo}</Form.Label>
//             </Form.Group>
//             {/* <Link
//               to={
//                 DiemThang && Logo && TruSo && DiemHoa && DiemThua
//                   ?
//                   "/admin"
//                   : "#" 
//               }
//             > */}
//             <Button  onClick={addClub} variant="outline-success">
//               <b>Thêm ngay</b>
//             </Button>{" "}
//             {/* </Link> */}
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//           </Form>
//         </Col>
//       </Row>
//     </Helmet>
//   );
// }
