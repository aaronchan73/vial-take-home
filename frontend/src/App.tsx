import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import theme from "./theme";
import Home from "./pages/home";

export default function App() {
  return <MantineProvider theme={theme}>
    <Home />
  </MantineProvider>;
}
