---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
{% assign sorted-events = site.events | sort: 'year' | reverse %}
{% for event in sorted-events limit: 1 %}
  {{event.content | markdownify}}
{% endfor %}

