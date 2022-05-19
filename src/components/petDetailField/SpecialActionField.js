import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback } from "react";
const SpecialActionField = (props) => {
  const {
    control,
    register,
    indexValue,
    watch,
    handleClickFile,
    handleChangeFile,
    actDvs,
  } = props;
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: indexValue,
  });
  const handleAppendSpcAction = useCallback(() => {
    append({
      dspNum: fields.length + 1,
      actNm: "",
      img: { url: "", name: "", file: "" },
      sds: { url: "", name: "", file: "" },
    });
  }, [append, fields]);

  const handleRemoveSpcAction = useCallback(() => {
    if (fields.length > 1) {
      remove(fields.length - 1);
    } else {
      console.log("할수없음 ");
    }
  }, [remove, fields]);

  return (
    <>
      <div className="cpnt_title type1 mg-t10 bd-b1">
        <strong>{actDvs}</strong>
        <button
          className="field-button del small"
          type="button"
          onClick={handleRemoveSpcAction}
        >
          <DeleteOutlineIcon /> 삭제
        </button>
        <button
          type="button"
          className="field-button add small"
          onClick={handleAppendSpcAction}
        >
          <AddIcon /> 등록
        </button>
      </div>
      {watch(`${indexValue}`)?.map((item, index) => {
        return (
          <>
            <dl className="dlForm-default bd-db-t1" key={index}>
              <div className="tr">
                <dt className="bd-dt-b1">
                  <span>액션명</span>
                </dt>
                <dd className="bd-dt-b1">
                  <div className="field-wrap">
                    <input
                      type="text"
                      {...register(`${indexValue}[${index}].actNm`)}
                    />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="bd-dt-b1">
                  <span>애니메이션</span>
                </dt>
                <dd className="bd-dt-b1">
                  {watch(`${indexValue}[${index}].img.url`) > `` && (
                    <div className="field-input-file-img">
                      <span>
                        <img
                          src={watch(`${indexValue}[${index}].img.url`)}
                          alt={watch(`${indexValue}[${index}].img.name`)}
                          width={`100 px`}
                          readOnly
                        />
                        <button type="button">
                          <CloseIcon /> 이미지삭제
                        </button>
                      </span>
                    </div>
                  )}
                  <div className="field-wrap">
                    <input
                      type="file"
                      // {...register(`${indexValue}[${index}].img.file`)}
                      onChange={(e) => {
                        handleChangeFile(e, `${indexValue}[${index}].img`);
                      }}
                    />
                    <input
                      type="text"
                      value={watch(`${indexValue}[${index}].img.name`)}
                      readOnly
                      // {...register(`${indexValue}[${index}].img.name`)}
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
                  {watch(`${indexValue}[${index}].sds.url`) > `` && (
                    <div className="audio-wrap">
                      <audio
                        className="audio-default"
                        controls
                        src={watch(`${indexValue}[${index}].sds.url`)}
                      ></audio>
                      <button type="button"><CloseIcon /> 음원삭제</button>
                    </div>
                  )}
                  <div className="field-wrap isCol">
                    <input
                      type="file"
                      onChange={(e) => {
                        handleChangeFile(e, `${indexValue}[${index}].sds`);
                      }}
                    />
                    <input
                      type="text"
                      value={watch(`${indexValue}[${index}].sds.name`)}
                      readOnly
                    />
                    <button type="button" onClick={handleClickFile}>
                      파일선택
                    </button>
                  </div>
                </dd>
              </div>
            </dl>
          </>
        );
      })}
    </>
  );
};

export default SpecialActionField;
