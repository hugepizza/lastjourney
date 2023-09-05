import { useSettingStore } from "@/app/store/setting";
import { Button, Form, Input, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
export default function User() {
  const settingStore = useSettingStore();
  const [mjProxyBaseUrl, setMjProxyBaseUrl] = useState("");
  const [mjProxySecret, setMjProxySecret] = useState("");
  useEffect(() => {
    setMjProxyBaseUrl(settingStore.mjProxyBaseUrl);
    setMjProxySecret(settingStore.mjProxySecret || "");
  }, [settingStore.mjProxyBaseUrl, settingStore.mjProxySecret]);
  const save = () => {
    settingStore.updatemjProxyBaseUrl(mjProxyBaseUrl);
    settingStore.updatemjProxySecret(mjProxySecret);
    Toast.show("Success");
  };
  return (
    <div className="w-full h-full pb-12">
      <Form>
        <Form.Item label="mj proxy BaseUrl">
          <Input
            value={mjProxyBaseUrl}
            onChange={(e) => setMjProxyBaseUrl(e)}
          ></Input>
        </Form.Item>
        <Form.Item label="mj proxy secret(optional)">
          <Input
            value={mjProxySecret || ""}
            onChange={(e) => setMjProxySecret(e)}
          ></Input>
        </Form.Item>

        <Button type="submit" onClick={save} block>
          Save
        </Button>
      </Form>
    </div>
  );
}
