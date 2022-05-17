import React, { useState } from "react";
import {
  Button,
  Form,
  Card,
  Input,
  Checkbox,
  InputNumber,
  Select,
  Radio,
  Space,
} from "antd";

function ProductItem({
  productData,
  handleUpdateProduct,
  handleDeleteProduct,
}) {
  const [isUpdate, setIsUpdate] = useState(false);

  if (!isUpdate) {
    return (
      <Card
        size="small"
        title={`${productData.isNew && "[NEW]"}${
          productData.productName
        }`}
        style={{ marginTop: 16, backgroundColor: "#ccc" }}
      >
        <div>Description: {productData.description}</div>
        <div>
          Price: {productData.price?.toLocaleString()} VND
        </div>
        <div>Brand: {productData.brand}</div>
        <div>Option: {productData.option?.join(", ")}</div>
        <div>Color: {productData.color}</div>
        <Space style={{ marginTop: 16 }}>
          <Button
            type="primary"
            ghost
            onClick={() => setIsUpdate(true)}
          >
            Update
          </Button>
          <Button
            danger
            onClick={() =>
              handleDeleteProduct(productData.id)
            }
          >
            Delete
          </Button>
        </Space>
      </Card>
    );
  }
  return (
    <Card
      size="small"
      title={`Update ${productData.isNew && "[NEW]"}${
        productData.productName
      }`}
      style={{ marginTop: 16, backgroundColor: "#ccc" }}
    >
      <Form
        name="Update Product"
        layout="vertical"
        initialValues={{
          productName: productData.productName,
          description: productData.description,
          price: productData.price,
          brand: productData.brand,
          option: productData.option,
          color: productData.color,
          isNew: productData.isNew,
        }}
        onFinish={(values) => {
          handleUpdateProduct(productData.id, values);
          setIsUpdate(false);
        }}
      >
        <Form.Item label="Product Name" name="productName">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Brand" name="brand">
          <Select>
            <Select.Option value="apple">
              Apple
            </Select.Option>
            <Select.Option value="samsung">
              Samsung
            </Select.Option>
            <Select.Option value="xiaomi">
              Xiaomi
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Option" name="option">
          <Checkbox.Group
            options={[
              {
                label: "Option 1",
                value: "1",
              },
              {
                label: "Option 2",
                value: "2",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Color" name="color">
          <Radio.Group>
            <Radio value="black">Black</Radio>
            <Radio value="white">White</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="isNew" valuePropName="checked">
          <Checkbox>Is New</Checkbox>
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={() => setIsUpdate(false)}>
            Cancel
          </Button>
        </Space>
      </Form>
    </Card>
  );
}

export default ProductItem;
