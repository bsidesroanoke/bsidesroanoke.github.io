---
layout: page
title: Sponsors
permalink: /sponsors/
---
We'd like to thank the following sponsors for supporting BSidesRoa 2023!

Want to be a BSidesRoa sponsor click here [BsidesRoa Sponsor Package](https://www.dropbox.com/s/n7bsi9yx0h1hvul/BSides%20Sponsorship%20Kit_Roanoke%202023.pdf?dl=0)

{% for sponsor in site.sponsors %}
  [![{{ sponsor.title }}]({{ sponsor.logo }}){: width="400" }]({{ sponsor.website }})

{% endfor %}
