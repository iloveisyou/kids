import { useCallback, useEffect, useState } from "react";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
// import CurriculumOrgDetail from "./CurriculumOrgDetail";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import TooltipText from "../components/tooltip/TooltipText";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { useForm } from "react-hook-form";
const QuzSchedule = () => {
  const { showToast } = useToast();

  const [isOpenDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleDeleteButton = useCallback(() => {
    setOpenDeleteConfirm(true);
  }, [setOpenDeleteConfirm]);

  const [isOpenApplyConfirm, setOpenApplyConfirm] = useState(false);
  const handleApplyButton = useCallback(() => {
    setOpenApplyConfirm(true);
  }, [setOpenApplyConfirm]);

  // const handleApply = useCallback(() => {
  //   showToast(`적용이 완료되었습니다.`, `success`);
  //   setOpenApplyConfirm(false);
  // }, [setOpenApplyConfirm, showToast]);

  //다이알로그 1
  const [insertConfirm, setInsertConfirm] = useState(false);
  const handleOpenPopUp = useCallback(() => {
    setInsertConfirm(true);
  }, [setInsertConfirm]);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const onSubmit = useCallback(
    (data) => {
      showToast(
        "오늘의 퀴즈 등록이 완료되었습니다.",
        `success`
      );
      setInsertConfirm(false);
    },
    [showToast, setInsertConfirm]
  );
  const onInvalid = (errors) => console.log(errors);  

  //다이알로그 2
  const [categoryConfirm, setCategoryConfirm] = useState(false);
  const handleOpenCategory = useCallback(() => {
    setCategoryConfirm(true);
  }, [setCategoryConfirm]);

  //파일 추가 공통
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);

  const handleClickFile = (e) => { // button 클릭으로 file파일 클릭 핸들러
    e.target.previousElementSibling.previousElementSibling.click();
  }

  //파일 추가 1
  const handleChangeFile = (e) => {
    setImgFile(e.target.files);
    setImgBase64([]);

    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          var base64Sub = base64.toString();
          setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          e.target.nextElementSibling.value = e.target.files[0].name; // input에 파일 이름 노출
        }
      };
    }
  };

  const handleResetFile = (e) => { // 파일 이미지 삭제
    setImgBase64((imgBase64) => []);
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[0].value = "";
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].value = "";
  };
  
  const [data, setData] = useState([
    {no:1, category:"동물",             subject:"물에서 사는 공룡 퀴즈", bannerImg:require("../assets/img/sample_100.png"), quz:50, date:"2022-04-11", action: ""},
    {no:2, category:"식물",             subject:"식물에 대해서",         bannerImg:require("../assets/img/sample_100.png"), quz:50, date:"2022-04-12", action: ""},
    {no:3, category:"첨단과학과 태양계", subject:"우주",                 bannerImg:require("../assets/img/sample_100.png"), quz:50, date:"2022-04-13", action: "event"},
    {no:4, category:"신체와 건강",       subject:"우리 몸",              bannerImg:require("../assets/img/sample_100.png"), quz:50, date:"2022-04-14", action: ""},
    {no:5, category:"스포츠",           subject:"축구",                 bannerImg:require("../assets/img/sample_100.png"), quz:50, date:"2022-04-15", action: ""},
    {no:6, category:"숫자와 도형",       subject:"알쏭달쏭 숫자 대결",    bannerImg:require("../assets/img/sample_100.png"), quz:50, date:"2022-04-16", action: ""},
    {no:7, category:"세계와 역사",       subject:"세계탐험",             bannerImg:require("../assets/img/sample_100.png"), quz:50, date:"2022-04-17", action: ""},
  ]);
  const today = new Date();

  return (
    <>
      <div className="cpnt_table">
          <table className="table-default">
            <caption>
              <strong className="title dp-blind">퀴즈백과 퀴즈그룹 관리 리스트</strong>
              <span className="total">
                {`Total: `}
                <b>3</b>
              </span>
            </caption>
            <thead>
              <tr>
                <th><input name="checkAll" type={"checkbox"} /></th>
                <th>
                  <TooltipText title="노출순서 변경 후 하단의 적용버튼을 클릭하여야 적용이 됩니다.">순서</TooltipText>                
                </th>
                <th>
                  <TooltipText title="클릭 시 등록된 상세내용을 확인 하실 수 잇습니다.">중분류 카테고리</TooltipText>
                </th>
                <th>오늘의 퀴즈 주제</th>
                <th>오늘의 퀴즈 배너 이미지</th>
                <th>제공 문항수</th>
                <th>제공일</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data) => (
                <tr key={data.no} className={(today.toISOString().substr(0,10)==data.date)?'today':''}>
                    <td><input type={"checkbox"} /></td>
                    <td>{data.no}</td>
                    <td className={(data.action=="event")?'cid-event':''}>{data.category}</td>
                    <td>{data.subject}</td>
                    <td className="cid-img"><img src={ data.bannerImg } /></td>
                    <td>{data.quz}</td>
                    <td>{data.date}</td>
                </tr>
              ))}
                {/* <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>2</td>
                    <td>식물</td>
                    <td>식물에 대해서</td>
                    <td className="cid-img"><img src={ require('../assets/img/sample_100.png') } /></td>
                    <td>100</td>
                    <td>2022-04-15</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>2</td>
                    <td>식물</td>
                    <td>식물에 대해서</td>
                    <td className="cid-img"><img src={ require('../assets/img/sample_100.png') } /></td>
                    <td>100</td>
                    <td>2022-04-14</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>2</td>
                    <td>식물</td>
                    <td>식물에 대해서</td>
                    <td className="cid-img"><img src={ require('../assets/img/sample_100.png') } /></td>
                    <td>100</td>
                    <td>2022-04-13</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>3</td>
                    <td>첨단과학과 태양계</td>
                    <td className="cid-event">물에서 사는 동룡 퀴즈</td>
                    <td className="cid-img"><img src={ require('../assets/img/sample_100.png') } /></td>
                    <td>230</td>
                    <td>2022-04-12</td>
                </tr> */}
            </tbody>
        </table>


        <div className="cpnt_btns">
          <button type="button" onClick={handleDeleteButton}>
            <DeleteOutlineIcon /> 삭제
          </button>
          <button type="button" onClick={handleApplyButton}>
            <PlaylistAddCheckIcon /> 순서변경 적용
          </button>
          <button type="button" className="sb af-r" onClick={handleOpenPopUp}>
            <AddIcon /> 오늘의 퀴즈 등록
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={isOpenDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        onConfirm={handleDeleteButton}
      >
        <p>
          {`삭제하시겠습니까?`}
          <br />
          {`삭제 후 복구가 불가능합니다.`}
        </p>
      </ConfirmDialog>

      <ConfirmDialog
        open={isOpenApplyConfirm}
        setOpen={setOpenApplyConfirm}
        onConfirm={handleApplyButton}
      >
        <p>
          {`리스트의 변경된 순서를`}
          <br />
          {`적용하시겠습니까?`}
        </p>
      </ConfirmDialog>

      <PopupDialog
        open={insertConfirm}
        setOpen={setInsertConfirm}
        title={`오늘의 퀴즈 등록`}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div className="cpnt_pageSearch">
            <div className="field-wrap cid-center">
              <select className="fm">
                <option value={`전체`}>전체</option>
                <option value={`카테고리 아이디`}>카테고리 아이디</option>
                <option value={`카테고리 명`}>카테고리 명</option>
              </select>
              <input type="search" name="search" />
              <button type="button"><SearchIcon /> 검색</button>
            </div>
          </div>
          <div className="cpnt_table">
            <table className="table-default">
              <caption>
                <h2 className="title">중분류 카테고리 목록 선택</h2>
              </caption>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>카테고리 아이디</th>
                  <th>카테고리 명</th>
                  <th>대분류</th>
                  <th>제공 문항수</th>
                  <th>숨김타입 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td><input className="field-input" type="radio" name="categoryId" /></td>
                    <td>100001</td>
                    <td><button className="text-link" type="button" onClick={handleOpenCategory}>동물</button></td>
                    <td>과학</td>
                    <td>50</td>
                    <td className="text-pit">N</td>
                </tr>
                <tr>
                    <td><input className="field-input" type="radio" name="categoryId" /></td>
                    <td>100002</td>
                    <td><button className="text-link" type="button" onClick={handleOpenCategory}>식물</button></td>
                    <td>과학</td>
                    <td>100</td>
                    <td className="text-pit">Y</td>
                </tr>
                <tr>
                    <td><input className="field-input" type="radio" name="categoryId" /></td>
                    <td>100003</td>
                    <td><button className="text-link" type="button" onClick={handleOpenCategory}>첨단과학과 태양계</button></td>
                    <td>과학</td>
                    <td>230</td>
                    <td className="text-pit">N</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cpnt_dlForm mg-t30">
            <h2 className="title">오늘의 퀴즈 등록</h2>
            {/* <div className="cpnt_btns pst-right-top">
              <button type="button" className="sb af-r">
                <AddIcon /> 등록
              </button>
            </div> */}
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required"><span>오늘의 퀴즈 주제</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" required />
                  </div>
                  <div className="text-help"><p>※ 최대 30자 입력 가능/ 오늘의 퀴즈 용도로 수정 가능하며, 카테고리 메뉴와 별도 저장</p></div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>오늘의 퀴즈 소개 문구</span></dt>
                <dd>
                  <div className="field-wrap">
                    <textarea rows={`3`} required />
                  </div>
                  <div className="text-help"><p>※ 최대 500자 입력가능/ 오늘의 퀴즈 용도로 수정 가능하며, 카테고리 메뉴와 별도 저장</p></div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>배너 이미지</span></dt>
                <dd>
                    {imgBase64.map((item) => {
                      return (
                        <div key="1" className="field-input-file-img"><span key="3">
                          <img
                            key="0"
                            src={item}
                            alt="선택한 이미지"
                          />
                          <button key="2" type="button" onClick={handleResetFile}><CloseIcon /> 이미지삭제</button>
                        </span></div>
                        )
                      }
                    )}
                  <div className="field-wrap">
                    <input type="file" name="bnrImgNo" id="bnrImgNo" onChange={handleChangeFile} required />
                    <input type="text" required />
                    <button type="button" onClick={handleClickFile}>파일선택</button>
                  </div>
                  <div className="text-help"><p>※ size 000x000/ jpg,png/ 최대 0MB 업로드 권장</p></div>
                </dd>
              </div>
            </dl>
          </div>
        </form>
      </PopupDialog>

      <PopupDialog
        open={categoryConfirm}
        setOpen={setCategoryConfirm}
        title={`카테고리 속성`}
        onSubmit={handleOpenCategory}
        optionClass={`muiActions-blind`}
        // isBtn={false}
      >
        <form>
          <div className="cpnt_dlForm">
            <h2 className="title">카테고리 경로 : 과학</h2>
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required"><span>카테고리 분류</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="radio" name="sort" id="sort1" required /><label htmlFor="sort1">대분류</label>
                    <input type="radio" name="sort" id="sort2" required defaultChecked /><label htmlFor="sort2">중분류</label>
                    <input type="radio" name="sort" id="sort3" required /><label htmlFor="sort3">소분류</label>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>카테고리 명</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" required placeholder="최대 30자 입력 가능" />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>카테고리 설명</span></dt>
                <dd>
                  <div className="field-wrap">
                    <textarea rows={`3`} required placeholder="오늘의 퀴즈 or 분야별 퀴즈 진입 시 소개문구 입력&#13;&#10;최대 500자 입력 가능" />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>상용 노출 여부</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="radio" name="expose" id="expose1" required defaultChecked /><label htmlFor="expose1">비노출</label>
                    <input type="radio" name="expose" id="expose2" required /><label htmlFor="expose2">검수</label>
                    <input type="radio" name="expose" id="expose3" required /><label htmlFor="expose3">비노출</label>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>대상 플랫폼</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="checkbox" name="platform1" id="platform1" required defaultChecked /><label htmlFor="platform1">공통</label>
                    <input type="checkbox" name="platform2" id="platform2" disabled /><label htmlFor="platform2">IPTV</label>
                    <input type="checkbox" name="platform3" id="platform3" disabled /><label htmlFor="platform3">모바일</label>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>배너 이미지</span></dt>
                <dd>
                    {imgBase64.map((item) => {
                      return (
                        <div key="11" className="field-input-file-img"><span key="3">
                          <img
                            key="10"
                            src={item}
                            alt="선택한 이미지"
                          />
                          <button key="12" type="button" onClick={handleResetFile}><CloseIcon /> 이미지삭제</button>
                        </span></div>
                        )
                      }
                    )}
                  <div className="field-wrap">
                    <input type="file" name="bnrImgNo" id="bnrImgNo" onChange={handleChangeFile} required />
                    <input type="text" required placeholder="이미지 파일 등록" />
                    <button type="button" onClick={handleClickFile}>파일선택</button>
                  </div>
                  <div className="text-help"><p>※ size 000x000/ jpg,png/ 최대 0MB 업로드 권장</p></div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>카테고리 키워드</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" required placeholder="콤마( , )로 구분하여 입력가능" />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>카테고리 타입</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="radio" name="type" id="type1" required defaultChecked /><label htmlFor="type1">일반타입</label>
                    <input type="radio" name="type" id="type2" required /><label htmlFor="type2">숨김타입</label>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </form>
      </PopupDialog>
      
    </>
  );
};

export default QuzSchedule;
