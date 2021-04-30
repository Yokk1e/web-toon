export interface ContentCreateForm {
  name: string;
  description: string;
  epsiodes: EpisodeCreateForm[];
}

export interface EpisodeCreateForm {
  title: string;
  name: string;
  description: string;
  link: string;
}
