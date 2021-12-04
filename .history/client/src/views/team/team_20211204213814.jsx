import React,{ useEffect, useState} from "react";
import { Link } from "react-router-dom";
// ip data
import card_team_data from "../../assets/fake-data/CardTeams";

//ip component
import Helmet from "../../components/Helmet/Helmet";
import Header from "../../containers/header/header";
import SortBar from "../../components/sortBar/sortBar";
import CardTeam from "../../components/cards/cardTeam/cardTeam";
import HlTeam from "../../components/rankTables/HighlightTeams";
import Dunors from "../../components/dunors/dunors";

//css
import "../../styles/_variables.scss";
import "../../styles/global.scss";
import "./team.scss";

const Team = () => {
  const [infoPlayer, setInfoPlayer] = useState([]);
  const [clb, setClb] = useState([]);
  useEffect(() => {
    getInfoPlayer();
  },[])

  // lay cau thu
  async function getInfoPlayer() {
    let result = await fetch("http://127.0.0.1:8000/api/cauthu");
    result = await result.json();
    setInfoPlayer(result);
  }
// lay clb
 const [clb, setClb] = useState([]);
    useEffect(() => {
        ();
    }, []);

    async function () {
        let result = await fetch("http://127.0.0.1:8000/api/chotang_product");
        result = await result.json();
        setClb(result);
      }





function to_slug(str)
{
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();     
 
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
 
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');
 
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');
 
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');
 
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
 
    // return
    return str;
}


  return (
    <Helmet title="Câu Lạc Bộ" className="component">
      <Header title="Các Câu Lạc Bộ"></Header>

      <SortBar>
        <div className="col">
          <div className="sortbar__category sortbar__category-season">
            <p>Lọc theo mùa:</p>
            <select
              name="season__option"
              className="season__option"
              id="season__option"
            >
              <option value="0">2021/22</option>
              {/* <option value="0">2020/21</option>
              <option value="0">2019/20</option> */}
            </select>
          </div>
        </div>
      </SortBar>
      <div className="container container-xxl container-xl ">
        {/* get all team */}
        <div className="row">
          {card_team_data.getAllCards().map((item, index) => (
            <div
              key={index}
              className="col col-xl-3 col-lg-4 col-md-6 col-sm-1 "
            >
              <Link style={{width: '280px'}}  className="card__item" to={`/doi-bong/${to_slug(item.title)}`}>
                <CardTeam
                  img={item.img}
                  title={item.title}
                  logo={item.img}
                  stadium={item.stadium}
                  location={item.location}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* get top 8 team */}
        <HlTeam />
        {/* dunors */}
        <Dunors />
      </div>
    </Helmet>
  );
};

export default Team;
