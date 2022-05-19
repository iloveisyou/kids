import { useCallback, useMemo, useState } from "react";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { Tab, Tabs } from "@mui/material";
import { useForm } from "react-hook-form";
import { useToast } from "../components/hooks";
import CloseIcon from "@mui/icons-material/Close";
import InteractField from "../components/petDetailField/InteractField";
import SpecialActionField from "../components/petDetailField/SpecialActionField";
import API from "../components/axios/api";
import axios from "axios";
const PetListDetail = (props) => {
  const { open, setOpen } = props;
  const { showToast } = useToast();
  const [btnMsg, setBtnMsg] = useState("등록");

  const onError = useCallback(
    (errors) => {
      showToast(`잘못 입력된 항목이 있습니다.`, "error");
    },
    [showToast]
  );

  const handleClickFile = (e) => {
    // button 클릭으로 file파일 클릭 핸들러
    e.target.previousElementSibling.previousElementSibling.click();
  };

  const handleOnClose = useCallback(() => {
    console.log("dfdf");
  }, []);

  const [feedingStatus, setFeedingStatus] = useState("아사직전");
  const [fedgIndex, setFedgIndex] = useState(0);

  const handleFeedingStatus = useCallback(
    (e, value) => {
      setFeedingStatus(e.target.innerHTML);
      setFedgIndex(value);
      // if(e.currentTarget.closest("tbody").querySelector("tr.active")){
      //   e.currentTarget.closest("tbody").querySelector("tr.active").classList.remove("active");
      // }
      // e.currentTarget.closest("tr").classList.add("active");
    },
    [setFeedingStatus]
  );

  const [stepTab, setStepTab] = useState(0);

  const handleSetStepTab = useCallback(
    (_, newValue) => {
      setStepTab(newValue);
      setFeedingStatus("");
    },
    [setStepTab, setFeedingStatus]
  );

  const fileFormat = useMemo(() => {
    return { file: "", url: "", name: "" };
  }, []);
  const getDefaultFedgData = useMemo(() => {
    const fedgDataArray = [];
    let maxFedgStatus = 5;
    for (let index = 0; index < maxFedgStatus; index++) {
      fedgDataArray.push({
        reprs: fileFormat,
        dft: fileFormat,
        sds: fileFormat,
        intactList: [
          {
            dspNum: 1,
            img: fileFormat,
            sds: fileFormat,
          },
        ],
      });
    }
    return fedgDataArray;
  }, [fileFormat]);
  const getDefaultGrwData = useMemo(() => {
    const grwDataArray = [];
    let maxGrwStep = 5;
    for (let grwStep = 0; grwStep < maxGrwStep; grwStep++) {
      grwDataArray.push({
        grwStep: grwStep + 1,
        img: fileFormat,
        sds: fileFormat,
        fedgList: getDefaultFedgData,
        spcAction: {
          intact: [],
          spcAction1: [],
          spcAction2: [],
        },
      });
    }
    return grwDataArray;
  }, [getDefaultFedgData, fileFormat]);
  const InitialValues = useMemo(() => {
    return {
      petNm: "",
      petDesc: "",
      grwData: getDefaultGrwData,
    };
  }, [getDefaultGrwData]);
  const { register, handleSubmit, watch, reset, formState, setValue, control } =
    useForm({
      defaultValues: InitialValues,
      mode: "onChange",
      reValidateMode: "onChange",
    });

  const getPresignedUrl = useCallback(
    async (file, objectKey) => {
      if (file.file === `` || typeof file.file === `undefined`) {
        return;
      }
      const fileName = file.name;
      const fileUrl = file.url;
      const fileData = file.file;

      console.log(fileName);
      await API.get("/kids-lms-play/api/v1/admin/comn/upload", {
        params: {
          type: 1,
          fileName: fileName,
        },
      })
        .then(async (response) => {
          if (response.data.sccsYn === "Y") {
            console.log(response);
            const presignedUrl = response.data.data.presignedUrl;

            await axios
              .put(presignedUrl, fileData)
              .then(() => {
                setValue(`${objectKey}.url`, response.data.data.fileUrl, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                setValue(`${objectKey}.file`, response.data.data.fileKey, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [setValue]
  );

  const onSubmit = useCallback(
    async (e) => {
      for (let i = 0; i < 5; i++) {
        //성장단계의 이미지와 음원 저장
        await getPresignedUrl(watch(`grwData[${i}].img`), `grwData[${i}].img`);
        await getPresignedUrl(watch(`grwData[${i}].sds`), `grwData[${i}].sds`);

        //성장단계 특수액션 저장
        watch(`grwData[${i}].spcAction.intact`).forEach(
          async (value, index) => {
            await getPresignedUrl(
              value.img,
              `grwData[${i}].spcAction.intact[${index}].img`
            );
            await getPresignedUrl(
              value.sds,
              `grwData[${i}].spcAction.intact[${index}].sds`
            );
          }
        );

        watch(`grwData[${i}].spcAction.spcAction1`).forEach(
          async (value, index) => {
            await getPresignedUrl(
              value.img,
              `grwData[${i}].spcAction.spcAction1[${index}].img`
            );
            await getPresignedUrl(
              value.sds,
              `grwData[${i}].spcAction.spcAction1[${index}].sds`
            );
          }
        );

        watch(`grwData[${i}].spcAction.spcAction2`)?.forEach(
          async (value, index) => {
            await getPresignedUrl(
              value.img,
              `grwData[${i}].spcAction.spcAction2[${index}].img`
            );
            await getPresignedUrl(
              value.sds,
              `grwData[${i}].spcAction.spcAction2[${index}].sds`
            );
          }
        );

        for (let j = 0; j < 5; j++) {
          //영양상태 이미지, 리소스 저장
          //dft , reprs, sds
          await getPresignedUrl(
            watch(`grwData[${i}].fedgList[${j}].dft`),
            `grwData[${i}].fedgList[${j}].dft`
          );
          await getPresignedUrl(
            watch(`grwData[${i}].fedgList[${j}].reprs`),
            `grwData[${i}].fedgList[${j}].reprs`
          );
          await getPresignedUrl(
            watch(`grwData[${i}].fedgList[${j}].sds`),
            `grwData[${i}].fedgList[${j}].sds`
          );

          //인터랙트 이미지, 음원 리소스 저장
          watch(`grwData[${i}].fedgList[${j}].intactList`)?.forEach(
            async (value, index) => {
              await getPresignedUrl(
                value.img,
                `grwData[${i}].fedgList[${j}].intactList[${index}].img`
              );
              await getPresignedUrl(
                value.sds,
                `grwData[${i}].fedgList[${j}].intactList[${index}].sds`
              );
            }
          );
        }
      }
      // console.log(watch(`grwData`));
      // // getPresignedUrl(watch(`grwData[0].img`), `grwData[0].img`);
      console.log(watch());
      await API.post(`/kids-lms-play/api/v1/lms/admin/pet/pets/`, watch())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    [watch, getPresignedUrl]
  );
  // useEffect(() => {
  //   reset();
  // }, [reset]);

  //파일 추가 1
  const handleChangeFile = useCallback(
    (e, key) => {
      const file = e.target.files[0];
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const url = reader.result;
          if (url) {
            const name = file.name;
            // console.log(URL.createObjectURL(file));
            // setValue(key + `.url`, URL.createObjectURL(file), {
            setValue(key + `.url`, url, {
              shouldDirty: true,
              shouldValidate: true,
            });
            setValue(key + `.name`, name, {
              shouldDirty: true,
              shouldValidate: true,
            });
            setValue(key + `.file`, file, {
              shouldDirty: true,
              shouldValidate: true,
            });
            // input에 파일 이름 노출
          }
        };
      }
    },
    [setValue]
  );

  const handleResetFile = (e) => {
    // 파일 이미지 삭제
    // setImgBase64((imgBase64) => []);
    // e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[0].value =
    //   "";
    // e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].value =
    //   "";
  };
  const uploadFileToS3 = (presignedUrl, file) => {
    axios
      .put(presignedUrl, file)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  const getStepData = (step) => {
    return (
      <div className="cpnt_table">
        <table className="table-default">
          <caption className="dp-blind">단계별 리소스 등록 현황목록</caption>
          <colgroup>
            <col className="wt-pc20" />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>상태</th>
              <th>대표아이콘</th>
              <th>기본</th>
              <th>인터렉션</th>
            </tr>
          </thead>
          <tbody>
            <tr className={feedingStatus=='아사직전'&& 'active'}>
              <td>
                <button
                  className="text-link"
                  type="button"
                  onClick={(e) => {
                    handleFeedingStatus(e, 0);
                  }}
                >
                  아사직전
                </button>
              </td>
              <td>
                {(watch(`grwData[${stepTab}].fedgList[0].reprs.url`) !== `` && (
                  <p>O</p>
                )) || <p>X</p>}
              </td>
              <td>
                {(watch(`grwData[${stepTab}].fedgList[0].dft.url`) !== `` && (
                  <p>O</p>
                )) || <p>X</p>}
              </td>
              <td>
                {
                  watch(`grwData[${stepTab}].fedgList[0].intactList`).filter(
                    (i) => i.img.url !== ``
                  ).length
                }
              </td>
            </tr>
            <tr className={feedingStatus=='배고픔'&& 'active'}>
              <td>
                <button
                  className="text-link"
                  type="button"
                  onClick={(e) => {
                    handleFeedingStatus(e, 1);
                  }}
                >
                  배고픔
                </button>
              </td>
              <td>X</td>
              <td>X</td>
              <td>O</td>
            </tr>
            <tr className={feedingStatus=='보통'&& 'active'}>
              <td>
                <button
                  className="text-link"
                  type="button"
                  onClick={(e) => {
                    handleFeedingStatus(e, 2);
                  }}
                >
                  보통
                </button>
              </td>
              <td>X</td>
              <td>X</td>
              <td>O</td>
            </tr>
            <tr className={feedingStatus=='행복'&& 'active'}>
              <td>
                <button
                  className="text-link"
                  type="button"
                  onClick={(e) => {
                    handleFeedingStatus(e, 3);
                  }}
                >
                  행복
                </button>
              </td>
              <td>X</td>
              <td>X</td>
              <td>O</td>
            </tr>
            <tr className={feedingStatus=='배부름'&& 'active'}>
              <td>
                <button
                  className="text-link"
                  type="button"
                  onClick={(e) => {
                    handleFeedingStatus(e, 4);
                  }}
                >
                  배부름
                </button>
              </td>
              <td>X</td>
              <td>X</td>
              <td>O</td>
            </tr>
          </tbody>
        </table>

        <table className="table-default mg-t10">
          <caption className="dp-blind">단계별 리소스 등록 현황목록 2</caption>
          <thead>
            <tr>
              <th>상태</th>
              <th>상호작용</th>
              <th>특수액션1</th>
              <th>특수액션2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button
                  className="text-link"
                  type="button"
                  onClick={(e) => {
                    handleFeedingStatus(e, 5);
                  }}
                >
                  특수액션
                </button>
              </td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
          </tbody>
        </table>

        <div className="cpnt_title type1 mg-t10">
          <strong>쿠키주기</strong>
        </div>
        <dl className="dlForm-default">
          <div className="tr">
            <dt>
              <span>애니메이션</span>
            </dt>
            <dd>
              {watch(`grwData[${step}].img.url`) > `` && (
                <div className="field-input-file-img">
                  <span>
                    <img
                      src={watch(`grwData[${step}].img.url`)}
                      // type="video/mp4"
                      // controls
                      alt={watch(`grwData[${step}].img.name`)}
                      width={`100 px`}
                    />
                    <button type="button" onClick={handleResetFile}>
                      <CloseIcon /> 이미지삭제
                    </button>
                  </span>
                </div>
              )}

              <div className="field-wrap">
                <input
                  type="file"
                  {...register(`grwData[${step}].img.file`)}
                  onChange={(e) => {
                    handleChangeFile(e, `grwData[${step}].img`);
                  }}
                />
                <input
                  type="text"
                  {...register(`grwData[${step}].img.name`)}
                  onClick={() =>
                    console.log(watch(`grwData[${step}].img.name`))
                  }
                  value={watch(`grwData[${step}].img.name`)}
                  readOnly
                />
                <button type="button" onClick={handleClickFile}>
                  파일선택
                </button>
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt>
              <span>음원</span>
            </dt>
            <dd>
              {watch(`grwData[${step}].sds.url`) > `` && (
                <div className="audio-wrap">
                  <audio
                    className="audio-default"
                    controls
                    src={watch(`grwData[${step}].sds.url`)}
                  ></audio>
                  <button type="button"><CloseIcon /> 음원삭제</button>
                </div>
              )}
              <div className="field-wrap">
                <input
                  type="file"
                  {...register(`grwData[${step}].sds.file`)}
                  onChange={(e) => {
                    handleChangeFile(e, `grwData[${step}].sds`);
                  }}
                />
                <input
                  type="text"
                  {...register(`grwData[${step}].sds.name`)}
                  value={watch(`grwData[${step}].sds.name`)}
                  readOnly
                />
                <button type="button" onClick={handleClickFile}>
                  파일선택
                </button>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    );
  };

  const getStatus = (stepTab, feedingStatus, fedgIndex) => {
    return (
      <>
        <div className="cpnt_dlForm">
          <h2 className="title">
            {stepTab + 1}단계 - {feedingStatus}
          </h2>
          {feedingStatus === `특수액션` && (
            <div>
              <SpecialActionField
                control={control}
                register={register}
                indexValue={`grwData[${stepTab}].spcAction.intact`}
                setValue={setValue}
                watch={watch}
                handleClickFile={handleClickFile}
                handleChangeFile={handleChangeFile}
                actDvs={`상호작용`}
              />

              <SpecialActionField
                control={control}
                register={register}
                indexValue={`grwData[${stepTab}].spcAction.spcAction1`}
                setValue={setValue}
                watch={watch}
                handleClickFile={handleClickFile}
                handleChangeFile={handleChangeFile}
                actDvs={`특수액션1`}
              />
              <SpecialActionField
                control={control}
                register={register}
                indexValue={`grwData[${stepTab}].spcAction.spcAction2`}
                setValue={setValue}
                watch={watch}
                handleClickFile={handleClickFile}
                handleChangeFile={handleChangeFile}
                actDvs={`특수액션2`}
              />
            </div>
          )}
          {feedingStatus !== `` && feedingStatus !== `특수액션` && (
            <>
              <dl className="dlForm-default">
                <div className="tr">
                  <dt>
                    <span>대표 아이콘</span>
                  </dt>
                  <dd>
                    {watch(
                      `grwData[${stepTab}].fedgList[${fedgIndex}].reprs.url`
                    ) > `` && (
                      <div className="field-input-file-img">
                        <span>
                          <img
                            src={watch(
                              `grwData[${stepTab}].fedgList[${fedgIndex}].reprs.url`
                            )}
                            alt={watch(
                              `grwData[${stepTab}].fedgList[${fedgIndex}].reprs.name`
                            )}
                            width={`100 px`}
                          />
                          <button type="button" onClick={handleResetFile}>
                            <CloseIcon /> 이미지삭제
                          </button>
                        </span>
                      </div>
                    )}
                    <div className="field-wrap">
                      <input
                        type="file"
                        {...register(
                          `grwData[${stepTab}].fedgList[${fedgIndex}].reprs.file`
                        )}
                        onChange={(e) => {
                          handleChangeFile(
                            e,
                            `grwData[${stepTab}].fedgList[${fedgIndex}].reprs`
                          );
                        }}
                      />
                      <input
                        type="text"
                        {...register(
                          `grwData[${stepTab}].fedgList[${fedgIndex}].reprs.name`
                        )}
                        value={watch(
                          `grwData[${stepTab}].fedgList[${fedgIndex}].reprs.name`
                        )}
                        readOnly
                      />
                      <button type="button" onClick={handleClickFile}>
                        파일선택
                      </button>
                    </div>
                  </dd>
                </div>
                <div className="tr">
                  <dt>
                    <span>기본</span>
                  </dt>
                  <dd>
                    <div className="field-wrap isFull isBd">
                      <span className="inTd wt-pc30">애니메이션</span>
                      <div className="inTd isRow isLeft">
                        {watch(
                          `grwData[${stepTab}].fedgList[${fedgIndex}].dft.url`
                        ) > `` && (
                          <div className="field-input-file-img">
                            <span>
                              <img
                                src={watch(
                                  `grwData[${stepTab}].fedgList[${fedgIndex}].dft.url`
                                )}
                                alt={watch(
                                  `grwData[${stepTab}].fedgList[${fedgIndex}].dft.name`
                                )}
                                width={`100 px`}
                              />
                              <button type="button" onClick={handleResetFile}>
                                <CloseIcon /> 이미지삭제
                              </button>
                            </span>
                          </div>
                        )}
                        <div className="field-wrap">
                          <input
                            type="file"
                            {...register(
                              `grwData[${stepTab}].fedgList[${fedgIndex}].dft.file`
                            )}
                            onChange={(e) => {
                              handleChangeFile(
                                e,
                                `grwData[${stepTab}].fedgList[${fedgIndex}].dft`
                              );
                            }}
                          />
                          <input
                            type="text"
                            {...register(
                              `grwData[${stepTab}].fedgList[${fedgIndex}].dft.name`
                            )}
                            value={watch(
                              `grwData[${stepTab}].fedgList[${fedgIndex}].dft.name`
                            )}
                            readOnly
                          />
                          <button type="button" onClick={handleClickFile}>
                            파일선택
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="field-wrap isFull isBd mg-t0 bd-t0">
                      <span className="inTd wt-pc30">음원</span>
                      <div className="inTd isRow">
                        {watch(
                          `grwData[${stepTab}].fedgList[${fedgIndex}].sds.url`
                        ) > `` && (
                          <div className="audio-wrap">
                            <audio
                              className="audio-default"
                              controls
                              src={watch(
                                `grwData[${stepTab}].fedgList[${fedgIndex}].sds.url`
                              )}
                            ></audio>
                            <button type="button"><CloseIcon /> 이미지삭제</button>
                          </div>
                        )}
                        <div className="field-wrap isCol">
                          <input
                            type="file"
                            {...register(
                              `grwData[${stepTab}].fedgList[${fedgIndex}].sds.file`
                            )}
                            onChange={(e) => {
                              handleChangeFile(
                                e,
                                `grwData[${stepTab}].fedgList[${fedgIndex}].sds`
                              );
                            }}
                          />
                          <input
                            type="text"
                            {...register(
                              `grwData[${stepTab}].fedgList[${fedgIndex}].sds.name`
                            )}
                            value={watch(
                              `grwData[${stepTab}].fedgList[${fedgIndex}].sds.name`
                            )}
                            readOnly
                          />
                          <button type="button" onClick={handleClickFile}>
                            파일선택
                          </button>
                        </div>
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>
              <InteractField
                control={control}
                indexValue={`grwData[${stepTab}].fedgList[${fedgIndex}].intactList`}
                setValue={setValue}
                watch={watch}
                handleClickFile={handleClickFile}
                handleChangeFile={handleChangeFile}
              />
            </>
          )}
          {feedingStatus === `` && <div>영양상태를 선택해 주세요</div>}
        </div>
      </>
    );
  };

  return (
    <>
      <PopupDialog
        open={open}
        setOpen={setOpen}
        title={`펫 등록`}
        onSubmit={handleSubmit(onSubmit, onError)}
        onClose={handleOnClose}
        btnMsg={btnMsg}
      >
        <form>
          <div className="layout_wrap">
            <div className="layout_item">
              <div className="cpnt_dlForm">
                <dl className="dlForm-default">
                  <div className="tr">
                    <dt>
                      <span>펫명</span>
                    </dt>
                    <dd>
                      <div className="field-wrap">
                        <input type="text" required {...register(`petNm`)} />
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt>
                      <span>펫소개</span>
                    </dt>
                    <dd>
                      <div className="field-wrap">
                        <textarea rows={3} required {...register(`petDesc`)} />
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt>
                      <span>리스트 등록</span>
                    </dt>
                    <dd>
                      <Tabs
                        value={stepTab}
                        onChange={handleSetStepTab}
                        centered
                        className="cpnt_contsTab wp-div2"
                      >
                        <Tab value={0} label="1단계" />
                        <Tab value={1} label="2단계" />
                        <Tab value={2} label="3단계" />
                        <Tab value={3} label="4단계" />
                        <Tab value={4} label="5단계" />
                      </Tabs>
                      {getStepData(stepTab)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="layout_item isBd pd-20">
              {getStatus(stepTab, feedingStatus, fedgIndex)}
            </div>
          </div>

          {/* <input type="submit" /> */}
        </form>
      </PopupDialog>
    </>
  );
};

export default PetListDetail;
