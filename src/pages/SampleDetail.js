import { useCallback, useState } from "react";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { Tab, Tabs } from "@mui/material";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
const SampleDetail = (props) => {
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

  // const getStepData = (step) => {
  //   return (
  //     <dl className="dlForm-default">
  //       {watch(step).map((data, index) => (
  //       <div className="tr" key={step + data.odnum}>
  //         <dt><span>{data.odnum + `차수`}</span></dt>
  //         <dd>
  //           <div className="field-wrap">
  //             <input
  //               name={`${step}[${index}].albumId`}
  //               type={`text`}
  //               defaultValue={data.albumId}
  //               {...register(`${step}[${index}].albumId`)}
  //               //   ref={...register(`${step}[${index}]`)}
  //               placeholder="콤마(,)로 구분하여 여러 앨범명을 등록할 수 있습니다."
  //             />
  //           </div>
  //         </dd>
  //       </div>
  //       ))}
  //     </dl>
  //   );
  // };

  //파일업로드 - 이미지뷰
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);

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
        }
      };
    }
  };
  return (
    <>
      <PopupDialog open={open} setOpen={setOpen} title={`샘플 등록`}>
        <div className="cpnt_pageSearch Fms at-r">
          <div className="field-wrap">
            {/* <label htmlFor="sample1">배너 등록</label>
            <input {...register("sample", { required: true })} id="sample1" type="radio" value="배너 등록" required /> */}
            <label htmlFor="prgmTypCd2">학부모 유용정보 등록</label>
            <input {...register("sample", { required: true })} id="sample2" type="radio" value="학부모 유용정보 등록" required checked />
          </div>
        </div>
        {/* {watch("sample") === `배너 등록` && (
          <div>aaaa</div>
        )} */}
        {watch("sample") === `학부모 유용정보 등록` && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="cpnt_dlForm">
              <dl className="dlForm-default">
                <div className="tr">
                  <dt className="required"><span>유용 정보명</span></dt>
                  <dd><div className="field-wrap"><input type="text" required /></div></dd>
                </div>
                <div className="tr">
                  <dt className="required"><span>유용정보 링크</span></dt>
                  <dd>
                    <div className="field-wrap"><label>모바일</label><input type="text" required value={`https://`} /></div>
                    <div class="field-input-file-img mg-t10"><span>
                      <img src={ require('../assets/img/sample_500.png') } />
                      <button type="button"><CloseIcon></CloseIcon> 이미지삭제</button>
                    </span></div>
                    <div className="field-wrap"><label>IPTV (QR 이미지)</label><input type="file" /><input type="text" /><button type="button">파일선택</button></div>
                  </dd>
                </div>
                <div className="tr">
                  <dt className="required"><span>대표 이미지</span></dt>
                  <dd>
                    <div class="field-input-file-img"><span>
                      <img src={ require('../assets/img/sample_500.png') } />
                      <button type="button"><CloseIcon></CloseIcon> 이미지삭제</button>
                    </span></div>
                    <div className="field-wrap"><input type="file" /><input className="required" type="text" /><button type="button">파일선택</button></div>
                  </dd>
                </div>
                <div className="tr">
                  <dt className="required"><span>추천대상 연령</span></dt>
                  <dd>
                    <div className="field-wrap">
                      <input id="age3" type="checkbox" required /><label htmlFor="age3">3세 이하</label>
                      <input id="age4" type="checkbox" required /><label htmlFor="age3">4세</label>
                      <input id="age5" type="checkbox" required /><label htmlFor="age3">5세</label>
                      <input id="age6" type="checkbox" required /><label htmlFor="age3">6세</label>
                      <input id="age7" type="checkbox" required /><label htmlFor="age3">7세</label>
                      <input id="age8" type="checkbox" required /><label htmlFor="age3">8세 이상</label>
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
        )}
      </PopupDialog>
    </>
  );
};

export default SampleDetail;

