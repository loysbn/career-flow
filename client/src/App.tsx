import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { Box } from "@chakra-ui/react";

const App = () => {
  return (
    <div>
      <Box bg="#121212" minH="100vh">
        <Navbar />
        <Dashboard />
        <Toaster />
      </Box>
    </div>
  );
};

export default App;
