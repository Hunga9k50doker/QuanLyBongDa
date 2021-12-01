import Helmet from "../../components/Helmet/Helmet";
import Header from "../../containers/header/header";
//ip data
import card_player_data from "../../assets/fake-data/CardPlayers";
import "./matchs.scss";

const MatchCalendar = (props) => {
  return (
    <Helmet title="Các trận đấu">
      <Header title="Các trận đấu" />
      <div className="component">
        <div className="limiter">
          <h1 className="title1" style={{textTransform:'uppercase'}}>
            {" "}
            Lịch Thi Đấu<span>Giữa các đội</span>
          </h1>
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100">
                <table>
                  <thead>
                    <tr className="table100-head">
                      <th className="column1">STT</th>
                      <th className="column2">Ngày thi đấu</th>
                      <th className="column3">Giờ</th>
                      <th className="column4">Các đội thi đấu</th>
                      <th className="column5">Địa điểm</th>
                      <th className="column5">Địa điểm</th>

                    </tr>
                  </thead>
                  <tbody>
                    {card_player_data.getSortCards(10).map((item, index) => (
                      <tr key={index}>
                        <td className="column1">{index + 1}</td>
                        <td className="column3">
                          <img
                            alt=""
                            className="anhcauthu"
                            src={item.img}
                          ></img>
                          {item.title}
                        </td>
                        <td className="column2">{item.club}</td>
                        <td className="column4">{item.role}</td>
                        <td className="column5">{item.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default MatchCalendar;