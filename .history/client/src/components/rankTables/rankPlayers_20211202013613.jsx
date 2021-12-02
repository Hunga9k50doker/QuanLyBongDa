
import ReactPaginate from 'react-paginate';

import { useEffect, useState } from "react";
import Helmet from "../Helmet/Helmet";
import Header from "../../containers/header/header";

//ip data
const RankPlayer = (props) => {
  cosnt [item,setItem] =useState([]);
  const [player, setPlayer] = useState([]);
  const [infoPlayer, setInfoPlayer] = useState([]);
  let index = 1;
  useEffect(() => {
    getPlayer();
    getInfoPlayer();
  }, []);

  async function getPlayer() {
    let result = await fetch("http://127.0.0.1:8000/api/bxh_ct");
    result = await result.json();
    setPlayer(result);
  }

  async function getInfoPlayer() {
    let result = await fetch("http://127.0.0.1:8000/api/cauthu");
    result = await result.json();
    setInfoPlayer(result);
  }

  //sort high to low
  function compare(a, b) {
    if (Number(a.SoBanThang) > Number(b.SoBanThang)) {
      return -1;
    }
    if (Number(a.SoBanThang) < Number(b.SoBanThang)) {
      return 1;
    }
    return 0;
  }
  const cardsSorted = player.sort(compare);

  // pagination
  const handlePageClick = (event) => {
    <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li className="page-item"><a className="page-link" href="#">1</a></li>
      <li className="page-item"><a className="page-link" href="#">2</a></li>
      <li className="page-item"><a className="page-link" href="#">3</a></li>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  };

  return (
    <Helmet title="Bảng xếp hạng cầu thủ">
      <Header title="Bảng xếp hạng cầu thủ" />
      <div className="component">
        <div className="table">
          <h1 className="table__title">Bảng Xếp Hạng Cầu Thủ</h1>
          <table className="table__content">
            <tr>
              <th>STT</th>
              <th>Cầu thủ</th>
              <th>Câu lạc bộ</th>
              <th>Số áo</th>
              <th>Vị trí</th>
              <th>Số bàn đã ghi</th>
            </tr>

            {
            cardsSorted.map((item) => (

            infoPlayer.map((e) =>
                // console.log('clb=>>>>>>>>>'+e.clb) &&
                e.TenCT===item.TenCT && 
                <>
                  <tr>
                    <td>{index++}</td>
                    <td>

                      <div className="img">
                        <img src={require(`../../assets/img/AnhCauthu/${item.TenCLB}/${e.AnhDaiDien}${'.jpg'||'.png'}`).default} alt="not found" />
                      </div>
                      <p>{item.TenCT}</p>
                    </td>
                    <td>{item.TenCLB}</td>
                    <td>{e.SoAo}</td>
                    <td>{e.ViTri}</td>
                    <td>{item.SoBanThang}</td>
                  </tr>
                </>
              ))
            )}

          </table>
          <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={6}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={
          'page-item'
        }
        breakLinkClassName={'page-link'}
      />
        </div>
      </div>
    </Helmet>
  );
};

export default RankPlayer;