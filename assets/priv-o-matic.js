/* jshint ignore:start */

/* jshint ignore:end */

define('priv-o-matic/adapters/application', ['exports', 'ember-localforage-adapter/adapters/localforage'], function (exports, LFAdapter) {

  'use strict';

  exports['default'] = LFAdapter['default'].extend({
    namespace: 'privomatic'
  });

});
define('priv-o-matic/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'priv-o-matic/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('priv-o-matic/components/array-item-input', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    // attribute: array {Ember.Array} - required

    // attribute: index {Integer} - required

    // attribute: updateEvent {String} - optional
    updateEvent: 'focus-out', // dasherized because {{input}} wants that

    // attribute: placeholder {String} - optional placeholder
    placeholder: '',

    _val: null,

    setInitialValue: (function () {
      // val = array[index]
      return this.set('_val', this.get('array').objectAt(this.get('index')));
    }).on('init'),

    actions: {
      update: function update() {
        // array[index] = val
        this.get('array').replace(this.get('index'), 1, [this.get('_val')]);
      } } });

});
define('priv-o-matic/components/modal-message', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    actions: {
      closeModal: function closeModal() {
        this.set('showModal', false);
      }
    }
  });

});
define('priv-o-matic/components/radio-button', ['exports', 'ember-radio-buttons'], function (exports, EmberRadioButton) {

	'use strict';

	exports['default'] = EmberRadioButton['default'];

});
define('priv-o-matic/components/step-contact', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('priv-o-matic/components/step-data-sources', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    //These change to false after the modals have been seen once,
    //thereby not showing them again.
    showOtherDataModal: true,
    showThirdPartyDataModal: true,

    actions: {
      nextStep: function nextStep() {
        //check is we are ready to move forward
        if (this.isReady()) {
          this.sendAction();
        } else {
          //we're not ready, so show the modal-message
          this.set('showNotReadyMessage', true);
        }
      }
    },
    isReady: function isReady() {
      /**
      Check if our form is filled out
      */
      //if any of this array is true, then we're ready to move forward
      var options = ['userDataSource', 'publicDataSource', 'thirdPartyDataSource', 'otherDataSource'];
      var self = this;

      return options.any(function (option) {
        if (self.get('model.statement.' + option)) {
          return true;
        }
      });
    }
  });

});
define('priv-o-matic/components/step-data-types', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    actions: {
      nextStep: function nextStep() {
        //check is we are ready to move forward
        if (this.isReady()) {
          this.sendAction();
        } else {
          //we're not ready, so show the modal-message
          this.set('showNotReadyMessage', true);
        }
      }
    },
    isReady: function isReady() {
      /**
      Check if our form is filled out
      */
      //if any of this array is true, then we're ready to move forward
      var options = ['identityData', 'locationData', 'userBehaviourData', 'computerNetworkData', 'financialData', 'otherData'];
      var self = this;

      return options.any(function (option) {
        if (self.get('model.statement.' + option)) {
          return true;
        }
      });
    }

  });

});
define('priv-o-matic/components/step-help', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend({
        actions: {
            toggleHelp: function toggleHelp() {
                this.toggleProperty('showHelp');
            }
        },
        //default text, if none provided.
        buttonText: 'Why does this matter?'
    });

});
define('priv-o-matic/components/step-legal-requirement', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Component.extend({
        actions: {
            showModal: function showModal() {
                this.set('showModal', true);
            } }
    });

});
define('priv-o-matic/components/step-optional-info', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    actions: {
      addOptionalInfo: function addOptionalInfo() {
        var optional = this.get('model.statement.extraOptionalInfo');
        optional.pushObject(Ember['default'].A({}));
      }
    } });

});
define('priv-o-matic/components/step-retention', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('priv-o-matic/components/step-security', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('priv-o-matic/components/step-sharing', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    actions: {
      addParty: function addParty() {
        var parties = this.get('model.statement.sharingParties');
        parties.pushObject(Ember['default'].A({}));
      }
    } });

});
define('priv-o-matic/components/step-statement', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    //Do we check the Check boxes?
    keptSecurely: (function () {
      //have they filled in the secure method?
      return !!this.model.get('statement.secureMethodOne');
    }).property('model.statement.secureMethodOne'),
    dataDestruction: (function () {
      //have they filled in the secure method?
      return !!this.model.get('statement.dataRetentionTime');
    }).property('model.statement.dataRetentionTime'),

    //mark this as complete as soon as we render it
    didInsertElement: function didInsertElement() {
      this.set('model.isCompleted', true);
    }

  });

});
define('priv-o-matic/components/step-why', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    actions: {
      addReason: function addReason() {
        var reasons = this.get('model.statement.extraReasons');
        reasons.pushObject('');
      },
      notReady: function notReady() {
        /**
          We're not ready to "move along" so pop up the modal instead
        */

        //they haven't picked yes or no on the radio buttons yet
        if (this.get('model.statement.onlyTheseReasons') === undefined) {
          this.set('showNotReadyModal', true);
        }
        //they picked No on the radio buttons, show the special message
        else if (!this.get('model.statement.onlyTheseReasons')) {
          this.set('showUnstatedPurposeModal', true);
        }
        //other reason for not being ready, use the default error message
        else {
          this.set('showNotReadyModal', true);
        }
      }
    },
    readyToMoveOn: (function () {

      //only these reasons
      // &&
      // //entered at least one reason
      return !!this.get('model.statement.onlyTheseReasons') && !!this.get('model.statement.collectionReason');
    }).property('model.statement.onlyTheseReasons', 'model.statement.collectionReason') });

});
define('priv-o-matic/controllers/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
define('priv-o-matic/controllers/statement', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
define('priv-o-matic/controllers/steps', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    sortProperties: ['id'],
    sortAscending: true
  });

});
define('priv-o-matic/controllers/steps/step', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Controller.extend({
        actions: {
            nextStep: function nextStep() {
                this.model.set('isCompleted', true);
                this.model.save();

                //try to read next step from the model.
                var nextStep = this.model.get('nextStep');

                //nothing on the model, so increment to find the next step
                if (!nextStep) {
                    nextStep = parseInt(this.model.id, 10) + 1;
                }

                if (nextStep < 9) {
                    //TODO work out how many steps there are
                    this.transitionToRoute('steps.step', nextStep);
                } else {
                    this.transitionToRoute('steps.finish');
                }
            }
        }
    });

});
define('priv-o-matic/initializers/app-version', ['exports', 'priv-o-matic/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('priv-o-matic/initializers/export-application-global', ['exports', 'ember', 'priv-o-matic/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('priv-o-matic/initializers/load-fixtures', ['exports'], function (exports) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container /*, application*/) {
    // application.inject('route', 'foo', 'service:foo');
    var store = container.lookup('store:main');
    store.pushMany('statement', statementData);
    store.pushMany('step', stepData);
  }

  exports['default'] = {
    name: 'load-fixtures',
    initialize: initialize,
    after: ['store'] };

  var statementData = [{ id: 1 }];

  var stepData = [{
    id: 1,
    statement: 1,
    title: 'Information',
    name: 'step-data-types'
  }, { id: 2,
    statement: 1,
    title: 'Collection',
    name: 'step-data-sources'
  }, {
    id: 3,
    statement: 1,
    title: 'Applicable Laws',
    name: 'step-legal-requirement'
  }, {
    id: 4,
    statement: 1,
    title: 'Purpose',
    name: 'step-why'
  }, {
    id: 5,
    statement: 1,
    title: 'Sharing',
    name: 'step-sharing'
  }, {
    id: 6,
    statement: 1,
    title: 'Contact',
    name: 'step-contact'
  }, {
    id: 7,
    statement: 1,
    title: 'Optional Info',
    name: 'step-optional-info'
  }, {
    id: 8,
    statement: 1,
    title: 'All Done',
    name: 'step-statement' }, {
    id: 9,
    statement: 1,
    title: 'Security',
    name: 'step-security',
    nextStep: 8,
    showInNav: false }, {
    id: 10,
    statement: 1,
    title: 'Retention',
    name: 'step-retention',
    nextStep: 8,
    showInNav: false }];

});
define('priv-o-matic/models/statement', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

    'use strict';

    exports['default'] = DS['default'].Model.extend({
        steps: DS['default'].hasMany('step', { async: true }),

        //Data types
        identityData: DS['default'].attr('boolean', { 'default': false }),
        locationData: DS['default'].attr('boolean', { 'default': false }),
        userBehaviourData: DS['default'].attr('boolean', { 'default': false }),
        computerNetworkData: DS['default'].attr('boolean', { 'default': false }),
        financialData: DS['default'].attr('boolean', { 'default': false }),
        otherData: DS['default'].attr('boolean', { 'default': false }),
        otherDataInfo: DS['default'].attr('string'),
        noData: DS['default'].attr('boolean', { 'default': false }),

        //Data Sources
        userDataSource: DS['default'].attr('boolean', { 'default': false }),
        publicDataSource: DS['default'].attr('boolean', { 'default': false }),
        thirdPartyDataSource: DS['default'].attr('boolean', { 'default': false }),
        otherDataSource: DS['default'].attr('boolean'),
        otherDataSourceInfo: DS['default'].attr('string'),

        //why
        extraReasons: Ember['default'].A(),
        onlyTheseReasons: DS['default'].attr('boolean', { 'default': false }),

        //Sharing
        sharingParties: Ember['default'].A(),

        //Optional Info
        extraOptionalInfo: Ember['default'].A(),

        //Retention
        dataRetentionTime: DS['default'].attr('string'),
        dataDestructionMethod: DS['default'].attr('string') });

});
define('priv-o-matic/models/step', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    statement: DS['default'].belongsTo('statement', { async: true }),
    title: DS['default'].attr('string'),
    name: DS['default'].attr('string'), //how we find our component
    isCompleted: DS['default'].attr('boolean', { defaultValue: false }),
    nextStep: DS['default'].attr(),
    showInNav: DS['default'].attr('boolean', { defaultValue: true })
  });

});
define('priv-o-matic/router', ['exports', 'ember', 'priv-o-matic/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  exports['default'] = Router.map(function () {
    this.resource('steps', function () {
      this.route('step', { path: 'step/:step_id' });

      this.route('finish');
    });
    this.route('whats-this', { path: 'whats-this' });
  });

});
define('priv-o-matic/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('priv-o-matic/routes/steps', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.find('step');
    }
  });

});
define('priv-o-matic/routes/steps/step', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find('step', params.step_id);
    }
  });

});
define('priv-o-matic/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/array-item-input', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        inline(env, morph0, context, "input", [], {"value": get(env, context, "_val"), "action": "update", "on": get(env, context, "updateEvent"), "placeholder": get(env, context, "placeholder"), "size": get(env, context, "size")});
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/modal-message', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","modal");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","modal-close-button");
          var el2 = dom.createTextNode("✕");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [3]);
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          content(env, morph0, context, "yield");
          element(env, element0, context, "action", ["closeModal"], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
        dom.insertBoundary(fragment, null);
        block(env, morph0, context, "if", [get(env, context, "showModal")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-contact', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        It’s a requirement that people can ask to view or correct any information you hold about them. This includes querying whether you hold information about them at all.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        There is also a requirement to take reasonable steps to ensure your information is accurate before you use it.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        See\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/accuracy-etc-of-personal-information-to-be-checked-before-use-principle-eight/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 8");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(",\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/access-to-personal-information-principle-six/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 6");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(",\n        and\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/correction-of-personal-information-principle-seven/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 7");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        for more.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      People can contact us to view or correct information we hold about them at\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      (or ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      or ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(").\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, content = hooks.content, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element2, [3]),0,0);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [5]),0,0);
        var morph3 = dom.createMorphAt(element1,3,3);
        var morph4 = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        inline(env, morph0, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.emailAddress"), "placeholder": "this email address", "size": "20"});
        inline(env, morph1, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.phoneNumber"), "placeholder": "this phone number", "size": "17"});
        inline(env, morph2, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.postalAddress"), "placeholder": "this postal address", "size": "30"});
        content(env, morph3, context, "yield");
        block(env, morph4, context, "step-help", [], {"buttonText": "Why do they need to contact me?"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-data-sources', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("              ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          inline(env, morph0, context, "textarea", [], {"value": get(env, context, "model.statement.otherDataSourceInfo"), "cols": "40", "rows": "2"});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("\n          In most cases you’ll need to get information directly from the person. Unfotunately situations where information's collected from sources not listed here are too complex for this tool. If this is the case feel free to ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            dom.setAttribute(el2,"href","https://privacy.org.nz/contact-us/");
            dom.setAttribute(el2,"target","_blank");
            var el3 = dom.createTextNode("contact us");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(" for help.\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("\n          See\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            dom.setAttribute(el2,"href","https://privacy.org.nz/how-to-comply/getting-started/purpose/#collection");
            dom.setAttribute(el2,"target","_blank");
            var el3 = dom.createTextNode("Fair Collection");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          or\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            dom.setAttribute(el2,"href","https://privacy.org.nz/the-privacy-act-and-codes/privacy-principles/source-of-personal-information-principle-two/");
            dom.setAttribute(el2,"target","_blank");
            var el3 = dom.createTextNode("Privacy Principle 2");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          for more information.\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "modal-message", [], {"showModal": get(env, context, "showOtherDataModal")}, child0, null);
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("\n          In most cases you’ll need to ask permission to do this. You’ll usually need to ask permission to get information from a third party. This generator doesn’t cover third parties, but you can\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            dom.setAttribute(el2,"href","https://privacy.org.nz/contact-us/");
            dom.setAttribute(el2,"target","_blank");
            var el3 = dom.createTextNode("contact us");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          for help with creating a statement if this is the case.\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createTextNode("\n          See\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            dom.setAttribute(el2,"href","https://privacy.org.nz/how-to-comply/getting-started/purpose/#collection");
            dom.setAttribute(el2,"target","_blank");
            var el3 = dom.createTextNode("Fair Collection");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          or\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("a");
            dom.setAttribute(el2,"href","https://privacy.org.nz/the-privacy-act-and-codes/privacy-principles/source-of-personal-information-principle-two/");
            dom.setAttribute(el2,"target","_blank");
            var el3 = dom.createTextNode("Privacy Principle 2");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          for more information.\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, null);
          dom.insertBoundary(fragment, 0);
          block(env, morph0, context, "modal-message", [], {"showModal": get(env, context, "showThirdPartyDataModal")}, child0, null);
          return fragment;
        }
      };
    }());
    var child3 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("li");
            var el2 = dom.createTextNode("name");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      var child1 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("li");
            var el2 = dom.createTextNode("location");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      var child2 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("li");
            var el2 = dom.createTextNode("contact information");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      var child3 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("li");
            var el2 = dom.createTextNode("computer/network information");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      var child4 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("li");
            var el2 = dom.createTextNode("how people interact with you");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      var child5 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("li");
            var el2 = dom.createTextNode("billing information");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      var child6 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createElement("li");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
            content(env, morph0, context, "model.otherDataInfo");
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("You'll need to explain where you get people's personal information from.\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("ul");
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n            ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1, 1]);
          var morph0 = dom.createMorphAt(element0,1,1);
          var morph1 = dom.createMorphAt(element0,3,3);
          var morph2 = dom.createMorphAt(element0,5,5);
          var morph3 = dom.createMorphAt(element0,7,7);
          var morph4 = dom.createMorphAt(element0,9,9);
          var morph5 = dom.createMorphAt(element0,11,11);
          var morph6 = dom.createMorphAt(element0,13,13);
          block(env, morph0, context, "if", [get(env, context, "model.statement.identityData")], {}, child0, null);
          block(env, morph1, context, "if", [get(env, context, "model.statement.locationData")], {}, child1, null);
          block(env, morph2, context, "if", [get(env, context, "model.statement.addressData")], {}, child2, null);
          block(env, morph3, context, "if", [get(env, context, "model.statement.computerNetworkData")], {}, child3, null);
          block(env, morph4, context, "if", [get(env, context, "model.statement.userBehaviourData")], {}, child4, null);
          block(env, morph5, context, "if", [get(env, context, "model.statement.financialData")], {}, child5, null);
          block(env, morph6, context, "if", [get(env, context, "model.statement.otherDataInfo")], {}, child6, null);
          return fragment;
        }
      };
    }());
    var child4 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        When collecting information it's almost always best to get it directly from people themselves rather than third party sources, if you can. By knowing what information you have and what you're doing with it, people are far less likely to be surprised or upset.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        See\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/how-to-comply/getting-started/purpose/#collection");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Fair Collection");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        or\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/the-privacy-act-and-codes/privacy-principles/source-of-personal-information-principle-two/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 2");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        for more.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4 modal-anchor");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("We get this personal information by:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","non-bullet-list");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","userDataSource");
        var el6 = dom.createTextNode("Asking people directly");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","publicDataSource");
        var el6 = dom.createTextNode("Using public sources of information");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","thirdPartyDataSource");
        var el6 = dom.createTextNode("Asking third parties (a credit agency for instance)");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","otherDataSource");
        var el6 = dom.createTextNode("Other");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"class","pure-button button-blue next-step-button");
        var el4 = dom.createTextNode("move along");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [3]);
        var element4 = dom.childAt(element3, [7]);
        var element5 = dom.childAt(element2, [11]);
        var morph0 = dom.createMorphAt(dom.childAt(element3, [1]),1,1);
        var morph1 = dom.createMorphAt(dom.childAt(element3, [3]),1,1);
        var morph2 = dom.createMorphAt(dom.childAt(element3, [5]),1,1);
        var morph3 = dom.createMorphAt(element4,1,1);
        var morph4 = dom.createMorphAt(element4,5,5);
        var morph5 = dom.createMorphAt(element2,5,5);
        var morph6 = dom.createMorphAt(element2,7,7);
        var morph7 = dom.createMorphAt(element2,9,9);
        var morph8 = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
        inline(env, morph0, context, "input", [], {"type": "checkbox", "id": "userDataSource", "checked": get(env, context, "model.statement.userDataSource")});
        inline(env, morph1, context, "input", [], {"type": "checkbox", "id": "publicDataSource", "checked": get(env, context, "model.statement.publicDataSource")});
        inline(env, morph2, context, "input", [], {"type": "checkbox", "id": "thirdPartyDataSource", "checked": get(env, context, "model.statement.thirdPartyDataSource")});
        inline(env, morph3, context, "input", [], {"type": "checkbox", "id": "otherDataSource", "checked": get(env, context, "model.statement.otherDataSource")});
        block(env, morph4, context, "if", [get(env, context, "model.statement.otherDataSource")], {}, child0, null);
        block(env, morph5, context, "if", [get(env, context, "model.statement.otherDataSource")], {}, child1, null);
        block(env, morph6, context, "if", [get(env, context, "model.statement.thirdPartyDataSource")], {}, child2, null);
        block(env, morph7, context, "modal-message", [], {"showModal": get(env, context, "showNotReadyMessage")}, child3, null);
        element(env, element5, context, "action", ["nextStep"], {});
        block(env, morph8, context, "step-help", [], {"buttonText": "Why does this matter?"}, child4, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-data-types', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1,"for","otherData");
          var el2 = dom.createTextNode("Other");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1,"for","otherData");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1,"class","text-input");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [3]),1,1);
          inline(env, morph0, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.otherDataInfo")});
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("If you don't collect personal information, you don’t need a privacy statement. There's no point in filling this out any further.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child3 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("If you don't collect personal information, you don’t need a privacy statement. There's no point in filling this out any further.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child4 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n          You need to be careful collecting these — you generally can't use another agency's unique identifier to identify someone. See \n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/the-privacy-act-and-codes/privacy-principles/unique-identifiers-principle-twelve/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 12");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" for more information.\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n          If you do collect a unique identifier, you're going to want to specifiy exactly which identifier in the “other” field below (the Unique Identifier box will be deselected when you close this message).\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  \n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n          Using unique identifiers can be complex — if you want to discuss how to do it legally, feel free to ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/contact-us/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("contact us");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(".\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child5 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1,"class","first-help-text-item");
          var el2 = dom.createTextNode("\n            If there's a reasonable chance information can be used to identify a living person, it's considered “personal information” by New Zealand law (even if no names appear). The information doesn't need to be “secret” or “sensitive“—it just needs to be about them.\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("Examples of personal information include,");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createTextNode("Name");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createTextNode("Location information:");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            GPS Location, Latitude/Longitude, coarse or fine etc\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createTextNode("Contact information:");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            Postal address, email address, phone number, Twitter handles etc\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createTextNode("Behavioural or interaction information:");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            Interests, browsing habits, searches, contacts or associates, etc\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createTextNode("Computer/Network information:");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            Browser identifiers/fingerprints, IP address, network information, IMEI numbers etc\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createTextNode("Unique Identifiers:");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            Officially issued numbers that tie a user to their information (for instance\n            passport and drivers license numbers).\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("strong");
          var el3 = dom.createTextNode("Billing information:");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            Credit card, purchase history, etc\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n            … and many other things. The types of information that can identify someone can be very broad - don't forget about username, password, date of birth, age, gender, etc.\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4 modal-anchor");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("We collect the following types of personal information:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","pure-g non-bullet-list");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","pure-u-1 pure-u-md-1-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","identityData");
        var el6 = dom.createTextNode("Name");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","pure-u-1 pure-u-md-1-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","locationData");
        var el6 = dom.createTextNode("Location (if mobile)");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","pure-u-1 pure-u-md-1-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","addressData");
        var el6 = dom.createTextNode("Contact information");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","pure-u-1 pure-u-md-1-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","userBehaviourData");
        var el6 = dom.createTextNode("How people interact with us");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","pure-u-1 pure-u-md-1-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","computerNetworkData");
        var el6 = dom.createTextNode("Computer or network (if online)");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","pure-u-1 pure-u-md-1-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","uniqueIdData");
        var el6 = dom.createTextNode("Unique identifiers");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","pure-u-1 pure-u-md-1-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","financialData");
        var el6 = dom.createTextNode("Billing information");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        dom.setAttribute(el4,"class","pure-u-1 pure-u-md-1-2");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","non-bullet-list");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","noData");
        var el6 = dom.createTextNode("We don’t collect personal information");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"class","pure-button button-blue next-step-button");
        var el4 = dom.createTextNode("move along");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [3]);
        var element3 = dom.childAt(element2, [15]);
        var element4 = dom.childAt(element1, [13]);
        var morph0 = dom.createMorphAt(dom.childAt(element2, [1]),1,1);
        var morph1 = dom.createMorphAt(dom.childAt(element2, [3]),1,1);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [5]),1,1);
        var morph3 = dom.createMorphAt(dom.childAt(element2, [7]),1,1);
        var morph4 = dom.createMorphAt(dom.childAt(element2, [9]),1,1);
        var morph5 = dom.createMorphAt(dom.childAt(element2, [11]),1,1);
        var morph6 = dom.createMorphAt(dom.childAt(element2, [13]),1,1);
        var morph7 = dom.createMorphAt(element3,1,1);
        var morph8 = dom.createMorphAt(element3,3,3);
        var morph9 = dom.createMorphAt(dom.childAt(element1, [5, 1]),1,1);
        var morph10 = dom.createMorphAt(element1,7,7);
        var morph11 = dom.createMorphAt(element1,9,9);
        var morph12 = dom.createMorphAt(element1,11,11);
        var morph13 = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        inline(env, morph0, context, "input", [], {"type": "checkbox", "id": "identityData", "checked": get(env, context, "model.statement.identityData")});
        inline(env, morph1, context, "input", [], {"type": "checkbox", "id": "locationData", "checked": get(env, context, "model.statement.locationData")});
        inline(env, morph2, context, "input", [], {"type": "checkbox", "id": "addressData", "checked": get(env, context, "model.statement.addressData")});
        inline(env, morph3, context, "input", [], {"type": "checkbox", "id": "userBehaviourData", "checked": get(env, context, "model.statement.userBehaviourData")});
        inline(env, morph4, context, "input", [], {"type": "checkbox", "id": "computerNetworkData", "checked": get(env, context, "model.statement.computerNetworkData")});
        inline(env, morph5, context, "input", [], {"type": "checkbox", "id": "uniqueIdData", "checked": get(env, context, "model.statement.uniqueId")});
        inline(env, morph6, context, "input", [], {"type": "checkbox", "id": "financialData", "checked": get(env, context, "model.statement.financialData")});
        inline(env, morph7, context, "input", [], {"type": "checkbox", "id": "otherData", "checked": get(env, context, "model.statement.otherData")});
        block(env, morph8, context, "unless", [get(env, context, "model.statement.otherData")], {}, child0, child1);
        inline(env, morph9, context, "input", [], {"type": "checkbox", "id": "noData", "checked": get(env, context, "model.statement.noData")});
        block(env, morph10, context, "modal-message", [], {"showModal": get(env, context, "model.statement.noData")}, child2, null);
        block(env, morph11, context, "modal-message", [], {"showModal": get(env, context, "showNotReadyMessage")}, child3, null);
        block(env, morph12, context, "modal-message", [], {"showModal": get(env, context, "model.statement.uniqueId")}, child4, null);
        element(env, element4, context, "action", ["nextStep"], {});
        block(env, morph13, context, "step-help", [], {"buttonText": "What should I list?"}, child5, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-help', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"id","help-text");
          dom.setAttribute(el1,"class","help-text");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          content(env, morph0, context, "yield");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1,"class","pure-button button-black-on-white help-text-button");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, content = hooks.content, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [1]);
        var morph0 = dom.createMorphAt(element0,0,0);
        var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
        element(env, element0, context, "action", ["toggleHelp"], {});
        content(env, morph0, context, "buttonText");
        block(env, morph1, context, "if", [get(env, context, "showHelp")], {}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-legal-requirement', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pure-button button-blue next-step-button");
          var el2 = dom.createTextNode("move along");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          element(env, element0, context, "action", ["showModal"], {});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          content(env, morph0, context, "yield");
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        You'll need to place a notice informing the user which laws this information is collected under, and whether supplying this information is voluntary or not.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        This is beyond the scope of the tool, and you'll need to create these parts of the statement yourself. You can\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/contact-us/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("contact us");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        for more advice on how to do this.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        See\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/collection-of-information-from-subject-principle-three/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 3");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        for more.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,7,7,contextualElement);
          content(env, morph0, context, "yield");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4 modal-anchor");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("We're required to collect some of this information by law:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","notRequiredByLaw");
        var el5 = dom.createTextNode("No");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","requiredByLaw");
        var el5 = dom.createTextNode("Yes");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [0, 1]);
        var element2 = dom.childAt(element1, [3]);
        var morph0 = dom.createMorphAt(element2,1,1);
        var morph1 = dom.createMorphAt(element2,7,7);
        var morph2 = dom.createMorphAt(element1,5,5);
        var morph3 = dom.createMorphAt(element1,7,7);
        inline(env, morph0, context, "radio-button", [], {"value": false, "checked": get(env, context, "model.statement.requiredByLaw"), "id": "notRequiredByLaw"});
        inline(env, morph1, context, "radio-button", [], {"value": true, "checked": get(env, context, "model.statement.requiredByLaw"), "id": "requiredByLaw"});
        block(env, morph2, context, "if", [get(env, context, "model.statement.requiredByLaw")], {}, child0, child1);
        block(env, morph3, context, "modal-message", [], {"showModal": get(env, context, "showModal")}, child2, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-optional-info', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createTextNode("\n          If they choose not to give us\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"class","text-input");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(",\n          we'll\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"class","text-input");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1, 1]);
          var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          var morph1 = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
          inline(env, morph0, context, "input", [], {"type": "text", "value": get(env, context, "option.info"), "placeholder": "a certain type of information", "size": "26"});
          inline(env, morph1, context, "input", [], {"type": "text", "value": get(env, context, "option.consequence"), "placeholder": "be unable to provide specific services", "size": "34"});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        You're required to inform people of any consequences if all or any of the requested information is not provided.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        See\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/collection-of-information-from-subject-principle-three/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 3");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        for more.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("People have a choice in whether to provide us with some types of personal information.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      If they choose not to give us\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(",\n      we'll\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","pure-button button-black-on-white button-small");
        var el5 = dom.createTextNode("we have more optional info");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block, element = hooks.element, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [3]);
        var element4 = dom.childAt(element2, [7, 1]);
        var morph0 = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element3, [3]),0,0);
        var morph2 = dom.createMorphAt(element2,5,5);
        var morph3 = dom.createMorphAt(element2,9,9);
        var morph4 = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
        inline(env, morph0, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.optionalInfo"), "placeholder": "a certain type of information", "size": "26"});
        inline(env, morph1, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.optionalConsequence"), "placeholder": "be unable to provide specific services", "size": "34"});
        block(env, morph2, context, "each", [get(env, context, "model.statement.extraOptionalInfo")], {"keyword": "option"}, child0, null);
        element(env, element4, context, "action", ["addOptionalInfo"], {});
        content(env, morph3, context, "yield");
        block(env, morph4, context, "step-help", [], {"buttonText": "That matters?"}, child1, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-retention', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("You shouldn't keep information for longer than is necessary for it's purpose.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        See\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/agency-not-to-keep-personal-information-for-longer-than-necessary-principle-nine/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 9");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        for more.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4");
        var el3 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      We keep people's personal information for\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(",\n      at which point we securely destroy it by\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(".\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, content = hooks.content, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element2, [3]),0,0);
        var morph2 = dom.createMorphAt(element1,3,3);
        var morph3 = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        inline(env, morph0, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.dataRetentionTime"), "placeholder": "two years", "size": "15"});
        inline(env, morph1, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.dataDestructionMethod"), "placeholder": "securely erasing all digital copies", "size": "20"});
        content(env, morph2, context, "yield");
        block(env, morph3, context, "step-help", [], {"buttonText": "How long can we keep info?"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-security', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("move along");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        You're required to protect information from becoming public, and to safeguard it from being lost. You're also required to prevent access without authorisation, or by staff who don't require it for their job.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        See\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/storage-and-security-of-personal-information-principle-five/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 5");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        and the\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/news-and-publications/guidance-resources/data-safety-toolkit/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("data safety toolkit");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        for more.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      We keep the personal information we hold safe by\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(",\n      and\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(".\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element2, [3]),0,0);
        var morph2 = dom.createMorphAt(element1,3,3);
        var morph3 = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        inline(env, morph0, context, "input", [], {"type": "text", "placeholder": "storing it in encrypted files", "value": get(env, context, "model.statement.secureMethodOne"), "size": "24"});
        inline(env, morph1, context, "input", [], {"type": "text", "placeholder": "only allowing certain staff to access it", "value": get(env, context, "model.statement.secureMethodTwo"), "size": "34"});
        block(env, morph2, context, "link-to", ["steps.step", 8], {"classNames": "pure-button button-blue next-step-button"}, child0, null);
        block(env, morph3, context, "step-help", [], {"buttonText": "Is this necessary?"}, child1, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-sharing', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 1,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createTextNode("\n          We also share this information with\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"class","text-input");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          in order to\n          ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"class","text-input");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(".\n        ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement, blockArguments) {
          var dom = env.dom;
          var hooks = env.hooks, set = hooks.set, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1, 1]);
          var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          var morph1 = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
          set(env, context, "party", blockArguments[0]);
          inline(env, morph0, context, "input", [], {"type": "text", "value": get(env, context, "party.nameOne"), "placeholder": "a 3rd party", "size": "13"});
          inline(env, morph1, context, "input", [], {"type": "text", "value": get(env, context, "party.purpose"), "placeholder": "take actions connected to a purpose for collection", "size": "46"});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n              You need to have a valid reason to share information with outside parties, related to your purpose for collecting it. This doesn’t apply if you gathered the information from a public source, or you have asked the user’s permission.\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n              When you’re dealing with cloud providers who are just storing or processing information on your behalf, you don’t strictly have to include them. We say err on the side of transparency and tell people, but if you’d like to talk it through,\n              ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/contact-us/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("contact us.");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n              See ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/limits-on-use-of-personal-information-principle-ten/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 10");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(",\n              and ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/limits-on-disclosure-of-personal-information-principle-eleven/#collection");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 11");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n              for more about sharing information.\n            ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      Besides our staff, we share this information with\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      in order to\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(".\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","pure-button button-black-on-white button-small");
        var el5 = dom.createTextNode("we have another reason for sharing");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n   \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      Don't share any of the information you collect? That's fine, move along to the next step.\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block, element = hooks.element, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element2, [5, 1]);
        var morph0 = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element3, [3]),0,0);
        var morph2 = dom.createMorphAt(element2,3,3);
        var morph3 = dom.createMorphAt(element2,9,9);
        var morph4 = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
        inline(env, morph0, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.thirdPartySharingNameOne"), "placeholder": "a 3rd party", "size": "13"});
        inline(env, morph1, context, "input", [], {"type": "text", "value": get(env, context, "model.statement.thirdPartySharingPurpose"), "placeholder": "take actions connected to a purpose for collection", "size": "46"});
        block(env, morph2, context, "each", [get(env, context, "model.statement.sharingParties")], {}, child0, null);
        element(env, element4, context, "action", ["addParty"], {});
        content(env, morph3, context, "yield");
        block(env, morph4, context, "step-help", [], {"buttonText": "Is that a problem?"}, child1, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-statement', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1,"for","keptSecurely");
          var el2 = dom.createTextNode("Reassuring people that their data is kept securely");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          inline(env, morph0, context, "input", [], {"type": "checkbox", "checked": get(env, context, "keptSecurely"), "id": "keptSecurely"});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1,"for","dataDestruction");
          var el2 = dom.createTextNode("Informing people about data lifetimes and disposal");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          inline(env, morph0, context, "input", [], {"type": "checkbox", "checked": get(env, context, "dataDestruction"), "id": "dataDestruction"});
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        Make sure you give it a really good read before you start using it - it needs to reflect how you do business.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        You're required to show this to a user before you get information from them, or if this is not possible, as soon as you can after that. See\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/collection-of-information-from-subject-principle-three/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 3");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        for more.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        If you have any questions or concerns about the statement, check out the\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/how-to-comply/your-obligations/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Office of the Privacy Commissioner’s help information");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(",\n        or contact our\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/news-and-publications/guidance-resources/health-privacy-toolkit/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Enquiries Line");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(".\n        You can always add to or change the statement based on this advice.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        If you collect medical information special rules apply, and you should see the\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/news-and-publications/guidance-resources/health-privacy-toolkit/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Health Toolkit");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        for more.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Congratulations! Here’s a privacy statement for you to use. You should show this to people when you get personal information from them:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      You can make your statement better by:\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","non-bullet-list");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [5, 1]);
        var morph0 = dom.createMorphAt(element1,3,3);
        var morph1 = dom.createMorphAt(dom.childAt(element2, [1]),1,1);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [3]),1,1);
        var morph3 = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        inline(env, morph0, context, "render", ["statement", get(env, context, "model.statement")], {});
        block(env, morph1, context, "link-to", ["steps.step", 9], {"class": "non-link"}, child0, null);
        block(env, morph2, context, "link-to", ["steps.step", 10], {"class": "non-link"}, child1, null);
        block(env, morph3, context, "step-help", [], {"buttonText": "More about privacy"}, child2, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/components/step-why', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 2,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n        also, we need to\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2,"class","text-input");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement, blockArguments) {
          var dom = env.dom;
          var hooks = env.hooks, set = hooks.set, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1, 3]),0,0);
          set(env, context, "_", blockArguments[0]);
          set(env, context, "index", blockArguments[1]);
          inline(env, morph0, context, "array-item-input", [], {"array": get(env, context, "model.statement.extraReasons"), "index": get(env, context, "index"), "placeholder": "do another thing related to our business", "size": "37"});
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          content(env, morph0, context, "yield");
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pure-button button-blue next-step-button");
          var el2 = dom.createTextNode("move along");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          element(env, element0, context, "action", ["notReady"], {});
          return fragment;
        }
      };
    }());
    var child3 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n          Before this tool can generate you a statement, you will need to  list the reasons you collect personal information.\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n          You're required to have a defined purpose for all the information you collect—if you can’t tell people why you need the information, it’s better to not collect it.\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n          See\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/how-to-comply/getting-started/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Getting Started");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          and\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/purpose-for-collection-of-personal-information-principle-one/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 1");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          for more.\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child4 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode(" If you collect information you'll need at least one purpose.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child5 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("              ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n                You need a ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("em");
          var el3 = dom.createTextNode("purpose");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" related to a function of your business for each piece of information you collect. The information you collect must be necessary for these purposes, and needs to support your business in a clearly defined way. If you don’t actually need the information, it’s better to not collect it.\n              ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n              ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n                Identifying a clear purpose and sticking to it is the key to getting privacy right. See\n                ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/how-to-comply/getting-started/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Getting Started");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                and\n                ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","https://privacy.org.nz/purpose-for-collection-of-personal-information-principle-one/");
          dom.setAttribute(el2,"target","_blank");
          var el3 = dom.createTextNode("Privacy Principle 1");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                for more.\n              ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-3-4 modal-anchor");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      We collect personal information in order to ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","text-input");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","pure-button button-black-on-white button-small");
        var el5 = dom.createTextNode("we have another reason");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("\n      We only collect information that relates to these purposes:\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","non-bullet-list");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","onlyTheseReasons");
        var el6 = dom.createTextNode("Yes");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5,"for","moreReasons");
        var el6 = dom.createTextNode("No");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-4");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, block = hooks.block, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [5, 1]);
        var element4 = dom.childAt(element2, [9]);
        var morph0 = dom.createMorphAt(dom.childAt(element2, [1, 1]),0,0);
        var morph1 = dom.createMorphAt(element2,3,3);
        var morph2 = dom.createMorphAt(dom.childAt(element4, [1]),1,1);
        var morph3 = dom.createMorphAt(dom.childAt(element4, [3]),1,1);
        var morph4 = dom.createMorphAt(element2,11,11);
        var morph5 = dom.createMorphAt(element2,13,13);
        var morph6 = dom.createMorphAt(element2,15,15);
        var morph7 = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
        inline(env, morph0, context, "input", [], {"value": get(env, context, "model.statement.collectionReason"), "placeholder": "do something that directly relates to our business", "size": "45"});
        block(env, morph1, context, "each", [get(env, context, "model.statement.extraReasons")], {}, child0, null);
        element(env, element3, context, "action", ["addReason"], {});
        inline(env, morph2, context, "radio-button", [], {"value": true, "checked": get(env, context, "model.statement.onlyTheseReasons"), "id": "onlyTheseReasons"});
        inline(env, morph3, context, "radio-button", [], {"value": false, "checked": get(env, context, "model.statement.onlyTheseReasons"), "id": "moreReasons"});
        block(env, morph4, context, "if", [get(env, context, "readyToMoveOn")], {}, child1, child2);
        block(env, morph5, context, "modal-message", [], {"showModal": get(env, context, "showUnstatedPurposeModal")}, child3, null);
        block(env, morph6, context, "modal-message", [], {"showModal": get(env, context, "showNotReadyModal")}, child4, null);
        block(env, morph7, context, "step-help", [], {"buttonText": "I need a purpose?"}, child5, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("get started");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("What's all this then?");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-1 center-children landing-page");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3,"class","logo-image");
        var el4 = dom.createTextNode("Priv-o-matic");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","p1");
        var el4 = dom.createTextNode("\n      Get your privacy statement sorted. ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      It takes five minutes.\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","p2");
        var el4 = dom.createTextNode("\n      All you’ll need is a good understanding ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      of your business.\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","b1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","b2");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [3, 1]);
        var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
        var morph1 = dom.createMorphAt(dom.childAt(element0, [7]),1,1);
        var morph2 = dom.createMorphAt(dom.childAt(element0, [9]),1,1);
        content(env, morph0, context, "outlet");
        block(env, morph1, context, "link-to", ["steps.step", 1], {"classNames": "pure-button button-xlarge button-blue get-started-button"}, child0, null);
        block(env, morph2, context, "link-to", ["whats-this"], {"classNames": "pure-button button-red-text whats-this-button"}, child1, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/statement', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("name");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("contact information");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("location");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child3 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("computer or network");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child4 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("interactions with us");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child5 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("billing or purchase information");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child6 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
          content(env, morph0, context, "model.otherDataInfo");
          return fragment;
        }
      };
    }());
    var child7 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 1,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement, blockArguments) {
          var dom = env.dom;
          var hooks = env.hooks, set = hooks.set, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          set(env, context, "reason", blockArguments[0]);
          content(env, morph0, context, "reason");
          return fragment;
        }
      };
    }());
    var child8 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 1,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        in order to ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement, blockArguments) {
            var dom = env.dom;
            var hooks = env.hooks, set = hooks.set, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element2 = dom.childAt(fragment, [1]);
            var morph0 = dom.createMorphAt(element2,1,1);
            var morph1 = dom.createMorphAt(element2,3,3);
            set(env, context, "party", blockArguments[0]);
            content(env, morph0, context, "party.nameOne");
            content(env, morph1, context, "party.purpose");
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    Besides our staff, we share this information with:\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      in order to ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(".\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element3 = dom.childAt(fragment, [1]);
          var element4 = dom.childAt(element3, [1]);
          var morph0 = dom.createMorphAt(element4,1,1);
          var morph1 = dom.createMorphAt(element4,3,3);
          var morph2 = dom.createMorphAt(element3,3,3);
          content(env, morph0, context, "model.thirdPartySharingNameOne");
          content(env, morph1, context, "model.thirdPartySharingPurpose");
          block(env, morph2, context, "each", [get(env, context, "model.sharingParties")], {}, child0, null);
          return fragment;
        }
      };
    }());
    var child9 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 1,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            var el2 = dom.createTextNode("If you choose not to enter ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(" we'll ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement, blockArguments) {
            var dom = env.dom;
            var hooks = env.hooks, set = hooks.set, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element1 = dom.childAt(fragment, [1]);
            var morph0 = dom.createMorphAt(element1,1,1);
            var morph1 = dom.createMorphAt(element1,3,3);
            set(env, context, "option", blockArguments[0]);
            content(env, morph0, context, "option.info");
            content(env, morph1, context, "option.consequence");
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Providing some information is optional. If you choose not to enter ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(", we'll ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(".\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
          var morph2 = dom.createMorphAt(fragment,5,5,contextualElement);
          dom.insertBoundary(fragment, null);
          content(env, morph0, context, "model.optionalInfo");
          content(env, morph1, context, "model.optionalConsequence");
          block(env, morph2, context, "each", [get(env, context, "model.extraOptionalInfo")], {}, child0, null);
          return fragment;
        }
      };
    }());
    var child10 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    and ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n  ");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, content = hooks.content;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
            content(env, morph0, context, "model.secureMethodTwo");
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("\n  We keep your information safe by  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(".\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          var morph0 = dom.createMorphAt(element0,1,1);
          var morph1 = dom.createMorphAt(element0,3,3);
          content(env, morph0, context, "model.secureMethodOne");
          block(env, morph1, context, "if", [get(env, context, "model.secureMethodTwo")], {}, child0, null);
          return fragment;
        }
      };
    }());
    var child11 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    We keep your information for\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    at which point we securely destroy it by\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(".\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
          content(env, morph0, context, "model.dataRetentionTime");
          content(env, morph1, context, "model.dataDestructionMethod");
          return fragment;
        }
      };
    }());
    var child12 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode(", or ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          content(env, morph0, context, "model.phoneNumber");
          return fragment;
        }
      };
    }());
    var child13 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode(", or ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          content(env, morph0, context, "model.postalAddress");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("code");
        dom.setAttribute(el1,"class","privacy-statement");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nWe collect personal information from you, including information about your:\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n  We collect your personal information in order to:\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\nYou have the right to ask for a copy of any personal information we hold about you, and to ask for it to be corrected if you think it is wrong. If you’d like to ask for a copy of your information, or to have it corrected, please contact us at ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element5 = dom.childAt(fragment, [1]);
        var element6 = dom.childAt(element5, [1, 1]);
        var element7 = dom.childAt(element5, [3, 1]);
        var element8 = dom.childAt(element5, [13]);
        var morph0 = dom.createMorphAt(element6,1,1);
        var morph1 = dom.createMorphAt(element6,3,3);
        var morph2 = dom.createMorphAt(element6,5,5);
        var morph3 = dom.createMorphAt(element6,7,7);
        var morph4 = dom.createMorphAt(element6,9,9);
        var morph5 = dom.createMorphAt(element6,11,11);
        var morph6 = dom.createMorphAt(element6,13,13);
        var morph7 = dom.createMorphAt(dom.childAt(element7, [1]),0,0);
        var morph8 = dom.createMorphAt(element7,3,3);
        var morph9 = dom.createMorphAt(dom.childAt(element5, [5]),1,1);
        var morph10 = dom.createMorphAt(element5,7,7);
        var morph11 = dom.createMorphAt(element5,9,9);
        var morph12 = dom.createMorphAt(element5,11,11);
        var morph13 = dom.createMorphAt(element8,1,1);
        var morph14 = dom.createMorphAt(element8,2,2);
        var morph15 = dom.createMorphAt(element8,3,3);
        block(env, morph0, context, "if", [get(env, context, "model.identityData")], {}, child0, null);
        block(env, morph1, context, "if", [get(env, context, "model.addressData")], {}, child1, null);
        block(env, morph2, context, "if", [get(env, context, "model.locationData")], {}, child2, null);
        block(env, morph3, context, "if", [get(env, context, "model.computerNetworkData")], {}, child3, null);
        block(env, morph4, context, "if", [get(env, context, "model.userBehaviourData")], {}, child4, null);
        block(env, morph5, context, "if", [get(env, context, "model.financialData")], {}, child5, null);
        block(env, morph6, context, "if", [get(env, context, "model.otherDataInfo")], {}, child6, null);
        content(env, morph7, context, "model.collectionReason");
        block(env, morph8, context, "each", [get(env, context, "model.extraReasons")], {}, child7, null);
        block(env, morph9, context, "if", [get(env, context, "model.thirdPartySharingNameOne")], {}, child8, null);
        block(env, morph10, context, "if", [get(env, context, "model.optionalInfo")], {}, child9, null);
        block(env, morph11, context, "if", [get(env, context, "model.secureMethodOne")], {}, child10, null);
        block(env, morph12, context, "if", [get(env, context, "model.dataRetentionTime")], {}, child11, null);
        content(env, morph13, context, "model.emailAddress");
        block(env, morph14, context, "if", [get(env, context, "model.phoneNumber")], {}, child12, null);
        block(env, morph15, context, "if", [get(env, context, "model.postalAddress")], {}, child13, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/steps', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          var child0 = (function() {
            return {
              isHTMLBars: true,
              revision: "Ember@1.11.1",
              blockParams: 0,
              cachedFragment: null,
              hasRendered: false,
              build: function build(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              render: function render(context, env, contextualElement) {
                var dom = env.dom;
                var hooks = env.hooks, content = hooks.content;
                dom.detectNamespace(contextualElement);
                var fragment;
                if (env.useFragmentCache && dom.canClone) {
                  if (this.cachedFragment === null) {
                    fragment = this.build(dom);
                    if (this.hasRendered) {
                      this.cachedFragment = fragment;
                    } else {
                      this.hasRendered = true;
                    }
                  }
                  if (this.cachedFragment) {
                    fragment = dom.cloneNode(this.cachedFragment, true);
                  }
                } else {
                  fragment = this.build(dom);
                }
                var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
                dom.insertBoundary(fragment, null);
                dom.insertBoundary(fragment, 0);
                content(env, morph0, context, "step.id");
                return fragment;
              }
            };
          }());
          return {
            isHTMLBars: true,
            revision: "Ember@1.11.1",
            blockParams: 0,
            cachedFragment: null,
            hasRendered: false,
            build: function build(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      	   ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            render: function render(context, env, contextualElement) {
              var dom = env.dom;
              var hooks = env.hooks, get = hooks.get, block = hooks.block;
              dom.detectNamespace(contextualElement);
              var fragment;
              if (env.useFragmentCache && dom.canClone) {
                if (this.cachedFragment === null) {
                  fragment = this.build(dom);
                  if (this.hasRendered) {
                    this.cachedFragment = fragment;
                  } else {
                    this.hasRendered = true;
                  }
                }
                if (this.cachedFragment) {
                  fragment = dom.cloneNode(this.cachedFragment, true);
                }
              } else {
                fragment = this.build(dom);
              }
              var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
              block(env, morph0, context, "link-to", ["steps.step", get(env, context, "step")], {}, child0, null);
              return fragment;
            }
          };
        }());
        var child1 = (function() {
          var child0 = (function() {
            return {
              isHTMLBars: true,
              revision: "Ember@1.11.1",
              blockParams: 0,
              cachedFragment: null,
              hasRendered: false,
              build: function build(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              render: function render(context, env, contextualElement) {
                var dom = env.dom;
                var hooks = env.hooks, content = hooks.content;
                dom.detectNamespace(contextualElement);
                var fragment;
                if (env.useFragmentCache && dom.canClone) {
                  if (this.cachedFragment === null) {
                    fragment = this.build(dom);
                    if (this.hasRendered) {
                      this.cachedFragment = fragment;
                    } else {
                      this.hasRendered = true;
                    }
                  }
                  if (this.cachedFragment) {
                    fragment = dom.cloneNode(this.cachedFragment, true);
                  }
                } else {
                  fragment = this.build(dom);
                }
                var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
                dom.insertBoundary(fragment, null);
                dom.insertBoundary(fragment, 0);
                content(env, morph0, context, "step.id");
                return fragment;
              }
            };
          }());
          return {
            isHTMLBars: true,
            revision: "Ember@1.11.1",
            blockParams: 0,
            cachedFragment: null,
            hasRendered: false,
            build: function build(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("           ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            render: function render(context, env, contextualElement) {
              var dom = env.dom;
              var hooks = env.hooks, get = hooks.get, block = hooks.block;
              dom.detectNamespace(contextualElement);
              var fragment;
              if (env.useFragmentCache && dom.canClone) {
                if (this.cachedFragment === null) {
                  fragment = this.build(dom);
                  if (this.hasRendered) {
                    this.cachedFragment = fragment;
                  } else {
                    this.hasRendered = true;
                  }
                }
                if (this.cachedFragment) {
                  fragment = dom.cloneNode(this.cachedFragment, true);
                }
              } else {
                fragment = this.build(dom);
              }
              var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
              block(env, morph0, context, "link-to", ["steps.step", get(env, context, "step")], {"disabled": true}, child0, null);
              return fragment;
            }
          };
        }());
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            var hooks = env.hooks, element = hooks.element, get = hooks.get, block = hooks.block;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            var element0 = dom.childAt(fragment, [1]);
            var morph0 = dom.createMorphAt(element0,1,1);
            element(env, element0, context, "bind-attr", [], {"class": "step.isCompleted:completed :step-marker"});
            block(env, morph0, context, "if", [get(env, context, "step.isCompleted")], {}, child0, child1);
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          block(env, morph0, context, "if", [get(env, context, "step.showInNav")], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1,"id","step-list");
        dom.setAttribute(el1,"class","step-list");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        dom.insertBoundary(fragment, 0);
        content(env, morph0, context, "outlet");
        block(env, morph1, context, "each", [get(env, context, "model")], {"keyword": "step"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/steps/step', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pure-button button-blue next-step-button");
          var el2 = dom.createTextNode("move along");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, element = hooks.element;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [1]);
          element(env, element0, context, "action", ["nextStep"], {});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"class","step-heading");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, get = hooks.get, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
        var morph1 = dom.createMorphAt(fragment,3,3,contextualElement);
        dom.insertBoundary(fragment, null);
        content(env, morph0, context, "model.title");
        block(env, morph1, context, "component", [get(env, context, "model.name")], {"model": get(env, context, "model"), "action": "nextStep"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/templates/whats-this', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("get started");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pure-g");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pure-u-1-1");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","whats-this-header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        var el5 = dom.createTextNode("Priv-o-matic");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4,"class","tag-line");
        var el5 = dom.createTextNode("Get your privacy statement sorted.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","whats-this-text");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("\n        This tool, which was designed by the Office of the Privacy Commissioner for small to medium businesses, creates basic privacy statements. A privacy statement  tells people how you will be  collecting, using and disclosing their information. A good privacy statement is important because New Zealand agencies are required by law to be transparent about how, when and why they collect personal information.\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("\n        If the information you collect is sensitive, complex or intrusive, or you have any questions about privacy law, check out our\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","https://privacy.org.nz/how-to-comply/your-obligations/");
        dom.setAttribute(el5,"target","_blank");
        var el6 = dom.createTextNode("help information");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(",\n        or contact our\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","https://privacy.org.nz/contact-us/");
        dom.setAttribute(el5,"target","_blank");
        var el6 = dom.createTextNode("Enquiries Line");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(".\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("If you collect medical information you should see the\n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","https://privacy.org.nz/news-and-publications/guidance-resources/health-privacy-toolkit/");
        dom.setAttribute(el5,"target","_blank");
        var el6 = dom.createTextNode("Privacy Health Toolkit");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      for more detailed help and educational resources.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("This tool uses your browser to do all the work - we don't collect any of the information you enter about your business.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      \n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0, 1, 3]),9,9);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        block(env, morph0, context, "link-to", ["steps.step", 1], {"classNames": "pure-button button-xlarge button-blue get-started-button centered-block", "target": "_blank"}, child0, null);
        content(env, morph1, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('priv-o-matic/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/array-item-input.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/array-item-input.js should pass jshint', function() { 
    ok(true, 'components/array-item-input.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/modal-message.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/modal-message.js should pass jshint', function() { 
    ok(true, 'components/modal-message.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/radio-button.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/radio-button.js should pass jshint', function() { 
    ok(true, 'components/radio-button.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-contact.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-contact.js should pass jshint', function() { 
    ok(true, 'components/step-contact.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-data-sources.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-data-sources.js should pass jshint', function() { 
    ok(true, 'components/step-data-sources.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-data-types.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-data-types.js should pass jshint', function() { 
    ok(true, 'components/step-data-types.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-help.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-help.js should pass jshint', function() { 
    ok(true, 'components/step-help.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-legal-requirement.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-legal-requirement.js should pass jshint', function() { 
    ok(true, 'components/step-legal-requirement.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-optional-info.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-optional-info.js should pass jshint', function() { 
    ok(true, 'components/step-optional-info.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-retention.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-retention.js should pass jshint', function() { 
    ok(true, 'components/step-retention.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-security.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-security.js should pass jshint', function() { 
    ok(true, 'components/step-security.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-sharing.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-sharing.js should pass jshint', function() { 
    ok(true, 'components/step-sharing.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-statement.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-statement.js should pass jshint', function() { 
    ok(true, 'components/step-statement.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/components/step-why.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/step-why.js should pass jshint', function() { 
    ok(true, 'components/step-why.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/controllers/index.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/index.js should pass jshint', function() { 
    ok(true, 'controllers/index.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/controllers/statement.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/statement.js should pass jshint', function() { 
    ok(true, 'controllers/statement.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/controllers/steps.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/steps.js should pass jshint', function() { 
    ok(true, 'controllers/steps.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/controllers/steps/step.jshint', function () {

  'use strict';

  module('JSHint - controllers/steps');
  test('controllers/steps/step.js should pass jshint', function() { 
    ok(true, 'controllers/steps/step.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/helpers/resolver', ['exports', 'ember/resolver', 'priv-o-matic/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('priv-o-matic/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/helpers/start-app', ['exports', 'ember', 'priv-o-matic/app', 'priv-o-matic/router', 'priv-o-matic/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('priv-o-matic/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/initializers/load-fixtures.jshint', function () {

  'use strict';

  module('JSHint - initializers');
  test('initializers/load-fixtures.js should pass jshint', function() { 
    ok(true, 'initializers/load-fixtures.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/models/statement.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/statement.js should pass jshint', function() { 
    ok(true, 'models/statement.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/models/step.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/step.js should pass jshint', function() { 
    ok(true, 'models/step.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/routes/steps.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/steps.js should pass jshint', function() { 
    ok(true, 'routes/steps.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/routes/steps/step.jshint', function () {

  'use strict';

  module('JSHint - routes/steps');
  test('routes/steps/step.js should pass jshint', function() { 
    ok(true, 'routes/steps/step.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/test-helper', ['priv-o-matic/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('priv-o-matic/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'ApplicationAdapter', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('priv-o-matic/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/array-item-input-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('array-item-input', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/array-item-input-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/array-item-input-test.js should pass jshint', function() { 
    ok(true, 'unit/components/array-item-input-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/modal-message-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('modal-message', 'Unit | Component | modal message', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/modal-message-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/modal-message-test.js should pass jshint', function() { 
    ok(true, 'unit/components/modal-message-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-aside-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-aside', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-aside-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-aside-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-aside-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-contact-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-contact', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-contact-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-contact-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-contact-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-data-sources-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-data-sources', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-data-sources-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-data-sources-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-data-sources-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-data-types-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-data-types', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-data-types-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-data-types-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-data-types-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-help-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-help', 'Unit | Component | step help', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-help-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-help-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-help-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-legal-requirement-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-legal-requirement', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-legal-requirement-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-legal-requirement-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-legal-requirement-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-optional-info-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-optional-info', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-optional-info-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-optional-info-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-optional-info-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-retention-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-retention', 'Unit | Component | step retention', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-retention-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-retention-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-retention-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-security-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-security', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-security-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-security-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-security-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-sharing-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-sharing', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-sharing-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-sharing-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-sharing-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-statement-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-statement', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-statement-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-statement-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-statement-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/components/step-why-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('step-why', {});

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

});
define('priv-o-matic/tests/unit/components/step-why-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/step-why-test.js should pass jshint', function() { 
    ok(true, 'unit/components/step-why-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/controllers/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('priv-o-matic/tests/unit/controllers/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/index-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/index-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/controllers/statement-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:statement', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('priv-o-matic/tests/unit/controllers/statement-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/statement-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/statement-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/controllers/step-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:steps.step', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('priv-o-matic/tests/unit/controllers/step-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/step-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/step-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/controllers/steps-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:steps', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('priv-o-matic/tests/unit/controllers/steps-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/steps-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/steps-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/initializers/load-fixtures-test', ['ember', 'priv-o-matic/initializers/load-fixtures', 'qunit'], function (Ember, load_fixtures, qunit) {

  'use strict';

  var container, application;

  qunit.module('Unit | Initializer | load fixtures', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        container = application.__container__;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    load_fixtures.initialize(container, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

});
define('priv-o-matic/tests/unit/initializers/load-fixtures-test.jshint', function () {

  'use strict';

  module('JSHint - unit/initializers');
  test('unit/initializers/load-fixtures-test.js should pass jshint', function() { 
    ok(true, 'unit/initializers/load-fixtures-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/models/statement-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('statement', {
    // Specify the other units that are required for this test.
    needs: ['step']
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('priv-o-matic/tests/unit/models/statement-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/statement-test.js should pass jshint', function() { 
    ok(true, 'unit/models/statement-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/models/step-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('step', {
    // Specify the other units that are required for this test.
    needs: ['prompt']
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('priv-o-matic/tests/unit/models/step-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/step-test.js should pass jshint', function() { 
    ok(true, 'unit/models/step-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('priv-o-matic/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/routes/step-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:step', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('priv-o-matic/tests/unit/routes/step-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/step-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/step-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/routes/steps-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:steps', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('priv-o-matic/tests/unit/routes/steps-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/steps-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/steps-test.js should pass jshint.'); 
  });

});
define('priv-o-matic/tests/unit/views/steps-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('view:steps');

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var view = this.subject();
    assert.ok(view);
  });

});
define('priv-o-matic/tests/unit/views/steps-test.jshint', function () {

  'use strict';

  module('JSHint - unit/views');
  test('unit/views/steps-test.js should pass jshint', function() { 
    ok(true, 'unit/views/steps-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('priv-o-matic/config/environment', ['ember'], function(Ember) {
  var prefix = 'priv-o-matic';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("priv-o-matic/tests/test-helper");
} else {
  require("priv-o-matic/app")["default"].create({"name":"priv-o-matic","version":"0.0.0.63dcf2f5"});
}

/* jshint ignore:end */
//# sourceMappingURL=priv-o-matic.map