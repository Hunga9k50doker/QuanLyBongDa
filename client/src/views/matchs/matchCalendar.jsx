import { useEffect, useState } from "react";
import Helmet from "../../components/Helmet/Helmet";
import Header from "../../containers/header/header";
//ip data
// import card_team_data from "../../assets/fake-data/CardTeams";
import "./matchs.scss";

const MatchCalendar = (props) => {
  let n = 1;
  const [match, setMatch] = useState([]);
  const [refe, setRefe] = useState([]);
  const [clb, setClb] = useState([]);

  useEffect(() => {
    getMatch();
    getRefe();
    getCLB();
  }, []);
  //lay tran dau

  async function getMatch() {
    let result = await fetch("http://127.0.0.1:8000/api/trandau");
    result = await result.json();
    setMatch(result);
  }

  // get clb

  async function getCLB() {
    let result = await fetch("http://127.0.0.1:8000/api/clb");
    result = await result.json();
    setClb(result);
  }

  // lay trong tai
  async function getRefe() {
    let result = await fetch("http://127.0.0.1:8000/api/totrongtai");
    result = await result.json();
    setRefe(result);
  }

  // sap xep vong dau

  //sort high to low
  function compare(a, b) {
    if (Number(a.VongDau) < Number(b.VongDau)) {
      return -1;
    }
    if (Number(a.VongDau) > Number(b.VongDau)) {
      return 1;
    }
    return 0;
  }
  const cardsSorted = match.sort(compare);

  return (
    <Helmet title="Các trận đấu">
      <Header title="Các trận đấu" />
      <div className="component">
        <div className="table">
          <h1 className="table__title">Lịch thi đấu giữa các đội</h1>
          <table className="table__content">
            <tr>
              <th>STT</th>
              <th>Vòng đấu</th>
              <th>Thời gian</th>
              <th>Các đội thi đấu</th>
              <th>Sân vận động</th>
              <th>Trọng tài</th>
            </tr>
            {cardsSorted.map(
              (item) => (
                <tr key={item.idTD}>
                  <td>{n++}</td>
                  <td>{item.VongDau}</td>
                  <td>{item.ThoiGian}</td>
                  <td className="team__match team__logo">
                    <div className="img_clb">
                      {clb.map((element) =>
                        element.TenCLB === item.TenDoi1 ? (
                          <img
                            className="img logo"
                            src={"http://127.0.0.1:8000/" + element.Logo}
                            alt="not found"
                          />
                        ) : (
                          ""
                        )
                      )}

                      <p>{item.TenDoi1}</p>
                    </div>
                    <p class="sologan">VS</p>
                    <div className="img_clb">
                      {clb.map((element) =>
                        element.TenCLB === item.TenDoi2 ? (
                          <img
                            className="img logo"
                            src={"http://127.0.0.1:8000/" + element.Logo}
                            alt="not found"
                          />
                        ) : (
                          ""
                        )
                      )}
                      <p>{item.TenDoi2}</p>
                    </div>
                  </td>

                  <td>{item.SanDau}</td>
                  <td>
                    {refe.map(
                      (e) =>
                        e.idToTT === item.idToTT && (
                          <p className="group__refe">{e.to_trong_tai.TenTT}</p>
                        )
                    )}
                  </td>
                </tr>

                // )
              )
              // )
            )}
          </table>
        </div>
      </div>
    </Helmet>
  );
};

export default MatchCalendar;
