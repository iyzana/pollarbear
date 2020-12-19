package de.randomerror.pollarbear.exception

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class InvalidAnswer(msg: String) : ResponseStatusException(HttpStatus.BAD_REQUEST, msg)
