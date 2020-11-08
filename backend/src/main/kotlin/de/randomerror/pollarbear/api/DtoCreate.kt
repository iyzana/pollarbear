package de.randomerror.pollarbear.api

import de.randomerror.pollarbear.db.entity.SummaryKind
import de.randomerror.pollarbear.db.enum.*
import java.time.LocalDateTime

data class PollCreate(
    val title: String,
    val selectKind: SelectKind,
    val secrecyKind: SecrecyKind,
    val optionKind: OptionKind,
    val summaryKind: SummaryKind,
    val answerKind: AnswerKind,
    val deadline: LocalDateTime?,
    val options: List<OptionCreate>
)

data class OptionCreate(
    val text: String,
    val imageRef: String?
)

data class AnswerCreate(
    val pollRef: String,
    val from: String?,
    val selection: Map<Long, SelectionValue>
)

