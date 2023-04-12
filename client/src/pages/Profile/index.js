import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import Donars from "./Donars";
import Hospitals from "./Hospitals";
import Organizations from "./Organizations";
import InvetoryTable from "../../components/InvetoryTable";

function Profile() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs>
        {currentUser.userType === "organization" && (
          <>
            <Tabs.TabPane tab="Inventory" key="1">
              <Inventory />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Donars" key="2">
              <Donars />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hospitals" key="3">
              <Hospitals />
            </Tabs.TabPane>
          </>
        )}

        {currentUser.userType === "donar" && (
          <>
            <Tabs.TabPane tab="Donations" key="4">
              <InvetoryTable
                filters={{
                  inventoryType: "in",
                  donar: currentUser._id,
                }}
                userType="donar"
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Organizations" key="5">
              <Organizations userType="donar" />
            </Tabs.TabPane>
          </>
        )}

        {currentUser.userType === "hospital" && (
          <>
            <Tabs.TabPane tab="Consumptions" key="6">
              <InvetoryTable
                filters={{
                  inventoryType: "out",
                  hospital: currentUser._id,
                }}
                userType="hospital"
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Organizations" key="7">
              <Organizations userType="hospital" />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
