export const Config = {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  tokenURL: "/auths/login",
  assetUploadURL: `${process.env.VUE_APP_API_BASE_URL}/${process.env.VUE_APP_ASSET_UPLOAD_PATH}`,
};
