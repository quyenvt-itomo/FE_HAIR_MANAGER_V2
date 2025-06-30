import { useEffect, useState } from "react";
import { Checkbox, Button, Divider } from "antd";
import { Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {
  PermissionMap,
  translatePermission,
} from "../../../../utils/permission_common";
import { hasAnyRequiredPermission } from "../../../../utils/permissionUtils";
import { PermissionGroupData } from "../../../../models/permission_group";
import { PermissionData } from "../../../../models/permission";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { usePermissionGroupData } from "../../../../hooks/usePermissionGroupData";

const { Title } = Typography;

const PermissionGroup: React.FC<{
  group: string;
  permissions: PermissionData[];
  onParentChange: any;
  onChildChange: any;
  disabled?: boolean;
}> = ({ group, permissions, onParentChange, onChildChange, disabled }) => {
  const isParentChecked = permissions.every((p) => p.check);
  const isParentIndeterminate =
    permissions.some((p) => p.check) && !isParentChecked;

  return (
    <div className="border-2 rounded-md border-slate-200 w-full space-y-2 pb-3">
      <div className="bg-[#E3E3E3] px-4 py-2 flex items-center">
        <Checkbox
          checked={isParentChecked}
          indeterminate={isParentIndeterminate}
          onChange={(e) => onParentChange(group, e.target.checked)}
          className="font-bold"
          disabled={disabled}
        >
          {translatePermission(group)}
        </Checkbox>
      </div>
      <div className="pl-6 space-y-3">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center space-x-3">
            <Checkbox
              checked={permission.check}
              onChange={(e) => onChildChange(permission.id, e.target.checked)}
              className="pr-3"
              disabled={disabled}
            />
            {translatePermission(permission.name)}
          </div>
        ))}
      </div>
    </div>
  );
};

interface PermissionProps {
  selectedRow: PermissionGroupData | null;
}

const Permission: React.FC<PermissionProps> = ({ selectedRow }) => {
  const [permissionDetail, setPermissionDetail] = useState<PermissionData[]>(
    []
  );
  const groupedPermissions = permissionDetail.reduce((groups, permission) => {
    if (!groups[permission.group]) groups[permission.group] = [];
    groups[permission.group].push(permission);
    return groups;
  }, {} as Record<string, PermissionData[]>);

  const { permissions } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  const { updatePermissionGroup } = usePermissionGroupData({
    isLockHook: true,
  });

  useEffect(() => {
    if (selectedRow) {
      setPermissionDetail(selectedRow.permissionDetail as PermissionData[]);
    }
  }, [selectedRow]);

  const handleChildCheckboxChange = (
    permissionId: number,
    checked: boolean
  ) => {
    setPermissionDetail((prev) =>
      prev.map((p) => (p.id === permissionId ? { ...p, check: checked } : p))
    );
  };

  const handleParentCheckboxChange = (group: string, checked: boolean) => {
    setPermissionDetail((prev) =>
      prev.map((p) => (p.group === group ? { ...p, check: checked } : p))
    );
  };

  const handleSave = () => {
    if (!selectedRow) return;

    updatePermissionGroup({
      ...selectedRow,
      permissionIds: permissionDetail.filter((p) => p.check).map((p) => p.id),
    });
  };

  const hasPermission = hasAnyRequiredPermission(permissions || [], [
    PermissionMap.PERMISSION_GROUP.UPDATE_PERMISSION_GROUP,
  ]);
  const isDisabled = selectedRow?.isDefault && hasPermission;

  return (
    <>
      <div className="flex justify-between">
        <Title level={4}>{selectedRow?.name || ""}</Title>
        {hasPermission && (
          <Button
            type="primary"
            className="w-24 h-8 rounded-[3px]"
            icon={<SaveOutlined />}
            onClick={handleSave}
            disabled={isDisabled}
          >
            Lưu
          </Button>
        )}
      </div>
      <div style={{ height: "calc(100% - 32px)", overflowY: "auto", marginTop: "12px" }}>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {Object.entries(groupedPermissions).map(([group, permissions]) => (
            <PermissionGroup
              key={group}
              group={group}
              permissions={permissions}
              onParentChange={handleParentCheckboxChange}
              onChildChange={handleChildCheckboxChange}
              disabled={isDisabled}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Permission;
