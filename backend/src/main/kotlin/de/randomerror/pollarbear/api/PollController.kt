package de.randomerror.pollarbear.api

import de.randomerror.pollarbear.service.PollService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody pollCreate: PollCreate): PollView {
        return PollView(pollService.createPoll(pollCreate))
    }
}