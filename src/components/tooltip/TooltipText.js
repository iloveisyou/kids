import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


const TooltipText = (props) => {
    const { title, option, children } = props;
    return (
      <Tooltip className="" title={title} arrow placement={option? option:'top'}>
        <span className="cpnt_tooltip target">{children}<QuestionMarkIcon></QuestionMarkIcon></span>
      </Tooltip>
    );
  };

  export default TooltipText;


