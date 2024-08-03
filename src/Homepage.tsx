import { ContentLayout } from "./components/admin-panel/ContentLayout";
import { useGetAllData } from "./hooks/useGetAllData";

export default function Homepage() {
  useGetAllData();

  return (
    <ContentLayout title="홈 화면">
      <div>홈 화면</div>
    </ContentLayout>
  );
}
