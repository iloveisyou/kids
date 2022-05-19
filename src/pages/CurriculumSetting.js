import { useCallback, useEffect, useState } from "react";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
const CurriculumSetting = () => {
  const { showToast } = useToast();
  const [isOpenApplyConfirm, setOpenApplyConfirm] = useState(false);
  const handleApplyButton = useCallback(() => {
    setOpenApplyConfirm(true);
  }, [setOpenApplyConfirm]);
  const handleApply = useCallback(() => {
    showToast(`적용이 완료되었습니다.`, `success`);
    setOpenApplyConfirm(false);
  }, [setOpenApplyConfirm, showToast]);

  return (
    <>
      <div className="cpnt_dlForm">
        <dl className="dlForm-default">
          <div className="tr">
            <dt><span>{`커리큘럼 신규 생성최소 시청 (비율)`}</span></dt>
            <dd>
              <div className="field-wrap cid-auto">
                <input type="number" placeholder="시청 비율" />
                <p className="text-info-icon">시청완료건수에 대한 비율</p>
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>{`커리큘럼 완료 보상`}</span></dt>
            <dd>
              <div className="field-wrap cid-auto">
                <input type="number" placeholder="보상" />
                <p className="text-info-icon">커리큘럼 완료 시 보상으로 주어지는 ‘쿠키’의 단위</p>
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <div className="cpnt_btns">
        <button type="button" className="sb af-r"
        onClick={handleApplyButton}
        >
        <PlaylistAddCheckIcon /> 적용
        </button>
      </div>

      <ConfirmDialog
        open={isOpenApplyConfirm}
        setOpen={setOpenApplyConfirm}
        onConfirm={handleApply}
      >
        <p>
          {`커리큘럼 설정을`}
          <br />
          {`적용하시겠습니까?`}
        </p>
      </ConfirmDialog>
    </>
  )
};

export default CurriculumSetting;
