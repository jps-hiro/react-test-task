import React, { useState, useRef, useEffect } from "react";
import "./Progress.scss";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { compose } from "redux";
import { connect } from "react-redux";

const ProgressEx = () => {
  
  const [value, setValue] = useState(64);
  const [start, setStart] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref = useRef(null);
  const move = (e, v) => {
    if(v>100) {
      v=100;
    } else if(v<0) {
      v=0;
    }
    setValue(v)
    e.preventDefault();
    e.returnValue = false;
    return false
  }
  const handleMouseMove=e=> {
    let v
    v=Math.round(100-(e.clientY-ref.current.getBoundingClientRect().top)*100/ref.current.clientHeight);
    move(e, v);
  }
  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };
  const handleMouseDown = event => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  return (
    <>
      <div className={start?"progress cursor":"progress"} ref={ref} >
        <div className="progress-label">
          <span>100</span>
          <span>0</span>
        </div>
        <div className="progress-bar" >
          <div className="value" style={{height: value+'%'}}>
            <div className="value-tag" ref={ref1} onMouseDown={handleMouseDown}>
              <div className="div" ref={ref2}>
                <div className="arrow"></div>
                <span>{value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bet-amount">
        <div className="value">
          <div className="label">BET AMOUNT</div>
          <div className="amount">
            <FontAwesomeIcon icon={faBitcoin} />
            <input className="amount-input" defaultValue="0.04885313" placeholder="Bet Amount" />
          </div>
        </div>
        <div className="sub-tag">
          1/2
        </div>
        <div className="sub-tag right-tag">
          x2
        </div>
      </div>
    </>
  );
};

const mapState = state => ({
});
const mapProps = {
};
const enhance = compose(connect(mapState, mapProps), withRouter);
export default enhance(ProgressEx);
