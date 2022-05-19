import "moment/locale/ko";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const Phrases = () => {
  return (
    <>
      <div className="cpnt_dlForm">
        <h2 className="title">추천 유형별문구</h2>
        <dl className="dlForm-default">
          <div className="tr">
            <dt><span>프로필</span></dt>
            <dd>
              <div className="field-wrap keyword1">
                <button type="button">프로필</button>
                <button type="button">아이관심사1</button>
                <button type="button">아이관심사2</button>
                <button type="button">아이관심사3</button>
                <button type="button">부모관심사1</button>
                <button type="button">부모관심사2</button>
                <button type="button">부모관심사3</button>
                <button type="button">영어레벨</button>
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>진단</span></dt>
            <dd>
              <div className="field-wrap keyword2">
                <button type="button">아이기질검사</button>
                <button type="button">다면적성검사</button>
                <button type="button">인지발달검사</button>
                <button type="button">6C</button>
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>콘텐츠</span></dt>
            <dd>
              <div className="field-wrap keyword3">
                <button type="button">콘텐츠명</button>
                <button type="button">장르(대)</button>
                <button type="button">장르(중)</button>
                <button type="button">장르(소)</button>
              </div>
            </dd>
          </div>
        </dl>

        <dl className="dlForm-default mg-t10">
          <div className="tr">
            <dt><span>다면적성 추천</span></dt>
            <dd>
              <div className="field-wrap cid-auto">
                <input type="text" />
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>인지발달(강점) 추천</span></dt>
            <dd>
              <div className="field-wrap cid-auto">
                <input type="text" />
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>인지발달(약점) 추천</span></dt>
            <dd>
              <div className="field-wrap cid-auto">
                <input type="text" />
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>유아기질 추천</span></dt>
            <dd>
              <div className="field-wrap cid-auto">
                <input type="text" />
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>부모-아이상호작용 추천</span></dt>
            <dd>
              <div className="field-wrap cid-auto">
                <input type="text" />
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>책TV 추천</span></dt>
            <dd>
              <div className="field-wrap cid-auto">
                <input type="text" />
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>영어 유치원 학습</span></dt>
            <dd>
              <div className="field-wrap cid-auto">
                <input type="text" />
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>율동 콘텐츠 제공</span></dt>
            <dd>
              <div className="field-wrap">
                <input type="text" />
              </div>
              <div className="field-wrap">
                <textarea rows={`3`} />
              </div>
            </dd>
          </div>

        </dl>
      </div>

      <div className="cpnt_dlForm mg-t30">
        <h2 className="title">추천 메뉴 진단 노출 문구 <span className="text-info-icon">진단 유도 진입 배너 문구 작성</span></h2>
        <dl className="dlForm-default">
          <div className="tr">
            <dt><span>아이진단</span></dt>
            <dd>
              <div className="field-wrap">
                <textarea rows={`2`} placeholder="추천 메뉴에 노출할 문구를 입력해 주세요. 콤마(,)로 구분하여 여러 문구를 구분할 수 있습니다." />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>아이진단</span></dt>
            <dd>
              <div className="field-wrap">
                <textarea rows={`2`} placeholder="추천 메뉴에 노출할 문구를 입력해 주세요. 콤마(,)로 구분하여 여러 문구를 구분할 수 있습니다." />
              </div>
            </dd>
          </div>
        </dl>
      </div>

      <div className="cpnt_dlForm mg-t30">
        <h2 className="title">펫 관리 문구</h2>
        <dl className="dlForm-default">
          <div className="tr">
            <dt><span>1단계</span></dt>
            <dd>
              <div className="field-wrap cid-range">
                <input className="wt-pt150" type="text" /> 이상 <input type="text" />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>2단계</span></dt>
            <dd>
              <div className="field-wrap cid-range">
                <input className="wt-pt150" type="text" /> 이상 <input type="text" />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>3단계</span></dt>
            <dd>
              <div className="field-wrap cid-range">
                <input className="wt-pt150" type="text" /> 이상 <input type="text" />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>4단계</span></dt>
            <dd>
              <div className="field-wrap cid-range">
                <input className="wt-pt150" type="text" /> 이상 <input type="text" />
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>5단계</span></dt>
            <dd>
              <div className="field-wrap cid-range">
                <input className="wt-pt150" type="text" /> 이상 <input type="text" />
              </div>
            </dd>
          </div>
        </dl>
      </div>

      <div className="cpnt_dlForm mg-t30">
        <h2 className="title">우리아이는 리포트 문구</h2>
        <div className="cpnt_pageSearch mg-b10">
          <div className="field-wrap keyword1">
              <button type="button">아이관심사1</button>
              <button type="button">아이관심사2</button>
              <button type="button">아이관심사3</button>
              <button type="button">부모관심사1</button>
              <button type="button">부모관심사2</button>
              <button type="button">부모관심사3</button>
              <button type="button">영어레벨</button>
            </div>
        </div>
        <div className="conpt_layout_scrollH" style={{ height:"350px" }}>
          <dl className="dlForm-default layout_inner">
            <div className="tr">
              <dt><span>진단결과</span></dt>
              <dd>
                <div className="field-wrap isBd cid-range">
                  <span className="inTd wt-pc10">결과 있음</span>
                  <span className="inTd wt-pc20">수식어 있음</span>
                  <span className="inTd isCol"><input type="text" /></span>
                </div>
                <div className="field-wrap isBd cid-range">
                  <span className="inTd wt-pc10">결과 없음</span>
                  <span className="inTd wt-pc20">수식어 없음</span>
                  <span className="inTd isCol"><input type="text" /></span>
                </div>
              </dd>
            </div>
            {/* 출석 */}
            <div className="tr">
              <dt><span>출석</span></dt>
              <dd>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">상</span>
                  <span className="inTd wt-pc20">출석률 80% &#60; a &#8804; 100%</span>
                  <span className="inTd isRow isCol">
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc10">규칙</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc10">불규칙</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">중</span>
                  <span className="inTd wt-pc20">출석률 40% &#60; a &#8804; 80%</span>
                  <span className="inTd isRow isCol">
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc10">규칙</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc10">불규칙</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">하</span>
                  <span className="inTd wt-pc20">출석률 0% &#60; a &#8804; 40%</span>
                  <span className="inTd isRow isCol">
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc10">규칙</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc10">불규칙</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                  </span>
                </div>
              </dd>
            </div>
            {/* 시청시간 */}
            <div className="tr">
              <dt><span>시청시간</span></dt>
              <dd>
                <div className="field-wrap isBd cid-range">
                  <span className="inTd wt-pc10">상</span>
                  <span className="inTd wt-pc20">일 평균 2시간 초과</span>
                  <span className="inTd isCol"><input type="text" /></span>
                </div>
                <div className="field-wrap isBd cid-range">
                  <span className="inTd wt-pc10">중</span>
                  <span className="inTd wt-pc20">일평균 30분 &#60; a &#8804; 2시간</span>
                  <span className="inTd isCol"><input type="text" /></span>
                </div>
                <div className="field-wrap isBd cid-range">
                  <span className="inTd wt-pc10">하</span>
                  <span className="inTd wt-pc20">일평균 0분 &#60; a &#8804; 30분</span>
                  <span className="inTd isCol"><input type="text" /></span>
                </div>
              </dd>
            </div>
            {/* 퀴즈내역 */}
            <div className="tr">
              <dt><span>퀴즈내역</span></dt>
              <dd>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">상</span>
                  <span className="inTd wt-pc20">출석률 80% &#60; a &#8804; 100%</span>
                  <span className="inTd isRow isCol">
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc20">잘하는 영역 있음</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc20">잘하는 영역 없음</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">중</span>
                  <span className="inTd wt-pc20">출석률 40% &#60; a &#8804; 80%</span>
                  <span className="inTd isRow isCol">
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc20">잘하는 영역 있음</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc20">잘하는 영역 없음</span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">하</span>
                  <span className="inTd wt-pc20">출석률 0% &#60; a &#8804; 40%</span>
                  <span className="inTd isRow isCol">
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc20"></span>
                      <span className="inTd isCol"><input type="text" /></span>
                    </span>
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">없음</span>
                  <span className="inTd wt-pc20">정답률 0% &#60; a &#8804; 10%</span>
                  <span className="inTd isRow isCol">
                    <span className="field-wrap isFull isBd">
                      <span className="inTd wt-pc20"></span>
                      <span className="inTd isCol"><input type="text" disabled /></span>
                    </span>
                  </span>
                </div>
              </dd>
            </div>
            {/* 보상 */}
            <div className="tr">
              <dt><span>보상</span></dt>
              <dd>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">상</span>
                  <span className="inTd wt-pc20">쿠키 개수 40개 초과</span>
                  <span className="inTd isRow isCol">
                      <input type="text" />
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">중</span>
                  <span className="inTd wt-pc20">쿠키 개수 20개 &#60; a &#8804; 40개</span>
                  <span className="inTd isRow isCol">
                      <input type="text" />
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">하</span>
                  <span className="inTd wt-pc20">쿠키 개수 0개 &#60; a &#8804; 10개</span>
                  <span className="inTd isRow isCol">
                      <input type="text" />
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">없음</span>
                  <span className="inTd wt-pc20">보상 내역이 없는 경우</span>
                  <span className="inTd isRow isCol">
                      <input type="text" disabled />
                  </span>
                </div>
              </dd>
            </div>
            {/* 관심주제 연계 콘텐츠 */}
            <div className="tr">
              <dt><span>관심주제 연계 콘텐츠</span></dt>
              <dd>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc30">관심영역 1</span>
                  <span className="inTd isRow isCol">
                      <input type="text" />
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc30">없음</span>
                  <span className="inTd isRow isCol">
                      <input type="text" disabled />
                  </span>
                </div>
              </dd>
            </div>

            {/* 영어레벨 */}
            <div className="tr">
              <dt><span>영어레벨</span></dt>
              <dd>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">상승</span>
                  <span className="inTd wt-pc20">레벨 단계 상승 &#8805; 1</span>
                  <span className="inTd isRow isCol">
                      <input type="text" />
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">하락</span>
                  <span className="inTd wt-pc20">레벨 단계 하락 &#8805; 2</span>
                  <span className="inTd isRow isCol">
                      <input type="text" />
                  </span>
                </div>
                <div className="field-wrap isBd">
                  <span className="inTd wt-pc10">그외</span>
                  <span className="inTd wt-pc20"></span>
                  <span className="inTd isRow isCol">
                      <input type="text" disabled />
                  </span>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="cpnt_btns">
        <button
          type="button"
          className="sb af-r"
        >
          <PlaylistAddCheckIcon /> 적용
        </button>
      </div>

     
    </>
  );
};
export default Phrases;
