package de.randomerror.pollarbear.api

import de.randomerror.pollarbear.service.PollService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/poll")
class PollController(val pollService: PollService) {
    @GetMapping
    fun getAll(): List<PollView> {
        return pollService.getAll().map { PollView(it) }
    }

    @GetMapping("/{ref}")
    fun getByRef(@PathVariable ref: String): PollView {
        return PollView(pollService.getByRef(ref))
    }
}