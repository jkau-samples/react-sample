var UniversityRowForm = React.createClass({

  handleEdit: function(e) {
    e.preventDefault();
    updatedUniversity = {
      id: this.props.university.id,
      name: this.refs.name.getValue(),
      location: this.refs.location.getValue(),
      school: this.refs.school.getValue(),
      department: this.refs.department.getValue(),
      degree: this.refs.degree.getValue(),
      concentration: this.refs.concentration.getValue(),
      deadline: this.refs.deadline.getValue(),
      statement_requirements: this.refs.statement_requirements.getValue(),
      resume_requirements: this.refs.resume_requirements.getValue(),
      other_requirements: this.refs.other_requirements.getValue(),
      ranking: this.refs.ranking.getValue(),
      research_areas: this.refs.research_areas.getValue(),
      curriculum: this.refs.curriculum.getValue(),
      facilities: this.refs.facilities.getValue(),
      job_opportunities: this.refs.job_opportunities.getValue(),
      local_opportunities: this.refs.local_opportunities.getValue(),
      alumni_resources: this.refs.alumni_resources.getValue(),
      other_features: this.refs.other_features.getValue(),
      keywords: this.refs.keywords.getValue(),
    };

    var isNewUniversity = this.props.university.id === -1;

    return $.ajax({
      method: isNewUniversity ? 'POST' : 'PUT',
      url: isNewUniversity ? "/universities/" : "/universities/" + this.props.university.id,
      dataType: 'JSON',
      data: {
        university: updatedUniversity
      },
      success: function(serverUniversity) {
        if (this.props.university.id !== -1) {
           // We don't need to toggle if this is a new university
          this.props.handleToggle();
        }
        this.props.handleEditUniversity(this.props.university, serverUniversity);
      }.bind(this)
    });
  },

  render: function() {
    var university = this.props.university;
    return (
      <div className="university-form-wrapper">
        <hr/>
        <h4 className="section-header">I. 基本信息 (Basic Info)</h4>

        <InputRow
          inputTitle="学校 (University)"
          placeholder="University of Maryland"
          defaultValue={university.name}
          ref="name" />

        <InputRow
          inputTitle="地点 (Location)"
          placeholder="College Park, MD, USA"
          defaultValue={university.location}
          ref="location" />

        <InputRow
          inputTitle="学院 (School)"
          placeholder="A. James Clark School of Engineering"
          defaultValue={university.school}
          ref="school" />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/school_instructions" />

        <InputRow
          inputTitle="系 (Department)"
          placeholder="Department of Mechanical Engineering"
          defaultValue={university.department}
          ref="department" />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/department_instructions" />

        <InputRow
          inputTitle="学位 (Degree)"
          placeholder="Master of Science in Mechanical Engineering"
          defaultValue={university.degree}
          ref="degree" />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/degree_instructions" />

        <InputRow
          inputTitle="方向 (Concentration)"
          placeholder="Robotics"
          defaultValue={university.concentration}
          ref="concentration" />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/concentration_instructions" />

        <br/>
        <br/>
        <h4 className="section-header">II. 基本要求 (Basic Requirements)</h4>

        <InputRow
          inputTitle="申请截止期 (Application Deadline)"
          placeholder="2016-01-15"
          defaultValue={university.deadline}
          ref="deadline" />

        <InputRow
          inputTitle="个人陈述要求 (PS/SoP Requirements)"
          placeholder="Single space, up to 1000 words. Include the following content: ---"
          defaultValue={university.statement_requirements}
          ref="statement_requirements"
          textarea={true} />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/statement_requirements_instructions" />

        <InputRow
          inputTitle="简历要求 (Resume Requirements)"
          placeholder=""
          defaultValue={university.resume_requirements}
          ref="resume_requirements"
          textarea={true} />

        <InputRow
          inputTitle="其他 (Other Requirements)"
          placeholder=""
          defaultValue={university.other_requirements}
          ref="other_requirements"
          textarea={true} />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/other_requirements_instructions" />

        <br/>
        <br/>
        <h4 className="section-header">III. 对方有什么 (What the University Provides)</h4>

        <InputRow
          inputTitle="排名特色 (Ranking)"
          placeholder="UMD #53, Engineering School #23, ME #19"
          defaultValue={university.ranking}
          ref="ranking" />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/univ_ranking_instructions" />

        <InputRow
          inputTitle="研究领域 (Research Areas)"
          placeholder="Robotics (Prof. S) -- Microrobotics, Soft robotics, Bio-inspired robotics; Biomedical Devices & Systems (Prof. N) -- Medical Robotics, Cellular surgery"
          defaultValue={university.research_areas}
          ref="research_areas"
          textarea={true} />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/research_areas_instructions" />

        <InputRow
          inputTitle="课程设置 (Curriculum)"
          placeholder="Engineering Design Methods, Failure Mechanisms and Reliability, Heat Transfer, Thermodynamics, Fluid Mechanics, Systems Control, Topology, Systems Control"
          defaultValue={university.curriculum}
          ref="curriculum"
          textarea={true} />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/curriculum_instructions" />

        <InputRow
          inputTitle="设施设备 (Facilities)"
          placeholder="Micro Robotics Laboratory, Maryland Robotics Center, 3-D Printing Lab"
          defaultValue={university.facilities}
          ref="facilities" />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/facilities_instructions" />

        <InputRow
          inputTitle="就业机会 (Job Opportunities)"
          placeholder="Mean Salary: $83,800, Engineering Co-op Program, Partnership with Siemens’, Mechanical Engineering Career Fair"
          defaultValue={university.job_opportunities}
          ref="job_opportunities"
          textarea={true} />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/job_opportunities_instructions" />

        <InputRow
          inputTitle="地理周边 (Local Opportunities)"
          placeholder="Near Washington, D.C., Lockheed Martin, national research labs"
          defaultValue={university.local_opportunities}
          ref="local_opportunities" />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/local_opportunities_instructions" />

        <InputRow
          inputTitle="校友人脉 (Alumni Network)"
          placeholder="Cyber Security Club, Society of Women Engineers "
          defaultValue={university.alumni_resources}
          ref="alumni_resources" />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/alumni_resources_instructions" />

        <InputRow
          inputTitle="其他特色 (Other Features)"
          placeholder="Founded in 1894, 50 M.S., 45 Ph.D., 22% female"
          defaultValue={university.other_features}
          ref="other_features" />

        <br/>
        <br/>
        <h4 className="section-header">IV. 对方要什么  (What the University Wants)</h4>

        <InputRow
          inputTitle="对方看重的专业素养 (Keywords)"
          placeholder="Math background (Field Theory, Partial Differential Equations, Probability), Research Expeirences (Thesis), Electronic Systems, Engineering Design, Reliability"
          defaultValue={university.keywords}
          ref="keywords"
          textarea={true} />

        <InstructionsExpander
          instructionTitle="说明"
          fileName="/instructions/universities/keywords_instructions" />

        <div className="button-container">
          <button className="btn btn-default" onClick={this.handleEdit}>保存</button>
          <button className="btn btn-default" onClick={this.props.handleToggle}>取消</button>
        </div>
      </div>
    );
  }
});
