import { PaginationForm, Pagination } from "@/commons/mixins/pagination";
import { Client } from "../../clients/client";
import { Content } from "./models/Content";
export class ContentUseCase {
  constructor(private readonly client: Client) {}

  public async getContents(
    form: PaginationForm
  ): Promise<Pagination<Content[]>> {
    return this.client.contents.getContents({
      page: form && form.page,
      limit: form && form.perPage,
    });
  }

  public async deleteContent(id: number) {
    return this.client.contents.deleteContent(id);
  }

  public async createContent(form : FormData){
      return this.client.contents.postContent(form)
  }
}
