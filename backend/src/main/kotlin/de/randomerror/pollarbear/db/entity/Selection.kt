package de.randomerror.pollarbear.db.entity

import de.randomerror.pollarbear.db.enum.SelectionValue
import javax.persistence.*

@Entity
data class Selection(
    @ManyToOne
    var option: Option,
    @Enumerated(EnumType.STRING)
    var value: SelectionValue,

    @Id
    @GeneratedValue
    var id: Long = 0
)