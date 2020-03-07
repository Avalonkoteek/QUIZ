import React from "react";
import "./Layout.css";
import MenuToggle from "../../Components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../Components/Navigation/Drawer/Drawer";
import { connect } from "react-redux";

class Layout extends React.Component {
  state = {
    menu: false
  };
  ToggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    });
  };
  menuCloseHandler = () => {
    this.setState({
      menu: false
    });
  };
  render() {
    return (
      <div className="Layout">
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          onToggle={this.ToggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}
export default connect(mapStateToProps)(Layout);
