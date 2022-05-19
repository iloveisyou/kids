import { Container, Divider, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const DefaultLayout = ( props ) => {
  const { children, sidebarList } = props;
  const location = useLocation();
  const [middlePath, setMiddlePath] = useState("");
  const [lastPath, setLastPath] = useState("");
  const changeHeaderPath = useCallback(() => {
    const pathname = location.pathname;
    const path = pathname.split(`/`);
    // switch (path[1]) {
    //   case `curr`:
    //     setMiddlePath("커리큘럼 편성관리");
    //     break;
    //   case `parents`:
    //     setMiddlePath(`부모알림장 관리`);
    //     break;
    //   case `pet`:
    //     setMiddlePath(`펫 관리`);
    //     break;
    //   default:
    //     break;
    // }

    // switch (path[2]) {
    //   case `org`:
    //     setLastPath(`커리큘럼 편성`);
    //     break;
    //   case `setting`:
    //     setLastPath(`커리큘럼 설정`);
    //     break;
    //   case `banners`:
    //     setLastPath(`배너`);
    //     break;
    //   case `petlist`:
    //     setLastPath(`펫 목록`);
    //     break;
    //   default:
    //     break;
    // }

    //Sidebar.js 에 있는거 복사해서 사용. 나중에 카테고리 데이터 통합해도 될듯 //스위치문시 2차메뉴중에 동일메뉴 나옴. 관리 어려움
    //const { sidebarList } = props;
    // const category = [
    //   {
    //     text: "커리큘럼 편성관리",
    //     path: "/curr/org",
    //     sub: [
    //       { text: "커리큘럼 편성", path: "/curr/org" },
    //       { text: "커리큘럼 설정", path: "/curr/setting" },
    //     ],
    //   },
    //   {
    //     text: "부모알림장 관리",
    //     path: "/parents/info",
    //     sub: [
    //       { text: "학부모 유용정보", path: "/parents/info" },
    //       { text: "배너", path: "/parents/banners" },
    //       // { text: "문구", path: "/" },
    //     ],
    //   },
    //   {
    //     text: "펫 관리",
    //     path: "/pet/petsetting",
    //     sub: [
    //       { text: "펫 설정", path: "/pet/petsetting" },
    //       { text: "펫 목록", path: "/pet/petlist" },
    //     ],
    //   },
    //   {
    //     text: "문구 관리",
    //     path: "/phrase/setting",
    //     sub: [{ text: "문구 관리", path: "/phrase/setting" }],
    //   },
    //   { text: "샘플페이지 (퍼블용)", 
    //     path: "/sample/info", 
    //     sub: [ { text: "샘플페이지 (퍼블용)", path: "/sample/info" } ] 
    //   },
    //   {
    //     text: "퀴즈백과 관리",
    //     path: "/quz/schedule",
    //     sub: [
    //       { text: "오늘의 퀴즈 스케쥴링", path: "/quz/schedule" },
    //       { text: "퀴즈그룹 관리", path: "/quz/group" },
    //       { text: "퀴즈백과 편성/카테고리 관리", path: "/quz/category" },
    //       { text: "퀴즈콘텐츠 관리", path: "/quz/content" },
    //     ],
    //   }
    // ];
    for (let i = 0; i < sidebarList.length; i++) {
      if (path[1] == sidebarList[i].path.split("/")[1]) {
        setMiddlePath(sidebarList[i].text);
        console.log(sidebarList[i].sub)
        if(sidebarList[i].sub.length > 0){
          for (let j = 0; j < sidebarList[i].sub.length; j++) {
            if (path[2] == sidebarList[i].sub[j].path.split("/")[2]) {
              setLastPath(sidebarList[i].sub[j].text);
            }
          }
        }else{
          setLastPath(sidebarList[i].text);
        }
        
      }
    }
  }, [location, setMiddlePath, setLastPath]);
  useEffect(() => {
    changeHeaderPath();
  }, [changeHeaderPath, location]);

  return (
    // <Container disableGutters maxWidth={false} className="layout_contents">
    <div className="layout_contents">
      <div className="cpnt_title">
        <h1>{lastPath}</h1>
        <span className="path">
          <HomeIcon></HomeIcon> &gt;{" "}
          {`LMS 어드민 > ${middlePath} > ${lastPath} `}
        </span>
      </div>
      {/* <Divider /> */}
      <div className="cpnt_conts">{children}</div>
    </div>
  );
};
