import { Button, Grid, Paper, TextField } from "@mui/material";
import { useCallback } from "react";
import styled from "styled-components";
import { useToast } from "../components/hooks";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from "@mui/icons-material/Add";

const Item = styled(Paper)`
  padding: theme.spacing(1);
  text-align: "center";
`;

const Label = styled.label`
  display: inline-block;
  padding: 10px;
  margin-bottom: 8px;
  font-size: 16px;
  color: black;
  border: 2px solid;
  border-radius: 5px;
  border-color: #dadada;
  background-color: #e7e7e7;
`;

const MyPetSetting = () => {
  const { showToast } = useToast();
  const handleClick = useCallback(() => {
    showToast(
      `<strong>적용 완료</strong><br> 펫 관리 설정이 적용 되었습니다.`,
      `success`
    );
  }, [showToast]);

  return (
    <>
      <div className="cpnt_dlForm">
        <h2 className="title bg">단계별 펫 성장을 위해 필요한 쿠키</h2>
        <dl className="dlForm-default">
          <div>
            <dt className="thead-tr">
              <span>1단계<ArrowForwardIcon></ArrowForwardIcon>2단계</span>
              <span>2단계<ArrowForwardIcon></ArrowForwardIcon>3단계</span>
              <span>3단계<ArrowForwardIcon></ArrowForwardIcon>4단계</span>
              <span>4단계<ArrowForwardIcon></ArrowForwardIcon>5단계</span>
            </dt>
            <dd className="tbody-tr">
              <span><input className="field-input" type="number" /> 개</span>
              <span><input className="field-input" type="number" /> 개</span>
              <span><input className="field-input" type="number" /> 개</span>
              <span><input className="field-input" type="number" /> 개</span>
            </dd>
          </div>
        </dl>

        <h2 className="title bg">상위 상태로 올라가기 위해 필요한 쿠키</h2>
        <dl className="dlForm-default">
          <div>
            <dt className="thead-tr">
              <span>아사직전<ArrowForwardIcon></ArrowForwardIcon>배고픔</span>
              <span>배고픔<ArrowForwardIcon></ArrowForwardIcon>보통</span>
              <span>보통<ArrowForwardIcon></ArrowForwardIcon>행복</span>
              <span>행복<ArrowForwardIcon></ArrowForwardIcon>배부름</span>
            </dt>
            <dd className="tbody-tr">
              <span><input className="field-input" type="number" /> 개</span>
              <span><input className="field-input" type="number" /> 개</span>
              <span><input className="field-input" type="number" /> 개</span>
              <span><input className="field-input" type="number" /> 개</span>
            </dd>
          </div>
        </dl>

        <h2 className="title bg">하위 상태로 변경 되는 조건</h2>
        <dl className="dlForm-default">
          <div>
            <dt className="thead-tr">
              <span>아사직전</span>
              <span>배부름<ArrowForwardIcon></ArrowForwardIcon>행복</span>
              <span>행복<ArrowForwardIcon></ArrowForwardIcon>보통</span>
              <span>보통<ArrowForwardIcon></ArrowForwardIcon>배고픔</span>
            </dt>
            <dd className="tbody-tr">
              <span><input className="field-input" type="number" /> 일</span>
              <span><input className="field-input" type="number" /> 시간</span>
              <span><input className="field-input" type="number" /> 시간</span>
              <span><input className="field-input" type="number" /> 시간</span>
            </dd>
          </div>
        </dl>
      </div>
      
      {/* <Grid container rowSpacing={4}>
        <Grid container item rowSpacing={3} columnSpacing={4}>
          <Grid container item>
            <Grid item xs={4}>
              <Label>{`단계별 펫 성장을 위해 필요한 쿠키`}</Label>
            </Grid>
          </Grid>

          <Grid container item columnSpacing={4}>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`1단계->2단계`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`2단계->3단계`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`3단계->4단계`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`4단계->5단계`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item rowSpacing={3} columnSpacing={4}>
          <Grid container item>
            <Grid item xs={4}>
              <Label>{`상위 상태로 올라가기 위해 필요한 쿠키`}</Label>
            </Grid>
          </Grid>
          <Grid container item columnSpacing={4}>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`아사직전->배고픔`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`배고픔->보통`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`보통->행복`}</p>
                <TextField
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`행복->배부름`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item rowSpacing={3} columnSpacing={4}>
          <Grid container item>
            <Grid item xs={4}>
              <Label>{`하위 상태로 변경 되는 조건`}</Label>
            </Grid>
          </Grid>
          <Grid container item columnSpacing={4}>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`아사직전`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
                <p
                  style={{
                    color: "red",
                    display: "inline-block",
                    fontWeight: "bold",
                  }}
                >{`일`}</p>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`배부름->행복`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
                <p
                  style={{
                    color: "black",
                    display: "inline-block",
                    fontWeight: "bold",
                  }}
                >{`시간`}</p>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`행복->보통`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
                <p
                  style={{
                    color: "black",
                    display: "inline-block",
                    fontWeight: "bold",
                  }}
                >{`시간`}</p>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item elevation={0}>
                <p style={{ display: "inline-block" }}>{`보통->배고픔`}</p>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  style={{ display: "inline-block", marginLeft: "10px" }}
                />
                <p
                  style={{
                    color: "black",
                    display: "inline-block",
                    fontWeight: "bold",
                  }}
                >{`시간`}</p>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      <div className="cpnt_btns">
        <button
          type="button"
          onClick={handleClick}
          className="sb af-r"
        >
          <PlaylistAddCheckIcon /> 적용
        </button>
      </div>
    </>
  );
};

export default MyPetSetting;
