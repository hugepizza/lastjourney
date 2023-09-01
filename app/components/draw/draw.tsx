import { imagine } from "@/app/mj/imagine";
import { useSettingStore } from "@/app/store/setting";
import {
    Button,
    Divider,
    Selector,
    Slider,
    Tabs,
    TextArea,
    Toast
} from "antd-mobile";
import { useState } from "react";

export default function Draw() {
  return (
    <div className="w-full h-full pb-12">
      <Tabs
        activeLineMode={"full"}
        defaultActiveKey={"mj"}
        style={{ "--active-line-color": "black" }}
      >
        <Tabs.Tab title="默认" key="mj">
          <Panel model={"mj"} />
        </Tabs.Tab>
        <Tabs.Tab title="niji" key="niji">
          <Panel model={"niji"} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

function Panel({ model }: { model: string }) {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState("");
  const [version, setVersion] = useState(model === "mj" ? "v 5.2" : "niji 5");
  const [qulity, setQulity] = useState(".25");
  const [ratio, setRatio] = useState("1:1");
  const [chaos, setChaos] = useState(0);
  const [stylize, setStylize] = useState(0);
  const settingStore = useSettingStore();
  const submit = async () => {
    const message = await imagine({
      prompt: prompt,
      params: {
        ratio: ratio,
        version: version,
        quality: qulity,
        chaos: chaos,
        stylize: stylize,
        seed: seed,
      },
      baseUrl: settingStore.mjProxyEndpoint,
      secret: settingStore.mjProxySecret,
    });
    Toast.show(message);
  };
  return (
    <div className="w-full h-full">
      <TextArea
        rows={3}
        onChange={(e) => {
          setPrompt(e);
        }}
        placeholder="输入提示词"
      />
      <Divider />
      <TextArea
        rows={1}
        onChange={(e) => {
          setSeed(e);
        }}
        placeholder="输入种子(可选)"
      />
      <Divider />
      版本
      <Selector
        //  "niji 5" | "niji 4"
        options={
          model === "mj"
            ? [
                { label: "v 5.2", value: "v 5.2" },
                { label: "v 5", value: "v 5" },
                { label: "v 4", value: "v 4" },
              ]
            : [
                { label: "niji 5", value: "niji 5" },
                { label: "niji 4", value: "niji 4" },
                { label: "4", value: "v 4" },
              ]
        }
        defaultValue={model === "mj" ? ["v 5.2"] : ["niji 5"]}
        multiple={false}
        onChange={(arr, extend) => setVersion(arr[0])}
      />
      <Divider />
      清晰度
      <Selector
        options={[
          { label: "高清", value: ".25" },
          { label: "超清", value: ".5" },
          { label: "超高清", value: "1" },
        ]}
        defaultValue={[".25"]}
        multiple={false}
        onChange={(arr, extend) => {
          setQulity(arr[0]);
        }}
      />
      <Divider />
      比例
      <Selector
        options={[
          { label: "1:1", value: "1:1" },
          { label: "16:9", value: "16:9" },
          { label: "21:9", value: "21:9" },
          { label: "9:16", value: "9:16" },
          { label: "9:21", value: "9:21" },
          { label: "4:3", value: "4:3" },
          { label: "3:4", value: "3:4" },
        ]}
        defaultValue={["1:1"]}
        multiple={false}
        onChange={(arr, extend) => {
          setRatio(arr[0]);
        }}
      />
      <Divider />
      混乱度
      <Slider
        popover
        min={0}
        step={1}
        max={100}
        ticks
        onAfterChange={(v) => {
          setChaos(parseInt(v.toString(), 10));
        }}
      />
      <Divider />
      风格化
      <Slider
        popover
        min={0}
        step={10}
        max={1000}
        ticks
        onAfterChange={(v) => {
          setStylize(parseInt(v.toString(), 10));
        }}
      />
      <Divider />
      <Button
        onClick={async () => {
          await submit();
        }}
        block
      >
        提交
      </Button>
    </div>
  );
}
