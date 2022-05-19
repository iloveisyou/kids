import { useCallback, useEffect, useState } from "react";
import ContentsDetailPop from "../components/popupDialog/ContentsDetailPop.js";

const PubUi = ( props ) => {

    const [keywordList, setKeywordList] = useState([]);
    const handleKeywordList = useCallback((e) => {
        if((e.keyCode == 13 || e.keyCode == 188) && (e.target.value !="")){
            let item = document.createElement("span");
            let text = document.createElement("span");
            let button = document.createElement("button");
            let text_inner = document.createTextNode(e.target.value);
            if(e.keyCode == 188){
                text_inner = document.createTextNode(e.target.value.slice(0, -1));
            }

            let button_inner = document.createTextNode("닫기");
            item.classList.add("item");
            text.classList.add("text");
            button.setAttribute("type", "button");
            text.appendChild(text_inner);
            button.appendChild(button_inner);
            item.appendChild(text);
            item.appendChild(button);
            e.target.previousElementSibling.append(item);
            e.target.value = "";
            button.addEventListener("click", (e)=>{
                e.preventDefault();
                e.target.closest(".item").remove();
            });
        }
        //setKeywordList(true);
        }, [setKeywordList]);
    
    // function heightAuto() {
    //     return new Promise(function(resolve,reject){
            
    //     });
    // }
    // document.querySelectorAll('.scrollV table')[0].addEventListener('load', function(){
    //     console.log(document.querySelectorAll('.scrollV table')[0].clientHeight);
    // });
    window.onload = function(){ 
        console.log('onload');
        console.log(document.querySelectorAll('.scrollV table')[0].clientHeight);
    }
    window.addEventListener('DOMContentLoaded', function() { 
        console.log('DOMContentLoaded');
        console.log(document.querySelectorAll('.scrollV table')[0].clientHeight);
        document.getElementById("scrollV").onload = function() { 
            console.log('divOnload');
            //console.log(document.querySelectorAll('.scrollV table')[0].clientHeight);
        };
        
    });

    const [isOpenDetail, setOpenDetail] = useState(false);
    const handleDetailButton = useCallback(() => {
      setOpenDetail(true);
    }, [setOpenDetail]);
    

    
    

    return (
        <>
            <div className="cpnt_btns first">
                <button type="button" className="mi" onClick={handleDetailButton}>
                    test - ContentsDetailPop.js
                </button>
            </div>

            <ContentsDetailPop open={isOpenDetail} setOpen={setOpenDetail} />

            <div className="cpnt_title type2 mg-t30">
              <strong>키워드 입력</strong>
            </div>
            <div className="text-help"><p>키워드를 입력하시고 '엔터' 또는 쉼표(,)를 누르시면 추가 됩니다.</p></div>
            <div className="cpnt_keyword">
                <label className="cpnt-in" htmlFor="keyword">
                    <span className="keywordList"></span>
                    <input type="text" name="keyword" onKeyUp={handleKeywordList}></input>
                </label>
            </div>

            <div className="cpnt_table scrollV mg-t30" id="scrollV">
                <div className="cpnt_title type2">
                    <strong className="title">세로 스크롤 테이블 (페이징없이 무한스크롤 테이블(페이지)일때 사용)</strong>
                    <span className="total">Total: <b>25</b></span>
                </div>
                            
                <div className="table-wrap" style={{height:"500px"}}>
                    <table className="table-default">
                        <caption>
                            <strong className="blind">테이블 제목</strong>
                        </caption>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>컬럼제목1</th>
                                <th>컬럼제목2</th>
                                <th>컬럼제목3</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr><td>01</td><td>컬럼내용1-01</td><td>컬럼내용2-01</td><td>컬럼내용3-01</td></tr>
                            <tr><td>02</td><td>컬럼내용1-02</td><td>컬럼내용2-02</td><td>컬럼내용3-02</td></tr>
                            <tr><td>03</td><td>컬럼내용1-03</td><td>컬럼내용2-03</td><td>컬럼내용3-03</td></tr>
                            <tr><td>04</td><td>컬럼내용1-04</td><td>컬럼내용2-04</td><td>컬럼내용3-04</td></tr>
                            <tr><td>05</td><td>컬럼내용1-05</td><td>컬럼내용2-05</td><td>컬럼내용3-05</td></tr>
                            <tr><td>06</td><td>컬럼내용1-06</td><td>컬럼내용2-06</td><td>컬럼내용3-06</td></tr>
                            <tr><td>07</td><td>컬럼내용1-07</td><td>컬럼내용2-07</td><td>컬럼내용3-07</td></tr>
                            <tr><td>08</td><td>컬럼내용1-08</td><td>컬럼내용2-08</td><td>컬럼내용3-08</td></tr>
                            <tr><td>09</td><td>컬럼내용1-09</td><td>컬럼내용2-09</td><td>컬럼내용3-09</td></tr>
                            <tr><td>10</td><td>컬럼내용1-10</td><td>컬럼내용2-10</td><td>컬럼내용3-10</td></tr>
                            <tr><td>11</td><td>컬럼내용1-11</td><td>컬럼내용2-11</td><td>컬럼내용3-11</td></tr>
                            <tr><td>12</td><td>컬럼내용1-12</td><td>컬럼내용2-12</td><td>컬럼내용3-12</td></tr>
                            <tr><td>13</td><td>컬럼내용1-13</td><td>컬럼내용2-13</td><td>컬럼내용3-13</td></tr>
                            <tr><td>14</td><td>컬럼내용1-14</td><td>컬럼내용2-14</td><td>컬럼내용3-14</td></tr>
                            <tr><td>15</td><td>컬럼내용1-15</td><td>컬럼내용2-15</td><td>컬럼내용3-15</td></tr>
                            <tr><td>16</td><td>컬럼내용1-16</td><td>컬럼내용2-16</td><td>컬럼내용3-16</td></tr>
                            <tr><td>17</td><td>컬럼내용1-17</td><td>컬럼내용2-17</td><td>컬럼내용3-17</td></tr>
                            <tr><td>18</td><td>컬럼내용1-18</td><td>컬럼내용2-18</td><td>컬럼내용3-18</td></tr>
                            <tr><td>19</td><td>컬럼내용1-19</td><td>컬럼내용2-19</td><td>컬럼내용3-19</td></tr>
                            <tr><td>20</td><td>컬럼내용1-20</td><td>컬럼내용2-20</td><td>컬럼내용3-20</td></tr>
                            <tr><td>21</td><td>컬럼내용1-21</td><td>컬럼내용2-21</td><td>컬럼내용3-21</td></tr>
                            <tr><td>22</td><td>컬럼내용1-22</td><td>컬럼내용2-22</td><td>컬럼내용3-22</td></tr>
                            <tr><td>23</td><td>컬럼내용1-23</td><td>컬럼내용2-23</td><td>컬럼내용3-23</td></tr>
                            <tr><td>24</td><td>컬럼내용1-24</td><td>컬럼내용2-24</td><td>컬럼내용3-24</td></tr>
                            <tr><td>25</td><td>컬럼내용1-25</td><td>컬럼내용2-25</td><td>컬럼내용3-25</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="cpnt_btns">
                    <button type="button">적용</button>
                    <button type="button">삭제</button>
                    <button type="button" className="sb af-r">등록</button>
                </div>
            </div>

            <div className="cpnt_table scrollH mg-t30">
                <div className="cpnt_title type2">
                    <strong className="title">가로 스크롤 테이블 (컬럼(열)이 많을때 사용)</strong>
                    <span className="total">Total: <b>9</b></span>
                </div>
                            
                <div className="table-wrap">
                    <table className="table-default" style={{width:"2000px"}}>
                        <caption>
                            <strong className="blind">테이블 제목</strong>
                        </caption>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>컬럼제목1</th>
                                <th>컬럼제목2</th>
                                <th>컬럼제목3</th>
                                <th>컬럼제목4</th>
                                <th>컬럼제목5</th>
                                <th>컬럼제목6</th>
                                <th>컬럼제목7</th>
                                <th>컬럼제목8</th>
                                <th>컬럼제목9</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr><td>01</td><td>컬럼내용1-01</td><td>컬럼내용2-01</td><td>컬럼내용3-01</td><td>컬럼내용4-01</td><td>컬럼내용5-01</td><td>컬럼내용6-01</td><td>컬럼내용7-01</td><td>컬럼내용8-01</td><td>컬럼내용9-01</td></tr>
                            <tr><td>02</td><td>컬럼내용1-02</td><td>컬럼내용2-02</td><td>컬럼내용3-02</td><td>컬럼내용4-02</td><td>컬럼내용5-02</td><td>컬럼내용6-02</td><td>컬럼내용7-02</td><td>컬럼내용8-02</td><td>컬럼내용9-02</td></tr>
                            <tr><td>03</td><td>컬럼내용1-03</td><td>컬럼내용2-03</td><td>컬럼내용3-03</td><td>컬럼내용4-03</td><td>컬럼내용5-03</td><td>컬럼내용6-03</td><td>컬럼내용7-03</td><td>컬럼내용8-03</td><td>컬럼내용9-03</td></tr>
                            <tr><td>04</td><td>컬럼내용1-04</td><td>컬럼내용2-04</td><td>컬럼내용3-04</td><td>컬럼내용4-04</td><td>컬럼내용5-04</td><td>컬럼내용6-04</td><td>컬럼내용7-04</td><td>컬럼내용8-04</td><td>컬럼내용9-04</td></tr>
                            <tr><td>05</td><td>컬럼내용1-05</td><td>컬럼내용2-05</td><td>컬럼내용3-05</td><td>컬럼내용4-05</td><td>컬럼내용5-05</td><td>컬럼내용6-05</td><td>컬럼내용7-05</td><td>컬럼내용8-05</td><td>컬럼내용9-05</td></tr>
                            <tr><td>06</td><td>컬럼내용1-06</td><td>컬럼내용2-06</td><td>컬럼내용3-06</td><td>컬럼내용4-06</td><td>컬럼내용5-06</td><td>컬럼내용6-06</td><td>컬럼내용7-06</td><td>컬럼내용8-06</td><td>컬럼내용9-06</td></tr>
                            <tr><td>07</td><td>컬럼내용1-07</td><td>컬럼내용2-07</td><td>컬럼내용3-07</td><td>컬럼내용4-07</td><td>컬럼내용5-07</td><td>컬럼내용6-07</td><td>컬럼내용7-07</td><td>컬럼내용8-07</td><td>컬럼내용9-07</td></tr>
                            <tr><td>08</td><td>컬럼내용1-08</td><td>컬럼내용2-08</td><td>컬럼내용3-08</td><td>컬럼내용4-08</td><td>컬럼내용5-08</td><td>컬럼내용6-08</td><td>컬럼내용7-08</td><td>컬럼내용8-08</td><td>컬럼내용9-08</td></tr>
                            <tr><td>09</td><td>컬럼내용1-09</td><td>컬럼내용2-09</td><td>컬럼내용3-09</td><td>컬럼내용4-09</td><td>컬럼내용5-09</td><td>컬럼내용6-09</td><td>컬럼내용7-09</td><td>컬럼내용8-09</td><td>컬럼내용9-09</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="cpnt_btns">
                    <button type="button">적용</button>
                    <button type="button">삭제</button>
                    <button type="button" className="sb af-r">등록</button>
                </div>
            </div>
        </>
    );
};

export default PubUi;