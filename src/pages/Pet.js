import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
// import { createSelector } from "reselect";
import { useToast } from "../components/hooks";
import { getSample } from "../store/actions/sample";

const Pet = () => {
  const dispatch = useDispatch();
  // const stateSelector = createSelector(
  //   (state) => state.pet,
  //   (pet) => ({
  //     pet: pet,
  //   })
  // );
  // const state = useSelector(stateSelector);
  const { showToast } = useToast();
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const NODE_ENV = process.env.NODE_ENV;
  const handleClick = useCallback(async () => {
    await dispatch(getSample()).then((res) => {
      console.log(res);
    });
    showToast(`hi`, `success`);
  }, [dispatch, showToast]);

  const handleButtonClick = useCallback(() => {
    setOpenConfirm(true);
  }, [setOpenConfirm]);

  return (
    <div>
      <Button onClick={handleButtonClick}>버튼</Button>
      <h2>{process.env.REACT_APP_MODE}</h2>
      <h2>{NODE_ENV}</h2>
      <h2>{`펫 입니다.`}</h2>

      <ConfirmDialog
        title={`confirm dialog`}
        open={isOpenConfirm}
        setOpen={setOpenConfirm}
        onConfirm={handleClick}
      >
        <div>
          커리큘럼 스케쥴을 적용하겠습니까? 단, 이미 생성된 커리큘럼이 있는
          프로필은 즉시 적용되지 않으며 다음날 커리큘럼 생성 시 적용 및 확인이
          가능합니다.
        </div>
      </ConfirmDialog>
    </div>
  );
};

export default Pet;
