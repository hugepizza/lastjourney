import { action } from "@/app/mj/action";
import { ListRes, fetchList, fetchListByIds } from "@/app/mj/list";
import { useSettingStore } from "@/app/store/setting";
import { Button, Card, Ellipsis, Image, Toast } from "antd-mobile";
import { useEffect, useState } from "react";

export default function Task() {
  const [tasks, setTasks] = useState<ListRes[]>([]);
  // const [ts, setTs] = useState<number>(dayjs().unix());
  const settingStore = useSettingStore();
  useEffect(() => {
    async function fetchData() {
      try {
        const list = await fetchList({
          baseUrl: settingStore.mjProxyEndpoint,
          secret: settingStore.mjProxySecret,
        });
        setTasks(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [settingStore.mjProxyEndpoint, settingStore.mjProxySecret]);

  useEffect(() => {
    const poll = async (requestIds: string[]) => {
      const list = await fetchListByIds({
        ids: requestIds,
        baseUrl: settingStore.mjProxyEndpoint,
        secret: settingStore.mjProxySecret,
      });
      const listCopy = tasks.map((ele) =>
        JSON.parse(JSON.stringify(ele))
      ) as ListRes[];

      list.forEach((ele) => {
        const target = listCopy.findIndex((t) => ele.id === t.id);
        listCopy[target] = ele;
      });
      setTasks(listCopy);
    };
    const intervalId = setInterval(() => {
      console.log("fetch interval");

      const pollIDs = tasks
        .filter((ele) => ele.status != "SUCCESS" && ele.status != "FAILURE")
        .map((ele) => ele.id);

      if (pollIDs) {
        poll(pollIDs);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [tasks]);

  return (
    <div className="pb-12">
      {tasks.map((ele, i) => {
        return <TaskCard key={i} task={ele} />;
      })}
    </div>
  );
}

function TaskCard({ task }: { task: ListRes }) {
  const settingStore = useSettingStore();
  const runAction = async (label: string) => {
    await action({
      taskID: task.id,
      label: label,
      baseUrl: settingStore.mjProxyEndpoint,
      secret: settingStore.mjProxySecret,
    });
  };
  return (
    <Card title={task.action} style={{ marginBottom: "4px" }}>
      <Ellipsis direction="end" content={task.prompt} />
      <Image
        src={task.imageUrl}
        alt={task.progress}
        width={"100%"}
        style={{ height: "auto", aspectRatio: "1 / 1" }}
      />
      {(task.action === "IMAGINE" || task.action === "VARIATION") &&
        task.status === "SUCCESS" && (
          <Card>
            <div className="flex flex-row justify-between">
              {["U1", "U2", "U3", "U4"].map((ele, i) => {
                return (
                  <Button
                    key={i}
                    className="flex-grow"
                    onClick={async () => {
                      await runAction(ele);
                    }}
                  >
                    {ele}
                  </Button>
                );
              })}
            </div>
            <div className="flex flex-row justify-between">
              {["V1", "V2", "V3", "V4"].map((ele, i) => {
                return (
                  <Button
                    key={i}
                    className="flex-grow"
                    onClick={async () => {
                      await runAction(ele);
                    }}
                  >
                    {ele}
                  </Button>
                );
              })}
            </div>
            <div className="flex flex-row justify-between">
              <Button>{"seed"}</Button>
            </div>
          </Card>
        )}

      <div>
        {/* {task.rawPrompt && (
          <Ellipsis
            direction="end"
            content={"原始提示词: " + task.rawPrompt}
            expandText="展开"
            collapseText="收起"
          />
        )}
        {task.targetPrompt && (
          <Ellipsis
            direction="end"
            content={"最终提示词: " + task.rawPrompt}
            expandText="展开"
            collapseText="收起"
          />
        )} */}
      </div>

      <Card></Card>
    </Card>
  );
}
