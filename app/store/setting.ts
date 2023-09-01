import { create } from "zustand";
import { persist } from "zustand/middleware";

const key = "Setting";

export interface SettingStore {
  mjProxyEndpoint: string;
  mjProxySecret?: string;
  updatemjProxyEndpoint: (_: string) => void;
  updatemjProxySecret: (_: string) => void;
}

export const useSettingStore = create<SettingStore>()(
  persist(
    (set, get) => ({
      mjProxyEndpoint: "https://test",
      mjProxySecret: undefined,
      updatemjProxyEndpoint(input: string) {
        set(() => ({ mjProxyEndpoint: input?.trim() }));
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
