import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContentLayout } from "./components/admin-panel/ContentLayout";
import { useGetAllData } from "./hooks/useGetAllData";

export default function Homepage() {
  const navigate = useNavigate();
  useGetAllData();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <ContentLayout title="홈 화면">
      <div>홈 화면</div>
    </ContentLayout>
  );
}
