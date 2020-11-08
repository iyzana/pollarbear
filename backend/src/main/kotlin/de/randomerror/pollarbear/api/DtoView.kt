package de.randomerror.pollarbear.api

import de.randomerror.pollarbear.db.entity.Answer
import de.randomerror.pollarbear.db.entity.Option
import de.randomerror.pollarbear.db.entity.Poll
import de.randomerror.pollarbear.db.entity.SummaryKind
import de.randomerror.pollarbear.db.enum.*
import java.time.LocalDateTime

data class PollView(
    val title: String,
    val selectKind: SelectKind,
    val secrecyKind: SecrecyKind,
    val optionKind: OptionKind,
    val summaryKind: SummaryKind,
    val answerKind: AnswerKind,
    val deadline: LocalDateTime?,
    val options: List<OptionView>,
    val answers: List<AnswerView>,
    val ref: String
) {
    constructor(poll: Poll) : this(
        poll.title,
        poll.selectKind,
        poll.secrecyKind,
        poll.optionKind,
        poll.summaryKind,
        poll.answerKind,
        poll.deadline,
        poll.options.map { OptionView(it) },
        poll.answers.map { AnswerView(it) },
        poll.ref
    )
}

data class OptionView(
    val text: String,
    val hasImage: Boolean,
    val id: Long = 0
) {
    constructor(option: Option) : this(
        option.text,
        option.hasImage,
        option.id
    )
}

data class AnswerView(
    val from: String?,
    val selection: Map<Long, SelectionValue>,
    val id: Long = 0
) {
    constructor(answer: Answer) : this(
        answer.from,
        answer.selection.associate { it.option.id to it.value },
        answer.id
    )
}

