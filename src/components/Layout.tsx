import { Container } from '@mui/material';
import { ReactElement } from 'react';
import TopBar from './TopBar';

const Layout = (props: { children: ReactElement }) => {
  return (
    <>
      <TopBar />
      <Container>{props.children}</Container>
    </>
  );
};

export default Layout;
