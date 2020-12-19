package de.randomerror.pollarbear.api

import de.randomerror.pollarbear.service.AnswerService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/answer")
class AnswerController(val answerService: AnswerService) {
    @GetMapping("/{pollRef}")
    fun getAllByPollRef(@PathVariable pollRef: String): List<AnswerView> {
        return answerService.getAllByPollRef(pollRef).map { AnswerView(it) }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody answerCreate: AnswerCreate): AnswerView {
        return AnswerView(answerService.createAnswer(answerCreate))
    }
}
