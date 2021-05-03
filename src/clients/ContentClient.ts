import { HTTPClient } from "../commons/HTTPClient";

import { PaginationRequestParams } from "@/commons/mixins/pagination";

export class ContentClient {
  constructor(private httpClient: HTTPClient) {}

  public async postContent(params: FormData): Promise<any> {
    const { data } = await this.httpClient.request({
      url: "/contents",
      method: "POST",
      data: params,
      headers: { "Content-Type": "multipart/form-data" },
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

  public async patchContent(id: number, form: FormData): Promise<any> {
    const { data } = await this.httpClient.request({
      url: `/contents/${id}`,
      method: "PATCH",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
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

  public async getImageByFileName(fileName: string) {
    return this.httpClient.getAssetUploadUrl(fileName);
  }
}
