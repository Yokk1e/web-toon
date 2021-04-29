import { HTTPClient } from "../commons/HTTPClient";

import { PaginationRequestParams } from "@/commons/mixins/pagination";

type EpisodeCreateRequestParams = {
  title: string;
  name: string;
  description: string;
  link: string;
};
export interface ContentCreateRequestParams {
  name: string;
  description: string;
  episodes: EpisodeCreateRequestParams[];
}

export interface ContentUpdateRequestParams {
  id: number;
  name: string;
  description: string;
  episodes: EpisodeCreateRequestParams[];
}

export class ContentClient {
  constructor(private httpClient: HTTPClient) {}

  public async postContent(params: ContentCreateRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: "/contents",
      method: "POST",
      data: params,
    });

    return data;
  }

  public async getContents(params: PaginationRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: "/contents",
      method: "GET",
      params,
    });

    return data;
  }

  public async getContent(id: number): Promise<any> {
    const { data } = await this.httpClient.request({
      url: `/contents/${id}`,
      method: "GET",
    });

    return data;
  }

  public async patchContent(params: ContentUpdateRequestParams): Promise<any> {
    const { id, ...body } = params;
    const { data } = await this.httpClient.request({
      url: `/contents/${id}`,
      method: "PATCH",
      data: body,
    });

    return data;
  }

  public async deleteContent(id: number): Promise<any> {
    const { data } = await this.httpClient.request({
      url: `/contents/${id}`,
      method: "DELETE",
    });

    return data;
  }
}
