import { Button, Dropdown } from "antd";
import { HOST_URL } from "../../constants/ApiEndpoint";
import { formatDateDDMMYYYY } from "../../utils/dateUtils";
import { IconExcel } from "../icon/Excel";
import HeaderTooltip from "../table/HeaderTooltip";
import { DocumentIcon } from "@heroicons/react/24/outline";

interface MediaDropdownProps {
  files: string[];
}

function parseFileInfo(fileName: string) {
  const fullFileName = fileName.split("/").pop() || "";
  const [nameWithoutTime, ...extParts] = fullFileName.split(".");
  const lastDashIndex = nameWithoutTime.lastIndexOf("-");
  const originalName = nameWithoutTime.substring(0, lastDashIndex);
  const extension = extParts.length ? `.${extParts.join(".")}` : "";

  const nameWithoutExt = fullFileName.split(".")[0];
  const timestampStr = nameWithoutExt.substring(lastDashIndex + 1);
  const timestamp = parseInt(timestampStr, 10);
  const isValidTimestamp = !isNaN(timestamp);
  const date = isValidTimestamp ? new Date(timestamp) : new Date();

  return {
    name: `${originalName}`,
    date: formatDateDDMMYYYY(date), // hoặc định dạng khác tuỳ bạn
    ext: extension,
  };
}

const MediaDropdown: React.FC<MediaDropdownProps> = ({ files }) => {
  const renderFileIcon = (file: string) => {
    if (
      file.startsWith("data:image") ||
      /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file)
    ) {
      return (
        <img
          src={`${HOST_URL}${file}`}
          alt="Image"
          className="w-full h-full object-cover rounded-lg"
        />
      );
    }

    if (/\.(mp4|mov|webm|avi|mkv)$/i.test(file)) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs rounded-lg">
          🎥
        </div>
      );
    }

    if (/\.(xlsx?|xlsm|xlsb)$/i.test(file)) {
      return <IconExcel />;
    }

    if (/\.pdf$/i.test(file)) {
      return <span className="text-red-600 text-lg">📄</span>; // Có thể thay bằng <IconPdf />
    }

    if (/\.(docx?|dotx?)$/i.test(file)) {
      return <span className="text-blue-600 text-lg">📝</span>; // Có thể thay bằng IconWord
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-xs rounded-lg">
        📁
      </div>
    );
  };

  const handlePreview = (file: string) => {
    window.open(`${HOST_URL}${file}`, "_blank");
  };

  const dropdownContent = (
    <div className="w-[600px] grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] rounded-md bg-white shadow-sm border p-1">
      {files.map((file) => {
        const { name, date, ext } = parseFileInfo(
          file.replace("uploads/temp/", "")
        );
        return (
          <div
            key={file}
            className="flex items-center gap-2 px-2 py-1 border rounded-md"
          >
            <div
              className="w-8 h-8 relative flex-shrink-0 cursor-pointer"
              onClick={() => handlePreview(file)}
            >
              {renderFileIcon(file)}
            </div>

            <div
              className="flex flex-col justify-between"
              style={{ width: "calc(100% - 80px)" }}
            >
              <HeaderTooltip title={`${name}.${ext}`} />
              <div className="text-sm text-gray-500">{date}</div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Dropdown
      trigger={["click"]}
      dropdownRender={() => dropdownContent}
      placement="bottomRight"
    >
      <Button
        type="link"
        className="flex items-center gap-1 text-blue-600"
        size="small"
      >
        <DocumentIcon className="w-4 h-4" />
        Xem tài liệu
      </Button>
    </Dropdown>
  );
};

export default MediaDropdown;
