package de.randomerror.pollarbear

import de.randomerror.pollarbear.db.PollRepo
import de.randomerror.pollarbear.db.entity.Option
import de.randomerror.pollarbear.db.entity.Poll
import de.randomerror.pollarbear.db.entity.SummaryKind
import de.randomerror.pollarbear.db.enum.*
import org.springframework.beans.factory.InitializingBean
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import javax.annotation.PostConstruct

@SpringBootApplication
class PollarbearApplication

fun main(args: Array<String>) {
	runApplication<PollarbearApplication>(*args)
}

@Component
class Init(val polls: PollRepo) {
    @PostConstruct
    fun init() {
        val poll = Poll(
            "Pollarbear",
            SelectKind.Multiple,
            SecrecyKind.Open,
            OptionKind.YesNoMaybe,
            SummaryKind(CutoffKind.Top, 1),
            AnswerKind.Simple,
            LocalDateTime.now()
        )
        poll.options.add(Option("Roar!", null))
        poll.options.add(Option("Rawr!", null))
        polls.save(poll)
    }
}

