import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import card_team_data from "../../assets/fake-data/CardTeams";
import CardTeam from "../cards/cardTeam/cardTeam";

const HlTeam = () => {
  let n = 1;
  const [clb, setclb] = useState([]);
  useEffect(() => {
    getclb();
  }, []);
  async function getclb() {
    let result = await fetch("http://127.0.0.1:8000/api/bxh_clb");
    result = await result.json();
    // console.log('<<<<<<<<<<<<result'+ result);
    setclb(result);
  }

  //sort high to low
  function compare(a, b) {
    if (Number(a.Diem) > Number(b.Diem)) {
      return -1;
    }
    if (Number(a.Diem) < Number(b.Diem)) {
      return 1;
    }
    return 0;
  }
  const cardsSorted = clb.sort(compare);

  return (
    <div className=" table" style={{ transform: "translateY(20px)" }}>
      <h3 className="table__title">Các câu lạc bộ nổi bật</h3>
      <table className="table__content" style={{ width: "50vw" }}>
        <tr>
          <th>STT</th>
          <th>Câu Lạc Bộ</th>
          <th>Sân Vận Động</th>
          <th>Số điểm</th>
        </tr>
        {cardsSorted.map((item, index) =>
          card_team_data.getAllCards().map(
            (e) =>
              e.title === item.TenCLB && (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="img logo">
                      <img src={e.img} alt="not found" />
                    </div>
                    <p>{item.TenCLB}</p>
                  </td>
                  <td>
                    <p>{e.stadium}</p>
                  </td>
                  <td>
                    {item.Diem}
                  </td>
                </tr>
              )
          )
        )}
      </table>
    </div>
  );
};

export default HlTeam;
