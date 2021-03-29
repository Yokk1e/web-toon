import Vue from "vue";
export default Vue.extend({
  data() {
    const isDialogClose = true;
    return { isDialogClose };
  },
  methods: {
    async alertSuccess(title: string, text: string) {
      this.isDialogClose = false;
      return this.$swal({
        title,
        text,
        timer: 1000,
        showConfirmButton: false,
        icon: "success"
      }).then(() => {
        return (this.isDialogClose = true);
      });
    },

    async alertError(title: string, text: string) {
      this.isDialogClose = false;
      return this.$swal({
        title,
        text,
        icon: "error"
      }).then(() => {
        return (this.isDialogClose = true);
      });
    },
    async alertConfirm(title: string, text: string) {
      this.isDialogClose = false;
      return this.$swal({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        reverseButtons: true
      }).then(result => {
        this.isDialogClose = true;
        return result.isConfirmed;
      });
    }
  }
});
