import { useEffect, useState } from "react";
import ReactNotification, { store } from "react-notifications-component";
// import { Link } from "react-router-dom";
import Helmet from "../../../components/Helmet/Helmet";
import AdminHeader from "../header/adminHeader";
import Header from "../../../containers/header/header";
// import { useHistory } from "react-router-dom";

import "./user.scss";
//ip data
const AdminAccount = () => {
  const [val, setValidator] = useState([]);
  const [user, setUser] = useState([]);
  const [infoUser, setInfoUser] = useState("");
  // const [role, setRole] = useState([]);
  const user__id = document.getElementById("UID");
  useEffect(() => {
    getUser();
  }, []);


  // get id

  // get info user theo id
  async function getInfoUser(id) {

    let result = await fetch(
      "http://127.0.0.1:8000/api/auth/user-by-id/" + id,
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + taikhoan.access_token,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
                   

    result = await result.json();
    setInfoUser(result);

  }

  // let index = 1;
  let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
  async function getUser() {
    let result = await fetch("http://127.0.0.1:8000/api/auth/all-user", {
      method: "get",
      headers: {
        Authorization: "Bearer " + taikhoan.access_token,
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    result = await result.json();
    setUser(result);
  }

  // edit user

  async function editUser(id) {
    // const info = document.getElementById("id__user");
    const user = document.getElementById("username");
    const role = document.getElementById("role");
    const formData = new FormData();
    formData.append("username", user.value);
    formData.append("Role", role.value);

    
    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    let result = await fetch("http://127.0.0.1:8000/api/auth/update/" + id, {
      method: "post",
      headers: {
        Authorization: "Bearer " + taikhoan.access_token,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
    });

    result = await result.json();

    // console.log(">>>>>>>>>>>>>>>.." + user.value + role.value);

    // console.log(
    //   "Tr??? v??? addClub>>>>>>>id->>>>>. :" + typeof(id) +

    //     " <<<<<<<<," +
    //    ''
    // );
    // console.log("Tr??? v??? addproduct :", JSON.stringify(result));

    if (result.status !== 200) {
      store.addNotification({
        title: "Ch???nh s???a  th???t b???i!",
        message: "H??y ki???m tra th??ng tin c???a b???n !",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true,
        },
      });
      //N???u c?? l???i th?? truy???n v??o cho setValidator
      setValidator(result.message);
    } else {
      setTimeout(() => window.location.reload(), 1000);
      store.addNotification({
        title: "Ch???nh s???a  th??nh c??ng !",
        message: "H??y ki???m tra list c???a b???n !",
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


  // gan id
  
  async function deleteAccount(id) {
    await fetch("http://127.0.0.1:8000/api/auth/delete/" + id, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + taikhoan.access_token,
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    // console.log(  Authorization);
    setTimeout(() => {
      window.location.reload();
    }, 1000);

    store.addNotification({
      title: "X??a th??nh c??ng",
      message: "H??y ki???m tra",
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

  return (
    <Helmet title="Admin user">
      <AdminHeader />
      <ReactNotification />
      <Header title="T??i kho???n ng?????i d??ng" />
      <div className="component admin">
        <div className="table" style={{ transform: "translateY(-120px)" }}>
          <h1 className="table__title">Danh s??ch T??i kho???n </h1>
          {/* <button className="add">
            <i className="bx bx-plus"></i>
            <p>Th??m</p>
          </button> */}
          <table className="table__content">
            <tr>
              <th>STT</th>
              <th>T??n ?????i di???n</th>
              <th>Email</th>
              <th>M???t kh???u</th>
              <th>Role</th>
              <th>S???a</th>
              <th>X??a</th>
            </tr>

            {user.map((e, index) => (
              <tr key={e.UID}>
                <td>{index + 1}</td>
                <td>{e.username}</td>
                <td>{e.email}</td>
                <td>******???? ???n</td>
                <td>{e.Role}</td>
                <td>
                  {/* <Link to={"/admin/tai-khoan/edit/" + e.UID}> */}
                  <button
                    style={{ margin: "0" }}
                    id="id__user"
                    type="button"
                    className="btn btn-primary edit"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      getInfoUser(e.UID);
                    }}
                    // value= {e.UID}
                  >
                    S???a
                  </button>
                  {/* </Link> */}
                </td>
                <td>
                  <button
                    onClick={() => deleteAccount(e.UID)}
                    className="remove"
                  >
                    X??a
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ch???nh s???a user
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-body-item">
                  <label htmlFor="">ID user:</label>
                  <input
                    id="UID"
                    type="text"
                    defaultValue={infoUser.UID}
                    disabled={true}
                  />
                </div>
                <div className="modal-body-item">
                  <label htmlFor="">User name:</label>
                  <input
                    id="username"
                    type="text"
                    defaultValue={infoUser.username}
                  />
                </div>
                <div className="modal-body-item">
                  <label htmlFor="">Role:</label>
                  <input id="role" type="number" defaultValue={infoUser.Role} />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => console.log(user__id.value)}
                >
                  Cancel
                </button>
                <button
                  onClick={() => editUser(user__id.value)}
                  type="button"
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default AdminAccount;
