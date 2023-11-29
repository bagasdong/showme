// Import necessary modules from react-router-dom
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./pages/Navigation";

// App component
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
