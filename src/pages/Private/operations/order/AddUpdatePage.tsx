import { useNavigate } from "react-router-dom";
import { getIdFromParams } from "../../../../utils/getIdFromParams";
import { privateRoutesName } from "../../../../constants/routerName";
import { useEffect, useRef, useState } from "react";
import { PurchaseData } from "../../../../models/operations/purchase";
import { Form, message, UploadFile } from "antd";
import { useClientData } from "../../../../hooks/core/useClientData";
import { usePurchaseData } from "../../../../hooks/operations/usePurchaseData";
import { setFormErrors } from "../../../../utils/setFormErrors";
import {
  checkDuplicateRows,
  highlightRow,
  validateTableData,
} from "../../../../utils/tableUtils";
import setFormCode from "../../../../utils/setFormCode";
import dayjs from "dayjs";
import { mapFileList } from "../../../../utils/formatFilesUtil";
import { UploadProps } from "antd/lib";
import { HOST_URL } from "../../../../constants/ApiEndpoint";
import { formatDateYYYYMMDD } from "../../../../utils/dateUtils";
import uploadFiles from "../../../../utils/uploadFiles";
import NotFoundData from "../../../../components/display/NotFoundData";
import CustomTitle from "../../../../layout/Private/header/components/Title";
import { CSS } from "../../../../constants/UI";
import FileUpload from "../../../../components/upload/FileUpload";
import SubmitButton from "../../../../components/button/SubmitButton";
import DetailTable from "./components/DetailTable";
import InputFieldScreen from "./components/InputFieldScreen";

const AddUpdatePurchasePage: React.FC = () => {
  const navigate = useNavigate();
  const purchaseId = getIdFromParams();

  const isEditMode = window.location.pathname.includes(
    privateRoutesName.operations.purchase.update
  );

  const [showNotFound, setShowNotFound] = useState<boolean>(false);
  const [editData, setEditData] = useState<PurchaseData | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileDelete, setFileDelete] = useState<string[]>([]);

  const [form] = Form.useForm();
  const tableRef = useRef<any>();

  const { horizontal } = useClientData();

  const {
    purchaseDataById,
    loading,
    errors,
    addPurchase,
    updatePurchase,
    getPurchase,
  } = usePurchaseData({
    isLockHook: true,
    onCloseModal: () => {
      navigate(-1);
    },
  });

  useEffect(() => {
    if (isEditMode && !loading && (!purchaseId || !editData)) {
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 1000); // chờ 1 giây

      return () => clearTimeout(timer); // dọn dẹp nếu component unmount
    } else {
      setShowNotFound(false); // reset khi có data hoặc đang loading
    }
  }, [isEditMode, loading, purchaseId, editData]);

  useEffect(() => {
    if (!errors?.length) return;
    setFormErrors(form, errors);
    errors.forEach((error) => {
      if (error.element_key) highlightRow(error.element_key);
    });
  }, [errors, form]);

  useEffect(() => {
    if (isEditMode && purchaseId) {
      getPurchase(purchaseId);
    } else {
      setFormCode({
        form,
        query: {
          type: "purchase",
        },
      });
    }
  }, [isEditMode, purchaseId]);

  useEffect(() => {
    if (!purchaseDataById) return;
    setEditData(purchaseDataById);
  }, [purchaseDataById]);

  useEffect(() => {
    if (!editData) return;
    form.setFieldsValue({
      ...editData,
      timeAt: dayjs(editData.timeAt),
    });
    if (editData.files) setFileList(mapFileList(editData.files));
    tableRef.current?.setTable(editData.details);
  }, [editData, form]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemoveFile = (uid: string) => {
    setFileList((prevFileList) => {
      const fileToRemove = prevFileList.find((file) => file.uid === uid);

      if (
        fileToRemove &&
        fileToRemove.uid.startsWith("old-") &&
        fileToRemove.url
      ) {
        try {
          const relativePath = fileToRemove.url.replace(HOST_URL, "");
          setFileDelete((prevDelete) => [...prevDelete, relativePath]);
        } catch (error) {
          console.warn("Không thể xử lý url file cũ:", error);
        }
      }

      return prevFileList.filter((file) => file.uid !== uid);
    });
  };

  const handleSubmit = async () => {
    try {
      const inputData = await form.validateFields();
      const tableData = await tableRef.current?.getData();

      const requiredFields: Record<string, string> = {
        material_id: "hàng hóa",
        unit_id: "đơn vị tính",
        quantity: "số lượng",
      };

      const dupplicateFields: Record<string, string> = {
        material_id: "hàng hóa",
        unit_id: "đơn vị tính",
      };

      validateTableData(tableData, requiredFields);
      checkDuplicateRows(tableData, dupplicateFields);

      const submitData: PurchaseData = {
        ...inputData,
        timeAt: formatDateYYYYMMDD(inputData.timeAt) || "",
      };

      let files: string[] = [];
      if (fileList.length > 0) {
        files = await uploadFiles(fileList);
      }

      if (editData?.id) {
        const updateData = await tableRef.current?.getUpdateData();
        updatePurchase?.({
          ...submitData,
          id: editData.id,
          ...updateData,
          files_add: files,
          files_delete: fileDelete,
        });
      } else {
        addPurchase({
          ...submitData,
          details: tableData,
          files,
        });
      }
    } catch (error: any) {
      console.log("Form có lỗi:", error);
      message.error("Vui lòng kiểm tra lại những dữ liệu bắt buộc");
    }
  };

  if (showNotFound) {
    return <NotFoundData />;
  }

  return (
    <div className="flex flex-col h-full" style={CSS.container}>
      <div className="flex justify-between items-center mb-3">
        <div>{horizontal && <CustomTitle />}</div>
      </div>
      <div
        className="-mr-3 pr-3 relative overflow-x-hidden  overflow-y-auto"
        style={{ height: "calc(100% - 80px)" }}
      >
        <div className="h-fit md:h-full">
          <InputFieldScreen form={form} />
          <DetailTable ref={tableRef} />
        </div>
      </div>
      <div className="flex justify-between items-end mt-3">
        <FileUpload
          fileList={fileList}
          onChange={onChange}
          onRemove={(file) => handleRemoveFile(file.uid)}
        />

        <SubmitButton
          onCancel={() => navigate(-1)}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddUpdatePurchasePage;
