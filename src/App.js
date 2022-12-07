import React, { useState } from 'react';
import './style.css';
import { Form } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { Space, Table, Tag } from 'antd';

export default function App() {
  return (
    <div>
      <FormCustom />
      <TableCustom />
    </div>
  );
}

const FormCustom = () => {
  const [count, setCount] = useState(0);
  const [form] = Form.useForm();
  const onChangeNum = (event) => {
    setCount(+event.target.value);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    fetch('abc', {
      body: JSON.stringify(values),
      method: 'POST',
    })
      .then((x) => x.json())
      .then((x) => {
        console.log(x);
        form.resetFields();
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form.Item label="Nhập số">
        <Input type="number" onChange={onChangeNum} />
      </Form.Item>
      {count > 0 && (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          {Array.from({ length: count }).map((_, index) => (
            <Form.Item
              label={`Name ${index + 1}`}
              name={`name_${index}`}
              key={index}
            >
              <Input />
            </Form.Item>
          ))}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

const TableCustom = (props) => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return record.name;
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};
