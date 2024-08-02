import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { FieldType, Student } from '../types';



type CreationFormProps = {
    create: (values: Student) => Promise<void>;
}
  
const CreationForm: React.FC<CreationFormProps> = ({create}) => {
    
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
      create(values)
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    
return(
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ width: 500 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='-ml-20'
  >
    <Form.Item<FieldType>
      label="First Name"
      name="fname"
      rules={[{ required: true, message: 'Please input his first name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Last Name"
      name="lname"
      rules={[{ required: true, message: 'Please input his last name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input his email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Phone"
      name="phone"
      rules={[{ required: true, message: 'Please input his phone!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Cin"
      name="cin"
      rules={[{ required: true, message: 'Please input his cin!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        + Submit
      </Button>
    </Form.Item>
  </Form>
    )
};

export default CreationForm;