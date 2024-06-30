export interface IHistoryItem {
  userName: string;
  testName: string;
  points: number;
  time: string;
  grade: string;
  percentage: number;
}

export interface IHistoryTableProps {
  history: IHistoryItem[];
}
