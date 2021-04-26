import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Form, Input, Button, DatePicker, message, Card } from 'antd';
import { useHistory } from "react-router-dom";
import '../css/UserForm.css';
import { getAge } from '../utils/helpers';
import {
  FORM_LAYOUT,
  FORM_TAIL_LAYOUT,
  BASE_URL,
  AGE_WARNING_MESSAGE,
  VALID_PHONE_WARNING_MESSAGE,
  DUPLICATE_FORM_WARNING_MESSAGE,
  INPUT_NAME_MESSAGE,
  VALID_NAME_WARNING_MESSAGE,
  NAME_REGEX,
  INPUT_EMAIL_MESSAGE,
  VALID_EMAIL_WARNING_MESSAGE,
  EMAIL_REGEX,
  INPUT_DOB_MESSAGE,
  INPUT_PHONE_MESSAGE,
} from '../utils/Constants';

const UserForm = (props) => {
  const { onChange } = props;

  const history = useHistory();

  const onFinish = (values) => {
    const { name, dob, email, phone } = values;
    const formattedDOB = dob.format('YYYY/MM/DD');
    const age = getAge(formattedDOB);

    if (age < 18) {
      message.warning(AGE_WARNING_MESSAGE);
      return;
    }

    // post request to save form
    axios.post(`${BASE_URL}/form`, {
      name: name,
      dob: formattedDOB,
      email: email,
      phone: phone
    })
      .then((res) => {
        message.success('Form saved!');
        onChange(2, history);
      })
      .catch((err) => {
        if (err) {
          const { status } = err.response;
          if (status === 400) {
            message.warning(VALID_PHONE_WARNING_MESSAGE);
          } else if (status === 409) {
            message.warning(DUPLICATE_FORM_WARNING_MESSAGE);
          }
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Validation failed:', errorInfo);
  };

  return (
    <div className="user-form">
      <Card>
        <Form
          {...FORM_LAYOUT}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: INPUT_NAME_MESSAGE
              },
              {
                pattern: NAME_REGEX,
                message: VALID_NAME_WARNING_MESSAGE
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: INPUT_EMAIL_MESSAGE
              },

              {
                pattern: EMAIL_REGEX,
                message: VALID_EMAIL_WARNING_MESSAGE
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              {
                required: true,
                message: INPUT_DOB_MESSAGE
              }
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phone"
            rules={[{ required: true, message: INPUT_PHONE_MESSAGE }]}
          >
            <Input
              addonBefore={
                <Form.Item name="prefix" noStyle>+91</Form.Item>
              }
            />
          </Form.Item>

          <Form.Item {...FORM_TAIL_LAYOUT}>
            <Button type="primary" htmlType="submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
};

export default UserForm;
