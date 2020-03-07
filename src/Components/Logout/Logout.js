import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions/auth";

class Logout extends React.Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to={"/"} />;
  }
}

function mapDispathToProps(dispath) {
  return {
    logout: () => dispath(logout())
  };
}
export default connect(
  null,
  mapDispathToProps
)(Logout);
