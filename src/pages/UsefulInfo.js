import { DialogContent } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import API from "../components/axios/api";
import { useToast } from "../components/hooks";
import { List } from "immutable";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import moment from "moment";
import "moment/locale/ko";
import WarningDialog from "../components/warningDialog/WarningDialog";
import TooltipText from "../components/tooltip/TooltipText";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import PopupDialog from "../components/popupDialog/PopupDialog";
import BannersDetail from "./BannersDetail";
import { ErrorMessage } from "@hookform/error-message";

const UsefulInfo = () => {
  const [data, setData] = useState([
    {
      dataNo: 1,
      dataNm: "유용한 정보1",
      useStsCd: "사용",
    },
    {
      dataNo: 2,
      dataNm: "유용한 정보2",
      useStsCd: "사용",
    },
    {
      dataNo: 3,
      dataNm: "유용한 정보3",
      useStsCd: "사용",
    },
    {
      dataNo: 4,
      dataNm: "유용한 정보4",
      useStsCd: "사용",
    },
    {
      dataNo: 5,
      dataNm: "유용한 정보5",
      useStsCd: "사용",
    },
  ]);

  const { showToast } = useToast();
  // const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [selectedDataNo, setSelectedDataNo] = useState("");

  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);

  const [btnMsg, setBtnMsg] = useState("등록");

  const [updateConfirm, setUpdateConfirm] = useState(false);
  const handleButtonUpdate = useCallback(() => {
    setUpdateConfirm(true);
  }, [setUpdateConfirm]);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const handleButtonDelete = useCallback(() => {
    setDeleteConfirm(true);
  }, [setDeleteConfirm]);

  const [dateConfirm, setDateConfirm] = useState(false);

  const [insertConfirm, setInsertConfirm] = useState(false);
  const handleOpenPopUp = useCallback(() => {
    setImgBase64([]);
    setImgFile(null);
    setInsertConfirm(true);
  }, [setInsertConfirm]);

  const nowDate = moment().format("YYYY-MM-DDTHH:mm");

  const { register, handleSubmit, formState, watch, reset } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleOnClose = useCallback(() => {
    reset();
    setBtnMsg("등록");
  }, [reset]);

  const { isDirty, errors } = formState;

  const onSubmit = useCallback(
    (data) => {
      API.get("kids-lms-parents/api/v1/admin/comn/upload", {
        params: {
          type: 1,
          fileName: imgFile[0].name,
        },
      })
        .then((res) => {
          data.bnrImgNo = res.data.data.fileKey;

          console.log(data);
          uploadImageToS3(res.data.data.presignedUrl, imgFile);
          showToast(`<strong>업로드 되었습니다.</strong><br>`, `success`);
        })
        .catch((err) => {
          showToast(`<strong>업로드 실패하였습니다.</strong><br>`, `error`);
        });

      setInsertConfirm(false);
    },
    [showToast, setInsertConfirm, imgFile]
  );

  const uploadImageToS3 = useCallback(
    async (presignedUrl, imgFile) => {
      await API.put(presignedUrl, imgFile)
        .then((res) => {
          // showToast(`<strong>등록이 완료되었습니다.</strong><br>`, `success`);
        })
        .catch((err) => {
          console.log(err);
          // showToast(`<strong>등록 실패하였습니다.</strong><br>`, `error`);
        });
    },
    [imgFile, showToast]
  );

  const onInvalid = (errors) => console.log(errors);

  const [usefulInfoDetail, setUsefulInfoDetail] = useState(false);
  const handleUsefulInfoDetail = useCallback(() => {
    setUsefulInfoDetail(true);
  }, [setUsefulInfoDetail]);


  const handleClickFile = (e) => {
    // button 클릭으로 file파일 클릭 핸들러
    e.target.previousElementSibling.previousElementSibling.click();
  };

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
          e.target.nextElementSibling.value = e.target.files[0].name;
        }
      };
    }
  };

  const handleResetFile = (e) => { // 파일 이미지 삭제
    setImgBase64((imgBase64) => []);
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[0].value = "";
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].value = "";
  };


  const updateData = useCallback(
    async (data) => {
      await API.put("kids-lms-parents/api/v1/lms/admin/banners", data)
        .then((res) => {
          setCheckItems([]);
          showToast(`<strong>등록이 완료되었습니다.</strong><br>`, `success`);
        })
        .catch((err) => {
          showToast(`<strong>등록 실패하였습니다.</strong><br>`, `error`);
        });
    },
    [setCheckItems, showToast]
  );

  const deleteData = useCallback(
    async (checkItems) => {
      await API.post("kids-lms-parents/api/v1/lms/admin/banners", checkItems)
        .then((res) => {
          setCheckItems([]);
          // getData();
          showToast(`<strong>삭제되었습니다.</strong><br>`, `success`);
        })
        .catch((err) => {
          showToast(`<strong>삭제 실패하였습니다.</strong><br>`, `error`);
        });
    },
    [setCheckItems, showToast]
  );

  useEffect(() => {}, [updateData, deleteData]);

  const handleUseSelect = useCallback(
    (e, key, date) => {
      const today = moment().format("YYYY. MM. DD HH:mm");
      const endDate = moment(date).format("YYYY. MM. DD HH:mm");

      if (e.target.value === "사용" && endDate < today) {
        setDateConfirm(true);
        return;
      }

      const selected = e.target.value;
      const list = List(data);
      const index = list.findIndex((i) => i.dataNo === key);
      const newArr = list.update(index, (item) =>
        Object.assign({}, item, { useStsCd: selected })
      );
      setData(newArr.toJS());
    },
    [data, setData]
  );

  const handleSingleCheck = useCallback(
    (checked, id) => {
      if (checked) {
        setCheckItems([...checkItems, id]);
      } else {
        setCheckItems(checkItems.filter((el) => el !== id));
      }
    },
    [setCheckItems, checkItems]
  );

  const handleAllCheck = useCallback(
    (checked) => {
      if (checked) {
        const idArray = [];
        data.forEach((el) => idArray.push(el.dataNo));

        setCheckItems(idArray);
      } else {
        setCheckItems([]);
      }
    },
    [data, setCheckItems]
  );

  const handleUpdateClick = useCallback(() => {
    var modData = [];

    data.map((item, index) => {
      if (item.useStsCd !== tempData[index].useStsCd) {
        modData.push({ dataNo: item.dataNo, useStsCd: item.useStsCd });
      }
      return modData;
    });

    if (modData.length === 0) {
      showToast(`<strong>적용할 데이터가 없습니다.</strong><br>`, `warning`);
      return;
    }

    updateData(modData);
  }, [showToast, data, tempData, updateData]);

  const handleDeleteClick = useCallback(() => {
    const list = List(data);
    const checkedData = list.filter((i) => checkItems.includes(i.dataNo)).toJS();

    const result = checkedData.map((data) => {
      return { dataNo: data.dataNo };
    });

    if (result.length === 0) {
      showToast(`<strong>삭제할 데이터가 없습니다.</strong><br>`, `warning`);
      return;
    }

    deleteData(result);
  }, [showToast, data, checkItems, deleteData]);

  const [isOpenDetail, setOpenDetail] = useState(false);
  const detailBanner = useCallback(
    (dataNo) => {
      setSelectedDataNo(dataNo);
      setOpenDetail(true);
    },
    [setOpenDetail, setSelectedDataNo]
  );



  const getRowColorFromUseSts = (useStsCd) => {
    let className;
    switch (useStsCd) {
      case `사용`:
        className = `enabled`;
        break;
      case `검수`:
        className = `validate`;
        break;
      case `미사용`:
        className = `disabled`;
        break;
      default:
        className = "default";
        break;
    }
    return className;
  };

  return (
    <>
      <div className="cpnt_table">
        <table className="table-default">
          <caption>
            <strong className="blind"></strong>
            <span className="total">
              Total: <b>{data.length}</b>
            </span>
          </caption>
          <thead>
            <tr key={data.dataNo}>
              <th>
                <input
                  name="checkAll"
                  type={"checkbox"}
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={checkItems.length === data.length ? true : false}
                />
              </th>
              <th><TooltipText title="클릭 시 등록된 '배너 상세'를 확인 하실 수 잇습니다.">유용정보명</TooltipText></th>
              <th>
                <TooltipText title="사용여부 설정 후 하단의 적용버튼을 클릭하여야 적용이 됩니다.">
                  사용여부
                </TooltipText>
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((data) => (
              <tr
                key={data.dataNo}
                className={getRowColorFromUseSts(data.useStsCd)}
              >
                <td>
                  <input
                    type={"checkbox"}
                    onChange={(e) =>
                      handleSingleCheck(e.target.checked, data.dataNo)
                    }
                    checked={checkItems.includes(data.dataNo) ? true : false}
                  />
                </td>
                <td onClick={handleUsefulInfoDetail}><button className="text-link" type="button">{data.dataNm}</button></td>
                <td>
                  <select
                    name="useStsCd"
                    onChange={(e) => {
                      handleSubmit(e, data.dataNo);
                    }}
                    value={data.useStsCd}
                  >
                    <option value={"사용"}>사용</option>
                    <option value={"미사용"}>미사용</option>
                    <option value={"검수"}>검수</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cpnt_btns">
          <button type="button" onClick={handleButtonUpdate}>
            <PlaylistAddCheckIcon />
            적용
          </button>
          <button type="button" onClick={handleButtonDelete}>
            <DeleteOutlineIcon />
            삭제
          </button>
          <button type="button" onClick={handleUsefulInfoDetail} className="sb af-r">
            <AddIcon />
            등록
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={updateConfirm}
        setOpen={setUpdateConfirm}
        onConfirm={handleUpdateClick}
      >
        <div>적용하시겠습니까?</div>
      </ConfirmDialog>

      <ConfirmDialog
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        onConfirm={handleDeleteClick}
      >
        <div>삭제하시겠습니까?</div>
      </ConfirmDialog>

      <WarningDialog open={dateConfirm} setOpen={setDateConfirm}>
        <DialogContent>
          <div>게시 기간을 확인해주세요.</div>
        </DialogContent>
      </WarningDialog>

      <PopupDialog
        open={usefulInfoDetail}
        setOpen={setUsefulInfoDetail}
        title={`학부모 유용정보 등록`}
        onClose={handleOnClose}
        btnMsg={btnMsg}
        onSubmit={handleUsefulInfoDetail}
      >
        <form>
          <div className="cpnt_dlForm">
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required"><span>유용 정보명</span></dt>
                <dd><div className="field-wrap"><input type="text" required /></div></dd>
              </div>
              <div className="tr">
                <dt className="required"><span>유용정보 링크</span></dt>
                <dd>
                  <div className="field-wrap"><label>모바일</label><input type="text" required defaultValue={`https://`} /></div>
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
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>대표 이미지</span></dt>
                <dd>
                  {imgBase64.map((item) => {
                    return (
                      <div key="21" className="field-input-file-img"><span key="3">
                        <img
                          key="20"
                          src={item}
                          alt="선택한 이미지"
                        />
                        <button key="22" type="button" onClick={handleResetFile}><CloseIcon /> 이미지삭제</button>
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
              <div className="tr">
                <dt className="required"><span>추천대상 연령</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input id="age3" type="checkbox" required /><label htmlFor="age3">3세 이하</label>
                    <input id="age4" type="checkbox" required /><label htmlFor="age4">4세</label>
                    <input id="age5" type="checkbox" required /><label htmlFor="age5">5세</label>
                    <input id="age6" type="checkbox" required /><label htmlFor="age6">6세</label>
                    <input id="age7" type="checkbox" required /><label htmlFor="age7">7세</label>
                    <input id="age8" type="checkbox" required /><label htmlFor="age8">8세 이상</label>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>추천영어 레벨</span></dt>
                <dd>
                  <div className="field-wrap">
                    <select required>
                      <option>선택</option>
                      <option>1레벨</option>
                      <option>2레벨</option>
                      <option>3레벨</option>
                      <option>4레벨</option>
                      <option>5레벨</option>
                      <option>6레벨</option>
                    </select>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt><span>주요관심사</span></dt>
                <dd>
                  <div className="field-wrap">
                    <select> <option>선택</option> <option>과학기술</option> <option>정서/사회성</option> <option>자연탐구</option> <option>바른생활/안전</option> <option>활동/운동</option> <option>음악예술</option> <option>언어논리</option> <option>수리논리</option> </select> 
                    <select> <option>선택</option> <option>과학기술</option> <option>정서/사회성</option> <option>자연탐구</option> <option>바른생활/안전</option> <option>활동/운동</option> <option>음악예술</option> <option>언어논리</option> <option>수리논리</option> </select> 
                    <select> <option>선택</option> <option>과학기술</option> <option>정서/사회성</option> <option>자연탐구</option> <option>바른생활/안전</option> <option>활동/운동</option> <option>음악예술</option> <option>언어논리</option> <option>수리논리</option> </select> 
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

export default UsefulInfo;
