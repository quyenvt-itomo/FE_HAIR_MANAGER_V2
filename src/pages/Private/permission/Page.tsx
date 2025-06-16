import { useState } from "react";

import { CSS } from "../../../constants/UI";
import { PermissionGroupData } from "../../../models/permission_group";
import PermissionGroup from "./partials/PermissionGroup";
import Permission from "./partials/Permission";

const PermissionPage: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<PermissionGroupData | null>(
    null
  );

  return (
    <div className="flex flex-row h-full gap-3">
      <div
        className="flex h-full"
        style={{
          width: 360,
          ...CSS.container,
        }}
      >
        <PermissionGroup
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      </div>

      <div
        className="flex-1 flex flex-col"
        style={{ ...CSS.container, width: "calc(100% - 380px)" }}
      >
        <Permission selectedRow={selectedRow} />
      </div>
    </div>
  );
};

export default PermissionPage;
