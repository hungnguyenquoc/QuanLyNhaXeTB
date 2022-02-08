import React, { Component } from "react";
import Flatpickr from "react-flatpickr";
import moment from "moment";

import "./FormInput.scss";

class FormInput extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     focused: false,
  //   };
  // }

  // handleFocus = (e) => {
  //   this.setState({ focused: true });
  // };
  // render() {
  //   const { label, errorMessage, onChange, id, ...inputProps } = this.props;
  //   return (
  //     <div className="formInput">
  //     <label>{label}</label>
  //     <input
  //       {...inputProps}
  //       onChange={onChange}
  //       onBlur={() => this.handleFocus()}
  //       onFocus={() =>
  //         inputProps.name === "confirmPassword" && this.setState({focused: true})
  //       }
  //       focused={this.state.focused.toString()}
  //     />
  //     <span>{errorMessage}</span>
  //   </div>
  //   );
  // }
}

export default FormInput;
