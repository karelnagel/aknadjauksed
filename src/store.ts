import { useEffect, useState } from "react";

export const HEIGHT = 350;
export type Language = "et" | "ru";
export type Variant =
  | "uhe_osaline"
  | "kahe_osaline"
  | "kolme_osaline"
  | "nelja_osaline"
  // | "aknad_molemal_pool"
  | "rodu_pool_klaas"
  // | "roduuks_poolklaas_aknad_molemal_pool"
  // | "roduuks_taisklaas_aknad_molemal_pool"
  | "roduuks_poolklaas_aknaga"
  | "roduuks_taisklaas_aknaga"
  | "terassiuks_valisuks_poolklaas"
  | "terassiuks_valisuks_taisklaas"
  | "rodu"
  | "uks_pluss_kaks";

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
