import { AnswerKind } from './enum/answer-kind';
import { OptionCreate } from './option-create';
import { OptionKind } from './enum/option-kind';
import { SecrecyKind } from './enum/secrecy-kind';
import { SelectKind } from './enum/select-kind';
import { SummaryKind } from './summary-kind';

export interface PollCreate {
  title: string;
  selectKind: SelectKind;
  secrecyKind: SecrecyKind;
  optionKind: OptionKind;
  summaryKind: SummaryKind;
  answerKind: AnswerKind;
  deadline?: Date;
  options: OptionCreate[];
}
