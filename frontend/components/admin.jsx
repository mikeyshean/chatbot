var React = require('react');
var Nav = require('./nav');
var Index = require('./index');
var Tree = require('./tree');
var ClientActions = require('../actions/client_actions');
var AppConstants = require('../constants/app_constants');
var ApplicationStore = require('../stores/application');

var Admin = React.createClass({
  getInitialState: function () {
    return ApplicationStore.state()
  },
  componentDidMount: function () {
    this.listener = ApplicationStore.addListener(this._appChanged);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  _appChanged: function () {
    this.replaceState(ApplicationStore.state())
  },
  render: function() {
    var styles = {
      height: '100%'
    };
    var tree;
    if (this.state.treeData) {
      tree = <Tree tree={this.state.treeData} />
    }
    return (
      <div className="row" style={styles}>
        <Nav navSelection={this.state.navSelection}/>
        <Index index={this.state.navSelection}/>
        {tree}
      </div>
    );
  }
});

module.exports = Admin;
