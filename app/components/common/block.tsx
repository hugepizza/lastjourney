import React, { ReactNode } from "react";

export default function Block({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col py-1">
      <span className="text-zinc-500 text-xs">{title}</span>
      {children}
    </div>
  );
}
