module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        baseUrl: env("CDN_URL"),
        rootPath: env("CDN_ROOT_PATH"),
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_ACCESS_SECRET"),
          },
          region: env("AWS_S3_REGION"),
          params: {
            ACL: env("AWS_ACL", "public-read"),
            signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
            Bucket: env("AWS_BUCKET"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  // upload: {
  //   provider: "@ntegral/strapi-provider-upload-azure-storage-blob",
  //   providerOptions: {
  //     account: env("AZURE_STORAGE_ACCOUNT"),
  //     accountKey: env("AZURE_STORAGE_KEY"),
  //     serviceBaseURL: env("AZURE_STORAGE_URL"),
  //     containerName: env("AZURE_STORAGE_CONTAINER"),
  //     defaultPath: "assets",
  //   },
  //   actionOptions: {
  //     upload: {},
  //     uploadStream: {},
  //     delete: {},
  //   },
  // },
});
