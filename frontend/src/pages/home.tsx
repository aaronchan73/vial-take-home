import { Container } from '@mantine/core';
import DataGrid from "../components/dataGrid.tsx";
import Header from "../components/header.tsx";

function Home() {
    return (
    <Container>
      <Header />
      <DataGrid />
    </Container>
  );
}

export default Home;