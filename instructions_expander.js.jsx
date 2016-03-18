var InstructionsExpander = React.createClass({
  getInitialState: function() {
    return {
      instructionTitle: this.props.instructionTitle,
      fileName: this.props.fileName
    };
  },

  render: function() {
    return (
      <div className="instructions expander">
        <a className="expander-trigger expander-hidden" href="javascript:void(0)">
          [{this.state.instructionTitle}]
        </a>
        <div className="expander-content panel panel-default">
          <ReactMarkdownFile fileName={this.state.fileName}/>
        </div>
      </div>
    );
  }
});
