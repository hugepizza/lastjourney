import { create } from "zustand";
import { persist } from "zustand/middleware";

const key = "Setting";

export interface SettingStore {
  mjProxyBaseUrl: string;
  mjProxySecret?: string;
  updatemjProxyBaseUrl: (_: string) => void;
  updatemjProxySecret: (_: string) => void;
}

export const useSettingStore = create<SettingStore>()(
  persist(
    (set, get) => ({
      mjProxyBaseUrl: "https://test",
      mjProxySecret: undefined,
      updatemjProxyBaseUrl(input: string) {
        set(() => ({ mjProxyBaseUrl: input?.trim() }));
      },
      updatemjProxySecret(input: string) {
        set(() => ({ mjProxySecret: input?.trim() }));
      },
    }),
    {
      name: key,
      version: 1,
    },
  ),
);
