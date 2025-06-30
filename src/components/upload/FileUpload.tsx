import React, { useEffect, useState } from "react";
import { Upload, Popover, Tooltip } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { UploadProps } from "antd";
import "./upload.css";
import { fileExtensionMap } from "../../constants/fileExtensionMap";

interface AttachedFileUploadProps extends UploadProps {
  fileList: any[];
  absolute?: boolean;
  width?: number | string;
}

const FileUpload: React.FC<AttachedFileUploadProps> = ({
  fileList,
  maxCount = 1,
  absolute = true,
  width = 520,
  onChange,
  onRemove,
  ...rest
}) => {
  const handleChange: UploadProps["onChange"] = ({ file, fileList }) => {
    const updatedList = fileList.map((f: any) => ({
      ...f,
      thumbUrl:
        f.thumbUrl || "https://cdn-icons-png.flaticon.com/512/337/337946.png",
    }));
    onChange?.({ file, fileList: updatedList });
  };

  const handleRemove = async (file: any) => {
    onRemove?.(file);
    return true;
  };

  const [maxVisibleFiles, setMaxVisibleFiles] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setMaxVisibleFiles(2);
      } else {
        setMaxVisibleFiles(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleFiles = fileList.slice(0, maxVisibleFiles);
  const hiddenFiles = fileList.slice(maxVisibleFiles);

  const getFileIcon = (fileName: string) => {
    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

    return (
      fileExtensionMap[fileExtension] ||
      "https://cdn-icons-png.flaticon.com/512/94/94730.png"
    );
  };

  const renderHiddenFiles = (
    <div className="hidden-file-list" onClick={(e) => e.stopPropagation()}>
      <div className="font-semibold mb-2">Danh sách tài liệu</div>
      {hiddenFiles.map((file) => (
        <div
          key={file.uid}
          className="flex justify-between items-center gap-2 py-1 text-sm"
        >
          <div className="flex items-center gap-2">
            <img src={getFileIcon(file.name)} className="w-4 h-4" alt="pdf" />
            <span className="truncate max-w-[160px]">{file.name}</span>
          </div>

          <TrashIcon
            className="w-4 h-4 text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Thêm stopPropagation ở đây nếu popover cũng có thể click để xóa
              handleRemove(file);
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <Upload
      accept=".pdf,.xls,.xlsx,.doc,.docx,.zip,.rar,.txt"
      fileList={fileList}
      showUploadList={false}
      multiple
      onChange={handleChange}
      onRemove={handleRemove}
      beforeUpload={() => false}
      className="full-area-upload"
      {...rest}
    >
      <div
        className="upload-container flex flex-col sm:flex-row items-start sm:items-center gap-4   mx-auto cursor-pointer"
        style={{ width }}
      >
        <div className="flex-1 flex flex-wrap items-center gap-3 min-h-[40px]">
          {fileList.length === 0 ? (
            <div className="text-gray-500 text-sm italic py-2 px-4 w-full text-center sm:text-left">
              Kéo thả file vào đây
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <div className="flex ">
                  {visibleFiles.map((file) => (
                    <div
                      key={file.uid}
                      className="file-thumbnail flex flex-col items-center group relative
                    p-2 rounded-md border border-transparent
                    hover:border-blue-300 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={getFileIcon(file.name)}
                        alt={file.name}
                        className="w-4 h-4 object-contain mb-1"
                      />
                      <Tooltip title={file.name}>
                        <span className="truncate text-xs text-center w-16 max-w-full block">
                          {file.name}
                        </span>
                      </Tooltip>
                      <TrashIcon
                        className="w-5 h-5 text-red-500 mr-1 mt-1 cursor-pointer
                        absolute -top-1 -right-1 bg-white rounded-full p-[2px] shadow
                        opacity-0 translate-y-1 transition-all duration-300
                        group-hover:opacity-100 group-hover:translate-y-0"
                        onClick={(e) => {
                          e.stopPropagation(); // Đảm bảo ngăn chặn nổi bọt khi click TrashIcon
                          handleRemove(file);
                        }}
                      />
                    </div>
                  ))}
                </div>

                {hiddenFiles.length > 0 && (
                  <Popover content={renderHiddenFiles} trigger="click">
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-blue-600 text-blue-600 text-sm cursor-pointer hover:bg-blue-50 transition-colors duration-200 ml-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      +{hiddenFiles.length}
                    </div>
                  </Popover>
                )}
              </div>
            </>
          )}
        </div>
        <button
          className="h-14 w-14 border-l border-gray-300 flex items-center justify-center
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
             rounded transition-all duration-100"
        >
          <span className="text-xl text-blue-600">
            <UploadOutlined />
          </span>
        </button>
      </div>
    </Upload>
  );
};

export default FileUpload;
