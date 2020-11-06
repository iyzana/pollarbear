package de.randomerror.pollarbear.service

import de.randomerror.pollarbear.db.PollRepo
import org.springframework.stereotype.Service

@Service
class PollService(val polls: PollRepo)
