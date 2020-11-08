package de.randomerror.pollarbear.service

import de.randomerror.pollarbear.db.PollRepo
import de.randomerror.pollarbear.db.entity.Poll
import de.randomerror.pollarbear.exception.notFound
import org.springframework.stereotype.Service

@Service
class PollService(val polls: PollRepo) {
    fun getAll(): List<Poll> {
        return polls.findAll()
    }

    fun getByRef(ref: String): Poll {
        return polls.findByRef(ref) ?: throw notFound<Poll>(ref)
    }
}
