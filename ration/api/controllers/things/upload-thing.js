module.exports = {
    friendlyName: 'Upload thing',

    description: '',

    files: ['photo'],

    inputs: {
        photo: {
            type: 'ref',
            description: 'Upload file stream',
            required: true,
        },
        label: {
          type: "string",
        },
    },

    exits: {
      success: {
        outputDescription: "newly created recrod",
        outputType: {
          id: 'number',
          imageSrc: 'string',
        },
      },
      badRequest: {
        description: "No image upload was provided",
        responseType: 'badRequest',
      }
    },

    fn: async function(inputs) {

        const url = require('url');

        const info = await sails.uploadOne(inputs.photo);

        if (!info) {
            throw 'badRequest';
        }

        const createdThing = await Thing.create({
            imageUploadFd: info.fd,
            imageUploadMime: info.type,
            owner: this.req.me.id,
            label: inputs.label
        }).fetch();


        return {
          id: createdThing.id,
          imageSrc: url.resolve(
            sails.config.custom.baseUrl,
            '/api/v1/things/' + createdThing.id)
        };
    }
};
