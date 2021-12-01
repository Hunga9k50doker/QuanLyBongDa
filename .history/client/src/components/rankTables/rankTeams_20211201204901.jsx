import { useEffect, useState } from "react";

import Helmet from "../Helmet/Helmet";
import Header from "../../containers/header/header";
//ip data

import "./rankTeams.scss";
const RankTeam = (props) => {
  const [clb, setclb] = useState([]);
  useEffect(() => {
    getclb();
  }, []);
  async function getclb() {
    let result = await fetch("http://127.0.0.1:8000/api/bxh_clb");
    result = await result.json();
    setclb(result);
  }
  return (
    <Helmet title="Bảng xếp hạng đội bóng">
      <Header title="Bảng xếp hạng đội bóng" />
      <div className="component rank__team" style={{ marginTop: "0" }}>
        <div className="clb-chart-container">
          <table>
            <h2 className="name-bxh">V.League</h2>
            <thead>
              <tr>
                <th className="stt" scope="col">
                  Thứ tự
                </th>
                <th className="clb-name" scope="col">
                  Câu lạc bộ
                </th>
                <th scope="col">Số trận</th>
                <th scope="col">Thắng</th>
                <th scope="col">Hòa</th>
                <th scope="col">Thua</th>
                <th className="sum-point" scope="col">
                  Tổng điểm
                </th>
              </tr>
            </thead>
            <tbody>
              {clb.forEach((item, index) => {
                item.map((item, index) =>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Helmet>
  );
};

export default RankTeam;
