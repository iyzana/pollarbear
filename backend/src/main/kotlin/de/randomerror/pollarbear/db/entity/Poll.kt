package de.randomerror.pollarbear.db.entity

import de.randomerror.pollarbear.db.enum.AnswerKind
import de.randomerror.pollarbear.db.enum.OptionKind
import de.randomerror.pollarbear.db.enum.SecrecyKind
import de.randomerror.pollarbear.db.enum.SelectKind
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import java.math.BigInteger
import java.time.LocalDate
import javax.persistence.*
import kotlin.random.Random

@Entity
data class Poll(
    var title: String,
    @Enumerated(EnumType.STRING)
    var selectKind: SelectKind,
    @Enumerated(EnumType.STRING)
    var secrecyKind: SecrecyKind,
    @Enumerated(EnumType.STRING)
    var optionKind: OptionKind,
    @Embedded
    @Cascade(CascadeType.ALL)
    var summaryKind: SummaryKind,
    @Enumerated(EnumType.STRING)
    var answerKind: AnswerKind,
    var deadline: LocalDate?,

    @OneToMany
    @Cascade(CascadeType.ALL)
    var options: MutableList<Option> = mutableListOf(),
    @OneToMany
    @Cascade(CascadeType.ALL)
    var answers: MutableList<Answer> = mutableListOf(),

    @Column(length = 10)
    val ref: String = generateRef(),

    @Id
    @GeneratedValue
    val id: Long = 0
)

fun generateRef(): String {
    val bytes = ByteArray(6)
    Random.Default.nextBytes(bytes)
    return BigInteger(1, bytes).toString(36)
}
