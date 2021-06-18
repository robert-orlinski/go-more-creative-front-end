import React from 'react';

import { Layout } from '../components/Layout';
import { AuthGuard } from '../components/AuthGuard';
import { MainTitle } from '../components/MainTitle';
import { MainWrapper } from '../components/MainWrapper';
import { EntriesList } from '../components/EntriesList';

const List = () => (
  <Layout>
    <AuthGuard>
      <MainWrapper>
        <MainTitle>here you can check all your past ideas!</MainTitle>
        <EntriesList />
      </MainWrapper>
    </AuthGuard>
  </Layout>
);

export default List;
