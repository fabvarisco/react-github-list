import "./styles/globals.css";
import Layout from "./Layout/layout";
import List from "./Pages/List/list";
import { Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile/profile";

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
