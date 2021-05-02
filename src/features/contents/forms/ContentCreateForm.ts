export interface ContentCreateForm {
  name: string;
  description: string;
  file : any;
  episodes?: EpisodeCreateForm[];
}

export interface EpisodeCreateForm {
  title: string;
  name?: string;
  description?: string;
  link?: string;
}
