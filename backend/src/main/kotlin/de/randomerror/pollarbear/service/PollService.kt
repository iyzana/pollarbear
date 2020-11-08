package de.randomerror.pollarbear.service

import de.randomerror.pollarbear.api.PollCreate
import de.randomerror.pollarbear.db.PollRepo
import de.randomerror.pollarbear.db.entity.Option
import de.randomerror.pollarbear.db.entity.Poll
import de.randomerror.pollarbear.db.enum.AnswerKind
import de.randomerror.pollarbear.exception.InvalidPoll
import de.randomerror.pollarbear.exception.notFound
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.format.DateTimeParseException

@Service
class PollService(val polls: PollRepo) {
    fun getAll(): List<Poll> {
        return polls.findAll()
    }

    fun getByRef(ref: String): Poll {
        return polls.findByRef(ref) ?: throw notFound<Poll>(ref)
    }

    fun createPoll(pollCreate: PollCreate): Poll {
        assertPollValid(pollCreate)
        val options = pollCreate.options.map { optionCreate ->
            // todo: image handling
            Option(optionCreate.text, optionCreate.imageRef !== null)
        }
        val poll = Poll(
            pollCreate.title,
            pollCreate.selectKind,
            pollCreate.secrecyKind,
            pollCreate.optionKind,
            pollCreate.summaryKind,
            pollCreate.answerKind,
            pollCreate.deadline,
            options.toMutableList()
        )
        return polls.save(poll)
    }

    private fun assertPollValid(pollCreate: PollCreate) {
        if (pollCreate.answerKind === AnswerKind.Date) {
            pollCreate.options.forEach {
                try {
                    LocalDate.parse(it.text)
                } catch (e: DateTimeParseException) {
                    throw InvalidPoll("Text option '${it.text}' is not allowed in date poll")
                }
                if (it.imageRef !== null) {
                    throw InvalidPoll("Images are not allowed in date poll")
                }
            }
        }
    }
}
