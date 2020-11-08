package de.randomerror.pollarbear.db.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Option(
    var text: String,
    var hasImage: Boolean,
    @Id
    @GeneratedValue
    var id: Long = 0
)
