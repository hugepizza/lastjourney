"use client";
import { SafeArea, TabBar } from "antd-mobile";
import {
  CalendarOutline,
  PictureOutline,
  SetOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";

export function TabBarBottom() {
  const tabs = [
    {
      key: "/draw",
      title: "draw",
      icon: <PictureOutline />,
    },
    {
      key: "/task",
      title: "task",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/setting",
      title: "setting",
      icon: <SetOutline />,
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;
  const setRouteActive = (value: string) => {
    navigate(value);
  };

  // use safe area to fill blank
  return (
    <div className="" id="bottom">
      <TabBar
        defaultActiveKey={"/schedule"}
        activeKey={pathname === "/" ? "/schedule" : pathname}
        onChange={(value) => setRouteActive(value)}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
      <SafeArea
        position="bottom"
        style={{ background: "rgb(var(--foreground-rgb))" }}
      />
    </div>
  );
}
