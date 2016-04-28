var React = require('react');
var AppConstants = require('../constants/app_constants');

var ResponseNode = React.createClass({

  getInitialState: function () {
    return {isHovered: false};
  },

  render: function() {
    var children = this.props.childNodes;
    var childrenComponents = children.map(function(child) {
      return this.props.buildChildren(child);
    }.bind(this))

    if (childrenComponents.length) {
      childrenComponents = (
        <ul>
          {childrenComponents}
        </ul>
      );
    }

    var editIcons;
    if (this.state.isHovered) {
      editIcons = (
        <div className="icon-wrapper">
          <span className="glyphicon glyphicon-plus node-icon"></span>
          <span className="glyphicon glyphicon-pencil node-icon"></span>
        </div>
      )
    }

    return (
      <ul>
        <li className="response">
          <a onMouseEnter={this._handleHover.bind(this, true)} onMouseLeave={this._handleHover.bind(this, false)}>
            {"\""+this.props.body+"\""}
            {editIcons}
          </a>

          {childrenComponents}
        </li>
      </ul>
    );
  },

  _handleHover: function (entering) {
    if (entering) {
      this.setState({isHovered: true})
    } else {
      this.setState({isHovered: false})
    }
  }
});

module.exports = ResponseNode;
