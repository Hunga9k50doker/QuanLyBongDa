import {useParams,useHistory } from "react-router-dom";



import Helmet from "../../components/Helmet/Helmet";
import Header from "../../containers/header/header";
//ip data
import card_player_data from "../../assets/fake-data/CardPlayers";

////////////////////////////////
import '../../styles/_variables.scss';
import '../../styles/global.scss';

const TeamDetail = (props) => { 
  let {title} = useParams();
  console.log(title);
  let history = useHistory();

  function backData (){
    history.push('/doi-bong')
  }

  return (
    <Helmet title="Chi tiết CLB ">
      <Header title="Chi tiết câu lạc bộ " />
      <div className="component">
      <div className="table">
        <div className="btn__back">
          <button onClick={backData} >
          <i class='bx bx-arrow-back'></i>
          <p>Trở lại</p>
          </button>
        </div>
          <h1 className="table__title">Thông tin chi tiết câu lạc bộ {'title'+ title}</h1>
          <table className="table__content">
            <tr>
              <th>STT</th>
              <th>Cầu thủ</th>
              <th>Giờ </th>
              <th>Các đội thi đấu</th>
              <th>Sân vận động</th>
              <th>Trọng tài</th>
            </tr>
            {card_player_data.getAllCards().map((item, index) => (
             
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

export default TeamDetail;
