import React from 'react';
import styled from 'styled-components';
import { MainLayout } from './layout/MainLayout';
import { AppContextProvider } from './common/Store';

const AppContainer = styled.div`
  padding-top: 2rem;
`;

export default function App({ children }: any): JSX.Element {
  return (
    <AppContainer>
      <AppContextProvider>
        <MainLayout>{children}</MainLayout>
      </AppContextProvider>
    </AppContainer>
  );
}
