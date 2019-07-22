parasails.registerPage('available-things', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
        things: [],
        confirmDeleteModalOpen: false,
        selectedThing: null,
        // syncing / loading state
        syncing: false,
        // server Error state
        cloudError: ''
    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
        // Attach any initial data from the server.
        _.extend(this, SAILS_LOCALS);
    },
    mounted: async function() {
        //…
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
        // clickThing: async function(thingId) {
        //     const thingToModify = this.things.find(item => item.id === thingId);
        //     Object.assign(thingToModify, { label: 'Removing' });
        //     this.$forceUpdate();
        //     await Cloud.destroyOneThing.with({ id: thingId });
        //     _.remove(this.things, { id: thingId });
        //     this.$forceUpdate();
        // },
        clickDeleteButton: function(thingId) {
            this.selectedThing = _.find(this.things, { id: thingId });
            this.confirmDeleteModalOpen = true;
        },

        closeDeleteModal: function(thingId) {
            this.selectedThing = null;
            this.confirmDeleteModalOpen = false;
        },

        handleParsingDeleteThingForm: function() {
            return {
                id: this.selectedThing.id
            };
        },

        submittedDeleteThingForm: function() {
            _.remove(this.things, { id: this.selectedThing.id });
            this.$forceUpdate();

            this.confirmDeleteModalOpen = false;
            this.selectedThing = null;
        }
    }
});
