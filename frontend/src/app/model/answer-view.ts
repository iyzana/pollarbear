import { SelectionValue } from './enum/selection-value';

export class AnswerView {
  from?: string;
  selection: { [key: number]: SelectionValue };
  id: number;
}
