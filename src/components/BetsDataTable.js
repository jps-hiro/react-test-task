import React from "react";
import "./BetsDataTable.scss";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { compose } from "redux";
import { connect } from "react-redux";
import { gql } from 'apollo-boost';
import { useQuery, useSubscription } from '@apollo/react-hooks';

const EXCHANGE_RATES = gql`
  {
    bets {
      id
      time
      name
      game
      bet
      payout
      profit
    }
  }
`;
const BET_ADDED_SUBSCRIPTION = gql`
  subscription {
    betAdded {
      id
      time
      name
      game
      bet
      payout
      profit
    }
  }
`;


const BetsDataTable = () => {
  const { data } = useQuery(EXCHANGE_RATES);
  console.log(data);
  
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>TIME</th>
            <th className="hide-mobile">BET</th>
            <th className="hide-mobile">MULTIPLER</th>
            <th>PROFIT</th>
          </tr>
        </thead>
        <tbody>
          { data && data.bets.map((item, index)=>{
              return (
                <tr key={index}>
                  <td className="td-1">{(new Date(item.time)).toLocaleString("en-GB")}</td>
                  <td className="td-2 hide-mobile"><FontAwesomeIcon icon={faBitcoin} />{item.bet/1000}</td>
                  <td className="td-3 hide-mobile">x{item.payout/4}</td>
                  <td className={item.profit<0?"td-4 negative":"td-4"}><FontAwesomeIcon icon={faBitcoin} />{item.profit/1000}</td>
                </tr>
              )
            })
          }
          
        </tbody>
      </table>  
    </>
  );
};

const mapState = state => ({
});
const mapProps = {
};
const enhance = compose(connect(mapState, mapProps), withRouter);
export default enhance(BetsDataTable);
