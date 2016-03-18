var UniversityRowSummary = React.createClass({

  handleDelete: function(e) {
    if (!confirm("确定删除与这所学校相关的所有内容吗？")) return;

    e.preventDefault();
    return $.ajax({
      method: 'DELETE',
      url: "/universities/" + this.props.university.id,
      dataType: 'JSON',
      success: function() {
        return this.props.handleDeleteUniversity(this.props.university);
      }.bind(this)
    });
  },

  render: function() {
    var university = this.props.university;

    // Part I
    var name, location, school, department, degree, concentration; 
    if (university.name) name = <p>{university.name}</p>;
    if (university.location) location = <p>{university.location}</p>;

    if (university.school) school = <p><i>School:</i> {university.school}</p>;
    if (university.department) department = <p><i>Department:</i> {university.department}</p>;
    if (university.degree) degree = <p><i>Degree:</i> {university.degree}</p>;
    if (university.concentration) concentration = <p><i>Concentration:</i> {university.concentration}</p>;

    // Part II
    var deadline, statement_requirements, resume_requirements, other_requirements; 
    if (university.deadline) deadline = <p><i>Deadline:</i> {university.deadline}</p>;
    if (university.statement_requirements) statement_requirements = <p><i>Statement Requirements:</i><br/>{university.statement_requirements}</p>;
    if (university.resume_requirements) resume_requirements = <p><i>Resume Requirements:</i><br/>{university.resume_requirements}</p>;
    if (university.other_requirements) other_requirements = <p><i>Other Requirements:</i><br/>{university.other_requirements}</p>;

    // Part III
    var ranking, research_areas, curriculum, facilities, job_opportunities, local_opportunities, alumni_resources, other_features;
    if (university.ranking) ranking = <p><i>Ranking:</i> {university.ranking}</p>;
    if (university.research_areas) research_areas = <p><i>Research Areas:</i><br/>{university.research_areas}</p>;
    if (university.curriculum) curriculum = <p><i>Curriculum:</i> {university.curriculum}</p>;
    if (university.facilities) facilities = <p><i>Facilities:</i> {university.facilities}</p>;
    if (university.job_opportunities) job_opportunities = <p><i>Job Opportunities:</i><br/>{university.job_opportunities}</p>;
    if (university.local_opportunities) local_opportunities = <p><i>Local Opportunities:</i> {university.local_opportunities}</p>;
    if (university.alumni_resources) alumni_resources = <p><i>Alumni Network:</i> {university.alumni_resources}</p>;
    if (university.other_features) other_features = <p><i>Other Features:</i> {university.other_features}</p>;

    // Part IV
    var keywords;
    if (university.keywords) keywords = <p><i>Keywords:</i><br/>{university.keywords}</p>;

    return (
      <div className="university-row-wrapper">
        <hr/>
        <div className="university-row">
          <div className="university-summary">
            <h4>I. 基本信息 (Basic Info)</h4>
            {name}
            {location}
            <br/>
            {school}
            {department}
            {degree}
            {concentration}
            <br/>
            <h4>II. 基本要求 (Basic Requirements)</h4>
            {deadline}
            {statement_requirements}
            {resume_requirements}
            {other_requirements}
            <br/>
            <h4>III. 对方有什么 (What the University Provides)</h4>
            {ranking}
            {research_areas}
            {curriculum}
            {facilities}
            {job_opportunities}
            {local_opportunities}
            {alumni_resources}
            {other_features}
            <br/>
            <h4>IV. 对方要什么  (What the University Wants)</h4>
            {keywords}
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
