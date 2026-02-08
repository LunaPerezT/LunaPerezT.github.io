import brainTumor1 from "@/assets/projects/brain-tumor1.jpeg";
import brainTumor2 from "@/assets/projects/brain-tumor2.jpeg";
import catbox1 from "@/assets/projects/catbox1.jpeg";
import catbox2 from "@/assets/projects/catbox2.jpeg";
import eda1 from "@/assets/projects/eda1.jpeg";
import eda2 from "@/assets/projects/eda2.jpeg";
import ml1 from "@/assets/projects/ml1.jpeg";
import ml2 from "@/assets/projects/ml2.jpeg";
import sql1 from "@/assets/projects/sql1.jpeg";
import sql2 from "@/assets/projects/sql2.jpeg";

export const projectImages: Record<string, string[]> = {
  "brain-tumor-detection": [brainTumor1, brainTumor2],
  "text-to-sql-agent": [catbox1, catbox2],
  "mental-health-eda": [eda1, eda2],
  "parkinsons-prediction": [ml1, ml2],
  "educational-data-architecture": [sql1, sql2],
};
