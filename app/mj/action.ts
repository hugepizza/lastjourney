import axios from "axios";

interface actionRes {
  code: number;
  description: string;
}

export async function action({
  taskID,
  label,
  baseUrl,
  secret,
}: {
  taskID: string;
  label: string;
  baseUrl: string;
  secret?: string;
}) {
  const resp = await axios.post<actionRes>(
    `${baseUrl}/mj/submit/simple-change`,
    {
      content: taskID + " " + label,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
        "mj-api-secret": secret,
      },
    }
  );
  const result = resp.data;
  return result.description;
}
