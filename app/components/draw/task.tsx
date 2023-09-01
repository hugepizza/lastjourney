import { Button, Card, Image, Toast } from "antd-mobile";
import dayjs from "dayjs";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export interface Task {
  _id?: string;
  userID: string;
  createdAt: number;
  taskID: string;
  type: "IMAGINE" | "UPSCALE" | "VARIATION" | "REROLL" | "DESCRIBE" | "BLEND";
  status?: "NOT_START" | "SUBMITTED" | "IN_PROGRESS" | "FAILURE" | "SUCCESS";
  progress?: string;
  rawPrompt?: string;
  targetPrompt?: string;
  pub?: boolean;
  seed?: string;

  error?: string;
  doneAt?: number;
  rawFinalUrl?: string;
  finalUrl?: string;
  buttons?: [{ customId: string; label: string; used?: boolean }];
  refund?: boolean;
  credits: number;
}

export default function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ts, setTs] = useState<number>(dayjs().unix());
  const fetchTasks = () => {
    const request = new Request("https://mapi.aleyi.com/draw/tasks", {
      method: "GET",
      headers: {
        Authorization: Cookie.get("ak") || "",
      },
    });
    fetch(request)
      .then(async (reponse) => {
        const body = await reponse.json();
        setTasks(body.data.tasks);
      })
      .catch((err) => {
        Toast.show("获取失败");
      });
  };
  useEffect(() => {
    fetchTasks();
  }, [ts]);
  return (
    <div className="pb-12">
      {tasks.map((ele, i) => {
        return <TaskCard setTs={setTs} key={i} task={ele} />;
      })}
    </div>
  );
}

function TaskCard({
  task,
  setTs,
}: {
  task: Task;
  setTs: (ts: number) => void;
}) {
  const runAction = (label: string) => {
    const input = {
      userID: Cookie.get("userID") || "",
      action: label.includes("U") ? "UPSCALE" : "VARIATION",
      taskID: task._id,
      index: parseInt(label[1], 10),
    };

    const request = new Request(
      "https://mapi.aleyi.com/draw/action/" + input.action,
      {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          Authorization: Cookie.get("ak") || "",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    fetch(request)
      .then(async (reponse) => {
        const body = await reponse.json();
        if (reponse.status != 200) {
          Toast.show("请求错误");
        } else if (body.code != 200) {
          Toast.show(body.message);
        } else {
          Toast.show("提交成功");
          setTs(dayjs().unix());
        }
      })
      .catch((err) => {
        Toast.show("请求错误");
      });
  };
  return (
    <Card title={task.type}>
      <Image
        src={task.finalUrl}
        alt={task.progress}
        width={"100%"}
        style={{ height: "auto", aspectRatio: "1 / 1" }}
      />
      {(task.type === "IMAGINE" || task.type === "VARIATION") && (
        <Card>
          <div className="flex flex-row justify-between">
            {task?.buttons
              ?.filter((ele) => ele.label.includes("U"))
              .map((ele, i) => {
                return (
                  <Button
                    key={i}
                    className="flex-grow"
                    disabled={ele.used}
                    onClick={() => {
                      runAction(ele.label);
                    }}
                  >
                    {ele.label}
                  </Button>
                );
              })}
          </div>
          <div className="flex flex-row justify-between">
            {task?.buttons
              ?.filter((ele) => ele.label.includes("V"))
              .map((ele, i) => {
                return (
                  <Button
                    key={i}
                    className="flex-grow"
                    disabled={ele.used}
                    onClick={() => {
                      runAction(ele.label);
                    }}
                  >
                    {ele.label}
                  </Button>
                );
              })}
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
