package de.randomerror.pollarbear

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PollarbearApplication

fun main(args: Array<String>) {
	runApplication<PollarbearApplication>(*args)
}
