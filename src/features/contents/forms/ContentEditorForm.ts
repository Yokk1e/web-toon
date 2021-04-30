export interface ContentEditorForm {
  id?: number;
  name: string;
  description: string;
  epsiodes: EpisodeEditorForm[];
}

export interface EpisodeEditorForm {
  id?: number;
  title: string;
  name: string;
  description: string;
  link: string;
}
