import { useCallback, useEffect, useState } from "react";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
// import CurriculumOrgDetail from "./CurriculumOrgDetail";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageviewIcon from '@mui/icons-material/Pageview';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RemoveIcon from '@mui/icons-material/Remove';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import TooltipText from "../components/tooltip/TooltipText";
import TooltipBox from "../components/tooltip/TooltipBox";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { useForm } from "react-hook-form";
const QuzContent = () => {
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

  //다이알로그 페이지 1
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
        "퀴즈그룹이 등록이 완료되었습니다.",
        `success`
      );
      setInsertConfirm(false);
    },
    [showToast, setInsertConfirm]
  );
  const onInvalid = (errors) => console.log(errors);  

  //다이알로그 그룹콘텐츠
  const [isGroupContent, setGroupContent] = useState(false);
  const handleOpenGroupContent = useCallback(() => {
    setGroupContent(true);
  }, [setGroupContent]);

  //다이알로그 퀴즈콘텐츠
  const [isQuzContent, setQuzContent] = useState(false);
  const handleOpensetQuzContent = useCallback(() => {
    setQuzContent(true);
  }, [setQuzContent]);
  
  //다이알로그 앨범조회
  const [isAlbum, setAlbum] = useState(false);
  const handleAlbum = useCallback(() => {
    setAlbum(true);
  }, [setAlbum]);

  const [imgBase64, setImgBase64, imgBase642, setImgBase642] = useState([]);
  const [imgFile, setImgFile, imgFile2, setImgFile2] = useState(null);

  const handleClickFile = (e) => { // button 클릭으로 file파일 클릭 핸들러
    e.target.previousElementSibling.previousElementSibling.click();
  }

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

  const handleChangeFile2 = (e) => {
    setImgFile2(e.target.files);
    setImgBase642([]);

    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base642 = reader.result;
        if (base642) {
          var base64Sub2 = base642.toString();
          setImgBase642((imgBase642) => [...imgBase642, base64Sub2]);
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

  const handleResetFile2 = (e) => { // 파일 이미지 삭제
    setImgBase642((imgBase642) => []);
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[0].value = "";
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].value = "";
  };

  return (
    <>
      <div className="cpnt_pageSearch">
        <div className="field-wrap cid-center">
            <select>
            <option value={`전체`}>전체</option>
            <option value={`퀴즈콘텐츠 번호`}>퀴즈콘텐츠 번호</option>
            <option value={`퀴즈콘텐츠 명`}>퀴즈콘텐츠 명</option>
            </select>
            <input type="search" name="search" />
            <button type="button"><SearchIcon /> 검색</button>
        </div>
        </div>

        <div className="cpnt_table">
        <table className="table-default">
            <caption>
            <strong className="title">퀴즈콘텐츠 목록</strong>
            <span className="total">
                {`Total: `}
                <b>3</b>
            </span>
            </caption>
            <thead>
            <tr>
                <th rowSpan={2}><input name="checkAll" type={"checkbox"} /></th>
                <th rowSpan={2}>퀴즈콘텐츠 번호</th>
                <th rowSpan={2}>
                <TooltipText title="클릭 시 등록된 '퀴즈콘텐츠 상세'를 확인 하실 수 잇습니다.">퀴즈콘텐츠 명</TooltipText>
                </th>
                <th rowSpan={2}>퀴즈그룹 명</th>
                <th rowSpan={2}>난이도</th>
                <th rowSpan={2}>퀴즈유형</th>
                <th colSpan={2}>문제</th>
                <th colSpan={2}>보기</th>
                <th rowSpan={2}>사용여부</th>
                <th rowSpan={2}>등록일 (최종수정일)</th>
            </tr>
            <tr>
                <th>텍스트</th>
                <th>이미지</th>
                <th>텍스트</th>
                <th>이미지</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>200006</td>
                    <td><button className="text-link" type="button" onClick={handleOpensetQuzContent}>낙타</button></td>
                    <td>퀴즈그룹6</td>
                    <td>1레벨</td>
                    <td>OX형</td>
                    <td>O</td>
                    <td></td>
                    <td>O</td>
                    <td></td>
                    <td>비노출</td>
                    <td>2021.02.10. 14:22:33</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>200005</td>
                    <td><button className="text-link" type="button" onClick={handleOpensetQuzContent}>염소</button></td>
                    <td>퀴즈그룹1 외4개</td>
                    <td>2레벨</td>
                    <td>다지선다형</td>
                    <td></td>
                    <td>O</td>
                    <td>O</td>
                    <td></td>
                    <td>검수</td>
                    <td>2021.02.09. 14:22:33</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>200004</td>
                    <td><button className="text-link" type="button" onClick={handleOpensetQuzContent}>당나귀</button></td>
                    <td>퀴즈그룹6</td>
                    <td>3레벨</td>
                    <td>OX형</td>
                    <td>O</td>
                    <td></td>
                    <td></td>
                    <td>O</td>
                    <td>노출</td>
                    <td>2021.02.07. 14:22:33</td>
                </tr>
            </tbody>
        </table>
        <div className="cpnt_btns">
          <button type="button" onClick={handleDeleteButton}>
          <DeleteOutlineIcon /> 삭제
          </button>
          <button type="button" onClick={handleApplyButton}>
          <SimCardDownloadIcon /> 엑셀 다운로드
          </button>
          <button type="button" className="sb af-r" onClick={handleOpensetQuzContent}>
          <AddIcon /> 퀴즈그룹 등록
          </button>
      </div>
      </div>
      <div className="cpnt_paging">
        <div className="paging-default">
          <button className="num first" type="button">맨처음으로 이동</button>
          <button className="num prev" type="button">이전</button>
          <button className="num active" type="button">1</button>
          <button className="num" type="button">2</button>
          <button className="num" type="button">3</button>
          <button className="num" type="button">4</button>
          <button className="num" type="button">5</button>
          <button className="num" type="button">6</button>
          <button className="num" type="button">7</button>
          <button className="num" type="button">8</button>
          <button className="num" type="button">9</button>
          <button className="num" type="button">10</button>
          <button className="num next" type="button">다음</button>
          <button className="num last" type="button">맨끝으로 이동</button>
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
          {`엑셀 다운로드를 시작합니다.`}
        </p>
      </ConfirmDialog>

      <PopupDialog
        open={isAlbum}
        setOpen={setAlbum}
        title={`앨범 조회`}
        onSubmit={handleAlbum}
        btnMsg={`선택`}
      >
        <form>
          <div className="cpnt_pageSearch">
            <div className="field-wrap cid-center">
              <select>
                  <option value={`전체`}>전체</option>
                  <option value={`앨범 ID`}>앨범 ID</option>
                  <option value={`앨범 명`}>앨범 명</option>
              </select>
              <input type="search" name="search" />
              <button type="button"><SearchIcon /> 검색</button>
            </div>
          </div>
          <div className="cpnt_table">
            <table className="table-default">
              <caption>
                <strong className="title dp-blind">앨범 리스트</strong>
                <span className="total">
                  {`Total: `}
                  <b>3</b>
                </span>
              </caption>
              <thead>
                <tr>
                  <th><input name="checkAll" type={"checkbox"} /></th>
                  <th>앨범 ID</th>
                  <th>앨범 명</th>
                  <th>앨범 경로</th>
                  <th>키워드</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                      <td><input type={"checkbox"} /></td>
                      <td>M01211M011PPV00</td>
                      <td>The Letter A Song(EDM)</td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                  <td><input type={"checkbox"} /></td>
                      <td>M01211M011PPV00</td>
                      <td>The Letter A Song(EDM)</td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td><input type={"checkbox"} /></td>
                      <td>M01211M011PPV00</td>
                      <td>The Letter A Song(EDM)</td>
                      <td></td>
                      <td></td>
                  </tr>
              </tbody>
            </table>
          </div>
        </form>
      </PopupDialog>

      <PopupDialog
        open={isQuzContent}
        setOpen={setQuzContent}
        title={`퀴즈 콘텐츠 등록`}
        onSubmit={handleOpensetQuzContent}
      >
        <form>

          {/* (2단) 플랫폼, 퀴즈콘텐츠 명, 문항유형, 난이도, 선택지 개수 / 사용여부, 문제 */}
          <div className="layout_wrap">
            <div className="layout_item">
              {/* (2단-1) */}
              <div className="cpnt_dlForm">
                <dl className="dlForm-default">
                  <div className="tr">
                    <dt className="required"><span>플랫폼</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <input type="checkbox" name="platform1" id="platform1" required defaultChecked /><label htmlFor="platform1">공통</label>
                        <input type="checkbox" name="platform2" id="platform2" disabled /><label htmlFor="platform2">IPTV</label>
                        <input type="checkbox" name="platform3" id="platform3" disabled /><label htmlFor="platform3">모바일</label>
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required"><span>퀴즈콘텐츠 명</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <input type="text" required placeholder="최대 30자 입력가능" />
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required"><span>문항유형</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <input type="radio" name="type" id="type1" required defaultChecked /><label htmlFor="type1">다지선다</label>
                        <input type="radio" name="type" id="type2" required /><label htmlFor="type2">OX</label>
                        <input type="radio" name="type" id="type3" required disabled /><label htmlFor="type3">HTML%</label>
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required"><span>난이도</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <select>
                          <option>선택</option>
                          <option value={`1단계`}>1단계</option>
                          <option value={`2단계`}>2단계</option>
                          <option value={`3단계`}>3단계</option>
                        </select>
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required"><span>선택지 개수</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <select>
                          <option>선택</option>
                          <option value={`1개`}>1개</option>
                          <option value={`2개`}>2개</option>
                          <option value={`3개`}>3개</option>
                        </select>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>

            </div>

            {/* (2단-2) */}
            <div className="layout_item">

              <div className="cpnt_dlForm">
                <dl className="dlForm-default">
                  <div className="tr">
                    <dt className="required"><span>사용여부</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <input type="radio" name="expose" id="expose1" required defaultChecked /><label htmlFor="expose1">비노출</label>
                        <input type="radio" name="expose" id="expose2" required /><label htmlFor="expose2">검수</label>
                        <input type="radio" name="expose" id="expose3" required /><label htmlFor="expose3">비노출</label>
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required"><span>문제</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <input type="text" required placeholder="최대 400자 입력가능" />
                      </div>
                      <div className="field-wrap">
                        <input type="file" onChange={handleChangeFile} />
                        <input type="text" placeholder="음성파일 등록" />
                        <button type="button" onClick={handleClickFile}>파일선택</button>
                        <button type="button" className="field-button play"><PlayArrowIcon /> 재생</button>
                      </div>
                      <div className="field-wrap">
                        <input type="file" onChange={handleChangeFile} />
                        <input type="text" placeholder="(음원문제용) 음원파일 등록" />
                        <button type="button" onClick={handleClickFile}>파일선택</button>
                        <button type="button" className="field-button play"><PlayArrowIcon /> 재생</button>
                      </div>
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
                        <input type="file" onChange={handleChangeFile} />
                        <input type="text" placeholder="이미지 파일 등록" />
                        <button type="button" onClick={handleClickFile}>파일선택</button>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>

            </div>
          </div>
          
          {/* (3단) 선택지 및 정답선택 : 다지선다 */}
          <div className="cpnt_title type1 mg-t10">
            <strong>선택지 및 정답선택</strong>
          </div>
          <div className="layout_wrap">

            {/* (3단 - 1 ) */}
            <div className="layout_item bd-1 pd-10">
              <div className="field-wrap">
                <input type="radio" name="selectAnswer_multi" id="selectAnswer_multi1" required defaultChecked /><label htmlFor="selectAnswer_multi1">선택지1</label>
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} placeholder="최대 500자 입력가능" />
              </div>
              <div className="field-wrap">
                <input type="file" onChange={handleChangeFile} />
                <input type="text" placeholder="음성파일 등록" />
                <button type="button" onClick={handleClickFile}>파일선택</button>
                <button type="button" className="field-button play"><PlayArrowIcon /> 재생</button>
              </div>
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
                <input type="file" onChange={handleChangeFile} />
                <input type="text" placeholder="이미지 파일 등록" />
                <button type="button" onClick={handleClickFile}>파일선택</button>
              </div>

            </div>

            {/* (3단 - 2 ) */}
            <div className="layout_item bd-1 pd-10">
              
              <div className="field-wrap">
                  <input type="radio" name="selectAnswer_multi" id="selectAnswer_multi2" required defaultChecked /><label htmlFor="selectAnswer_multi2">선택지2</label>
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} placeholder="최대 500자 입력가능" />
              </div>
              <div className="field-wrap">
                <input type="file" onChange={handleChangeFile} />
                <input type="text" placeholder="음성파일 등록" />
                <button type="button" onClick={handleClickFile}>파일선택</button>
                <button type="button" className="field-button play"><PlayArrowIcon /> 재생</button>
              </div>
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
                <input type="file" onChange={handleChangeFile} />
                <input type="text" placeholder="이미지 파일 등록" />
                <button type="button" onClick={handleClickFile}>파일선택</button>
              </div>

            </div>

            {/* (3단 - 3 ) */}
            <div className="layout_item bd-1 pd-10">
              
              <div className="field-wrap">
                <input type="radio" name="selectAnswer_multi" id="selectAnswer_multi3" required defaultChecked /><label htmlFor="selectAnswer_multi3">선택지3</label>
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} placeholder="최대 500자 입력가능" />
              </div>
              <div className="field-wrap">
                <input type="file" onChange={handleChangeFile} />
                <input type="text" placeholder="음성파일 등록" />
                <button type="button" onClick={handleClickFile}>파일선택</button>
                <button type="button" className="field-button play"><PlayArrowIcon /> 재생</button>
              </div>
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
                <input type="file" onChange={handleChangeFile} />
                <input type="text" placeholder="이미지 파일 등록" />
                <button type="button" onClick={handleClickFile}>파일선택</button>
              </div>

            </div>
          </div>

          {/* (3단) 선택지 및 정답선택 : OX */}
          <div className="cpnt_title type1 mg-t10">
            <strong>선택지 및 정답선택</strong>
          </div>
          <div className="layout_wrap">

            {/* (3단 - 1 ) */}
            <div className="layout_item bd-1 pd-10">
              <div className="field-wrap">
                <input type="radio" name="selectAnswer_OX" id="selectAnswer_OX1" required defaultChecked /><label htmlFor="selectAnswer_OX1">선택지1</label>
              </div>
              <div className="item_ox">
                <CloseIcon />
              </div>

            </div>

            {/* (3단 - 2 ) */}
            <div className="layout_item bd-1 pd-10">
              
              <div className="field-wrap">
                  <input type="radio" name="selectAnswer_OX" id="selectAnswer_OX2" required defaultChecked /><label htmlFor="selectAnswer_OX2">선택지2</label>
              </div>
              <div className="item_ox">
                <PanoramaFishEyeIcon />
              </div>
            </div>

            {/* (3단 - 3 ) */}
            <div className="layout_item bd-1 pd-10">

            </div>
          </div>

          {/* (3단) 정답해설 텍스트 및 음원 */}
          <div className="cpnt_title type1 mg-t10">
            <strong>정답해설 텍스트 및 음원</strong>
          </div>
          <div className="layout_wrap">
            {/* (3단 - 1 ) */}
            <div className="layout_item bd-1 pd-10">
              
              <div className="field-wrap">
                <textarea rows={`3`} placeholder="최대 500자 입력가능" />
              </div>
              <div className="field-wrap">
                <input type="file" onChange={handleChangeFile} />
                <input type="text" placeholder="음성파일 등록" />
                <button type="button" onClick={handleClickFile}>파일선택</button>
                <button type="button" className="field-button play"><PlayArrowIcon /> 재생</button>
              </div>

            </div>
            {/* (3단 - 2 ) */}
            <div className="layout_item bd-1 pd-10">

            </div>
            {/* (3단 - 3 ) */}
            <div className="layout_item bd-1 pd-10">

            </div>
          </div>

          
          {/* (1단) 해설영상, 연관영상 추천 */}
          <div className="cpnt_dlForm mg-t10">
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required"><span>해설영상</span></dt>
                <dd>
                  <div className="field-wrap cid-auto">
                    <input type="text" required placeholder="해설 영상 매핑" />
                    <button className="field-button" type="button" onClick={handleAlbum}>앨범ID 조회</button>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className=""><span>얀관영상 추천 (최대 4개)</span></dt>
                <dd>
                  <div className="field-wrap cid-auto">
                    <input type="text" placeholder="연관 영상 매핑" />
                    <button className="field-button" type="button" onClick={handleAlbum}>앨범ID 조회</button>
                    <button className="field-button" type="button"><AddIcon /> 추가</button>
                    <button className="field-button" type="button"><RemoveIcon /> 삭제</button>
                  </div>
                </dd>
              </div>
            </dl>
          </div>

          {/* (2단) 사용여부. 다시보기텍스트 */}
          <div className="layout_wrap mg-t10">

            {/* (2단 - 1 ) */}
            <div className="layout_item">

              <div className="cpnt_dlForm">
                <dl className="dlForm-default">
                  <div className="tr">
                    <dt className="required"><span>사용여부</span></dt>
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
                        <input type="text" required placeholder="이미지 파일 등록" />
                        <button type="button" onClick={handleClickFile}>파일선택</button>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>

            </div>

            {/* (2단 - 2 ) */}
            <div className="layout_item">

              <div className="cpnt_dlForm">
                <dl className="dlForm-default">
                  <div className="tr">
                    <dt className="required"><span>다시보기 텍스트</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <textarea rows={`3`} placeholder="최대 500자 입력가능" />
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>

            </div>
          </div>

          {/* (1단) 퀴즈컨텐츠 키워드, 소속된 퀴즈그룹목록 */}
          <div className="cpnt_dlForm mg-t10">
            <dl className="dlForm-default">
              <div className="tr">
                <dt><span>퀴즈콘텐츠 키워드</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" placeholder="콤마(,)로 구분하여 입력가능" />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt><span>소속된 퀴즈그룹 목록</span></dt>
                <dd>
                  
                </dd>
              </div>
            </dl>
          </div>

        </form>
      </PopupDialog>
      
      
    </>
  );
};

export default QuzContent;