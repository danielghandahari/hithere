import React, { useState, useEffect } from "react";

const Battery = () => {
  const [battery, setBattery] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(null);

  async function onChargingChange() {
    const { level, charging } = await navigator.getBattery();
    console.log("oncharge called", { level, charging });

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
    console.log("EFFECT");

    if (battery) {
      console.log("in effe");

      battery.onchargingtimechange = onChargingChange;
    }
  }, [battery]);
  return (
    <div>
      <div className="battery">
        {batteryLevel ? batteryLevel : "Loading..."}
      </div>
      <div>{isCharging ? "charging" : "NOT charging"}</div>
    </div>
  );
};

export default Battery;
