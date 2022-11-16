import React from "react";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="footer-middle">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <h4>lorem ipsum</h4>
              <ul className="list-unstyled">
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="text-xs-center">&copy;{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
