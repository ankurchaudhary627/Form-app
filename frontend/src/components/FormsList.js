import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Empty,
  Spin,
  Button,
  Collapse,
} from 'antd';
import {
  LoadingOutlined
} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import '../css/FormsList.css';
import { getText } from '../utils/helpers';
import { BASE_URL } from '../utils/Constants';

const { Panel } = Collapse;
const loadingIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

const FormsList = (props) => {
  const { onChange } = props;
  const history = useHistory();
  const [forms, setforms] = useState([]);
  const [loadingForms, setloadingForms] = useState(false);
  const [isEmpty, setisEmpty] = useState(false);

  const fetchForms = () => {
    setloadingForms(true);
    axios.get(`${BASE_URL}/forms`)
      .then((res) => {
        if (res.data.length === 0) {
          setisEmpty(true);
        } else {
          setisEmpty(false);
          setforms(res.data);
        }
      })
      .then(() => setloadingForms(false))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div>
      <div className="forms-list">
        <Button type="primary" onClick={() => onChange(1, history)}>
          New form
        </Button>
      </div>
      {
        isEmpty ?
          <div className='content-empty'>
            <Empty
              description='No forms here...'
            />
          </div>
          :
          null
      }
      {
        loadingForms ?
          <Spin indicator={loadingIcon} />
          :
          <Collapse accordion>
            {
              forms.map((form, index) => {
                const { name, dob, email, phone } = form;
                return (
                  <Panel header={form.name} key={index}>
                    {getText(name, email, dob, phone)}
                  </Panel>
                );
              })
            }
          </Collapse>
      }
    </div>
  )
};

export default FormsList;
