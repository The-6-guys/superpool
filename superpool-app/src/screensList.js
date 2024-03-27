import React from "react";
import { Route, Routes } from "react-router-dom";

import MainMenuScreen from "./screens/MainMenuScreens/MainMenu";
import AlarmsScreen from "./screens/MainMenuScreens/AlarmsScreen";
import SecurityScreen from "./screens/MainMenuScreens/SecurityScreen";

import RobotScreen from "./screens/MainMenuScreens/RobotMenuScreens/RobotScreen";

import IOListScreen from "./screens/MainMenuScreens/GeneralMenuScreens/IOListScreen";
import ParametersScreen from "./screens/MainMenuScreens/GeneralMenuScreens/ParametersScreen";
import ProductionScreen from "./screens/MainMenuScreens/GeneralMenuScreens/ProductionScreen";

import MachineStateEMScreen from "./screens/MainMenuScreens/MachineStateScreens/MachineStateEMScreen";
import MachineStateUNScreen from "./screens/MainMenuScreens/MachineStateScreens/MachineStateUNScreen";

import ModeSelectScreen from "./screens/ModeSelectScreen";
import UserScreen from "./screens/UserScreen";

import GeneralView from "./components/GeneralView";

const ScreensList = () => {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={<GeneralView screenComponent={<MainMenuScreen />} />}
        />
        <Route
          exact
          path="/alarms"
          element={<GeneralView screenComponent={<AlarmsScreen />} />}
        />
        <Route
          exact
          path="/security"
          element={<GeneralView screenComponent={<SecurityScreen />} />}
        />
        <Route
          exact
          path="/robot"
          element={<GeneralView screenComponent={<RobotScreen />} />}
        />
        <Route
          exact
          path="/ioList"
          element={<GeneralView screenComponent={<IOListScreen />} />}
        />
        <Route
          exact
          path="/parameters"
          element={<GeneralView screenComponent={<ParametersScreen />} />}
        />
        <Route
          exact
          path="/production"
          element={<GeneralView screenComponent={<ProductionScreen />} />}
        />
        <Route
          exact
          path="/machineStateEM"
          element={<GeneralView screenComponent={<MachineStateEMScreen />} />}
        />
        <Route
          exact
          path="/machineStateUN"
          element={<GeneralView screenComponent={<MachineStateUNScreen />} />}
        />
        <Route
          exact
          path="/modeSelect"
          element={<GeneralView screenComponent={<ModeSelectScreen />} />}
        />
        <Route
          exact
          path="/user"
          element={<GeneralView screenComponent={<UserScreen />} />}
        />
      </Routes>
    </div>
  );
};

export default ScreensList;
