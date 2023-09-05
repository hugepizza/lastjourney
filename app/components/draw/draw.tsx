import { imagine } from "@/app/mj/imagine";
import { useSettingStore } from "@/app/store/setting";
import {
  Button,
  Divider,
  ImageUploadItem,
  ImageUploader,
  Selector,
  Slider,
  Switch,
  Tabs,
  TextArea,
  Toast,
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
        <Tabs.Tab title="Default" key="mj">
          <Panel model={"mj"} />
        </Tabs.Tab>
        <Tabs.Tab title="Niji for anime" key="niji">
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
  const [usePanelParams, setUsePanelParams] = useState(true);
  const settingStore = useSettingStore();
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [b64, setB64] = useState<string[]>([]);
  const blobToBase64 = async (blob: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Error reading blob as base64"));
      };

      reader.readAsDataURL(blob);
    });
  };

  const upload = async (file: File) => {
    const b64content = await blobToBase64(file);
    return {
      url: URL.createObjectURL(file),
      extra: b64content,
    } as ImageUploadItem;
  };
  const fileChange = (items: ImageUploadItem[]) => {
    setFileList(items);
    const b64contentArr = items.map((ele) => {
      return ele.extra;
    });
    setB64(b64contentArr);
  };
  const submit = async () => {
    const message = await imagine({
      prompt: prompt,
      base64Array: b64,
      params: usePanelParams
        ? {
            ratio: ratio,
            version: version,
            quality: qulity,
            chaos: chaos,
            stylize: stylize,
            seed: seed,
          }
        : {},
      baseUrl: settingStore.mjProxyBaseUrl,
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
        placeholder="Prompt"
      />
      <Divider />
      <TextArea
        rows={1}
        onChange={(e) => {
          setSeed(e);
        }}
        placeholder="Seed(optional)"
      />
      <Divider />
      <ImageUploader
        maxCount={2}
        value={fileList}
        onChange={fileChange}
        upload={upload}
      />
      <Divider />
      <Switch
        defaultChecked
        onChange={(e) => setUsePanelParams(e)}
        style={{
          "--checked-color": "#00b578",
          "--height": "36px",
          "--width": "60px",
        }}
      />
      {"  Use Params Selectors"}
      <Divider />
      Version
      <Selector
        disabled={!usePanelParams}
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
      Quality
      <Selector
        disabled={!usePanelParams}
        options={[
          { label: "Low", value: ".25" },
          { label: "Mid", value: ".5" },
          { label: "High", value: "1" },
        ]}
        defaultValue={[".25"]}
        multiple={false}
        onChange={(arr, extend) => {
          setQulity(arr[0]);
        }}
      />
      <Divider />
      Ratio
      <Selector
        disabled={!usePanelParams}
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
      Chaos
      <Slider
        disabled={!usePanelParams}
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
      Stylize
      <Slider
        disabled={!usePanelParams}
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
        Submit
      </Button>
    </div>
  );
}
