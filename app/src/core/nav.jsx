import React from "react";
import ROUTES from "Constants/routes";
import { useNavigate } from "react-router-dom";
import {
  validateLicenseRequest,
  validateLicenseResponse,
} from "secure-electron-license-keys";
import Logo from "Icons/Logo.jsx";
class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuActive: false,
      licenseModalActive: false,

      // license-specific
      licenseValid: false,
      allowedMajorVersions: "",
      allowedMinorVersions: "",
      appVersion: "",
      licenseExpiry: "",
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleLicenseModal = this.toggleLicenseModal.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentWillUnmount() {
    window.api.licenseKeys.clearRendererBindings();
  }

  componentDidMount() {
    // Set up binding to listen when the license key is
    // validated by the main process
    const _ = this;

    window.api.licenseKeys.onReceive(validateLicenseResponse, function (data) {
      // If the license key/data is valid
      if (data.success) {
        // Here you would compare data.appVersion to
        // data.major, data.minor and data.patch to
        // ensure that the user's version of the app
        // matches their license
        _.setState({
          licenseValid: true,
          allowedMajorVersions: data.major,
          allowedMinorVersions: data.minor,
          allowedPatchVersions: data.patch,
          appVersion: data.appVersion,
          licenseExpiry: data.expire,
        });
      } else {
        _.setState({
          licenseValid: false,
        });
      }
    });
  }

  toggleMenu(_event) {
    this.setState({
      mobileMenuActive: !this.state.mobileMenuActive,
    });
  }

  toggleLicenseModal(_event) {
    const previous = this.state.licenseModalActive;

    // Only send license request if the modal
    // is not already open
    if (!previous) {
      window.api.licenseKeys.send(validateLicenseRequest);
    }

    this.setState({
      licenseModalActive: !this.state.licenseModalActive,
    });
  }

  // Using a custom method to navigate because we
  // need to close the mobile menu if we navigate to
  // another page
  navigate(url) {
    this.setState(
      {
        mobileMenuActive: false,
      },
      function () {
        this.props.navigate(url);
      }
    );
  }

  render() {
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          <a
            role="button"
            className={`navbar-burger ${
              this.state.mobileMenuActive ? "is-active" : ""
            }`}
            data-target="navbarBasicExample"
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleMenu}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${
            this.state.mobileMenuActive ? "is-active" : ""
          }`}>
          <div className="navbar-start">
            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.WELCOME)}>
              Home
            </a>

            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.USER)}>
              Guests
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Report</a>

              <div className="navbar-dropdown">
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.REPORT1)}>
                  Day 1
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.REPORT2)}>
                  Day 2
                </a>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Logo />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function WithNavigate(props) {
  const navigate = useNavigate();
  return <Nav {...props} navigate={navigate} />;
}

export default WithNavigate;
