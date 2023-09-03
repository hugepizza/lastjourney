import axios from "axios";

export interface ListRes {
  action: string;
  description: string;
  failReason: string;
  finishTime: number;
  id: string;
  imageUrl: string;
  progress: string;
  prompt: string;
  promptEn: string;
  properties: Record<string, unknown>;
  startTime: number;
  state: string;
  status: string;
  submitTime: number;
}
export async function fetchList({
  baseUrl,
  secret,
}: {
  baseUrl: string;
  secret?: string;
}): Promise<ListRes[]> {
  const resp = await axios.get<ListRes[]>(`${baseUrl}/mj/task/list`, {
    headers: {
      "Content-Type": "application/json",
      "mj-api-secret": secret,
    },
  });
  const result = resp.data;
  return result;
}

export async function fetchListByIds({
  ids,
  baseUrl,
  secret,
}: {
  ids: string[];
  baseUrl: string;
  secret?: string;
}): Promise<ListRes[]> {
  const resp = await axios.post<ListRes[]>(
    `${baseUrl}/mj/task/list-by-condition`,
    {
      ids: ids,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "mj-api-secret": secret,
      },
    }
  );
  const result = resp.data;
  return result;
}
