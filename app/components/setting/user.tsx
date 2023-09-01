import { Button, Form, Input, Toast } from "antd-mobile";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
export default function User() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [ak, setAk] = useState("");
  useEffect(() => {
    if (ak) {
      const request = new Request("https://mapi.aleyi.com/user/info", {
        method: "GET",
        headers: {
          Authorization: ak || "",
        },
      });
      fetch(request)
        .then(async (reponse) => {
          const body = await reponse.json();
          Cookie.set("userID", body.data.user._id);
        })
        .catch((err) => {
          Toast.show("登录错误");
        });
    }
  }, [ak]);
  const submit = () => {
    const input = { name, password };
    const request = new Request("https://mapi.aleyi.com/user/login", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    fetch(request)
      .then(async (reponse) => {
        const body = await reponse.json();
        if (reponse.status != 200) {
          Toast.show("登录失败");
        } else if (body.code != 200) {
          Toast.show(body.message);
        } else {
          Cookie.set("ak", body.data.user.accessToken);
          setAk(body.data.user.accessToken);
          Toast.show("登录成功");
        }
      })
      .catch((err) => {
        Toast.show("登录错误");
      });
  };
  return (
    <div className="w-full h-full pb-12">
      <Form>
        <Form.Item label="用户名">
          <Input onChange={(e) => setName(e)}></Input>
        </Form.Item>
        <Form.Item label="密码">
          <Input onChange={(e) => setPassword(e)} type="password"></Input>
        </Form.Item>

        <Button type="submit" onClick={submit} block>
          登录
        </Button>
      </Form>
    </div>
  );
}
