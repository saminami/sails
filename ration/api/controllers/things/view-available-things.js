module.exports = {


  friendlyName: 'View available things',


  description: 'Display "Available things" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/things/available-things'
    }

  },


  fn: async function () {

    // Respond with view.
    // const things = [
    //     { id: 1, label: 'Sweet Red Drill' },
    //     { id: 1, label: 'Red Mountain Bike' }
    // ];

    // Todo only fetch thing that the current user is allowed to see
    const things = await Thing.find({
       owner: this.req.me.id 
    });

    return {
      things,
    };

  }


};
