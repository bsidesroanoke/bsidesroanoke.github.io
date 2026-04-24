---
title: "Ghosts in the Machine - A detailed look at the Therac-25 Affair"
speakers:
  - sean-satterlee
eventSlug: "2026"
featured: false
---
In 1985, a software race condition in a radiation therapy device called the Therac-25 began quietly killing cancer patients by delivering radiation doses up to 100 times the therapeutic level. Six patients were overdosed, and three died. The root cause was nothing exotic: reused code, removed hardware interlocks, a single unreviewed programmer, and a manufacturer so confident in their software that they dismissed every patient complaint for nineteen months.

Almost fourty years later, the healthcare sector is deploying millions of connected medical devices such as insulin pumps, infusion systems, patient monitors (telemetry), diagnostic imaging, connected laboratory equipment and implantables. A surprising amount of which repeat every structural failure that the Therac-25 made famous. Software-only safety controls. Legacy firmware reused without re-testing. Security alert fatigue. 

This talk takes attendees inside the Therac-25 Affair with deep technical details of the race conditions, the integer overflows, the missing hardware interlocks, and the regulatory blind spots. 