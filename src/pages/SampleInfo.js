import { useCallback, useEffect, useState } from "react";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import SampleDetail from "./SampleDetail";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import TooltipText from "../components/tooltip/TooltipText";
const SampleInfo = () => {
  const { showToast } = useToast();

  const [isOpenApplyConfirm, setOpenApplyConfirm] = useState(false);
  const handleApplyButton = useCallback(() => {
    setOpenApplyConfirm(true);
  }, [setOpenApplyConfirm]);
  const handleApply = useCallback(() => {
    showToast(`적용이 완료되었습니다.`, `success`);
    setOpenApplyConfirm(false);
  }, [setOpenApplyConfirm, showToast]);

  const [isOpenDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleDeleteButton = useCallback(() => {
    setOpenDeleteConfirm(true);
  }, [setOpenDeleteConfirm]);
  const handleDelete = useCallback(() => {
    showToast(`삭제가 완료되었습니다.`, `success`);
    setOpenDeleteConfirm(false);
  }, [setOpenDeleteConfirm, showToast]);

  const [isOpenDetail, setOpenDetail] = useState(false);
  const handleDetailButton = useCallback(() => {
    setOpenDetail(true);
  }, [setOpenDetail]);

  return (
    <>
      <div className="cpnt_dlForm">
        <dl className="dlForm-default">
          <div className="tr">
            <dt><span>{`커리큘럼 신규 생성최소 시청 (비율)`}</span></dt>
            <dd>
              <div className="field-wrap">
                <input type="number" placeholder="시청 비율" />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>{`커리큘럼 완료 보상`}</span></dt>
            <dd>
              <div className="field-wrap">
                <input type="number" placeholder="보상" />
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <div className="cpnt_btns">
        <button type="button" onClick={handleDeleteButton}>
        <DeleteOutlineIcon /> 삭제
        </button>
        <button type="button" onClick={handleApplyButton}>
        <PlaylistAddCheckIcon /> 적용
        </button>
        <button
        type="button"
        onClick={handleDetailButton}
        className="sb af-r"
        >
        <AddIcon /> 등록
        </button>
      </div>

      <ConfirmDialog
        open={isOpenApplyConfirm}
        setOpen={setOpenApplyConfirm}
        onConfirm={handleApply}
      >
        <p>
          {`커리큘럼 스케쥴을 적용하겠습니까?`}
          <br />
          {`단, 이미 생성된 커리큘럼이 있는 프로필은 즉시 적용되지 않으며 다음날 커리큘럼 생성 시 적용 및 확인이 가능합니다.`}
        </p>
      </ConfirmDialog>

      <ConfirmDialog
        open={isOpenDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        onConfirm={handleDelete}
      >
        <p>
          {`삭제하시겠습니까?`}
          <br />
          {`삭제 후 복구가 불가능합니다.`}
        </p>
      </ConfirmDialog>
      <ConfirmDialog
        open={isOpenApplyConfirm}
        setOpen={setOpenApplyConfirm}
        onConfirm={handleApply}
      >
        <p>
          {`리스트 설정을`}
          <br />
          {`적용하시겠습니까?`}
        </p>
      </ConfirmDialog>

      <SampleDetail open={isOpenDetail} setOpen={setOpenDetail} />
    </>
  )
};

export default SampleInfo;
