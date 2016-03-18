var DegreeList = React.createClass({
  getInitialState: function() {
    return {
      degrees: this.props.data,
      editingDegreeID: null
    };
  },

  getDefaultProps: function() {
    return {
      data: []
    };
  },

  cleanUpNewDegree: function() {
    // Clean up new degree if user takes a different action.
    var lastDegree = this.state.degrees[this.state.degrees.length - 1];
    if (this.state.editingDegreeID === -1 && lastDegree.id === -1) {
      this.deleteDegree(lastDegree);
    };
  },

  setEditingDegreeID: function(id) {
    this.cleanUpNewDegree();
    this.setState({editingDegreeID: id});
  },

  addDegree: function(e) {
    e.preventDefault();
    if (this.state.editingDegreeID !== null &&
        this.state.editingDegreeID !== undefined &&
        !confirm("Are you sure you want to drop changes?")) return;

    var degree = {id: -1};
    var degrees = React.addons.update(this.state.degrees, {
      $push: [degree]
    });
    this.setState({degrees: degrees, editingDegreeID: degree.id});
  },

  deleteDegree: function(degree) {
    if (degree.id !== -1) {
      // User tried to delete a different degree while adding a new one.
      // We need to clean up the new degree when this happens.
      this.cleanUpNewDegree();
    }

    var index = this.state.degrees.indexOf(degree);
    var degrees = React.addons.update(this.state.degrees, {
      $splice: [[index, 1]]
    });
    this.replaceState({degrees: degrees});
  },

  updateDegree: function(degree, updatedDegree) {
    var index = this.state.degrees.indexOf(degree);
    var degrees = React.addons.update(this.state.degrees, {
      $splice: [[index, 1, updatedDegree]]
    });
    return this.replaceState({degrees: degrees});
  },

  componentWillMount: function() {
    var degrees = this.state.degrees;
    if (degrees.length == 1) {
      this.setState({editingDegreeID: degrees[0].id});
    }
  },

  render: function() {
    var degrees = this.state.degrees;

    return (
      <div className="degree-rows-container">
        {degrees.map(function(degree) {
          return React.createElement(DegreeRow, {
            key: degree.id,
            degree: degree,
            edit: degree.id === this.state.editingDegreeID,
            handleDeleteDegree: this.deleteDegree,
            handleEditDegree: this.updateDegree,
            setEditingDegreeID: this.setEditingDegreeID
          });
        }.bind(this))}

        <hr/>
        {this.state.editingDegreeID === -1 ? null : (
          <div className="degree-add-more-wrapper">
            <button className="btn btn-default" onClick={this.addDegree}>添加学历</button>
          </div>
        )}
      </div>
      )
  }

})
