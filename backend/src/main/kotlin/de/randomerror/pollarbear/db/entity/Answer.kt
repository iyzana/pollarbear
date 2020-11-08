package de.randomerror.pollarbear.db.entity

import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
data class Answer(
    @OneToMany
    @Cascade(CascadeType.ALL)
    var selection: List<Selection>,
    @Column(name = "answerer")
    var from: String? = null,

    @Id
    @GeneratedValue
    var id: Long = 0
)