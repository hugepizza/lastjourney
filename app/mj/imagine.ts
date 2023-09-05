import axios from "axios";
export interface ImagineReq {
  prompt: string;
  base64Array?: string[];
  baseUrl: string;
  secret?: string;
  params?: {
    ratio?: string;
    version?: string;
    quality?: string;
    chaos?: number;
    stylize?: number;
    seed?: string;
  };
}
export interface ImagineRes {
  code: number;
  result: string;
  description: string;
}
export async function imagine({
  prompt,
  base64Array,
  baseUrl,
  secret,
  params,
}: ImagineReq) {
  const targetPrompt = await assemble(prompt, params);
  console.log("prompt", prompt);
  console.log("targetPrompt", targetPrompt);
  console.log("baseUrl", baseUrl);
  console.log("secret", secret);
  const url = `${baseUrl}/mj/submit/imagine`;
  try {
    const resp = await axios.post<ImagineRes>(
      url,
      {
        prompt: targetPrompt,
        base64Array: base64Array,
      },
      {
        withCredentials: false,
        headers: {
          "mj-api-secret": secret,
          "Content-Type": "application/json",
        },
      }
    );
    const result = resp.data;
    return result.description;
  } catch (error) {
    console.log("request proxy failed ", error);

    return "request proxy failed";
  }
}

export async function assemble(
  prompt: string,
  params?: {
    ratio?: string;
    version?: string;
    quality?: string;
    chaos?: number;
    stylize?: number;
    seed?: string;
  }
) {
  let target = prompt;

  if (params?.ratio) {
    target += ` --ar ` + params?.ratio.trim();
  }
  if (params?.version) {
    target += ` --` + params?.version.trim();
  }
  if (params?.quality) {
    target += ` --q ` + params?.quality.trim();
  }
  if (params?.chaos) {
    target += ` --c ` + params?.chaos;
  }
  if (params?.stylize) {
    target += ` --s ` + params?.stylize;
  }
  return target;
}
