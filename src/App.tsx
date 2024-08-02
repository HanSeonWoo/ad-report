import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import YearlyPage from "./pages/YearlyPage";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import MonthlyPage from "./pages/MonthlyPage";

function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="yearly" element={<YearlyPage />} />
            <Route path="monthly" element={<MonthlyPage />} />
            {/* <Route path="top" element={<Page1 />} />
            <Route path="app" element={<Page1 />} />
            <Route path="install-vs-revenue" element={<Page1 />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}

export default App;
