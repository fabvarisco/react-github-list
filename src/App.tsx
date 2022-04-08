import "./styles/globals.css";
import Layout from "./components/Layout/layout";
import List from "./components/List/list";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Modal/profile";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/user/:id" element={<Profile />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
