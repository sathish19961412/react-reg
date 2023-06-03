
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
         <Routes>
             <Route path="/register" element={<RegisterPage/>} />
             <Route path="/login" element={<LoginPage/>} />
             <Route path="/dashboard" element={<h1>Welcome tO dashboard</h1>} />
             <Route path="/" element={<h1>Home</h1>} />
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
