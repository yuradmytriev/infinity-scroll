import React from 'react';
import Layout from '../../components/Layout';
import Table from './Table';

const title = 'Table';

const action = () => {
  return {
    chunks: ['table'],
    title,
    component: (
      <Layout>
        <Table title={title}/>
      </Layout>
    ),
  };
}

export default action;
