import { Link, useHistory, Redirect } from "react-router-dom";
import ReactNotification, { store } from "react-notifications-component";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

//ip component
import Helmet from "../../components/Helmet/Helmet";

import { google, facebook, twitter, Bg1 } from "../../assets/img";

import "./login.scss";

firebase.initializeApp({
  apiKey: "AIzaSyDLoqcbTDMFuurtAyDgVEKZ6qwo0j0Osjk",
  authDomain: "fir-auth-tutorial-ed11f.firebaseapp.com",
});
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [val, setValidator] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const userAuth = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("user chua login", user);
       
        return;
      }
      console.log("user da login", user);

      // history.replace("/");
      // window.location.reload();
      // username =  {firebase.auth().currentUser.displayName}
      // let email = user.email;
      // let password = user.uid;
      const idToken = await user.getIdToken();
      localStorage.setItem("taikhoan", JSON.stringify(idToken));
     
    });

    return () => userAuth();
  }, []);
  //  state = { isSignedIn: false };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  async function Login() {
    let item = { email, password };
    //Gọi api
    let result = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });

    try {
      result = await result.json();
      console.log("Trả về :", result);

      //dùng localStrage để lưu tài khoản
      localStorage.setItem("taikhoan", JSON.stringify(result));
      //chuyển sang String
      // let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
      // console.log(">>>>>>>>>>>>>>>>>>>>" + taikhoan);
      //Nếu trong local có name thì
      // console.log("name>>>>>>.: ", taikhoan.email);
      // console.log("pass>>>>>: ", taikhoan.password);
      // ktra token co trong tk hay ko
      const token = localStorage.getItem("taikhoan");
      console.log(token);
      // Login thanh cong
      if (result.status === "success") {
        history.replace("/admin");
        window.location.reload();
        store.addNotification({
          title: "Đăng nhập thành công !",
          message: "Chúc bạn có trải nghiệm tuyệt vời với chúng tôi",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      } else {
        if (result.status !== "success") {
          store.addNotification({
            title: "Thông tin tài khoản hoặc mật khẩu sai !",
            message: "Hãy kiểm tra lại emal đăng ký và mật khẩu của bạn !",
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

          // console.log('>>>>>>>>>>>>>>>>>> resul.'+ result.status);
          setError(result.status);
          setValidator(result.message);
        }
      }
    } catch {
      store.addNotification({
        title: "Đăng nhập thất bại !",
        message: "Hãy kiểm tra lại emal đăng ký và mật khẩu của bạn !",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
      });
    }
  }
  console.log("error :", error);

  return (
    <Helmet title="Đăng nhập">
      <ReactNotification />

      <div className="component">
        <img className=" background" src={Bg1} alt="not found" />
        <Form className="login-container form">
          <header className="login-header">Đăng nhập</header>
          <div className="login-body">
            <label for="username" className="login-label">
              <i className="ti-user"></i>
              Tài khoản
            </label>
            <input
              id="username"
              type="email"
              className="info-input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Label className="err">{val.email}</Form.Label>
            <label for="password" className="login-label">
              <i className="ti-key"></i>
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              className="info-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              maxlength="20"
            />
            <Form.Label className="err">{val.password}</Form.Label>
            {/* <p className="login-forgot">
            <a href="">Quên mật khẩu</a>
          </p> */}
            {/* <input
              type="submit"
              value="Đăng Nhập"
              className="btn"
              onClick={Login}
              variant="outline-success"
            /> */}
            <Button onClick={Login} variant="outline-success">
              <b>Đăng nhập</b>
            </Button>{" "}
            <p className="register">
              Chưa có tài khoản? <Link to="/dang-ky">Đăng kí ngay</Link>
            </p>
          </div>

          <footer className="login-footer">
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            ></StyledFirebaseAuth>
            {/* <button
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
              // href="https://accounts.google.com/signin"
            >
              <img className="login-icon" src={google} alt="not found" />
            </button>
            <button
              // href="https://www.facebook.com/"
            >
              <img className="login-icon" src={facebook} alt="not found" />
            </button>
            <button
              // href="https://twitter.com/i/flow/login"
            >
              <img className="login-icon" src={twitter} alt="not found" />
            </button> */}
          </footer>
        </Form>
      </div>
    </Helmet>
  );
};

export default Login;
