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

  try {
    const resp = await axios.post<ImagineRes>(
      `${baseUrl}/mj/submit/imagine`,
      {
        prompt: targetPrompt,
        base64Array: base64Array,
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
  } catch (error) {
    return "请求错误"
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
