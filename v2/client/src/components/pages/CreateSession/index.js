import React, { Component } from 'react';
// import axios from 'axios';
import { DatePicker, Select, Input } from 'antd';
import moment from 'moment';
// import { sessions, regions } from './options';
// import swal from 'sweet-alert';

import {
  Form,
  CreateSessionWrapper,
  InputDiv,
  Heading,
  Button,
  Error,
} from './create-session.style';

const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class CreateSession extends Component {
  state = {
    session: '',
    startDate: null,
    inviteesNumber: '',
    region: null,
    partner: '',
    emails: [],
    err: false,
  };

  onDateChange = defaultValue => {
    this.setState({
      startDate: defaultValue,
    });
  };

  onInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  onSelectSessionChange = value => {
    this.setState({
      session: value,
    });
  };

  onSelectRegionChange = value => {
    this.setState({
      region: value,
    });
  };

  onSelectPartnerChange = value => {
    this.setState({
      partner: value,
    });
  };

  onEmailChange = value => {
    this.setState({
      emails: value,
    });
  };

  checkError = () => {
    const { startDate, inviteesNumber, session, region, partner } = this.state;
    const isError = !(
      !!startDate &&
      !!inviteesNumber &&
      !!session &&
      !!region &&
      !!partner
    );

    this.setState({
      err: isError,
    });
    return isError;
  };

  fetch = () => {
    // const { inviteesNumber, session, region, partner, emails } = this.state;
    // const sessionData = {
    //   sessionType: session.value,
    //   startDate: moment(startDate).format('YYYY,MM,DD'),
    //   inviteesNumber,
    //   region: region.value,
    //   region: region.value,
    //   partner: partner.value,

    // };
    setTimeout(() => console.log(this.state), 3000);
    //   axios
    //     .post('/api/session', sessionData)
    //     .then(res => console.log(res))
    //
    //     .catch(err => console.log(err));
  };

  onFormSubmit = event => {
    event.preventDefault();
    return !this.checkError() && this.fetch();
  };

  render() {
    const { startDate, inviteesNumber, err } = this.state;
    const {
      onDateChange,
      onInputChange,
      onSelectSessionChange,
      onSelectRegionChange,
      onSelectPartnerChange,
      onEmailChange,
      onFormSubmit,
    } = this;
    return (
      <CreateSessionWrapper>
        <Heading>Create New Session</Heading>

        <Form onSubmit={onFormSubmit}>
          <InputDiv>
            <DatePicker
              onChange={onDateChange}
              name="startDate"
              defaultValue={moment('2019-01-01', 'YYYY-MM-DD')}
              size="large"
              style={{ width: '100%' }}
              value={startDate}
            />
          </InputDiv>

          <InputDiv>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Click to select session No."
              optionFilterProp="children"
              onChange={onSelectSessionChange}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              size="large"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </InputDiv>

          <InputDiv>
            <Input
              type="number"
              placeholder="Number of session invitees"
              value={inviteesNumber}
              onChange={onInputChange}
              name="inviteesNumber"
              size="large"
              min="0"
            />
          </InputDiv>

          <InputDiv>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Region"
              optionFilterProp="children"
              onChange={onSelectRegionChange}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              size="large"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </InputDiv>

          <InputDiv>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Partner Trainer"
              optionFilterProp="children"
              onChange={onSelectPartnerChange}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              size="large"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </InputDiv>

          <InputDiv>
            <Select
              mode="tags"
              size="large"
              placeholder="participants Emails"
              onChange={onEmailChange}
              defaultValue={['a10', 'c12']}
              style={{ width: '100%', height: '100%' }}
            >
              {children}
            </Select>
          </InputDiv>
          <div>
            <input
              type="checkbox"
              id="sendEmail"
              name="sendEmail"
              value="value"
            />
            <label htmlFor="sendEmail">
              Send the survey to participants by email
            </label>
          </div>
          <Button type="submit">Submit</Button>
          {err && <Error>All inputs are required</Error>}
        </Form>
      </CreateSessionWrapper>
    );
  }
}

export default CreateSession;
