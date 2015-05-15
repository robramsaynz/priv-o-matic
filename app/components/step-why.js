import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addReason: function () {
      var reasons = this.get('model.statement.extraReasons');
      reasons.pushObject('');
    },
    showHelp: function () {
      console.log("showing help")
      this.toggleProperty('showHelp');
    }
  },
});
