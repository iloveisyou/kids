import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useToast } from "../components/hooks";
import { List } from "immutable";
import API from "../components/axios/api";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import PetListDetail from "./PetListDetail";
import TooltipText from "../components/tooltip/TooltipText";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const PetList = () => {
  const DEFAULT_IMAGE = `http://ukidsdev.uplus.co.kr/ukids-lms/PetDefaultImage.png`;
  const { showToast } = useToast();
  const [data, setData] = useState([
    {
      petNo: 1,
      dspNum: 1,
      imgUrl: "https://ukidsdev.uplus.co.kr/null",
      petNm: "귀엽구멍",
      useStsCd: "Y",
      regDtt: "2021.04.21. 12:12",
      modDtt: "2021.05.22. 09:05",
    },
    {
      petNo: 2,
      dspNum: 2,
      imgUrl: "https://ukidsdev.uplus.co.kr/null",
      petNm: "고양이",
      useStsCd: "N",
      regDtt: "2021.04.21. 12:12",
      modDtt: "2021.05.22. 09:05",
    },
    {
      petNo: 3,
      dspNum: 3,
      imgUrl: "https://ukidsdev.uplus.co.kr/null",
      petNm: "호랑이",
      useStsCd: "Y",
      regDtt: "2021.04.21. 12:12",
      modDtt: "2021.05.22. 09:05",
    },
    {
      petNo: 4,
      dspNum: 4,
      imgUrl: "https://ukidsdev.uplus.co.kr/null",
      petNm: "사자",
      useStsCd: "N",
      regDtt: "2021.04.21. 12:12",
      modDtt: "2021.05.22. 09:05",
    },
    {
      petNo: 5,
      dspNum: 5,
      imgUrl: "https://ukidsdev.uplus.co.kr/null",
      petNm: "원숭이",
      useStsCd: "Y",
      regDtt: "2021.04.21. 12:12",
      modDtt: "2021.05.22. 09:05",
    },
    {
      petNo: 6,
      dspNum: 6,
      imgUrl: "https://ukidsdev.uplus.co.kr/null",
      petNm: "하마",
      useStsCd: "Y",
      regDtt: "2021.04.21. 12:12",
      modDtt: "2021.05.22. 09:05",
    },
    {
      petNo: 7,
      dspNum: 7,
      imgUrl: "https://ukidsdev.uplus.co.kr/null",
      petNm: "래서팬더",
      useStsCd: "Y",
      regDtt: "2021.04.21. 12:12",
      modDtt: "2021.05.22. 09:05",
    },
    {
      petNo: 8,
      dspNum: 8,
      imgUrl: "https://ukidsdev.uplus.co.kr/null",
      petNm: "거미",
      useStsCd: "Y",
      regDtt: "2021.04.21. 12:12",
      modDtt: "2021.05.22. 09:05",
    },
  ]);
  const [checkItems, setCheckItems] = useState([]);

  const [isOpenApplyConfirm, setOpenApplyConfirm] = useState(false);
  const handleApplyButton = useCallback(() => {
    setOpenApplyConfirm(true);
  }, [setOpenApplyConfirm]);

  //   const getData = useCallback(async () => {
  //     await API.get("/kids-lms-play/api/v1/lms/admin/pet/pets/").then((res) => {
  //       console.log(res.data.data);
  //       setData(res.data.data);
  //     });
  //   }, [setData]);

  const updateData = useCallback(
    async (data) => {
      await API.put("/kids-lms-play/api/v1/lms/admin/pet/pets/", data)
        .then((res) => {
          setCheckItems([]);
          showToast(`적용이 완료되었습니다.`, `success`);
        })
        .catch((err) => {
          showToast(`적용 실패하였습니다.`, `error`);
        });
    },
    [setCheckItems, showToast]
  );

  //   useEffect(() => {
  //     getData();
  //   }, [getData, updateData]);

  const handleImageError = useCallback(
    (e) => {
      e.target.src = DEFAULT_IMAGE;
    },
    [DEFAULT_IMAGE]
  );

  const handleDragEnd = useCallback(
    (e) => {
      console.log(e);
      if (!e.destination) {
        return;
      }

      if (e.destination.index === e.source.index) {
        return;
      }

      let tempData = Array.from(data);
      let [source_data] = tempData.splice(e.source.index, 1);
      tempData.splice(e.destination.index, 0, source_data);
      const min = Math.min(e.source.index, e.destination.index);
      const max = Math.max(e.source.index, e.destination.index);

      for (var i = min; i <= max; i++) {
        if (!tempData[i].oriNum) {
          tempData[i].oriNum = tempData[i].dspNum;
        }
        tempData[i].dspNum = i + 1;
      }
      console.log(tempData);
      setData(tempData);
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
        data.forEach((el) => idArray.push(el.petNo));
        setCheckItems(idArray);
      } else {
        setCheckItems([]);
      }
    },
    [data, setCheckItems]
  );

  const handleUseSelect = useCallback(
    (e, key) => {
      const selected = e.target.value;
      const list = List(data);
      const index = list.findIndex((i) => i.petNo === key);
      const newArr = list.update(index, (item) => {
        if (!item.oriUse) {
          return Object.assign(
            {},
            item,
            { useStsCd: selected },
            { oriUse: item.useStsCd }
          );
        }
        return Object.assign({}, item, { useStsCd: selected });
      });
      setData(newArr.toJS());
    },
    [data, setData]
  );

  const [isOpenDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleDeleteButton = useCallback(() => {
    setOpenDeleteConfirm(true);
  }, [setOpenDeleteConfirm]);

  const handleApply = useCallback(() => {
    const list = List(data);
    const index = list.filter(
      (i) =>
        (typeof i.oriNum !== "undefined" &&
          i.dspNum !== i.oriNum &&
          i.oriNum !== 0) ||
        (typeof i.oriUse !== "undefined" && i.oriUse !== i.useStsCd)
    );
    console.log(index.toJS());
    if (index.size === 0) {
      showToast(`적용할 데이터가 없습니다.`, `warning`);
      return;
    }
    updateData(index.toJS());
  }, [data, checkItems, updateData, showToast]);

  const [isOpenDetail, setOpenDetail] = useState(false);
  const handleDetailButton = useCallback(() => {
    setOpenDetail(true);
  }, [setOpenDetail]);

  return (
    <>
      <div className="cpnt_table">
        <DragDropContext onDragEnd={handleDragEnd}>
          <table className="table-default">
            <caption>
              <span className="total">
                {`Total: `}
                <b>{data.length}</b>
              </span>
            </caption>
            <thead>
              <tr>
                {/* <th>
                  <input
                    name="checkAll"
                    type={"checkbox"}
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={checkItems.length === data.length ? true : false}
                  />
                </th> */}
                <th>
                  <TooltipText title="노출순서 변경 후 하단의 적용버튼을 클릭하여야 적용이 됩니다.">노출순서</TooltipText>
                </th>
                <th>{`펫명`}</th>
                <th>{`노출아이콘`}</th>
                <th>
                  <TooltipText title="사용여부 설정 후 하단의 적용버튼을 클릭하여야 적용이 됩니다.">사용여부</TooltipText>
                </th>
                <th>{`수정일`}</th>
                <th>{`등록일`}</th>
              </tr>
            </thead>
            <Droppable droppableId="droppable-1" direction="vertical">
              {(provider) => (
                <tbody ref={provider.innerRef} {...provider.droppableProps}>
                  {data?.map((data, index) => (
                    <Draggable
                      key={`${data.petNo}`}
                      draggableId={`${data.petNo}`}
                      index={index}
                    >
                      {(provider) => (
                        <tr
                          {...provider.draggableProps}
                          ref={provider.innerRef}
                          className={`  `}
                        >
                          {/* <td {...provider.dragHandleProps}>
                            <input
                              type={"checkbox"}
                              onChange={(e) =>
                                handleSingleCheck(e.target.checked, data.petNo)
                              }
                              checked={
                                checkItems.includes(data.petNo) ? true : false
                              }
                            />
                          </td> */}
                          <td {...provider.dragHandleProps}>{index + 1}</td>
                          <td {...provider.dragHandleProps}>{data.petNm}</td>
                          <td {...provider.dragHandleProps}>
                            <img
                              src={data.imgUrl}
                              alt={data.petNm}
                              onError={handleImageError}
                              width={`80px`}
                            />
                          </td>
                          <td {...provider.dragHandleProps}>
                            <div className="field-wrap cid-center">
                              <select
                                name="useStsCd"
                                onChange={(e) => {
                                  handleUseSelect(e, data.petNo);
                                }}
                                value={data.useStsCd}
                              >
                                <option value={"노출"}>{`노출`}</option>
                                <option value={"비노출"}>{`비노출`}</option>
                                <option value={"검수"}>{`검수`}</option>
                              </select>
                            </div>
                          </td>
                          <td {...provider.dragHandleProps}>{data.modDtt}</td>
                          <td {...provider.dragHandleProps}>{data.regDtt}</td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>

        <div className="cpnt_btns">
        <button type="button" onClick={handleDeleteButton}>
            <DeleteOutlineIcon /> 삭제
          </button>
          <button type="button" onClick={handleApplyButton}>
            <PlaylistAddCheckIcon /> 적용
          </button>

          <button type="button" className="sb af-r" onClick={handleDetailButton}>
            <AddIcon /> 등록
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={isOpenApplyConfirm}
        setOpen={setOpenApplyConfirm}
        onConfirm={handleApply}
      >
        <div>{`펫 설정을 적용하시겠습니까?`}</div>
      </ConfirmDialog>

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

      <PetListDetail open={isOpenDetail} setOpen={setOpenDetail} />
    </>
  );
};

export default PetList;
