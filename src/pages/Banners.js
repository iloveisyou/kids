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

const Banners = () => {
  const [data, setData] = useState([
    {
      bnrNo: 1,
      bnrNm: "테스트배너1",
      dspStartDtt: "2022. 03. 01 00:00",
      dspStopDtt: "2025. 03. 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드1",
      ladgDstVl: "랜딩식별값1",
      regDtt: "22022. 03. 01 00:00",
      regrID: "Admin001",
      modDtt: "2022. 03. 01 00:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
    { bnrNo: 2, bnrNm: "테스트배너2", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2022. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드2", ladgDstVl: "랜딩식별값2", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 3, bnrNm: "테스트배너3", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드3", ladgDstVl: "랜딩식별값3", regDtt: "2022. 03. 01 00:00", regrID: "Admin003", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 4, bnrNm: "테스트배너4", dspStartDtt: "2022. 03. 01 0:00", dspStopDtt: "2022. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드4", ladgDstVl: "랜딩식별값4", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너5", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너6", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너7", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너8", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너9", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너10", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너11", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너12", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너13", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너14", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너15", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너16", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너17", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너18", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너19", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너20", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너21", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너22", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너23", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너24", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너25", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너26", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너27", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너28", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너29", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너30", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너31", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너32", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너33", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너34", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너35", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너36", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너37", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너38", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    { bnrNo: 5, bnrNm: "테스트배너39", dspStartDtt: "2022. 03. 01 00:00", dspStopDtt: "2025. 03. 02 23:59", bnrImgNo: null, ladgDvsCd: "랜딩구분코드5", ladgDstVl: "랜딩식별값5", regDtt: "2022. 03. 01 00:00", regrID: "Admin001", modDtt: "2022. 03. 01 00:00", modfId: "Admin001", useStsCd: "사용", },
    
  ]);

  const { showToast } = useToast();
  // const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const [selectedBnrNo, setSelectedBnrNo] = useState("");

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
      // if (data.bnrNm === "") {
      //   showToast(`<strong>배너명을 입력해주세요.</strong><br>`, `error`);
      //   return;
      // } else if (
      //   (data.dspStartDtt === "" && data.dspStopDtt === "") ||
      //   moment(data.dspStartDtt).format("YYYY.MM.DD HH:mm") >
      //     moment(data.dspStopDtt).format("YYYY.MM.DD HH:mm")
      // ) {
      //   showToast(`<strong>게시기간을 확인해주세요.</strong><br>`, `error`);
      //   return;
      // } else if (imgFile === null) {
      //   showToast(`<strong>배너 이미지를 선택해주세요.</strong><br>`, `error`);
      //   return;
      // } else if (data.ladgDstVl === "" && data.ladgDvsCd === "") {
      //   showToast(
      //     `<strong>배너랜딩 유형을 입력해주세요.</strong><br>`,
      //     `error`
      //   );
      //   return;
      // }
      // data.bnrImgNo = 12;
      // console.log(data);
      // console.log(data.bnrNm);
      // console.log(data.dspStartDtt);
      // console.log(data.dspStopDtt);
      // console.log(data.ladgDstVl);
      // console.log(data.ladgDvsCd);
      // console.log(imgFile === null);
      // console.log(moment(data.dspStartDtt).format("YYYY.MM.DD HH:mm"));
      // console.log(
      //   "잘못된 선택",
      //   moment(data.dspStartDtt).format("YYYY.MM.DD HH:mm") >
      //     moment(data.dspStopDtt).format("YYYY.MM.DD HH:mm")
      // );

      API.get("kids-lms-parents/api/v1/admin/comn/upload", {
        params: {
          type: 1,
          fileName: imgFile[0].name,
        },
      })
        .then((res) => {
          data.bnrImgNo = res.data.data.fileKey;
          data.dspStartDtt = moment(data.dspStartDtt).format(
            "YYYY.MM.DD HH:mm"
          );
          data.dspStopDtt = moment(data.dspStopDtt).format("YYYY.MM.DD HH:mm");
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

  const handleResetFile = (e) => {
    setImgBase64(() => []);
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[0].value =
      "";
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].value =
      "";
  };

  // const getData = useCallback(async () => {
  //   await API.get("kids-lms-parents/api/v1/lms/admin/banners")
  //     .then((res) => {
  //       if (res.data.sccsYn === "Y") {
  //         setData(res.data.data);
  //         setTempData(res.data.data);
  //       } else {
  //         showToast(`에러가 발생하였습니다.`, `error`);
  //       }
  //     })
  //     .catch(() => {
  //       showToast(`에러가 발생하였습니다.`, `error`);
  //     });
  // }, [setData]);

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
      const index = list.findIndex((i) => i.bnrNo === key);
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
        data.forEach((el) => idArray.push(el.bnrNo));

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
        modData.push({ bnrNo: item.bnrNo, useStsCd: item.useStsCd });
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
    const checkedData = list.filter((i) => checkItems.includes(i.bnrNo)).toJS();

    const result = checkedData.map((data) => {
      return { bnrNo: data.bnrNo };
    });

    if (result.length === 0) {
      showToast(`<strong>삭제할 데이터가 없습니다.</strong><br>`, `warning`);
      return;
    }

    deleteData(result);
  }, [showToast, data, checkItems, deleteData]);

  const [isOpenDetail, setOpenDetail] = useState(false);
  const detailBanner = useCallback(
    (bnrNo) => {
      setSelectedBnrNo(bnrNo);
      setOpenDetail(true);
    },
    [setOpenDetail, setSelectedBnrNo]
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
            <tr key={data.bnrNo}>
              <th>
                <input
                  name="checkAll"
                  type={"checkbox"}
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={checkItems.length === data.length ? true : false}
                />
              </th>
              <th><TooltipText title="클릭 시 등록된 '배너 상세'를 확인 하실 수 잇습니다.">배너명</TooltipText></th>
              <th>게시기간</th>
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
                key={data.bnrNo}
                className={getRowColorFromUseSts(data.useStsCd)}
              >
                <td>
                  <input
                    type={"checkbox"}
                    onChange={(e) =>
                      handleSingleCheck(e.target.checked, data.bnrNo)
                    }
                    checked={checkItems.includes(data.bnrNo) ? true : false}
                  />
                </td>
                <td onClick={() => detailBanner(data.bnrNo)}><button className="text-link" type="button">{data.bnrNm}</button></td>
                <td>
                  {data.dspStartDtt} ~ {data.dspStopDtt}
                </td>
                <td>
                  <select
                    name="useStsCd"
                    onChange={(e) => {
                      handleUseSelect(e, data.bnrNo, data.dspStopDtt);
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
          <button type="button" onClick={handleOpenPopUp} className="sb af-r">
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
        open={insertConfirm}
        setOpen={setInsertConfirm}
        title={`배너 등록`}
        onClose={handleOnClose}
        btnMsg={btnMsg}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div className="cpnt_dlForm">
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required">
                  <span>배너명</span>
                </dt>
                <dd>
                  <div className="field-wrap">
                    <input
                      {...register("bnrNm", {
                        required: {
                          value: true,
                          message: "배너명을 입력해 주세요.",
                        },
                        minLength: {
                          value: 3,
                          message: "3자 이상 입력해주세요",
                        },
                      })}
                      data-error={errors.bnrNm && "error"}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="bnrNm"
                    render={({ message }) => <div className="cpnt_errorMessage"><p>{message}</p></div>}
                  />
                </dd>
              </div>
              <div className="tr">
                <dt className="required">
                  <span>게시기간</span>
                </dt>
                <dd>
                  <div className="field-wrap cid-auto cid-range">
                    <input
                      id="startDate"
                      type="datetime-local"
                      defaultValue={nowDate}
                      sx={{ width: 160 }}
                      name="dspStartDtt"
                      {...register("dspStartDtt", {
                        required: true,
                      })}
                    />
                    ~
                    <input
                      id="endDate"
                      type="datetime-local"
                      defaultValue={nowDate}
                      sx={{ width: 160 }}
                      name="dspStopDtt"
                      {...register("dspStopDtt", {
                        required: true,
                        validate: {
                          check: (v) =>
                            v > watch(`dspStartDtt`) ||
                            "게시기간을 확인해주세요.",
                        },
                      })}
                      data-error={errors.dspStopDtt && "error"}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="dspStopDtt"
                    render={({ message }) => <div className="cpnt_errorMessage"><p>{message}</p></div>}
                  />
                </dd>
              </div>
              <div className="tr">
                <dt className="required">
                  <span>배너 이미지</span>
                </dt>
                <dd>
                  {imgBase64.map((item) => {
                    return (
                      <div key="1" className="field-input-file-img">
                        <span key="3">
                          <img key="0" src={item} alt="선택한 이미지" />
                          <button
                            key="2"
                            type="button"
                            onClick={handleResetFile}
                          >
                            <CloseIcon /> 이미지삭제
                          </button>
                        </span>
                      </div>
                    );
                  })}
                  <div className="field-wrap">
                    <input
                      type="file"
                      name="bnrImgNo"
                      id="bnrImgNo"
                      onChange={handleChangeFile}
                    />
                    <input className="required" type="text" readOnly />
                    <button type="button" onClick={handleClickFile}>
                      파일선택
                    </button>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required">
                  <span>배너랜딩 유형</span>
                </dt>
                <dd>
                  <div className="field-wrap cid-auto">
                    <select
                      name="ladgDvsCd"
                      {...register("ladgDvsCd", {
                        required: {
                          value: true,
                          message: "배너랜딩유형명을 선택해 주세요.",
                        },
                      })}
                      data-error={errors.ladgDvsCd && "error"}
                    >
                      <option value={""}>선택</option>
                      <option value={"메뉴(카테고리)랜딩"}>
                        메뉴(카테고리)랜딩
                      </option>
                      <option value={"아이들나라 홈"}>아이들나라 홈</option>
                      <option value={"대메뉴 랜딩"}>대메뉴 랜딩</option>
                      <option value={"서비스 랜딩"}>서비스 랜딩</option>
                      <option value={"콘텐츠 랜딩"}>콘텐츠 랜딩</option>
                    </select>
                    <input
                      name="ladgDstVl"
                      {...register("ladgDstVl", {
                        required: {
                          value: true,
                          message: "배너랜딩유형명을 입력해주세요.",
                        },
                        minLength: {
                          value: 3,
                          message: "3자 이상 입력해주세요",
                        },
                      })}
                      data-error={errors.ladgDstVl && "error"}
                    />
                  </div>
                  { (errors.ladgDvsCd || errors.ladgDstVl) &&
                    <div className="cpnt_errorMessage">
                      <ErrorMessage
                        errors={errors}
                        name={"ladgDvsCd"}
                        render={({ message }) => <p>{message}</p>}
                      />
                      <ErrorMessage
                        errors={errors}
                        name={"ladgDstVl"}
                        render={({ message }) => <p>{message}</p>}
                      />
                    </div>
                  }
                  
                </dd>
              </div>
            </dl>
          </div>
        </form>
      </PopupDialog>

      <BannersDetail
        open={isOpenDetail}
        setOpen={setOpenDetail}
        bnrNo={selectedBnrNo}
        isBtn={false}
      />
    </>
  );
};

export default Banners;
