"use client";
import enUS from "antd-mobile/es/locales/en-US";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

import { ConfigProvider, SafeArea } from "antd-mobile";
import { useMemo } from "react";
import Draw from "./components/draw/draw";
import Task from "./components/draw/task";
import { BitTop } from "./components/layout/big_top";
import { TabBarBottom } from "./components/layout/tabbar_bottom";
import Setting from "./components/setting/setting";
import "./globals.css";

function Content() {
  const routeElements = useMemo(() => {
    return (
      <>
        <Route path="/" element={<Draw />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/task" element={<Task />} />
        <Route path="/setting" element={<Setting />} />
      </>
    );
  }, []);

  return (
    <div className="flex flex-col flex-grow w-full">
      <Routes>{routeElements}</Routes>
    </div>
  );
}

function Frame() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="flex flex-col h-full w-full">
      <SafeArea position="top" />
      <BitTop />
      <Content />
      {pathname.split("/").length === 2 && <TabBarBottom />}
    </div>
  );
}
export default function Home() {
  return (
    <MemoryRouter>
      <ConfigProvider locale={enUS}>
        <Frame />
      </ConfigProvider>
    </MemoryRouter>
  );
}
