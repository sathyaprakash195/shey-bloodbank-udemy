import React from "react";
import InventoryForm from "./InventoryForm";
import { Button, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { GetInventory } from "../../../apicalls/inventory";
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat } from "../../../utils/helpers";

function Inventory() {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + " ML",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        if (record.inventoryType === "in") {
          return record.donar.name;
        } else {
          return record.hospital.hospitalName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render : (text) => getDateFormat(text)
    },
  ];

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventory();
      dispatch(SetLoading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <Button type="default" onClick={() => setOpen(true)}>
          Add Inventory
        </Button>
      </div>

      <Table columns={columns} dataSource={data} 
       className="mt-3"
      />

      {open && <InventoryForm open={open} setOpen={setOpen} 
      
       reloadData={getData}
      />}
    </div>
  );
}

export default Inventory;
