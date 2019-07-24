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
        cloudError: '',

        // uload modal
        uploadModalOpen: false,
        uploadFromData: {
            label: ''
        },
        formErrors: {}
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
        clickDeleteButton: function(thingId) {
            this.selectedThing = _.find(this.things, { id: thingId });
            this.confirmDeleteModalOpen = true;
        },

        closeDeleteModal: function() {
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
        },

        clickAddThingButton: function() {
            this.uploadModalOpen = true;
        },

        handleParsingUploadForm: function() {
            this.formErrors = {};

            const argins = this.uploadFromData;

            // Todo validation goes here

            if (Object.keys(this.formErrors).length > 0) {
                return;
            }

            return argins;
        },

        submittedUploadThingForm: function(result) {
            // TODO

            this._clearUploadThingModal();
        },

        _clearUploadThingModal: function() {
          this.uploadModalOpen = false;

          this.uploadFromData = {
            label: ""
          };

          this.formErrors = {};
          this.cloudError = "";

        }
    }
});
