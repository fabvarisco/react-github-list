import "./styles/globals.css";
import Layout from "./layout/layout";
import List from "./pages/List";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

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
