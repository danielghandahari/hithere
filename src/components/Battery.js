import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const Div = styled.div`
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .percentage-level {
    margin-right: 0.5rem;
  }

  .battery-container {
    border: solid 5px;
    border-radius: 20px;
    background-color: transparent;
    width: 100px;
    height: 60px;
    display: flex;
    .battery-cover {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      border-top-right-radius: ${props =>
        parseInt(props.levelWidth) > 85 ? "15px" : "0"};
      border-bottom-right-radius: ${props =>
        parseInt(props.levelWidth) > 85 ? "15px" : "0"};
      width: ${props => props.levelWidth};
      background-color: green;
    }
  }
`;

const Bolt = styled.div`
  visibility: ${props => (props.show ? "visible" : "hidden")};
  margin-left: ${props => (props.show ? "15px" : "0")};
`;

const Battery = () => {
  const [battery, setBattery] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(null);

  async function onChargingChange() {
    const { level, charging } = await navigator.getBattery();
    setBatteryLevel(level);
    setIsCharging(charging);
  }

  useEffect(() => {
    async function fetchedBattery() {
      let currentBattery = await navigator.getBattery();
      setBattery(currentBattery);
      setBatteryLevel(currentBattery.level);
      setIsCharging(currentBattery.charging);
    }

    fetchedBattery();
  }, []);

  useEffect(() => {
    if (battery) {
      battery.onchargingtimechange = onChargingChange;
      battery.onchargingchange = onChargingChange;
      battery.onlevelchange = onChargingChange;
    }
  }, [battery]);
  return (
    <Div levelWidth={`${batteryLevel * 100}%`}>
      <div className="percentage-level">
        {batteryLevel ? `${batteryLevel * 100}%` : "Loading..."}
      </div>
      <div className="battery-container">
        <div className="battery-cover" />
      </div>
      <Bolt show={isCharging}>
        <FontAwesomeIcon size={"3x"} icon={faBolt} />
      </Bolt>
    </Div>
  );
};

export default Battery;
