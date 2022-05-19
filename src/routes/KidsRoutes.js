import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import MyPetSetting from "../pages/MyPetSetting";
import SampleTab from "../pages/SampleTab";
import Sidebar from "../components/sidebar/Sidebar";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import CurriculumOrg from "../pages/CurriculumOrg";
import UsefulInfo from "../pages/UsefulInfo.js";
import Banners from "../pages/Banners";
import PetList from "../pages/PetList";
import CurriculumSetting from "../pages/CurriculumSetting";
import SampleInfo from "../pages/SampleInfo";
import Phrases from "../pages/Phrases";
import QuzSchedule from "../pagesQuz/Schedule";
import QuzGroup from "../pagesQuz/Group";
import QuzCategory from "../pagesQuz/Category";
import QuzContent from "../pagesQuz/Content";
import PubUi from "../pub/Ui";

const sidebar_category = [
  {
    text: "커리큘럼 편성관리",
    path: "/curr/org",
    sub: [
      { text: "커리큘럼 편성", path: "/curr/org" },
      { text: "커리큘럼 설정", path: "/curr/setting" },
    ],
  },
  {
    text: "부모알림장 관리",
    path: "/parents/info",
    sub: [
      { text: "학부모 유용정보", path: "/parents/info" },
      { text: "배너", path: "/parents/banners" },
      // { text: "문구", path: "/" },
    ],
  },
  {
    text: "펫 관리",
    path: "/pet/petsetting",
    sub: [
      { text: "펫 설정", path: "/pet/petsetting" },
      { text: "펫 목록", path: "/pet/petlist" },
    ],
  },
  {
    text: "문구 관리",
    path: "/phrase/setting",
    sub: [],
  },
  {
    text: "퀴즈백과 관리",
    path: "/quz/schedule",
    sub: [
      { text: "오늘의 퀴즈 스케쥴링", path: "/quz/schedule" },
      { text: "퀴즈그룹 관리", path: "/quz/group" },
      { text: "퀴즈백과 편성/카테고리 관리", path: "/quz/category" },
      { text: "퀴즈콘텐츠 관리", path: "/quz/content" },
    ],
  },
  {
    text: "퍼블메뉴",
    path: "/pub/ui",
    sub: [
      { text: "퍼블 메뉴 UI", path: "/pub/ui" }
    ]
  }
];

const KidsRoutes = () => {
  const [sidebarList, setSidebarList ] = useState(sidebar_category);
  const addSidebar = (newSidebar) => {
    setSidebarList({
      ...sidebarList,
      sidebars: [...sidebarList.addSidebar, newSidebar],
    });
  };
  return (
    <Router>
      <Sidebar sidebarList={sidebarList} />
      <DefaultLayout sidebarList={sidebarList}>
        <Routes>
          <Route path="/" element={<SampleTab />} />
          <Route path="/curr/org" element={<CurriculumOrg />} />
          <Route path="/curr/setting" element={<CurriculumSetting />} />
          <Route path="/pet/petlist" element={<PetList />} />
          <Route path="/pet/petsetting" element={<MyPetSetting />} />
          <Route path="/parents/info" element={<UsefulInfo />} />
          <Route path="/parents/banners" element={<Banners />} />
          <Route path="/phrase/setting" element={<Phrases />} />
          <Route path="/sample/info" element={<SampleInfo />} />
          <Route path="/quz/schedule" element={<QuzSchedule />} />
          <Route path="/quz/group" element={<QuzGroup />} />
          <Route path="/quz/category" element={<QuzCategory />} />
          <Route path="/quz/content" element={<QuzContent />} />
          <Route path="/pub/ui" element={<PubUi />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default KidsRoutes;
