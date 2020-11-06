package de.randomerror.pollarbear.db.entity

import de.randomerror.pollarbear.db.enum.CutoffKind
import javax.persistence.*

@Embeddable
class SummaryKind(
    @Enumerated(EnumType.STRING)
    var cutoffKind: CutoffKind,
    var cutoffValue: Int
)