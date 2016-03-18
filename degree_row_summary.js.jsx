var DegreeRowSummary = React.createClass({

  handleDelete: function(e) {
    if (!confirm("确定删除与该学历相关的所有内容吗？")) return;

    e.preventDefault();
    return $.ajax({
      method: 'DELETE',
      url: "/degrees/" + this.props.degree.id,
      dataType: 'JSON',
      success: function() {
        return this.props.handleDeleteDegree(this.props.degree);
      }.bind(this)
    });
  },

  render: function() {
    var degree = this.props.degree;

    var major, minor, school, gpa, ranking, scholarships, coursework, features;
    if (degree.degree_type && degree.majors) {
      major = <p>{degreeTypeFormat(degree.degree_type)} in {degree.majors}</p>;
    }
    if (degree.minors) {
      minor = <p>Minor in {degree.minors}</p>;
    }
    if (degree.school) {
      schoolString = degree.school;
      if (degree.location) {
        schoolString = schoolString + " , " + degree.location;
      }
      school = <p>{schoolString}</p>;
    }
    if (degree.four_gpa || degree.hundred_gpa) {
      gpa = <p>GPA: {degree.hundred_gpa}/100 ({degree.four_gpa}/4.0)</p>;
    }
    if (degree.ranking && degree.max_ranking) {
      ranking = <p>Ranking: {degree.ranking}/{degree.max_ranking}</p>;
    }
    if (degree.scholarships) {
      scholarships = <p>Scholarships: {degree.scholarships}</p>;
    }
    if (degree.coursework_notes) {
      coursework = <p>Coursework: {degree.coursework_notes}</p>;
    }
    if (degree.features) {
      features = <p>Features: {degree.features}</p>;
    }

    return (
      <div className="degree-row-wrapper">
        <hr/>
        <div className="degree-row">
          <div className="degree-summary">
            {major}
            {minor}
            <p>{degree.duration}</p>
            {school}
            {gpa}
            {ranking}
            {scholarships}
            {coursework}
            {features}
          </div>
          <div className="button-container">
            <button className="btn btn-default" onClick={this.props.handleToggle}>编辑</button>
            <button className="btn btn-default" onClick={this.handleDelete}>删除</button>
          </div>
        </div>
      </div>
    );
  }
});
