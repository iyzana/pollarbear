package de.randomerror.pollarbear.service

import de.randomerror.pollarbear.api.AnswerCreate
import de.randomerror.pollarbear.db.AnswerRepo
import de.randomerror.pollarbear.db.PollRepo
import de.randomerror.pollarbear.db.entity.Answer
import de.randomerror.pollarbear.db.entity.Option
import de.randomerror.pollarbear.db.entity.Poll
import de.randomerror.pollarbear.db.entity.Selection
import de.randomerror.pollarbear.db.enum.OptionKind
import de.randomerror.pollarbear.db.enum.SecrecyKind
import de.randomerror.pollarbear.db.enum.SelectKind
import de.randomerror.pollarbear.db.enum.SelectionValue
import de.randomerror.pollarbear.exception.InvalidAnswer
import de.randomerror.pollarbear.exception.notFound
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class AnswerService(val answers: AnswerRepo, val polls: PollRepo) {
    fun getAllByPollRef(pollRef: String): List<Answer> {
        val poll = polls.findByRef(pollRef) ?: throw notFound<Poll>(pollRef)
        return poll.answers
    }

    fun createAnswer(answerCreate: AnswerCreate): Answer {
        val poll = polls.findByRef(answerCreate.pollRef)
            ?: throw notFound<Poll>(answerCreate.pollRef)

        assertAnswerValid(poll, answerCreate)

        val optionMap = poll.options.associateBy { it.id }
        val selection = answerCreate.selection.map { entry ->
            Selection(
                optionMap[entry.key] ?: throw notFound<Option>(entry.key),
                entry.value
            )
        }
        val answer = answers.save(Answer(selection, answerCreate.from))
        poll.answers.add(answer)
        polls.save(poll)
        return answer
    }

    private fun assertAnswerValid(
        poll: Poll,
        answerCreate: AnswerCreate
    ) {
        if (
            poll.optionKind == OptionKind.YesNo &&
            answerCreate.selection.any { it.value == SelectionValue.Maybe }
        ) {
            throw InvalidAnswer("Maybe answers are not allowed for poll ${poll.ref}")
        }
        if (
            poll.selectKind == SelectKind.Single &&
            answerCreate.selection.count { it.value == SelectionValue.Yes || it.value == SelectionValue.Maybe } != 1
        ) {
            throw InvalidAnswer("Exactly one positive answer is required for poll ${poll.ref}")
        }
        if (poll.secrecyKind == SecrecyKind.Open && answerCreate.from.isNullOrEmpty()) {
            throw InvalidAnswer("Field from is required for Open poll ${poll.ref}")
        }
        if (poll.secrecyKind == SecrecyKind.Secret && answerCreate.from != null) {
            throw InvalidAnswer("Field from may not be set for Secret poll ${poll.ref}")
        }
        if (poll.deadline != null && LocalDate.now().isAfter(poll.deadline)) {
            throw InvalidAnswer("Deadline has expired for poll ${poll.ref}")
        }
        if (poll.options.map { it.id }.toSet() != answerCreate.selection.keys) {
            throw InvalidAnswer("Answers for too many or too few options were provided for poll ${poll.ref}")
        }
    }
}
