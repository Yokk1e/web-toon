import Vue from "vue";

export interface PaginationRequestParams {
  search?: string;
  page: number | undefined;
  limit: number | undefined;
}

export interface PaginationForm {
  search?: string;
  page: number;
  perPage: number;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Pagination<T> {
  items: T[];
  meta: PaginationMeta;
}

export default Vue.extend({
  data() {
    return {
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      search: ""
    };
  },
  watch: {
    currentPage() {
      this.$router
        .replace({
          query: {
            ...this.$route.query,
            page: this.currentPage.toString()
          }
        })
        .catch(e => {
          e;
        });
    },
    perPage() {
      this.$router
        .replace({
          query: {
            ...this.$route.query,
            perPage: this.perPage.toString()
          }
        })
        .catch(e => {
          e;
        });
    },
    search() {
      this.$router
        .replace({
          query: {
            ...this.$route.query,
            search: this.search
          }
        })
        .catch(e => {
          e;
        });
    }
  },
  methods: {
    getPaginationRouteQuery() {
      const { page, perPage, search } = this.$route.query;

      this.currentPage = +page || 1;
      this.perPage = +perPage || 10;
      this.search = search ? search.toString() : "";
    },
    setPaginationMeta(meta: PaginationMeta) {
      this.currentPage = meta.currentPage;
      this.totalRows = meta.totalItems;
      this.perPage = meta.itemsPerPage;
    },
    setSearchQuery(search: string) {
      this.search = search;
    }
  }
});
