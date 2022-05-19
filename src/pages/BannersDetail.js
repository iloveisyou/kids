import { useEffect, useState, useCallback } from "react";
import API from "../components/axios/api";
import { useToast } from "../components/hooks";
import moment from "moment";
import "moment/locale/ko";

import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { ErrorMessage } from "@hookform/error-message";

const BannersDetail = (props) => {
  const DEFAULT_IMAGE = `http://ukidsdev.uplus.co.kr/ukids-lms/PetDefaultImage.png`;
  const { open, setOpen, bnrNo } = props;
  const { showToast } = useToast();
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [btnMsg, setBtnMsg] = useState("등록");

  const { reset, register, handleSubmit, formState, watch } = useForm({
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
    },
    [showToast, imgFile]
  );

  const uploadImageToS3 = useCallback(
    async (presignedUrl, imgFile) => {
      console.log(presignedUrl);
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
    setImgBase64((imgBase64) => []);
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[0].value =
      "";
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].value =
      "";
  };

  const getData = useCallback(async () => {
    await API.get(`kids-lms-parents/api/v1/lms/admin/banners/${bnrNo}`).then(
      (res) => {
        reset({
          ...res.data.data,
          dspStartDtt: moment(res.data.data.dspStartDtt).format(
            "YYYY-MM-DDTHH:mm"
          ),
          dspStopDtt: moment(res.data.data.dspStopDtt).format(
            "YYYY-MM-DDTHH:mm"
          ),
        });
        setImgBase64([
          "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
        ]);
      }
    );
  }, [setImgBase64, bnrNo]);

  useEffect(() => {
    if (bnrNo !== "") {
      getData();
    }
  }, [getData, bnrNo]);

  const handleImageError = useCallback(
    (e) => {
      e.target.src = DEFAULT_IMAGE;
    },
    [DEFAULT_IMAGE]
  );

  return (
    <>
      <PopupDialog
        open={open}
        setOpen={setOpen}
        title={`배너 수정`}
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
                          <img
                            key="0"
                            src={item}
                            alt="선택한 이미지"
                            onError={handleImageError}
                          />
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
    </>
  );
};

export default BannersDetail;
