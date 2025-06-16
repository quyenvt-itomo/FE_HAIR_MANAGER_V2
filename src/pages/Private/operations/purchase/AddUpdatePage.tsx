import { useEffect, useState } from "react";
import {
  Form,
  Switch,
  Upload,
  Row,
  Col,
  UploadFile,
  Image,
  Input,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";
import { FormProps } from "antd/lib";
import { useNavigate } from "react-router-dom";
import FloatLabel from "../../../../components/display/FloatLabel";
import CategorySelect from "../../../../components/manager_select/CategorySelect";
import UnitSelect from "../../../../components/manager_select/UnitSelect";
import InputMoney from "../../../../components/input/InputMoney";
import TextArea from "antd/es/input/TextArea";
import InputWeight from "../../../../components/input/InputWeight";
import LengthSelect from "../../../../components/manager_select/LengthSelect";
import HairToneSelect from "../../../../components/manager_select/HairToneSelect";
import HairQualitySelect from "../../../../components/manager_select/HairQualitySelect";
import HairTypeSelect from "../../../../components/manager_select/HairTypeSelect";
import { getIdFromParams } from "../../../../utils/getIdFromParams";
import { ProductData } from "../../../../models/categories/product";
import { HOST_URL } from "../../../../constants/ApiEndpoint";
import { CSS } from "../../../../constants/UI";
import SubmitButton from "../../../../components/button/SubmitButton";
import { uploads } from "../../../../utils/uploads";
import { useProductData } from "../../../../hooks/categories/useProductData";
import { privateRoutesName } from "../../../../constants/routerName";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import NotFoundData from "../../../../components/display/NotFoundData";
import { mapFileList } from "../../../../utils/formatFilesUtil";
import { LengthData } from "../../../../models/categories/attribute";
import CustomTitle from "../../../../layout/Private/header/components/Title";
import ProductTypeSelect from "../../../../components/manager_select/ProductTypeSelect";
import WarehouseSelect from "../../../../components/select/WarehouseSelect";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const AddUpdateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const id = getIdFromParams();
  const isEditMode = window.location.pathname.includes(
    privateRoutesName.categories.product.update
  );

  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [editData, setEditData] = useState<ProductData | null>(null);
  const [showNotFound, setShowNotFound] = useState<boolean>(false);

  const lengthCm: LengthData | undefined = Form.useWatch("length_data", form);

  const { horizontal } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  const { productDataById, loading, getProduct, addProduct, updateProduct } =
    useProductData({
      isLockHook: true,
      onCloseModal: () => {
        navigate(-1);
      },
    });

  useEffect(() => {
    if (lengthCm) {
      const lengthInch = (Number(lengthCm.name) / 2.54).toFixed(2);
      form.setFieldsValue({ length_inch: lengthInch });
    }
  }, [lengthCm, form]);

  useEffect(() => {
    if (!isEditMode || !id) return;
    getProduct(id);
  }, [id, isEditMode]);

  useEffect(() => {
    if (!isEditMode || !productDataById) return;
    setEditData(productDataById);
  }, [isEditMode, productDataById]);

  useEffect(() => {
    if (!editData) return;

    form.setFieldsValue({
      ...editData,
      category_id: editData.category_data?.id,
      type_id: editData.type_data?.id,
      unit_id: editData.unit_data?.id,
      warehouse_default_id: editData.warehouse_data?.id,
      length_id: editData.length_data?.id,
      hair_tone_id: editData.hair_tone_data?.id,
      hair_quality_id: editData.hair_quality_data?.id,
      hair_type_id: editData.hair_type_data?.id,
    });
    setFileList(mapFileList(editData.pictures));
  }, [editData, form]);

  useEffect(() => {
    if (isEditMode && !loading && (!id || !editData)) {
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 1000); // chờ 1 giây

      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
    }
  }, [loading, id, editData, isEditMode]);

  const onFinish: FormProps<ProductData>["onFinish"] = async (
    values: ProductData
  ) => {
    let uploadedPictures: string[] = [];

    const newFiles = fileList.filter((file) => !file.url);
    if (newFiles.length > 0) {
      uploadedPictures = await uploads(newFiles);
      if (!uploadedPictures) return;
    }

    const payload = {
      ...values,
      pictures: uploadedPictures,
      pictures_delete: deletedImages,
      pictures_insert: uploadedPictures,
    };
    if (isEditMode) {
      payload.id = id;
      updateProduct(payload);
    } else {
      addProduct(payload);
    }
  };

  // Convert file to base64
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Handle file change
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const validFileList = newFileList.filter(
      (file): file is UploadFile => file !== null
    );

    const uniqueFiles = validFileList.filter(
      (file, index, self) =>
        index === self.findIndex((t) => t.name === file.name)
    );

    setFileList(uniqueFiles);
  };

  // Preview image
  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleRemove = (file: UploadFile) => {
    if (file.url) {
      const imageUrl = file.url.replace(`${HOST_URL}`, "");
      setDeletedImages((prev) => [...prev, imageUrl]);
    }
    return true;
  };

  if (showNotFound) {
    return <NotFoundData />;
  }

  return (
    <div className="h-full overflow-y-auto" style={CSS.container}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-6 m-6 mt-0"
        initialValues={{
          initial_balance: 0,
        }}
      >
        <div className="col-span-1 md:col-span-2 flex justify-between items-center">
          <div className="hidden lg:flex mr-2">
            {horizontal ? <CustomTitle /> : <></>}
          </div>
          <SubmitButton
            onCancel={() => navigate(-1)}
            onSubmit={() => {}}
          />
        </div>
        <div className="space-y-6">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category_id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn nhóm hàng",
                  },
                ]}
                className="mb-4"
              >
                <FloatLabel label="Nhóm hàng" required>
                  <CategorySelect placeholder="" />
                </FloatLabel>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type_id" className="mb-4">
                <FloatLabel label="Kiểu hàng">
                  <ProductTypeSelect placeholder="" />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col span={24}>
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã hàng",
                  },
                ]}
              >
                <FloatLabel label="Mã hàng" required>
                  <Input className="h-9 w-full" />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-around">
            <Col span={24}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên hàng",
                  },
                ]}
              >
                <FloatLabel label="Tên hàng" required>
                  <Input className="h-9 w-full" />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="unit_id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn đơn vị tính",
                  },
                ]}
              >
                <FloatLabel label="Đơn vị tính" required>
                  <UnitSelect placeholder="" />
                </FloatLabel>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="price">
                <FloatLabel label="Đơn giá">
                  <InputMoney className="h-9 w-full not-right flex items-center" />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col span={24}>
              <Form.Item name="detail">
                <FloatLabel label="Chi tiết">
                  <TextArea rows={4} />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col span={24}>
              <Form.Item name="warehouse_default_id">
                <FloatLabel label="Kho mặc định">
                  <WarehouseSelect
                    placeholder=""
                    defaultData={editData?.warehouse_data}
                  />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col span={24}>
              <Form.Item name="initial_balance">
                <FloatLabel label="Tồn ban đầu">
                  <InputWeight
                    className="h-9 w-full flex items-center not-right"
                    disabled={isEditMode}
                  />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="space-y-6">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="length_id">
                <FloatLabel label="Độ dài (cm)">
                  <LengthSelect
                    placeholder=""
                    onChangeData={(value) => {
                      form.setFieldsValue({ length_data: value });
                    }}
                  />
                </FloatLabel>
              </Form.Item>
              <Form.Item name="length_data" hidden />
            </Col>
            <Col span={12}>
              <Form.Item name="length_inch">
                <FloatLabel label="Độ dài (inch)">
                  <InputNumber
                    className="h-9 flex items-center w-full"
                    disabled
                  />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="hair_color">
                <FloatLabel label="Màu tóc">
                  <Input className="h-9 w-full" />
                </FloatLabel>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="string_color">
                <FloatLabel label="Dây màu">
                  <Input className="h-9 w-full" />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="hair_tone_id">
                <FloatLabel label="Tông tóc">
                  <HairToneSelect placeholder="" />
                </FloatLabel>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="quality">
                <FloatLabel label="Chất lượng đầu đuôi">
                  <Input className="h-9 w-full" />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="hair_quality_id">
                <FloatLabel label="Chất tóc">
                  <HairQualitySelect placeholder="" />
                </FloatLabel>
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="bg-gray-200 rounded-[3px] h-[38px] flex items-center justify-between px-3">
                <span className="text-gray-600">Không cắt đuôi</span>
                <Form.Item name="no_tail_cut">
                  <Switch className="bg-gray-300" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="hair_type_id">
                <FloatLabel label="Kiểu tóc">
                  <HairTypeSelect placeholder="" />
                </FloatLabel>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="hair_type_detail">
                <FloatLabel label="Chi tiết kiểu tóc">
                  <Input className="h-9 w-full" />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col span={24}>
              <Form.Item name="rubber_band_color">
                <FloatLabel label="Màu chun">
                  <Input className="h-9 w-full" />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col span={24}>
              <Form.Item name="description">
                <FloatLabel label="Lưu ý">
                  <TextArea rows={4} />
                </FloatLabel>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="col-span-1 md:col-span-2 mt-4">
          <p className="font-medium">Hình ảnh</p>
          <div className="text-center mb-4">
            <div className="flex flex-wrap gap-4">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                onRemove={handleRemove}
                beforeUpload={() => false}
                multiple
                accept="image/*"
                maxCount={100}
              >
                {
                  <PlusOutlined className="h-8 w-8  rounded-full p-2 cursor-pointer hover:drop-shadow " />
                }
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  crossOrigin="anonymous"
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddUpdateProductPage;
