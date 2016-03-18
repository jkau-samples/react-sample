var UniversityRow = React.createClass({
  getInitialState: function() {
    return {
      university: this.props.university,
      edit: this.props.edit
    };
  },

  getDefaultProps: function() {
    return {
      edit: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({university: nextProps.university, edit: nextProps.edit});
  },

  handleToggle: function() {
    var toggledEdit = !this.state.edit;
    this.setState({
      edit: toggledEdit
    });

    if (toggledEdit) {
      this.props.setEditingUniversityID(this.props.university.id);
    } else {
      this.props.setEditingUniversityID(null);
    }
  },

  render: function() {
    if (this.state.edit) {
      return React.createElement(UniversityRowForm, {
        university: this.state.university,
        handleToggle: this.handleToggle,
        handleEditUniversity: this.props.handleEditUniversity
      });
    } else {
      return React.createElement(UniversityRowSummary, {
        university: this.state.university,
        handleToggle: this.handleToggle,
        handleDeleteUniversity: this.props.handleDeleteUniversity
      });
    }
  }
});
