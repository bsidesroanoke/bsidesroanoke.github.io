---
layout: page
title: Sponsors
permalink: /sponsors/
---
We'd like to thank the following sponsors:

{% for sponsor in site.sponsors %}
  [![{{ sponsor.title }}]({{ sponsor.logo }}){: width="400" }]({{ sponsor.website }})

{% endfor %}
