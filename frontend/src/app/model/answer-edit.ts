import { SelectionValue } from './enum/selection-value';

export interface AnswerEdit {
  pollRef: string;
  answerId: number;
  selection: { [key: number]: SelectionValue };
}
