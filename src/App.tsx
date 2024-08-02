import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import Page1 from "./pages/Page1";
import YearlyPage from "./pages/YearlyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="yearly" element={<YearlyPage />} />
          <Route path="monthly" element={<Page1 />} />
          <Route path="top" element={<Page1 />} />
          <Route path="app" element={<Page1 />} />
          <Route path="install-vs-revenue" element={<Page1 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
