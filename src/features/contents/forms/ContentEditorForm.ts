export interface ContentEditorForm {
  id?: number;
  file: any;
  name: string;
  description: string;
  episodes: EpisodeEditorForm[];
}

export interface EpisodeEditorForm {
  id?: number;
  title: string;
  name?: string;
  description?: string;
  link?: string;
}
