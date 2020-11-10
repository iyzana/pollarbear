import { AnswerView } from './answer-view';
import { AnswerKind } from './enum/answer-kind';
import { OptionKind } from './enum/option-kind';
import { SecrecyKind } from './enum/secrecy-kind';
import { SelectKind } from './enum/select-kind';
import { OptionView } from './option-view';
import { SummaryKind } from './summary-kind';

export interface PollView {
  title: string;
  selectKind: SelectKind;
  secrecyKind: SecrecyKind;
  optionKind: OptionKind;
  summaryKind: SummaryKind;
  answerKind: AnswerKind;
  deadline?: Date;
  options: OptionView[];
  answers: AnswerView[];
  ref: string;
}
