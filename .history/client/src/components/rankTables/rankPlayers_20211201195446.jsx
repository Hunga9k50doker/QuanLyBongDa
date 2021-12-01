import { useEffect,useState } from "react";
import Helmet from "../Helmet/Helmet";
import Header from "../../containers/header/header";
//ip data
import card_player_data from "../../assets/fake-data/CardPlayers";
const RankPlayer = (props) => {
   const [player, setPlayer] = useState([]);
      useEffect(() => {
          getPlayer();
      }, []);
  
      async function getPlayer() {
          let result = await fetch("http://127.0.0.1:8000/api/bxh_ct");
          result = await result.json();
          setPlayer(result);
        }
  return (
    <Helmet title="Bảng xếp hạng cầu thủ">
      <Header title="Bảng xếp hạng cầu thủ" />
      <div className="component" >
        <div className="table">
          <h1 className="table__title">Bảng Xếp Hạng Cầu Thủ</h1>
          <table className="table__content">
            <tr>
              <th>STT</th>
              <th>Cầu thủ</th>
              <th>Câu lạc bộ</th>
              <th>Vị trí</th>
              <th>Số bàn đã ghi</th>
              <th>Tổng điểm</th>
            </tr>
            {player.getSortCards(10).map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className="img">
                    <img src={item.img} alt="not found" />
                  </div>
                  <p>{item.title}</p>
                </td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>

              </tr>
            ))}
          </table>
        </div>
      </div>
    </Helmet>
  );
};

export default RankPlayer;
