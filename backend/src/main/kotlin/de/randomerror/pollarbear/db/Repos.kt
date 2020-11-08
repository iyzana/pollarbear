package de.randomerror.pollarbear.db

import de.randomerror.pollarbear.db.entity.Answer
import de.randomerror.pollarbear.db.entity.Poll
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PollRepo : JpaRepository<Poll, Long> {
    fun findByRef(ref: String): Poll?
}

@Repository
interface AnswerRepo : JpaRepository<Answer, Long>
