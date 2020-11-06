package de.randomerror.pollarbear.db.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Option(
    var text: String,
    var image: ByteArray?,
    @Id
    @GeneratedValue
    var id: Long = 0
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Option

        if (text != other.text) return false
        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        var result = text.hashCode()
        result = 31 * result + id.hashCode()
        return result
    }
}
