// 날짜 변환 유틸리티 함수
export const convertDateString = (dateString: string): Date => {
  return new Date(parseInt(dateString.replace(/\/Date\((\d+)\)\//, "$1")));
};
