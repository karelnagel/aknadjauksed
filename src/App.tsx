import { UheOsaline, KaheOsaline, KolmeOsaline, AknadMolemalPool, RoduPoolKlaas, Rodu, UksPlussKaks, VasakulAknaga, ParemalAknaga } from "./versions";
import { HEIGHT, Variant } from "./store";

export default function App({ variant }: { variant: Variant }) {
  return (
    <div
      style={{
        height: HEIGHT,
        width: "100%",
        background: "gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 0",
        overflow: "hidden",
      }}
    >
      {variant === "uhe_osaline" && <UheOsaline />}
      {variant === "kahe_osaline" && <KaheOsaline />}
      {variant === "kolme_osaline" && <KolmeOsaline />}
      {variant === "aknad_molemal_pool" && <AknadMolemalPool />}
      {variant === "rodu_pool_klaas" && <RoduPoolKlaas />}
      {variant === "rodu" && <Rodu />}
      {variant === "uks_pluss_kaks" && <UksPlussKaks />}
      {variant === "vasakul_aknaga" && <VasakulAknaga />}
      {variant === "paremal_aknaga" && <ParemalAknaga />}
    </div>
  );
}
