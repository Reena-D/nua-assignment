import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import BooksTable from './components/BooksTable';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <BooksTable />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </UserAuthContextProvider>
          </BrowserRouter>
    </div>
  );
}

export default App;
