package de.randomerror.pollarbear.api

import de.randomerror.pollarbear.db.enum.SelectionValue

data class AnswerEdit(
    val pollRef: String,
    val answerId: Long,
    val selection: Map<Long, SelectionValue>
)
