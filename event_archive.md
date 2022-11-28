---
layout: page
title: BSides Roa Event Archive
permalink: /events/archive
--
Placeholder to start linking information about prior events.


{% assign sorted-events = site.events | sort: 'year' | reverse %}
{% for event in sorted-events limit: 1 %}
   <li>{{event.title }}</li>
{% endfor %}
