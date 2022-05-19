import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useToast } from "../components/hooks";
import { useToast } from "../hooks";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
// import PopupDialog from "../components/popupDialog/PopupDialog";
import PopupDialog from "./PopupDialog";
import { useForm } from "react-hook-form";
// import API from "../components/axios/api";
import API from "../axios/api";
import axios from "axios";
// import Album from "./Album";
// import VodField from "../components/field/VodField";

const ContentsDetailPop = (props) => {
  const getRequiredErrorMsg = (inputName) => {
    return `${inputName}는(은) 필수입니다.`;
  };

  const { open, setOpen, title, qzContsNo, callBack, readOnly, isBtn } = props;
  const { showToast } = useToast();
  const [loadingBar, setLoadingBar] = useState(false);

  const [btnMsg, setBtnMsg] = useState("등록");
  //파일정보를 담을 포멧 구성
  const fileFormat = useMemo(() => {
    return { file: "", url: "", name: "", no:0 };
  }, []);
  //문제 파일
  const getQueFileData = useMemo(() => {
    const queFileData = {
      voice: fileFormat,
      snd: fileFormat,
      img: fileFormat,
    };
    return queFileData;
  }, [fileFormat]);
  //선택지 파일
  const getQitmFileData = useMemo(() => {
    const qitmFileDataArray = [];
    for (let i = 0; i < 3; i++) {
      qitmFileDataArray.push({
        voice: fileFormat,
        img: fileFormat,
      });
    }
    return qitmFileDataArray;
  }, [fileFormat]);
  //정답 파일
  const getRtansFileData = useMemo(() => {
    const rtansFileData = {
      voice: fileFormat,
    };
    return rtansFileData;
  }, [fileFormat]);
  //다시보기 파일
  const getReplyFileData = useMemo(() => {
    const replyFileData = {
      img: fileFormat,
    };
    return replyFileData;
  }, [fileFormat]);
  const getDefaultFileData = useMemo(() => {
    const fileDataArray = {
      queFile: getQueFileData,
      qitmFileList: getQitmFileData,
      rtansFile: getRtansFileData,
      replyFile: getReplyFileData,
    };
    return fileDataArray;
  }, [getQueFileData, getQitmFileData, getRtansFileData, getReplyFileData]);
  const getAlbumIdData = useMemo(() => {
    const albumList = [];
    albumList.push({
      albumId: "",
    });
    return albumList;
  }, []);

  const InitialValues = useMemo(() => {
    return {
      qzNm: "",
      dspStsCd: "",
      dfcLvlCd: "",
      rtansQitmNo: "",
      replyTxt: "",
      qzKwd: "",
      rtansTxt: "",
      qzTxt: "",
      qitm1: "",
      qitm2: "",
      qitm3: "",
      explAlbumId: "",
      albumData: getAlbumIdData,
      fileData: getDefaultFileData,
    };
  }, [getDefaultFileData, getAlbumIdData]);

  const { register, handleSubmit, watch, reset, formState, setValue, control } =
    useForm({
      defaultValues: InitialValues,
      mode: "onChange",
      reValidateMode: "onChange",
    });

  const changeValue = useCallback(
    async (key, value) => {
      setValue(key, value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const getAlbumId = useCallback(
    (param_albumId, albumKey) => {
      if (albumKey === "expVod") {
        document.getElementById("albumIdExp").value = param_albumId;
        changeValue(`explAlbumId`, param_albumId);
      }
    },
    [changeValue]
  );

  const { isDirty } = formState;

  // 해당 file파일 클릭 핸들러
  const handleClickFile = (e) => {
    e.target.previousElementSibling.previousElementSibling.click();
  };
  //파일 추가
  const handleChangeFile = useCallback(
    (e, key) => {
      const file = e.target.files[0];
      console.log("file", file);
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const url = reader.result;
          if (url) {
            const name = file.name;
            // setValue(key + `.url`, URL.createObjectURL(file), {
            changeValue(`${key}.url`, url);
            changeValue(`${key}.name`,name);
            changeValue(`${key}.file`, file);
            // input에 파일 이름 노출
          }
        };
      }
    },
    [changeValue]
  );
  //선택 파일 삭제
  const handleResetFile = useCallback(
    async (key) => {
      //aws 이미지라면 s3 삭제하고 데이터베이스 반영하는 것이 필요하다.
      if (typeof watch(`${key}.file`) === `string`) {
        //여기에 삭제하는 API 호출이 필요하다.
      } else {
        // 서버에 올리기 전이라면 setValue 공백 처리
        changeValue(key + `.url`, null);
        changeValue(key + `.name`, null);
        changeValue(key + `.file`, null);
      }
    },
    [changeValue, watch]
  );
  const handleOnClose = useCallback(() => {
    reset();
    callBack();
    setBtnMsg("등록");
  }, [reset, callBack]);

  // aws s3 파일 업로드를 위한 승인된 url 가져오기
  const getPresignedUrl = useCallback(
    async (file, objectKey, type) => {
      console.log("file.file", file.file);
      console.log("file.name", file.name);
      console.log("file.url", file.url);
      console.log("typeof", typeof file.file);
      //이미 파일키가 존재하거나 파일이 아예 없을 경우 , aws s3 에 올라가는 file은 object 타입이다.
      if (typeof file.file === `string` || typeof file.file === `undefined`) {
        return;
      }
      console.log("file-end");
      file.name = makeUUID(file.name);
      const fileName = file.name;
      const fileData = file.file;
      await API.get("/cms/v1/quiz/admin/file/presigned-url", {
        params: {
          type: type,
          fileName: fileName,
        },
      })
        .then(async (response) => {
          if (response.data.sccsYn === "Y") {
            console.log("response", response);
            const presignedUrl = response.data.data.presignedUrl;
            await axios
              .put(presignedUrl, fileData)
              .then(async (r) => {
                await changeValue(
                  `${objectKey}.url`,
                  response.data.data.fileUrl
                );
                await changeValue(
                  `${objectKey}.file`,
                  response.data.data.fileKey
                );
              })
              .catch((error) => {
                showToast(
                  `AWS S3로 데이터를 전송하는데 실패하였습니다. 상세 : ${error}`,
                  `error`
                );
              });
          } else {
            showToast(
              `업로드에 필요한 데이터를 받아오는데 실패하였습니다.`,
              `error`
            );
          }
        })
        .catch((error) => {
          showToast(
            `업로드에 필요한 데이터를 받아오는데 실패하였습니다. 상세 : ${error}`,
            `error`
          );
        });
    },
    [changeValue, showToast]
  );
  //aws s3 파일 업로드 키 획득 함수(getPresignedUrl) 호출
  const changeFileToS3Key = useCallback(async () => {
    //문제 이미지와 음성,해설음원 업로드 인증키 호출
    await getPresignedUrl(
      watch("fileData.queFile.img"),
      `fileData.queFile.img`,
      "IMAGE"
    );

    await getPresignedUrl(
      watch("fileData.queFile.voice"),
      `fileData.queFile.voice`,
      "SOUND"
    );

    await getPresignedUrl(
      watch("fileData.queFile.snd"),
      `fileData.queFile.snd`,
      "SOUND"
    );

    if (watch("qitmTypCd") === "MIT") {
      if (watch("qitmCnt") == 2 || watch("qitmCnt") == 3) {
        //1보기 음성
        await getPresignedUrl(
          watch("fileData.qitmFileList[0].voice"),
          `fileData.qitmFileList[0].voice`,
          "SOUND"
        );
        //1보기 이미지
        await getPresignedUrl(
          watch("fileData.qitmFileList[0].img"),
          `fileData.qitmFileList[0].img`,
          "IMAGE"
        );
        //2보기 이미지와 음성
        await getPresignedUrl(
          watch("fileData.qitmFileList[1].voice"),
          `fileData.qitmFileList[1].voice`,
          "SOUND"
        );

        await getPresignedUrl(
          watch("fileData.qitmFileList[1].img"),
          `fileData.qitmFileList[1].img`,
          "IMAGE"
        );
      }
      if (watch("qitmCnt") == 3) {
        //3보기 이미지와 음성
        await getPresignedUrl(
          watch("fileData.qitmFileList[2].voice"),
          `fileData.qitmFileList[2].voice`,
          "SOUND"
        );
        await getPresignedUrl(
          watch("fileData.qitmFileList[2].img"),
          `fileData.qitmFileList[2].img`,
          "IMAGE"
        );
      }
    }

    //정답해설음성
    await getPresignedUrl(
      watch("fileData.rtansFile.voice"),
      `fileData.rtansFile.voice`,
      "SOUND"
    );
    //다시보기이미지
    await getPresignedUrl(
      watch("fileData.replyFile.img"),
      `fileData.replyFile.img`,
      "IMAGE"
    );
  }, [watch, getPresignedUrl]);

  const handleKeywordList = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); //기본전송 방지
      }
      if (
        e.target.name === "kwdInput" &&
        e.key === "Enter" /*|| e.key === ","*/ &&
        e.target.value !== ""
      ) {
        console.log("kwd", watch("kwd"));
        let kwdList = watch("kwd") || [];
        let inputKwd = e.target.value;

        kwdList.push(inputKwd);
        setValue("kwd", kwdList);
        e.target.value = "";

        const keywordTxtList = watch("kwd");
        const keywordArr = [];
        for (const element of keywordTxtList) {
          keywordArr.push(element);
        }
        const kwdSet = new Set(keywordArr);
        if (kwdSet.size < keywordArr.length) {
          return showToast("중복된 키워드가 존재합니다.", "error");
        }
        changeValue("kwd", keywordArr);
      }
    },
    [changeValue, watch, setValue, showToast]
  );

  //등록
  const onSubmit = useCallback(async () => {
    //수정이 된 경우에만 처리
    if (!isDirty) {
      showToast("변경된 내용이 없습니다.", "warning");
      return;
    }
    // albumIdCheck().then(async() => {
    //파일업로드 인증키 조회 함수 호출
    setLoadingBar(true); //로딩바 실행
    changeFileToS3Key()
      .then(async () => {
        if (watch().qzContsNo) {
          await API.put("cms/v1/quiz/admin/content/contents", watch()).then(
            (res) => {
              if (res.data.sccsYn === "Y") {
                callBack();
                setOpen(false);
                setLoadingBar(false); //로딩바 종료
                // handleOnClose();
                showToast("수정 성공하였습니다. ", "success");
              }
            }
          );
        } else {
          console.log("watch()등록", watch());
          API.post("cms/v1/quiz/admin/content/contents", watch()).then(
            (res) => {
              console.log("Res", res);
              if (res.data.sccsYn === "Y") {
                callBack();
                setOpen(false);
                setLoadingBar(false); //로딩바 종료
                handleOnClose();
                showToast("등록 성공하였습니다. ", "success");
              }
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        showToast(`등록 실패하였습니다. 상세 : ${error}`, `error`);
      });
  }, [
    isDirty,
    changeFileToS3Key,
    showToast,
    watch,
    callBack,
    setOpen,
    handleOnClose,
  ]);

  const getData = useCallback(
    async (qzContsNo) => {
      if (qzContsNo != null) {
        await API.get(`cms/v1/quiz/admin/content/contents/${qzContsNo}`).then(
          (res) => {
            reset({
              ...res.data.data,
            });
            console.log("res.data.data", res.data.data);
          }
        );
      } else {
        await API.get(`cms/v1/quiz/admin/content/contents/${0}`).then((res) => {
          reset({
            ...res.data.data,
          });
          //console.log("res.data.data", res.data.data);
        });
      }
    },
    [reset]
  );

  useEffect(() => {
    if (open) {
      getData(qzContsNo);
      reset(InitialValues);
    }
  }, [qzContsNo, getData, reset, open, InitialValues]);

  function makeUUID(file_nm) {
    function s4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return s4() + s4() + s4() + "_" + file_nm;
  }
  const [selectedQzContsNo, setSelectedQzContsNo] = useState("");
  const [selectedAlbumKey, setSelectedAlbumKey] = useState("");

  //다이알로그 앨범조회
  const [isAlbum, setAlbum] = useState(false);
  const handleAlbum = useCallback(
    (albumKey) => {
      setSelectedQzContsNo(qzContsNo);
      setSelectedAlbumKey(albumKey);
      setAlbum(true);
    },
    [qzContsNo]
  );
  const onInvalid = useCallback(
    (errors) => {
      for (const key in errors) {
        if (key !== "fileData") {
          showToast(errors[key].message, "error");
        } else if (key === "fileData") {
          let message = "";
          if (errors[key].replyFile) {
            message = errors[key].replyFile.img.name.message;
          } else if (errors[key].queFile) {
            message = errors[key].queFile.voice.name.message;
          } else if (errors[key].rtansFile) {
            message = errors[key].rtansFile.voice.name.message;
          }
          showToast(message, "error");
        }
      }
      console.log("errors", errors);
    },
    [showToast]
  );

  return (
    <>
      <PopupDialog
        open={open}
        setOpen={setOpen}
        title={title}
        isBtn={isBtn}
        btnMsg={btnMsg}
        onClose={handleOnClose}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        loading={loadingBar}
      >
        <form onKeyPress={handleKeywordList}>
          {/* (2단) 플랫폼, 퀴즈콘텐츠 명, 문항유형, 난이도, 선택지 개수 / 사용여부, 문제 */}
          <div className="layout_wrap">
            <div className="layout_item">
              {/* (2단-1) */}
              <div className="cpnt_dlForm">
                <dl className="dlForm-default">
                  <div className="tr">
                    <dt className="required">
                      <span>플랫폼</span>
                    </dt>
                    <dd>
                      <div className="field-wrap">
                        <input
                          type="checkbox"
                          name="platform1"
                          id="platform1"
                          disabled
                          defaultChecked
                        />
                        <label htmlFor="platform1">공통</label>
                        <input
                          type="checkbox"
                          name="platform2"
                          id="platform2"
                          disabled
                        />
                        <label htmlFor="platform2">IPTV</label>
                        <input
                          type="checkbox"
                          name="platform3"
                          id="platform3"
                          disabled
                        />
                        <label htmlFor="platform3">모바일</label>
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required">
                      <span>퀴즈콘텐츠 명</span>
                    </dt>
                    <dd>
                      <div className="field-wrap">
                        <input
                          readOnly={readOnly ? true : false}
                          type="text"
                          placeholder="최대 30자 입력가능"
                          maxLength={30}
                          {...register("qzNm", {
                            required: getRequiredErrorMsg("퀴즈콘텐츠명"),
                            maxLength: {
                              value: 30,
                              message: "최대 30자 입력가능",
                            },
                          })}
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required">
                      <span>문항유형</span>
                    </dt>
                    <dd>
                      <div className="field-wrap">
                        <input
                          type="radio"
                          name="qtype"
                          id="type1"
                          checked="checked"                          
                          disabled={readOnly ? true : false}
                          value="MIT"
                          // {...register("qitmTypCd", {
                          //   required: getRequiredErrorMsg("문항유형"),
                          //   onChange: (e) => {
                          //     //선택지 및 정답선택 초기화
                          //     changeValue("rtansQitmNo", "");
                          //     changeValue("qitm1", "");
                          //     changeValue("qitm2", "");
                          //     changeValue("qitm3", "");

                          //     changeValue("fileData.qitmFileList[0].voice", "");
                          //     changeValue("fileData.qitmFileList[1].voice", "");
                          //     changeValue("fileData.qitmFileList[2].voice", "");
                          //     changeValue("fileData.qitmFileList[0].voice.name","");
                          //     changeValue("fileData.qitmFileList[1].voice.name","");
                          //     changeValue("fileData.qitmFileList[2].voice.name","");

                          //     changeValue("fileData.qitmFileList[0].img", "");
                          //     changeValue("fileData.qitmFileList[1].img", "");
                          //     changeValue("fileData.qitmFileList[2].img", "");
                          //     changeValue("fileData.qitmFileList[0].img.name","");
                          //     changeValue("fileData.qitmFileList[1].img.name","");
                          //     changeValue("fileData.qitmFileList[2].img.name","");
                          //   },
                          // })}
                        />
                        <label htmlFor="type1">다지선다</label>
                        <input
                          type="radio"
                          name="qtype"
                          id="type2"
                          disabled={readOnly ? true : false}
                          value="OXT"
                          // {...register("qitmTypCd", {
                          //   required: getRequiredErrorMsg("문항유형"),
                          // })}
                        />
                        <label htmlFor="type2">OX</label>
                        {/*<input type="radio" name="type" id="type3" required*/}
                        {/*       {...register("qitmTypCd",{required:true})}*/}
                        {/*       disabled/><label htmlFor="type3">HTML%</label>*/}
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required">
                      <span>난이도</span>
                    </dt>
                    <dd>
                      <div className="field-wrap">
                        <select
                          disabled={readOnly ? true : false}
                          {...register("dfcLvlCd", {
                            required: getRequiredErrorMsg("난이도"),
                          })}
                        >
                          <option value={""}>선택</option>
                          <option value={`1`}>1단계</option>
                          <option value={`2`}>2단계</option>
                          <option value={`3`}>3단계</option>
                        </select>
                      </div>
                    </dd>
                  </div>
                  {watch("qitmTypCd") === `MIT` && (
                    <div className="tr">
                      <dt className="required">
                        <span>선택지 개수선택</span>
                      </dt>
                      <dd>
                        <div className="field-wrap">
                          <select
                            disabled={readOnly ? true : false}
                            {...register("qitmCnt", {
                              required: getRequiredErrorMsg("선택지 개수"),
                              onChange: (e) => {
                                //선택지 및 정답선택 초기화
                                changeValue("rtansQitmNo", "");
                                changeValue("qitm1", "");
                                changeValue("qitm2", "");
                                changeValue("qitm3", "");

                                changeValue("fileData.qitmFileList[0].voice","");
                                changeValue("fileData.qitmFileList[1].voice","");
                                changeValue("fileData.qitmFileList[2].voice","");
                                changeValue("fileData.qitmFileList[0].voice.name", "");
                                changeValue("fileData.qitmFileList[1].voice.name", "");
                                changeValue("fileData.qitmFileList[2].voice.name","");


                                changeValue("fileData.qitmFileList[0].img", "");
                                changeValue("fileData.qitmFileList[1].img", "");
                                changeValue("fileData.qitmFileList[2].img", "");
                                changeValue("fileData.qitmFileList[0].img.name", "");
                                changeValue("fileData.qitmFileList[1].img.name","");
                                changeValue("fileData.qitmFileList[2].img.name","");
                                
                              },
                            })}
                          >
                            <option>선택</option>
                            {/*<option value={`1`}>1개</option>*/}
                            <option value={`2`}>2개</option>
                            <option value={`3`}>3개</option>
                          </select>
                        </div>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* (2단-2) */}
            <div className="layout_item">
              <div className="cpnt_dlForm">
                <dl className="dlForm-default">
                  <div className="tr">
                    <dt className="required">
                      <span>사용여부</span>
                    </dt>
                    <dd>
                      <div className="field-wrap" disabled>
                        <input
                          {...register("dspStsCd", {
                            required: getRequiredErrorMsg("사용여부"),
                          })}
                          disabled={readOnly ? true : false}
                          type="radio"
                          value="DSP"
                        />
                        <label htmlFor="dspStsCd">노출</label>
                        <input
                          disabled={readOnly ? true : false}
                          {...register("dspStsCd", {
                            required: getRequiredErrorMsg("사용여부"),
                          })}
                          type="radio"
                          value="DCK"
                        />
                        <label htmlFor="dpsStsCd">검수</label>
                        <input
                          disabled={readOnly ? true : false}
                          {...register("dspStsCd", {
                            required: getRequiredErrorMsg("사용여부"),
                          })}
                          type="radio"
                          value="DNN"
                        />
                        <label htmlFor="dpsStsCd">비노출</label>
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required">
                      <span>문제</span>
                    </dt>
                    <dd>
                      <div className="field-wrap">
                        <input
                          type="text"
                          required
                          readOnly={readOnly ? true : false}
                          placeholder="최대 400자 입력가능"
                          maxLength={400}
                          {...register("qzTxt", {
                            maxLength: {
                              value: 400,
                              message: "최대 400자 입력가능",
                            },
                            required: getRequiredErrorMsg("문제"),
                          })}
                        />
                      </div>
                      <div className="field-wrap">
                        <input
                          type="file"
                          accept="audio/*"
                          disabled={readOnly ? true : false}
                          {...register("fileData.queFile.voice", {
                            onChange: (e) => {
                              handleChangeFile(e, `fileData.queFile.voice`);
                            },
                          })}
                        />
                        <input
                          type="text"
                          {...register(`fileData.queFile.voice.name`, {
                            // required: getRequiredErrorMsg("문제음성파일")
                          })}
                          value={watch(`fileData.queFile.voice.name`) || ""}
                          readOnly
                          placeholder="음성파일 등록"
                        />
                        <button
                          type="button"
                          disabled={readOnly ? true : false}
                          onClick={handleClickFile}
                        >
                          파일선택
                        </button>
                      </div>
                      {watch(`fileData.queFile.voice.url`) > `` && (
                        <div className="audio-wrap">
                          <audio
                            className="audio-default"
                            controls
                            src={watch(`fileData.queFile.voice.url`)}
                          ></audio>
                          <button
                            key="2"
                            type="button"
                            disabled={readOnly ? true : false}
                            onClick={() =>
                              handleResetFile("fileData.queFile.voice")
                            }
                          >
                            <CloseIcon /> 음원파일삭제
                          </button>
                        </div>
                      )}
                      <div className="field-wrap">
                        <input
                          type="file"
                          accept="audio/*"
                          disabled={readOnly ? true : false}
                          {...register("fileData.queFile.snd", {
                            onChange: (e) => {
                              handleChangeFile(e, `fileData.queFile.snd`);
                            },
                          })}
                        />
                        <input
                          type="text"
                          readOnly
                          {...register(`fileData.queFile.snd.name`)}
                          placeholder="(음원문제용) 음원파일 등록"
                        />
                        <button type="button" onClick={handleClickFile}>
                          파일선택
                        </button>
                        {watch(`fileData.queFile.snd.url`) > `` && (
                          <div className="audio-wrap">
                            <audio
                              className="audio-default"
                              controls
                              src={watch(`fileData.queFile.snd.url`)}
                            ></audio>
                            <button
                              key="2"
                              type="button"
                              disabled={readOnly ? true : false}
                              onClick={() =>
                                handleResetFile("fileData.queFile.snd")
                              }
                            >
                              <CloseIcon /> 음원파일삭제
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="field-wrap">
                        <input
                          type="file"
                          disabled={readOnly ? true : false}
                          accept="image/jpg, image/jpeg, image/png, image/gif"
                          {...register("fileData.queFile.img", {
                            onChange: (e) => {
                              handleChangeFile(e, `fileData.queFile.img`);
                            },
                          })}
                        />
                        <input
                          className="required"
                          type="text"
                          {...register(`fileData.queFile.img.name`)}
                          placeholder="이미지 파일 등록"
                          readOnly
                        />
                        <button
                          type="button"
                          disabled={readOnly ? true : false}
                          onClick={handleClickFile}
                        >
                          파일선택
                        </button>
                        {watch(`fileData.queFile.img.url`) > `` && (
                          <div key="1" className="field-input-file-img">
                            <span key="3">
                              <img
                                key="0"
                                src={watch(`fileData.queFile.img.url`)}
                                alt="선택한 이미지"
                              />
                              <button
                                key="2"
                                type="button"
                                disabled={readOnly ? true : false}
                                onClick={() =>
                                  handleResetFile("fileData.queFile.img")
                                }
                              >
                                <CloseIcon /> 이미지삭제
                              </button>
                            </span>
                          </div>
                        )}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          {/* {watch("qitmTypCd") === `MIT` && ( */}
          { (
            <>
              {/* (3단) 선택지 및 정답선택 : 다지선다 */}
              {/* <div className="cpnt_title type1 mg-t10"> */}
              <div className="cpnt_title type1 mg-t10">
                <strong>선택지 및 정답선택</strong>
              </div>
              <div className="layout_wrap">
                {/* (3단 - 1 ) */}
                {/* {(watch("qitmCnt") === 2 || watch("qitmCnt") === 3) && ( */}
                { (
                  <div className="layout_item bd-1 pd-10">
                    <div className="field-wrap">
                      <input
                        type="radio"
                        name="rtansQitmNos"
                        id="rtansQitmNo1"
                        disabled={readOnly ? true : false}
                        // checked={watch("rtansQitmNo") === 1 ? true : false}
                        value={1}
                        {...register("rtansQitmNo")}
                      />
                      <label htmlFor="rtansQitmNo1">선택지1</label>
                    </div>
                    <div className="field-wrap">
                      <textarea
                        {...register("qitm1", {
                          required: getRequiredErrorMsg("선택지1"),
                          maxLength: {
                            value: 500,
                            message: "최대 500자 입력가능",
                          },
                        })}
                        rows={`3`}
                        placeholder="최대 500자 입력가능"
                        maxLength={500}
                      />
                    </div>
                    <div className="field-wrap">
                      <input
                        type="file"
                        disabled={readOnly ? true : false}
                        accept="audio/*"
                        {...register("fileData.qitmFileList[0].voice", {
                          onChange: (e) => {
                            handleChangeFile(
                              e,
                              `fileData.qitmFileList[0].voice`
                            );
                          },
                        })}
                      />
                      <input
                        type="text"
                        {...register(`fileData.qitmFileList[0].voice.name`)}
                        value={
                          watch(`fileData.qitmFileList[0].voice.name`) || ""
                        }
                        placeholder="음성파일 등록"
                      />
                      <button type="button" onClick={handleClickFile}>
                        파일선택
                      </button>
                      {watch(`fileData.qitmFileList[0].voice.url`) > `` && (
                        <div className="audio-wrap">
                          <audio
                            className="audio-default"
                            controls
                            src={watch(`fileData.qitmFileList[0].voice.url`)}
                          ></audio>
                          <button
                            key="2"
                            type="button"
                            disabled={readOnly ? true : false}
                            onClick={() =>
                              handleResetFile("fileData.qitmFileList[0].voice")
                            }
                          >
                            <CloseIcon /> 음원파일삭제
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="field-wrap">
                      <input
                        type="file"
                        disabled={readOnly ? true : false}
                        accept="image/*"
                        {...register("fileData.qitmFileList[0].img", {
                          onChange: (e) => {
                            handleChangeFile(e, `fileData.qitmFileList[0].img`);
                          },
                        })}
                      />
                      <input
                        type="text"
                        {...register(`fileData.qitmFileList[0].img.name`)}
                        value={watch(`fileData.qitmFileList[0].img.name`) || ""}
                        readOnly
                        placeholder="이미지 파일 등록"
                      />
                      <button
                        type="button"
                        disabled={readOnly ? true : false}
                        onClick={handleClickFile}
                      >
                        파일선택
                      </button>
                      {watch(`fileData.qitmFileList[0].img.url`) > `` && (
                        <div key="1" className="field-input-file-img">
                          <span key="3">
                            <img
                              key="0"
                              src={watch(`fileData.qitmFileList[0].img.url`)}
                              alt="선택한 이미지"
                            />
                            <button
                              key="2"
                              type="button"
                              disabled={readOnly ? true : false}
                              onClick={() =>
                                handleResetFile("fileData.qitmFileList[0].img")
                              }
                            >
                              <CloseIcon /> 이미지삭제
                            </button>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* (3단 - 2 ) */}
                {/* {watch("qitmCnt") >= 2 && ( */}
                {(
                  <div className="layout_item bd-1 pd-10">
                    <div className="field-wrap">
                      {/*<input type="radio" name="selectAnswer_multi"*/}
                      {/*       id="selectAnswer_multi2" required*/}
                      {/*       defaultChecked/>*/}
                      <input
                        type="radio"
                        name="rtansQitmNos"
                        id="rtansQitmNo2"
                        disabled={readOnly ? true : false}
                        // checked={watch("rtansQitmNo") === 2 ? true : false}
                        {...register("rtansQitmNo")}
                        value={2}
                      />
                      <label htmlFor="rtansQitmNo2">선택지2</label>
                    </div>
                    <div className="field-wrap">
                      <textarea
                        {...register("qitm2", {
                          required: getRequiredErrorMsg("선택지2"),
                          maxLength: {
                            value: 500,
                            message: "최대 500자 입력가능",
                          },
                        })}
                        rows={`3`}
                        placeholder="최대 500자 입력가능"
                        maxLength={500}
                      />
                    </div>
                    <div className="field-wrap">
                      <input
                        type="file"
                        disabled={readOnly ? true : false}
                        accept="audio/*"
                        {...register("fileData.qitmFileList[1].voice", {
                          onChange: (e) => {
                            handleChangeFile(
                              e,
                              `fileData.qitmFileList[1].voice`
                            );
                          },
                        })}
                      />
                      <input
                        type="text"
                        {...register(`fileData.qitmFileList[1].voice.name`)}
                        value={
                          watch(`fileData.qitmFileList[1].voice.name`) || ""
                        }
                        placeholder="음성파일 등록"
                      />
                      <button type="button" onClick={handleClickFile}>
                        파일선택
                      </button>
                      {watch(`fileData.qitmFileList[1].voice.url`) > `` && (
                        <div className="audio-wrap">
                          <audio
                            className="audio-default"
                            controls
                            src={watch(`fileData.qitmFileList[1].voice.url`)}
                          ></audio>
                          <button
                            key="2"
                            type="button"
                            disabled={readOnly ? true : false}
                            onClick={() =>
                              handleResetFile("fileData.qitmFileList[1].voice")
                            }
                          >
                            <CloseIcon /> 음원파일삭제
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="field-wrap">
                      <input
                        type="file"
                        disabled={readOnly ? true : false}
                        accept="image/*"
                        {...register("fileData.qitmFileList[1].img", {
                          onChange: (e) => {
                            handleChangeFile(e, `fileData.qitmFileList[1].img`);
                          },
                        })}
                      />
                      <input
                        type="text"
                        {...register(`fileData.qitmFileList[1].img.name`)}
                        value={watch(`fileData.qitmFileList[1].img.name`) || ""}
                        readOnly
                        placeholder="이미지 파일 등록"
                      />
                      <button
                        type="button"
                        disabled={readOnly ? true : false}
                        onClick={handleClickFile}
                      >
                        파일선택
                      </button>
                      {watch(`fileData.qitmFileList[1].img.url`) > `` && (
                        <div key="1" className="field-input-file-img">
                          <span key="3">
                            <img
                              key="0"
                              src={watch(`fileData.qitmFileList[1].img.url`)}
                              alt="선택한 이미지"
                            />
                            <button
                              key="2"
                              type="button"
                              disabled={readOnly ? true : false}
                              onClick={() =>
                                handleResetFile("fileData.qitmFileList[1].img")
                              }
                            >
                              <CloseIcon /> 이미지삭제
                            </button>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* (3단 - 3 ) */}
                {/* {watch("qitmCnt") > 2 && ( */}
                {(
                  <div className="layout_item bd-1 pd-10">
                    <div className="field-wrap">
                      {/*<input type="radio" name="selectAnswer_multi"*/}
                      {/*       id="selectAnswer_multi3" required*/}
                      {/*       defaultChecked/>*/}
                      <input
                        type="radio"
                        name="rtansQitmNos"
                        id="rtansQitmNo3"
                        disabled={readOnly ? true : false}
                        // checked={watch("rtansQitmNo") === 3 ? true : false}
                        {...register("rtansQitmNo")}
                        value={3}
                      />
                      <label htmlFor="rtansQitmNo3">선택지3</label>
                    </div>
                    <div className="field-wrap">
                      <textarea
                        {...register("qitm3", {
                          required: getRequiredErrorMsg("선택지3"),
                          maxLength: {
                            value: 500,
                            message: "최대 500자 입력가능",
                          },
                        })}
                        rows={`3`}
                        placeholder="최대 500자 입력가능"
                        maxLength={500}
                      />
                    </div>
                    <div className="field-wrap">
                      <input
                        type="file"
                        disabled={readOnly ? true : false}
                        accept="audio/*"
                        {...register("fileData.qitmFileList[2].voice", {
                          onChange: (e) => {
                            handleChangeFile(
                              e,
                              `fileData.qitmFileList[2].voice`
                            );
                          },
                        })}
                      />
                      <input
                        type="text"
                        {...register(`fileData.qitmFileList[2].voice.name`)}
                        value={
                          watch(`fileData.qitmFileList[2].voice.name`) || ""
                        }
                        placeholder="음성파일 등록"
                      />
                      <button
                        type="button"
                        disabled={readOnly ? true : false}
                        onClick={handleClickFile}
                      >
                        파일선택
                      </button>
                      {watch(`fileData.qitmFileList[2].voice.url`) > `` && (
                        <div className="audio-wrap">
                          <audio
                            className="audio-default"
                            controls
                            src={watch(`fileData.qitmFileList[2].voice.url`)}
                          ></audio>
                          <button
                            key="2"
                            type="button"
                            disabled={readOnly ? true : false}
                            onClick={() =>
                              handleResetFile("fileData.qitmFileList[2].voice")
                            }
                          >
                            <CloseIcon /> 음원파일삭제
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="field-wrap">
                      <input
                        type="file"
                        disabled={readOnly ? true : false}
                        accept="image/*"
                        {...register("fileData.qitmFileList[2].img", {
                          onChange: (e) => {
                            handleChangeFile(e, `fileData.qitmFileList[2].img`);
                          },
                        })}
                      />
                      <input
                        type="text"
                        {...register(`fileData.qitmFileList[2].img.name`)}
                        value={watch(`fileData.qitmFileList[2].img.name`) || ""}
                        readOnly
                        placeholder="이미지 파일 등록"
                      />
                      <button
                        type="button"
                        disabled={readOnly ? true : false}
                        onClick={handleClickFile}
                      >
                        파일선택
                      </button>
                      {watch(`fileData.qitmFileList[2].img.url`) > `` && (
                        <div key="1" className="field-input-file-img">
                          <span key="3">
                            <img
                              key="0"
                              src={watch(`fileData.qitmFileList[2].img.url`)}
                              alt="선택한 이미지"
                            />
                            <button
                              key="2"
                              type="button"
                              disabled={readOnly ? true : false}
                              onClick={() =>
                                handleResetFile("fileData.qitmFileList[2].img")
                              }
                            >
                              <CloseIcon /> 이미지삭제
                            </button>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          {watch("qitmTypCd") === `OXT` && (
            <>
              {/* (3단) 선택지 및 정답선택 : OX */}
              <div className="cpnt_title type1 mg-t10">
                <strong>선택지 및 정답선택</strong>
              </div>
              <div className="layout_wrap">
                {/* (3단 - 1 ) */}
                <div className="layout_item bd-1 pd-10">
                  <div className="field-wrap">
                    <input
                      type="radio"
                      name="rtansQitmNo"
                      // disabled={readOnly ? true : false}
                      checked={watch("rtansQitmNo") === 4 ? true : false}
                      value={4}
                      {...register("rtansQitmNo")}
                      id="selectAnswer_OX1"
                    />
                    <label htmlFor="selectAnswer_OX1">선택지1</label>
                  </div>
                  <div className="item_ox">
                    <PanoramaFishEyeIcon />
                  </div>
                </div>

                {/* (3단 - 2 ) */}
                <div className="layout_item bd-1 pd-10">
                  <div className="field-wrap">
                    <input
                      type="radio"
                      name="rtansQitmNo"
                      // disabled={readOnly ? true : false}
                      checked={watch("rtansQitmNo") === 5 ? true : false}
                      {...register("rtansQitmNo")}
                      value={5}
                      id="selectAnswer_OX2"
                    />
                    <label htmlFor="selectAnswer_OX2">선택지2</label>
                  </div>
                  <div className="item_ox">
                    <CloseIcon />
                  </div>
                </div>

                {/* (3단 - 3 ) */}
                {/* <div className="layout_item bd-1 pd-10"></div> */}
              </div>
            </>
          )}
          {/* (3단) 정답해설 텍스트 및 음원 */}
          {(watch("qitmTypCd") === `MIT` || watch("qitmTypCd") === `OXT`) && (
            <>
              <div className="cpnt_title type1 mg-t10">
                <strong>정답해설 텍스트 및 음원</strong>
              </div>
              <div className="layout_wrap">
                {/* (3단 - 1 ) */}
                <div className="layout_item bd-1 pd-10">
                  {(watch("rtansQitmNo") == "1" ||
                    watch("rtansQitmNo") == "4") && (
                    <>
                      <div className="field-wrap">
                        <textarea
                          required
                          readOnly={readOnly ? true : false}
                          {...register("rtansTxt", {
                            maxLength: {
                              value: 500,
                              message: "최대 500자 입력가능",
                            },
                          })}
                          rows={`3`}
                          placeholder="최대 500자 입력가능"
                          maxLength={500}
                        />
                      </div>
                      <div className="field-wrap">
                        <input
                          type="file"
                          accept="audio/*"
                          disabled={readOnly ? true : false}
                          {...register("fileData.rtansFile.voice", {
                            onChange: (e) => {
                              handleChangeFile(e, `fileData.rtansFile.voice`);
                            },
                          })}
                        />
                        <input
                          type="text"
                          readOnly
                          required
                          {...register("fileData.rtansFile.voice.name", {
                            required:
                              getRequiredErrorMsg("정답해설 텍스트 및 음원"),
                          })}
                          placeholder="음성파일 등록"
                        />
                        <button
                          type="button"
                          disabled={readOnly ? true : false}
                          onClick={handleClickFile}
                        >
                          파일선택
                        </button>
                        {watch(`fileData.rtansFile.voice.url`) > `` && (
                          <div className="audio-wrap">
                            <audio
                              className="audio-default"
                              controls
                              src={watch(`fileData.rtansFile.voice.url`)}
                            ></audio>
                            <button
                              key="2"
                              type="button"
                              disabled={readOnly ? true : false}
                              onClick={() =>
                                handleResetFile("fileData.rtansFile.voice")
                              }
                            >
                              <CloseIcon /> 음원파일삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                {/* (3단 - 2 ) */}
                <div className="layout_item bd-1 pd-10">
                  {(watch("rtansQitmNo") == "2" ||
                    watch("rtansQitmNo") == "5") && (
                    <>
                      <div className="field-wrap">
                        <textarea
                          required
                          readOnly={readOnly ? true : false}
                          {...register("rtansTxt", {
                            maxLength: {
                              value: 500,
                              message: "최대 500자 입력가능",
                            },
                          })}
                          rows={`3`}
                          placeholder="최대 500자 입력가능"
                          maxLength={500}
                        />
                      </div>
                      <div className="field-wrap">
                        <input
                          type="file"
                          accept="audio/*"
                          disabled={readOnly ? true : false}
                          {...register("fileData.rtansFile.voice", {
                            onChange: (e) => {
                              handleChangeFile(e, `fileData.rtansFile.voice`);
                            },
                          })}
                        />
                        <input
                          type="text"
                          readOnly
                          required
                          {...register("fileData.rtansFile.voice.name", {
                            required:
                              getRequiredErrorMsg("정답해설 텍스트 및 음원"),
                          })}
                          placeholder="음성파일 등록"
                        />
                        <button
                          type="button"
                          disabled={readOnly ? true : false}
                          onClick={handleClickFile}
                        >
                          파일선택
                        </button>
                        {watch(`fileData.rtansFile.voice.url`) > `` && (
                          <div className="audio-wrap">
                            <audio
                              className="audio-default"
                              controls
                              src={watch(`fileData.rtansFile.voice.url`)}
                            ></audio>
                            <button
                              key="2"
                              type="button"
                              disabled={readOnly ? true : false}
                              onClick={() =>
                                handleResetFile("fileData.rtansFile.voice")
                              }
                            >
                              <CloseIcon /> 음원파일삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                {/* (3단 - 3 ) */}
                {watch("qitmTypCd") === `MIT` && watch("qitmCnt") === 3 && (
                  <div className="layout_item bd-1 pd-10">
                    {watch("rtansQitmNo") == "3" && (
                      <>
                        <div className="field-wrap">
                          <textarea
                            required
                            readOnly={readOnly ? true : false}
                            {...register("rtansTxt", {
                              maxLength: {
                                value: 500,
                                message: "최대 500자 입력가능",
                              },
                            })}
                            rows={`3`}
                            placeholder="최대 500자 입력가능"
                            maxLength={500}
                          />
                        </div>
                        <div className="field-wrap">
                          <input
                            type="file"
                            accept="audio/*"
                            disabled={readOnly ? true : false}
                            {...register("fileData.rtansFile.voice", {
                              onChange: (e) => {
                                handleChangeFile(e, `fileData.rtansFile.voice`);
                              },
                            })}
                          />
                          <input
                            type="text"
                            readOnly
                            required
                            {...register("fileData.rtansFile.voice.name", {
                              required:
                                getRequiredErrorMsg("정답해설 텍스트 및 음원"),
                            })}
                            placeholder="음성파일 등록"
                          />
                          <button
                            type="button"
                            disabled={readOnly ? true : false}
                            onClick={handleClickFile}
                          >
                            파일선택
                          </button>
                          {watch(`fileData.rtansFile.voice.url`) > `` && (
                            <div className="audio-wrap">
                              <audio
                                className="audio-default"
                                controls
                                src={watch(`fileData.rtansFile.voice.url`)}
                              ></audio>
                              <button
                                key="2"
                                type="button"
                                disabled={readOnly ? true : false}
                                onClick={() =>
                                  handleResetFile("fileData.rtansFile.voice")
                                }
                              >
                                <CloseIcon /> 음원파일삭제
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {/* (1단) 해설영상, 연관영상 추천 */}
          <div className="cpnt_dlForm mg-t10">
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required">
                  <span>해설영상</span>
                </dt>
                <dd>
                  <div className="field-wrap cid-auto">
                    <input
                      type="text"
                      readOnly={readOnly ? true : false}
                      id={`albumIdExp`}
                      {...register("explAlbumId", {
                        required: getRequiredErrorMsg("해설영상"),
                      })}
                      placeholder="해설 영상 매핑"
                    />
                    <button
                      className="field-button"
                      type="button"
                      disabled={readOnly ? true : false}
                      onClick={() => handleAlbum("expVod")}
                    >
                      앨범ID 조회
                    </button>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="">
                  <span>연관영상 추천 (최대 4개)</span>
                </dt>
                <dd id={"vodField"}>
                  {/* <VodField
                    control={control}
                    indexValue={`albumData.albumList`}
                    setValue={setValue}
                    watch={watch}
                    readOnly={readOnly}
                  ></VodField> */}
                  VodField
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
                    <dt className="required">
                      <span>다시보기이미지</span>
                    </dt>
                    <dd>
                      <div className="field-wrap">
                        <input
                          type="file"
                          disabled={readOnly ? true : false}
                          accept="image/*"
                          {...register("fileData.replyFile.img", {
                            onChange: (e) => {
                              handleChangeFile(e, `fileData.replyFile.img`);
                            },
                          })}
                        />
                        <input
                          type="text"
                          readOnly
                          required
                          {...register("fileData.replyFile.img.name", {
                            required: getRequiredErrorMsg("다시보기이미지"),
                          })}
                          placeholder="이미지 파일 등록"
                        />
                        <button
                          type="button"
                          disabled={readOnly ? true : false}
                          onClick={handleClickFile}
                        >
                          파일선택
                        </button>
                        {watch(`fileData.replyFile.img.url`) > `` && (
                          <div key="1" className="field-input-file-img">
                            <span key="3">
                              <img
                                key="0"
                                src={watch(`fileData.replyFile.img.url`)}
                                alt="선택한 이미지"
                              />
                              <button
                                key="2"
                                type="button"
                                disabled={readOnly ? true : false}
                                onClick={() =>
                                  handleResetFile("fileData.replyFile.img")
                                }
                              >
                                <CloseIcon /> 이미지삭제
                              </button>
                            </span>
                          </div>
                        )}
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
                    <dt className="required">
                      <span>다시보기 텍스트</span>
                    </dt>
                    <dd>
                      <div className="field-wrap">
                        <textarea
                          required
                          readOnly={readOnly ? true : false}
                          {...register("replyTxt", {
                            required: getRequiredErrorMsg("다시보기 텍스트"),
                            maxLength: {
                              value: 500,
                              message: "최대 500자 입력가능",
                            },
                          })}
                          rows={`3`}
                          placeholder="최대 500자 입력가능"
                          maxLength={500}
                        />
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
                <dt>
                  <span>퀴즈콘텐츠 키워드</span>
                </dt>
                <dd>
                  <div className={"field-wrap cpnt_keyword"}>
                    <label className="cpnt-in" htmlFor="kwd">
                      <span className="keywordList">
                        {!watch("kwd") ||
                          watch("kwd")?.map((data, index) => (
                            <span className="item" key={index}>
                              <span name="kwdTxt">{data}</span>
                              <button
                                type="button"
                                disabled={readOnly ? true : false}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setValue(
                                    "kwd",
                                    watch("kwd").filter(
                                      (element, _index) => index !== _index
                                    ),
                                    { shouldDirty: true }
                                  );
                                }}
                              >
                                {"닫기"}
                              </button>
                            </span>
                          ))}
                      </span>
                      <input
                        type="text"
                        name="kwdInput"
                        id="kwd"
                        readOnly={readOnly ? true : false}
                        placeholder={
                          "키워드를 입력하시고 '엔터' 를 누르시면 추가 됩니다."
                        }
                        maxLength={30}
                      />
                      <input
                        type={"hidden"}
                        name={"kwd"}
                        {...register("kwd", {
                          required: getRequiredErrorMsg("키워드"),
                        })}
                      />
                    </label>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt>
                  <span>소속된 퀴즈그룹 목록</span>
                </dt>
                <dd className="cpnt_table">
                  {/* <table className="table-default">
                    <thead>
                      <th>퀴즈그룹번호</th>
                      <th>그룹명</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1231123</td>
                        <td>테스트입니다.</td>
                      </tr>
                      <tr>
                        <td>1231123</td>
                        <td>테스트입니다.</td>
                      </tr>
                    </tbody>
                  </table> */}
                </dd>
              </div>
            </dl>
          </div>
        </form>
      </PopupDialog>
      {/* <Album
        open={isAlbum}
        setOpen={setAlbum}
        qzContsNo={selectedQzContsNo}
        getAlbumId={getAlbumId}
        title={"앨범 조회"}
        albumKey={selectedAlbumKey}
        // callBack={detailCallback}
      ></Album> */}
    </>
  );
};

export default ContentsDetailPop;
