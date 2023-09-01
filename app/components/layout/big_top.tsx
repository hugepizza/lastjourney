import { useLocation } from "react-router-dom";

export function BitTop() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="flex h-20 pl-4 flex-col justify-start items-start">
      <p className="font-bold text-4xl ">
        {pathname.replaceAll("/", "") || "画图"}
      </p>
    </div>
  );
}
