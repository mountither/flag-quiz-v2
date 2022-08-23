import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Menu from "./pages/Menu";
import SingleGame from "./pages/SingleGame";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MultiGame from "./pages/MultiGame";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="single" element={<SingleGame />} />
        <Route path="/multi">
          <Route index element={<MultiGame />} />
          <Route path=":id" element={<MultiGame />} />
        </Route>
      </Routes>
      <ToastContainer limit={2} />
    </div>
  );
}

export default App;
