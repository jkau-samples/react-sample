var DegreeRowForm = React.createClass({

  handleEdit: function(e) {
    e.preventDefault();
    updatedDegree = {
      id: this.props.degree.id,
      degree_type: this.refs.degreeType.value,
      majors: this.refs.majors.getValue(),
      minors: this.refs.minors.getValue(),
      school: this.refs.school.getValue(),
      location: this.refs.location.getValue(),
      duration: this.refs.duration.getValue(),
      features: this.refs.features.getValue(),
      hundred_gpa: this.refs.hundredGpa.value,
      four_gpa: this.refs.fourGpa.value,
      ranking: this.refs.ranking.value,
      max_ranking: this.refs.maxRanking.value,
      scholarships: this.refs.scholarships.getValue(),
      coursework_notes: this.refs.coursework.getValue(),
    };

    var isNewDegree = this.props.degree.id === -1;

    return $.ajax({
      method: isNewDegree ? 'POST' : 'PUT',
      url: isNewDegree ? "/degrees/" : "/degrees/" + this.props.degree.id,
      dataType: 'JSON',
      data: {
        degree: updatedDegree
      },
      success: function(serverDegree) {
        if (this.props.degree.id !== -1) {
          // We don't need to toggle if this is a new degree
          this.props.handleToggle();
        }
        this.props.handleEditDegree(this.props.degree, serverDegree);
      }.bind(this)
    });
  },

  render: function() {
    var degree = this.props.degree;
    return (
      <div className="degree-form-wrapper">
        <hr/>
        <div className="ed-container">
          <div className="degree-container">
            <div className="flex-container">
              <h4>学历 (Degree)</h4>
              <div className="dropdown">
                <select
                  defaultValue={degree.degree_type}
                  ref="degreeType">

                  {Object.keys(degreeTypes).map(function(degreeKey, index) {
                    degreeValue = degreeTypes[degreeKey];
                    return React.createElement(
                      'option',
                      { key: index, value: degreeKey },
                      degreeValue);
                  }.bind(this))}

                </select>
              </div>
            </div>

            <InstructionsExpander
              instructionTitle="说明"
              fileName="/instructions/education/degree_instructions" />

            <InputRow
              inputTitle="专业 (Major)"
              placeholder="Computer Science"
              defaultValue={degree.majors}
              ref="majors" />

            <InstructionsExpander
              instructionTitle="说明"
              fileName="/instructions/education/major_instructions" />

            <InputRow
              inputTitle="辅修 (Minor)"
              placeholder="Art History"
              defaultValue={degree.minors}
              ref="minors" />

            <InputRow
              inputTitle="学校 (University)"
              placeholder="Zhejiang University"
              defaultValue={degree.school}
              ref="school" />
            
            <InputRow
              inputTitle="地点 (Location)"
              placeholder="Hangzhou, China"
              defaultValue={degree.location}
              ref="location" />

            <InstructionsExpander
              instructionTitle="记得添加国家名"
              fileName="/instructions/education/location_instructions" />

            <InputRow
              inputTitle="时期 (Time Period)"
              placeholder="Expected June 2016"
              defaultValue={degree.duration}
              ref="duration" />

            <InstructionsExpander
              instructionTitle="格式"
              fileName="/instructions/education/duration_instructions_1" />

            <InstructionsExpander
              instructionTitle="注意"
              fileName="/instructions/education/duration_instructions_2" />

            <InputRow
              inputTitle="特色 (Feature)"
              placeholder="Add some features about your university or your program, e.g., “Ranked top 10 in China”, “The only university in China that offers abc program”, etc."
              defaultValue={degree.features}
              ref="features"
              textarea={true} />

            <InstructionsExpander
              instructionTitle="说明"
              fileName="/instructions/education/feature_instructions" />

            <div className="flex-container">
              <h4>成绩（GPA)</h4>
              <div className="gpa-container">
                <input className="hundred-gpa" placeholder="83" defaultValue={degree.hundred_gpa} ref="hundredGpa"/>
                <span>/ 100</span>
                <span className="ranking-parenthesis-span"> (</span>
                <input className="four-gpa" placeholder="3.33" defaultValue={degree.four_gpa} ref="fourGpa"/>
                <span>/ 4.0)</span>
              </div>
            </div>

            <InstructionsExpander
              instructionTitle="说明"
              fileName="/instructions/education/gpa_instructions" />

            <div className="flex-container">
              <h4>排名（Ranking)</h4>
              <div className="ranking-container">
                <input className="ranking" placeholder="5" defaultValue={degree.ranking} ref="ranking"/>
                <span>/</span>
                <input className="ranking denom" placeholder="120" defaultValue={degree.max_ranking} ref="maxRanking"/>
              </div>
            </div>

            <InstructionsExpander
              instructionTitle="说明"
              fileName="/instructions/education/ranking_instructions" />

            <InputRow
              inputTitle="奖学金（Scholarships)"
              placeholder="Outstanding Student Scholarship (top 3% university wide) for three consecutive years"
              defaultValue={degree.scholarships}
              ref="scholarships"
              textarea={true} />

            <InstructionsExpander
              instructionTitle="说明"
              fileName="/instructions/education/scholarships_instructions" />

            <InputRow
              inputTitle="核心课程（Core Coursework)"
              placeholder="Essential coursework has included: Mathematical Analysis, International Finance, Advanced Macroeconomics, Intermediate Financial Theory, Intermediate Microeconomics, Intermediate Econometrics, Stochastic Processes, Dynamic Systems, and Functional Analysis. 84% courses taught in English."
              defaultValue={degree.coursework_notes}
              ref="coursework"
              textarea={true} />

            <InstructionsExpander
              instructionTitle="列哪些课程？"
              fileName="/instructions/education/coursework_instructions" />
          </div>
        </div>

        <div className="button-container">
          <button className="btn btn-default" onClick={this.handleEdit}>保存</button>
          <button className="btn btn-default" onClick={this.props.handleToggle}>取消</button>
        </div>
      </div>
    );
  }
});
