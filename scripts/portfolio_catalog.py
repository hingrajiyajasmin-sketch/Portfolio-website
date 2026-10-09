"""Render the editable project catalog into portable, accessible HTML."""
from html import escape
import json
import re

STAR = '<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M40 8v64M8 40h64M17 17l46 46M17 63l46-46" stroke="currentColor" stroke-width="8" stroke-linecap="round"/></svg>'

ARROW = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M6 5h13v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def artwork(project):
    brand = escape(project['brand'])
    if project.get('image'):
        return '<img class="catalog-image" src="' + escape(project['image'], quote=True) + '" alt="" loading="lazy">'
    art = project['art']
    if art == 'finance':
        return f'<div class="catalog-window finance-preview"><div class="preview-head"><b>{brand}<i>®</i></b><span>Overview · Activity</span></div><div class="preview-finance"><div><small>YOUR EVERYDAY, AT A GLANCE</small><strong>₹24,850<span>.00</span></strong><div class="preview-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div></div><div class="preview-credit"><span>{brand} / everyday</span><b>•••• 2048</b><small>Made for a little more clarity.</small></div></div></div>'
    if art == 'focus':
        return f'<div class="catalog-window focus-preview"><div class="preview-head"><b>{brand}<i>{STAR}</i></b><span>A fresh start.</span></div><h4>A little less noise.<br>A little more focus.</h4><div class="preview-task"><i></i>Start with a good idea</div><div class="preview-task"><i></i>Make something meaningful</div><div class="preview-task"><i></i>Leave room to explore</div></div><span class="preview-asterisk">{STAR}</span>'
    if art == 'health':
        return f'<div class="catalog-window health-preview"><div class="preview-head"><b>{brand}<i>+</i></b><span>Care, made simpler.</span></div><h4>A little care.<br>A lot of difference.</h4><div class="preview-care"><span class="medical-cross"></span><div><b>A good day to feel better.</b><small>Your next appointment · 10:30 AM</small></div><span>{ARROW}</span></div><div class="preview-health-stats"><div><span>♡</span><small>Your wellbeing</small></div><div><span>+</span><small>Here for you</small></div></div></div>'
    if art == 'food':
        return f'<div class="preview-food-copy"><b>{brand}<span>✳</span></b><h4>Good food.<br>Good mood.</h4><small>A little goodness, every day.</small></div><div class="catalog-phone"><div class="preview-island"></div><b>{brand}</b><small>Fresh finds for you.</small><div class="preview-produce"><span></span><i></i><b></b></div><strong>The seasonal edit</strong><div class="preview-product-tiles"><i></i><i></i></div></div>'
    if art == 'home':
        return f'<div class="home-preview"><div class="preview-head"><b>{brand}<i>⌂</i></b><span>Spaces for living.</span></div><h4>Find your<br>somewhere.</h4><svg class="preview-house" viewBox="0 0 280 220"><path d="M28 98 140 24l112 74v115H28Z" fill="#f5ead7"/><path d="M12 104 140 18l128 86" fill="none" stroke="#688364" stroke-width="12" stroke-linejoin="round"/><path d="M65 120h45v48H65Zm105 0h45v48h-45Z" fill="#9bb492"/><path d="M125 142h35v71h-35Z" fill="#d99d6b"/><path d="M12 214h256" stroke="#688364" stroke-width="3"/></svg><div class="preview-home-label"><span>A place to belong.</span><b>Explore spaces ↗</b></div></div>'
    if art == 'shop':
        return f'<div class="catalog-window shop-preview"><div class="preview-head"><b>{brand}<i>●</i></b><span>Considered essentials.</span></div><h4>Less, but<br>a little better.</h4><div class="preview-shop-products"><div><i></i><small>The everyday edit</small></div><div><i></i><small>Made to stay</small></div><div><i></i><small>A small pleasure</small></div></div></div>'
    if art == 'learn':
        return f'<div class="learn-preview"><div class="preview-head"><b>{brand}<i>✦</i></b><span>Stay curious.</span></div><h4>Your next<br>good beginning.</h4><div class="preview-books"><span></span><span></span><span></span></div><div class="preview-lesson"><span>01 / A LITTLE CURIOSITY</span><b>Learn something new today.</b><small>One thoughtful step at a time. ↗</small></div></div>'
    return f'<div class="travel-preview"><div class="preview-head"><b>{brand}<i>↗</i></b><span>Go a little further.</span></div><h4>Take the<br>scenic route.</h4><div class="preview-landscape"><span class="preview-sun"></span><i></i><b></b><span class="preview-road"></span></div><div class="preview-travel-label"><span>A fresh perspective.</span><b>Find your escape ↗</b></div></div>'

def render_catalog(html, root):
    projects = json.loads((root / 'assets/data/portfolio-projects.json').read_text())
    ids = [project['id'] for project in projects]
    if len(ids) != len(set(ids)):
        raise ValueError('Project IDs must be unique.')
    categories = ('Mobile App', 'Website Design', 'Web Development', 'Logo Design')
    if any(project['category'] not in categories for project in projects):
        raise ValueError('Unknown portfolio category.')
    filters = ['<button class="portfolio-filter is-selected" type="button" aria-pressed="true" data-category="all">All</button>']
    for category in categories:
        label = escape(category, quote=True)
        filters.append(f'<button class="portfolio-filter" type="button" aria-pressed="false" data-category="{label}">{label}</button>')
    cards = []
    for project in projects:
        e = lambda key: escape(str(project[key]), quote=True)
        badge = 'Demo concept' if project.get('sample') else e('discipline')
        cards.append(f'''<article class="catalog-card reveal" data-category="{e('category')}" data-search="{escape(' '.join(str(project[k]) for k in ('title','brand','industry','discipline','summary')).casefold(), quote=True)}" id="project-{e('id')}">
          <div class="catalog-art art-{e('art')}" aria-label="{e('brand')} project preview"><div class="catalog-artwork" aria-hidden="true">{artwork(project)}</div><span class="catalog-demo">{badge}</span><button class="project-preview" type="button" data-project="{e('id')}" aria-label="Explore {e('brand')} project"><span class="cover-action" aria-hidden="true">Explore<br>project {ARROW}</span></button></div>
          <div class="catalog-meta"><div><p class="catalog-category">{e('industry')} <span> / {e('discipline')}</span></p><h2>{e('title')}</h2><p class="catalog-summary">{e('summary')}</p></div><button class="catalog-open" type="button" data-project="{e('id')}" aria-label="Read {e('brand')} project details">{ARROW}</button></div>
        </article>''')
    html = re.sub(r'(<div id="portfolio-filters"[^>]*>).*?(</div>)', lambda m: m[1] + '\n' + '\n'.join(filters) + '\n' + m[2], html, count=1, flags=re.S)
    html = re.sub(r'(<div id="portfolio-grid"[^>]*>).*?(</div>\s*<div id="portfolio-empty")', lambda m: m[1] + '\n' + '\n'.join(cards) + '\n' + m[2], html, count=1, flags=re.S)
    payload = json.dumps(projects,ensure_ascii=False).replace('<', r'\u003c').replace('>', r'\u003e')
    return re.sub(r'(<script id="portfolio-catalog"[^>]*>).*?(</script>)', lambda m: m[1] + payload + m[2], html, count=1, flags=re.S)
