import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import List from "./pages/List";
import Profile from "./pages/Profile";
import "./styles/globals.css";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/:login" element={<Profile />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
