import { Episode } from "./Episode";
export interface Content {
  id: number;
  name: string;
  description: string;
  episodes: Episode[];
}
