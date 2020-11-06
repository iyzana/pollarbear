package de.randomerror.pollarbear.exception

import jdk.jshell.spi.ExecutionControl
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import java.lang.RuntimeException

@ResponseStatus(HttpStatus.NOT_FOUND)
class NotFound(entity: String, id: Long) : RuntimeException("$entity(id = $id) not found")