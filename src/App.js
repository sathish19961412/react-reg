
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
         <Routes>
             <Route path="/register" element={<RegisterPage/>} />
             <Route path="/login" element={<LoginPage/>} />
             <Route path="/dashboard" element={<DashboardPage/>} />
             <Route path="/" element={<RegisterPage/>} />
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
