import Vue from "vue";

export enum PermissionName {
  PERMISSION_VIEW = "Permission_View",
  ROLE_VIEW = "Role_View",
  ROLE_CREATE = "Role_Create",
  ROLE_EDIT = "Role_Edit",
  ROLE_DELETE = "Role_Delete",
  USER_VIEW = "User_View",
  USER_CREATE = "User_Create",
  USER_EDIT = "User_Edit",
  USER_DELETE = "User_Delete",
  CONTENT_VIEW = "Content_View",
  CONTENT_DELETE = "Content_Delete",
  CONTENT_CREATE = "Content_Create",
  CONTENT_EDIT = "Content_Edit",
}

export default Vue.extend({
  methods: {
    hasPermission(permissionName: PermissionName) {
      return (this as any).$dep.authUseCase.hasPermission(permissionName);
    },
  },
});
