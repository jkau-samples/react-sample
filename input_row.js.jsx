var InputRow = React.createClass({

  getValue: function() {
    return this.refs.textfield.value;
  },

  render: function() {
    var textfield;
    if (this.props.textarea) {
      textfield =
        <textarea
          placeholder={this.props.placeholder}
          defaultValue={this.props.defaultValue}
          ref="textfield"/>
    } else {
      textfield =
        <input
          placeholder={this.props.placeholder}
          defaultValue={this.props.defaultValue}
          ref="textfield"/>
    }

    return (
      <div className="flex-container">
        <h4>{this.props.inputTitle}</h4>
        {textfield}
      </div>
    );
  }

});
