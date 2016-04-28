var React = require('react');
var AppConstants = require('../constants/app_constants');
var TriggerNode = require('../components/trigger_node');
var ResponseNode = require('../components/response_node');
var ActionNode = require('../components/action_node');

var Tree = React.createClass({
  buildChildren: function (node) {
    var actionType = node.actionable_type,
        actionable = node.actionable;
    var trigger = node.trigger,
        triggerId = trigger ? trigger.id : null,
        triggerCategory = trigger ? trigger.category : null;
    var actionComponent;

    if (actionType === "Action") {
      actionComponent = <ActionNode
        key={actionType+actionable.id}
        method={actionable.method}
        childNodes={node.children}
        buildChildren={this.buildChildren}
        />
    } else if (actionType === "Response") {
      actionComponent = <ResponseNode
        key={actionType+actionable.id}
        body={actionable.body}
        childNodes={node.children}
        buildChildren={this.buildChildren}
        />
    }

    return (
      <TriggerNode
        key={"trigger"+triggerId}
        category={triggerCategory}
        buildChildren={this.buildChildren}
        >
        {actionComponent}
      </TriggerNode>

    );
  },
  render: function() {
    if (!this.props.tree) {return null;}

    var tree = this.buildChildren(this.props.tree);

    return (
      <div className="tree">
        <ul>
          {tree}
        </ul>
      </div>
    );
  }
});

module.exports = Tree;
