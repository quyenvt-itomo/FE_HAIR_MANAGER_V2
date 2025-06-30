import uploads from "./uploads";

interface FileItem {
  originFileObj?: File;
  [key: string]: any;
}

/**
 * Upload multiple files and return uploaded file data array.
 * @param fileList Danh sách file từ Upload component (Ant Design hoặc custom).
 * @param uploads Hàm gọi API upload: (formData, keys) => Promise<UploadResponse>
 */
async function uploadFiles(fileList: FileItem[]): Promise<string[]> {
  const formData = new FormData();
  const keys: string[] = [];

  fileList.forEach((fileItem, index) => {
    if (fileItem.originFileObj) {
      const key = `file_${index}`;
      keys.push(key);
      formData.append("files[]", fileItem.originFileObj);
      formData.append("keys[]", key);
    }
  });

  if (keys.length === 0) return [];

  const response = await uploads(formData, keys);
  if (!response) return [];

  const files: string[] = [];

  keys.forEach((key) => {
    if (response[key]) {
      files.push(response[key]);
    }
  });

  return files;
}

export default uploadFiles;
  