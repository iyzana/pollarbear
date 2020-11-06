package de.randomerror.pollarbear.db.entity

import de.randomerror.pollarbear.db.enum.AnswerKind
import de.randomerror.pollarbear.db.enum.OptionKind
import de.randomerror.pollarbear.db.enum.SecrecyKind
import de.randomerror.pollarbear.db.enum.SelectKind
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import java.time.LocalDateTime
import javax.persistence.*

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
    var deadline: LocalDateTime,

    @OneToMany
    @Cascade(CascadeType.ALL)
    var options: MutableList<Option> = mutableListOf(),
    @OneToMany
    var answers: MutableList<Answer> = mutableListOf(),

    @Id
    @GeneratedValue
    var id: Long = 0
)