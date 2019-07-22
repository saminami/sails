module.exports = {
    friendlyName: 'Destroy one thing',

    description: 'Delete the "thing" with the spesified id from the database.',

    inputs: {
        id: {
            type: 'number',
            required: true
        }
    },

    exits: {
        notFound: {
            description:
                'The thing the users is trying to delete does not exist',
            responseType: 'notFound'
        },
        forbidden: {
            description:
                'The users making this request does not have the permissions to delete this thing',
            responseType: 'forbidden'
        }
    },

    fn: async function(inputs) {
        const thing = await Thing.findOne({ id: inputs.id });

        // if the thing trying to delete does not exists
        if (!thing) {
            throw 'notFound';
        }

        if (thing.owner !== this.req.me.id) {
            throw 'forbidden';
        }

        await Thing.destroy({ id: inputs.id });

        return
    }
};
