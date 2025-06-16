import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { IconSetting } from "../icon/Setting";

interface CustomizeColumnDisplayProps {
  title: string;
  content: React.ReactNode;
}

const CustomizeColumnDisplay: React.FC<CustomizeColumnDisplayProps> = ({
  title,
  content,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full justify-end">
      <div className="w-[46px] flex justify-center bg-[#f0f2f4]">
        <Button type="text" onClick={() => setOpen(true)}>
          <IconSetting />
        </Button>
      </div>
      <Drawer
        title={title}
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={440}
      >
        {content}
      </Drawer>
    </div>
  );
};

export default CustomizeColumnDisplay;
