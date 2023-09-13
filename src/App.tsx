import {
  UheOsaline,
  KaheOsaline,
  KolmeOsaline,
  AknadMolemalPool,
  RoduPoolKlaas,
  Rodu,
  UksPlussKaks,
  ParemalAknaga,
  NeljaOsaline,
  RoduPoolKlaasAknadMolemalPool,
  RoduPoolKlaasAknaga,
} from "./versions";
import { HEIGHT, Variant } from "./store";
const ShowVariant = ({ variant }: { variant: Variant }): JSX.Element => {
  switch (variant) {
    case "uhe_osaline":
      return <UheOsaline />;
    case "kahe_osaline":
      return <KaheOsaline />;
    case "kolme_osaline":
      return <KolmeOsaline />;
    case "aknad_molemal_pool":
      return <AknadMolemalPool />;
    case "rodu_pool_klaas":
      return <RoduPoolKlaas />;
    case "rodu":
      return <Rodu />;
    case "uks_pluss_kaks":
      return <UksPlussKaks />;
    case "nelja_osaline":
      return <NeljaOsaline />;
    case "roduuks_poolklaas_aknad_molemal_pool":
      return <RoduPoolKlaasAknadMolemalPool />;
    case "roduuks_poolklaas_aknaga":
      return <RoduPoolKlaasAknaga />;
    case "roduuks_taisklaas_aknad_molemal_pool":
      return <AknadMolemalPool />;
    case "roduuks_taisklaas_aknaga":
      return <ParemalAknaga />;
    case "terassiuks_valisuks_poolklaas":
      return <RoduPoolKlaas />;
    case "terassiuks_valisuks_taisklaas":
      return <Rodu />;
  }
};
export default function App({ variant }: { variant: Variant }) {
  return (
    <div
      style={{
        height: HEIGHT + 120,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <ShowVariant variant={variant} />
    </div>
  );
}
