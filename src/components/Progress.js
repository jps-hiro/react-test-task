import React, { useState, useRef, useEffect, createRef } from "react";
import "./Progress.scss";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { compose } from "redux";
import { connect } from "react-redux";

const Progress = () => {
  
  const [value, setValue] = useState(64);
  const [start, setStart] = useState(false);
  const ref = useRef(null);

  const mouseMove = (e) => {
    if(start) {
      let v
      v=Math.round(100-(e.clientY-ref.current.getBoundingClientRect().top)*100/ref.current.clientHeight);
      if(v>100) {
        v=100;
      } else if(v<0) {
        v=0;
      }
      setValue(v)
    } 
    e.preventDefault();
    e.returnValue = false;
    return false
  }
  const moveTo = (e) => {
    setStart(true);
    let v
    v=Math.round(100-(e.nativeEvent.clientY-ref.current.getBoundingClientRect().top)*100/ref.current.clientHeight);
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
  
  const touchMove = (e) => {
    console.log(e)
    if(start) {
      let v
      if(e.touches) {
        v=Math.round(100-(e.touches[0].clientY-ref.current.getBoundingClientRect().top)*100/ref.current.clientHeight);
      } else {  
        v=0;
      }
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
  }
  const touchStart = (e) => {
    console.log(e)
    setStart(true);
    let v=0
    if(e.touches) {
      v=Math.round(100-(e.touches[0].clientY-ref.current.getBoundingClientRect().top)*100/ref.current.clientHeight);
    }
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
  useEffect(()=>{
    if(ref.current) {
      ref.current.addEventListener("touchstart", touchStart);
      ref.current.addEventListener("touchmove", touchMove, {
        passive: false
      });
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("touchstart", touchStart);
        ref.current.removeEventListener("touchmove", touchMove, {
          passive: false
        });
      }
    };

  })
  return (
    <>
      <div className="progress">
        <div className="progress-label">
          <span>100</span>
          <span>0</span>
        </div>

        <div className="progress-bar" 
          ref={ref}
          onMouseMove={(e)=>mouseMove(e)}
          onMouseDown={(e)=>{moveTo(e)}}
          onMouseUp={(e)=>setStart(false)}
        >
          <div className="value" style={{height: value+'%'}}>
            <div className="value-tag">
              <div className="div">
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
export default enhance(Progress);
