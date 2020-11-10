import { CutoffKind } from './enum/cutoff-kind';

export interface SummaryKind {
  cutoffKind: CutoffKind;
  cutoffValue: number;
}
