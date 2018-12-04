import React, { Component } from 'react';

const TopHeader = (props) =>{
  return <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <span className="navbar-brand mb-0 h1">InfRet</span>
            <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Demo<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/necronet/IR-project4/">Source code</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Video</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Credit</a>
              </li>
            </ul>
            </div>
          </nav>;
}

export default TopHeader;
