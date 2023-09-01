import { useSettingStore } from "@/app/store/setting";
import { Button, Form, Input, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
export default function User() {
  const settingStore = useSettingStore();
  const [mjProxyEndpoint, setMjProxyEndpoint] = useState("");
  const [mjProxySecret, setMjProxySecret] = useState("");
  useEffect(() => {
    setMjProxyEndpoint(settingStore.mjProxyEndpoint);
    setMjProxySecret(settingStore.mjProxySecret || "");
  }, [settingStore.mjProxyEndpoint, settingStore.mjProxySecret]);
  const save = () => {
    settingStore.updatemjProxyEndpoint(mjProxyEndpoint);
    settingStore.updatemjProxySecret(mjProxySecret);
    Toast.show("保存成功");
  };
  return (
    <div className="w-full h-full pb-12">
      <Form>
        <Form.Item label="mj proxy地址">
          <Input
            value={mjProxyEndpoint}
            onChange={(e) => setMjProxyEndpoint(e)}
          ></Input>
        </Form.Item>
        <Form.Item label="mj proxy密钥(如果有)">
          <Input
            value={mjProxySecret || ""}
            onChange={(e) => setMjProxySecret(e)}
          ></Input>
        </Form.Item>

        <Button type="submit" onClick={save} block>
          保存
        </Button>
      </Form>
    </div>
  );
}
