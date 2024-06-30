export interface IHistoryItem {
  userName: string;
  testName: string;
  points: number;
  time: string;
  grade: string;
}

export interface IHistoryTableProps {
  history: IHistoryItem[];
}
