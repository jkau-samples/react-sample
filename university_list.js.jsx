var UniversityList = React.createClass({
  getInitialState: function() {
    return {
      universities: this.props.data,
      editingUniversityID: null
    };
  },

  getDefaultProps: function() {
    return {
      data: []
    };
  },

  cleanUpNewUniversity: function() {
    // Clean up new university if user takes a different action.
    var lastUniversity = this.state.universities[this.state.universities.length - 1];
    if (this.state.editingUniversityID === -1 && lastUniversity.id === -1) {
      this.deleteUniversity(lastUniversity);
    };
  },

  setEditingUniversityID: function(id) {
    this.cleanUpNewUniversity();
    this.setState({editingUniversityID: id});
  },

  addUniversity: function(e) {
    e.preventDefault();
    if (this.state.editingUniversityID !== null &&
        this.state.editingUniversityID !== undefined &&
        !confirm("Are you sure you want to drop changes?")) return;

    var university = {id: -1};
    var universities = React.addons.update(this.state.universities, {
      $push: [university]
    });
    this.setState({universities: universities, editingUniversityID: university.id});
  },

  deleteUniversity: function(university) {
    if (university.id !== -1) {
      // User tried to delete a different university while adding a new one.
      // We need to clean up the new university when this happens.
      this.cleanUpNewUniversity();
    }

    var index = this.state.universities.indexOf(university);
    var universities = React.addons.update(this.state.universities, {
      $splice: [[index, 1]]
    });
    this.replaceState({universities: universities});
  },

  updateUniversity: function(university, updatedUniversity) {
    var index = this.state.universities.indexOf(university);
    var universities = React.addons.update(this.state.universities, {
      $splice: [[index, 1, updatedUniversity]]
    });
    return this.replaceState({universities: universities});
  },

  render: function() {
    var universities = this.state.universities;

    $(window).on('beforeunload', function() {
      if (this.state.editingUniversityID !== null &&
          this.state.editingUniversityID !== undefined) {
        return '你有尚未保存的信息，确定要离开本页面吗?';
      }
    }.bind(this));

    return (
      <div className="university-rows-container">
        <ReactMarkdownFile fileName="/instructions/universities/univ_exploration_instructions"/>
        {universities.map(function(university) {
          return React.createElement(UniversityRow, {
            key: university.id,
            university: university,
            edit: university.id === this.state.editingUniversityID,
            handleDeleteUniversity: this.deleteUniversity,
            handleEditUniversity: this.updateUniversity,
            setEditingUniversityID: this.setEditingUniversityID
          });
        }.bind(this))}

        <hr/>
        {this.state.editingUniversityID === -1 ? null : (
          <div className="university-add-more-wrapper">
            <button className="btn btn-default" onClick={this.addUniversity}>添加学校</button>
          </div>
        )}
      </div>
      )
  }

})
