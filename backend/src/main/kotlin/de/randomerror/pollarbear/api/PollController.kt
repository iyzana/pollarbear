package de.randomerror.pollarbear.api

import de.randomerror.pollarbear.db.PollRepo
import de.randomerror.pollarbear.db.entity.Poll
import de.randomerror.pollarbear.exception.NotFound
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/poll")
class PollController(val polls: PollRepo) {
    @GetMapping
    fun getAll(): List<Poll> {
        return polls.findAll()
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): Poll {
        return polls.findById(id)
            .orElseThrow { NotFound("poll", id) }
    }
}