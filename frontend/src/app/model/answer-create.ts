import { SelectionValue } from './enum/selection-value';

export interface AnswerCreate {
  pollRef: string;
  from?: string;
  selection: { [key: number]: SelectionValue };
}
