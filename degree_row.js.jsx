var DegreeRow = React.createClass({
  getInitialState: function() {
    return {
      degree: this.props.degree,
      edit: this.props.edit
    };
  },

  getDefaultProps: function() {
    return {
      edit: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({degree: nextProps.degree, edit: nextProps.edit});
  },

  handleToggle: function() {
    var toggledEdit = !this.state.edit;
    this.setState({
      edit: toggledEdit
    });

    if (toggledEdit) {
      this.props.setEditingDegreeID(this.props.degree.id);
    } else {
      this.props.setEditingDegreeID(null);
    }
  },

  render: function() {
    if (this.state.edit) {
      return React.createElement(DegreeRowForm, {
        degree: this.state.degree,
        handleToggle: this.handleToggle,
        handleEditDegree: this.props.handleEditDegree
      });
    } else {
      return React.createElement(DegreeRowSummary, {
        degree: this.state.degree,
        handleToggle: this.handleToggle,
        handleDeleteDegree: this.props.handleDeleteDegree
      });
    }
  }
});
