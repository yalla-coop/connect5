import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../common/Button';

import {
  Wrapper,
  ContentWrapper,
  Form,
  Input,
  Select,
  Item,
} from './AddTrainer.style';

const { Option } = Select;

const regions = [
  'North East',
  'North West',
  'Yorkshire and the Humber',
  'East Midlands',
  'West Midlands',
  'East of England',
  'London',
  'South East',
  'South West',
];

class AddTrainer extends Component {
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // post data to back-end
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Wrapper>
        <ContentWrapper>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item hasFeedback style={{ margin: '20px auto 40px' }}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(
                <Input
                  placeholder="Email"
                  onBlur={this.handleEmailBlur}
                  size="large"
                  style={{ height: '50px' }}
                />
              )}
            </Item>
            <Item hasFeedback style={{ margin: '20px auto 40px' }}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                  {
                    min: 3,
                    message: 'Please input valid name',
                  },
                ],
              })(
                <Input
                  placeholder="Name"
                  size="large"
                  style={{ height: '50px' }}
                />
              )}
            </Item>

            <Item style={{ margin: '20px auto 40px', height: '50px' }}>
              {getFieldDecorator('region', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your region',
                  },
                ],
              })(
                <div className="add-trainer__select">
                  <Select
                    placeholder="Region"
                    size="large"
                    style={{ height: '50px' }}
                  >
                    {regions.map(region => (
                      <Option value={region} key={region}>
                        {region}
                      </Option>
                    ))}
                  </Select>
                </div>
              )}
            </Item>
            <Item as="div" style={{ margin: '20px auto 40px', height: '50px' }}>
              <Button
                type="primary"
                htmlType="submit"
                label="Submit"
                width="100%"
                height="100%"
                style={{ fontSize: '19px' }}
              />
            </Item>
          </Form>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default connect()(Form.create({ name: 'AddTrainer' })(AddTrainer));
