import React, { useState } from "react";
// import { Button, Form, Card } from "react-bootstrap";
import {
  Button,
  Form,
  Card,
  Input,
  Checkbox,
  InputNumber,
  Select,
  Radio,
} from "antd";
import { v4 as uuidv4 } from "uuid";

import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import Footer from "../../layouts/Footer";

import ProductItem from "./components/ProductItem";

import * as S from "./styles";

const initialValues = {
  productName: "",
  description: "",
  price: 0,
  brand: "",
  option: [],
  color: "",
  isNew: false,
};

function HomePage({ name }) {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [productList, setProductList] = useState([]);

  function handleCreateProduct(values) {
    console.log(
      "🚀 ~ file: index.jsx ~ line 42 ~ handleCreateProduct ~ values",
      values
    );
    const newProduct = {
      id: uuidv4(),
      ...values,
    };
    const newProductList = [newProduct, ...productList];
    setProductList(newProductList);
  }

  function handleUpdateProduct(id, values) {
    const newProductList = [...productList];
    const productIndex = newProductList.findIndex(
      (item) => item.id === id
    );
    newProductList.splice(productIndex, 1, {
      id: id,
      ...values,
    });
    setProductList(newProductList);
  }

  function handleDeleteProduct(id) {
    const newProductList = productList.filter(
      (item) => item.id !== id
    );
    setProductList(newProductList);
  }

  function renderProductList() {
    return productList.map((item, index) => {
      return (
        <ProductItem
          key={index}
          productData={item}
          handleUpdateProduct={handleUpdateProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      );
    });
  }

  return (
    <>
      <Header
        name={name}
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <S.MainWrapper>
        <Sidebar isShowSidebar={isShowSidebar} />
        <S.ContentWrapper isShowSidebar={isShowSidebar}>
          <Card size="small" title="Create Product">
            <Form
              name="Create Product"
              layout="vertical"
              initialValues={initialValues}
              onFinish={(values) =>
                handleCreateProduct(values)
              }
            >
              <Form.Item
                label="Product Name"
                name="productName"
                validateFirst
                rules={[
                  {
                    required: true,
                    message: "Name là bắt buộc!",
                  },
                  {
                    min: 4,
                    max: 12,
                    message: "Name phải có từ 4-12 kí tự!",
                  },
                  {
                    type: "url",
                    message: "Url không hợp lệ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Description là bắt buộc!",
                  },
                ]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
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
              <Form.Item
                name="isNew"
                valuePropName="checked"
              >
                <Checkbox>Is New</Checkbox>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </Card>
          {renderProductList()}
        </S.ContentWrapper>
      </S.MainWrapper>
      <Footer />
    </>
  );
}

export default HomePage;
