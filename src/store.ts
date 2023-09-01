import { useEffect, useState } from "react";
import { create } from "zustand";
export const HEIGHT = 300;
export type Language = "et" | "ru";
export type Variant =
  | "uhe_osaline"
  | "kahe_osaline"
  | "kolme_osaline"
  | "aknad_molemal_pool"
  | "rodu_pool_klaas"
  | "rodu"
  | "uks_pluss_kaks"
  | "vasakul_aknaga"
  | "paremal_aknaga";

type Store = {
  language: Language;
  variant: Variant;
  color: string;
  set: (partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>), replace?: boolean | undefined) => void;
};

export const useStore = create<Store>((set) => ({
  set,
  language: "et",
  variant: "uhe_osaline",
  color: "#FFFFFF",
}));

export const useInputValue = (name: string, onChange?: (v: string) => void) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    const input = document.getElementsByName(name)[0] as HTMLInputElement;
    input?.addEventListener("change", (e) => {
      onChange?.(input.value);
      setValue(input.value);
    });
  }, [name, onChange]);
  return value;
};
