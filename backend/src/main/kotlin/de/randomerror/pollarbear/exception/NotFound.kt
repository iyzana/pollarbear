package de.randomerror.pollarbear.exception

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException
import kotlin.reflect.jvm.jvmName

inline fun <reified T> notFound(id: Long) = NotFound(T::class.simpleName ?: T::class.jvmName, id.toString())

inline fun <reified T> notFound(ref: String) = NotFound(T::class.simpleName ?: T::class.jvmName, ref, "ref")

class NotFound(resource: String, value: String, field: String = "id") :
    ResponseStatusException(HttpStatus.NOT_FOUND, "Found no $resource with $field $value")