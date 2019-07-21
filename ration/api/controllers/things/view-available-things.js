module.exports = {


  friendlyName: 'View available things',


  description: 'Display "Available things" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/things/available-things'
    }

  },


  fn: async function () {
    const me = await User.findOne({
        id: this.req.me.id
    }).populate('friends');

    const friendIds = _.map(me.friends, 'id');

    const things = await Thing.find({
        or: [
          { owner: this.req.me.id },
          { owner: { in: friendIds } }
        ]
    });

    return {
      things,
    };

  }


};
