import { useCallback, useState } from "react";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { Tab, Tabs } from "@mui/material";
import { useForm } from "react-hook-form";
const CurriculumOrgDetail = (props) => {
  const { open, setOpen } = props;
  const getDefaultEngData = () => {
    const stepDataArray = [];
    let maxOdnum = 60;
    for (let index = 0; index < maxOdnum; index++) {
      stepDataArray.push({
        odnum: index + 1,
        albumId: "",
      });
    }
    return stepDataArray;
  };
  //   const { open, setOpen } = useState(false);
  const defaultValues = {
    rcmTypNm: "",
    prgmTypCd: "",
    paperId: "",
    step1: getDefaultEngData(),
    step2: getDefaultEngData(),
    step3: getDefaultEngData(),
    step4: getDefaultEngData(),
    step5: getDefaultEngData(),
    step6: getDefaultEngData(),
  };

  const [engTab, setEngTab] = useState(`step1`);

  const handleSetEngTab = useCallback(
    (e, newValue) => {
      setEngTab(newValue);
    },
    [setEngTab]
  );

  const { register, handleSubmit, watch } = useForm({
    defaultValues: defaultValues,
  });
  const onSubmit = (data) =>
    console.log({
      prgmNum: 12301,
      ...watch(),
    });

  const getStepData = (step) => {
    return (
      <dl className="dlForm-default curr_org_engKindergarten">
        {watch(step).map((data, index) => (
        <div className="tr" key={step + data.odnum}>
          <dt><span>{data.odnum + `차수`}</span></dt>
          <dd>
            <div className="field-wrap">
              <input
                name={`${step}[${index}].albumId`}
                type={`text`}
                defaultValue={data.albumId}
                {...register(`${step}[${index}].albumId`)}
                //   ref={...register(`${step}[${index}]`)}
                placeholder="콤마(,)로 구분하여 여러 앨범명을 등록할 수 있습니다."
              />
            </div>
          </dd>
        </div>
        ))}
      </dl>
    );
  };
  return (
    <>
      <PopupDialog open={open} setOpen={setOpen} title={`커리큘럼 등록`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="cpnt_dlForm">
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required"><span>{`추천유형명`}</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" placeholder="rcmTypNm"
                      {...register("rcmTypNm", {
                        required: true,
                        maxLength: 100,
                      })}
                      required
                    />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>{`타입`}</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input
                      {...register("prgmTypCd", { required: true })}
                      id="prgmTypCd1"
                      type="radio"
                      value="추천"
                      required
                    />
                    <label htmlFor="prgmTypCd1">추천</label>
                    <input
                      {...register("prgmTypCd", { required: true })}
                      id="prgmTypCd2"
                      type="radio"
                      value="영어유치원"
                      required
                    />
                    <label htmlFor="prgmTypCd2">영어유치원</label>
                  </div>

                  
                </dd>
              </div>
              {watch("prgmTypCd") === `추천` && (
              <div className="tr">
                <dt className="required"><span>{`지면 데이터`}</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input
                      type="text"
                      placeholder="paperId"
                      {...register("paperId", { pattern: /,/i })}
                      required
                    />
                  </div>
                </dd>
              </div>
              )}
              {watch("prgmTypCd") === `영어유치원` && (
              <div className="tr">
                <dt>{`오늘의 영어 레벨 카테고리 설정`}</dt>
                <dd>
                  <Tabs value={engTab} onChange={handleSetEngTab} centered className="cpnt_contsTab">
                    <Tab value={`step1`} label="STEP 1" />
                    <Tab value={`step2`} label="STEP 2" />
                    <Tab value={`step3`} label="STEP 3" />
                    <Tab value={`step4`} label="STEP 4" />
                    <Tab value={`step5`} label="STEP 5" />
                    <Tab value={`step6`} label="STEP 6" />
                  </Tabs>
                  {getStepData(engTab)}
                </dd>
              </div>
              )}
            </dl>

          </div>
          
          {/* <input type="submit" /> */}
        </form>
      </PopupDialog>
    </>
  );
};

export default CurriculumOrgDetail;
