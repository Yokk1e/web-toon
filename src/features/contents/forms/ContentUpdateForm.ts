export interface ContentUpdateForm {
  id: number;
  name: string;
  description: string;
  episodes: EpisodeUpdateForm[];
}

export interface EpisodeUpdateForm {
  id?: number;
  title: string;
  name: string;
  description: string;
  link: string;
}
