"use client";
import { SafeArea, TabBar } from "antd-mobile";
import { CalendarOutline, UserOutline } from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";

export function TabBarBottom() {
  const tabs = [
    {
      key: "/draw",
      title: "画图",
      icon: <CalendarOutline />,
    },
    {
      key: "/task",
      title: "任务",
      icon: <CalendarOutline />,
    },
    {
      key: "/setting",
      title: "配置",
      icon: <UserOutline />,
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
