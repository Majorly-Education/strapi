// module.exports = () => ({});


export default ({ env }) => ({
  upload: {
    provider: '@ntegral/strapi-provider-upload-azure-storage-blob',
    providerOptions: {
      account:        env('AZURE_STORAGE_ACCOUNT'),
      accountKey:     env('AZURE_STORAGE_KEY'),
      serviceBaseURL: env('AZURE_STORAGE_URL'),       
      containerName:  env('AZURE_STORAGE_CONTAINER'),
      defaultPath:    'assets',                        
    },
    actionOptions: {
      upload:   {},
      uploadStream: {},
      delete:   {},
    },
  },
});