from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout
from pathlib import Path
import json
import re

BASE='https://linc-acadience.lovable.app'
routes=['/','/literacy','/architecture','/green-thinkific','/k/boy','/k/moy','/k/eoy','/1/boy','/1/moy','/1/eoy','/2/boy','/2/moy','/2/eoy','/bad/path']
bands=[('WELL BELOW BENCHMARK','red'),('BELOW BENCHMARK','yellow'),('AT BENCHMARK','green'),('ABOVE BENCHMARK','blue')]
games=['Rhyming Match','Rhyming Memory','Syllable Match','Fly Swat!','Sound Blender']


def snippet(page,n=1800):
    return page.locator('body').inner_text().strip()[:n]

def links(page):
    out=[]
    for a in page.locator('a').all():
        t=(a.inner_text() or '').strip().replace('\n',' ')
        if t:
            out.append({'text':t,'href':a.get_attribute('href')})
    return out

report={'route_audit':[],'live':{}}

with sync_playwright() as p:
    b=p.chromium.launch(headless=True)
    page=b.new_page(viewport={'width':390,'height':844})

    for r in routes:
        page.goto(BASE+r,wait_until='networkidle',timeout=40000)
        page.wait_for_timeout(400)
        report['route_audit'].append({'route':r,'final_url':page.url,'title':page.title(),'h1':page.locator('h1').all_inner_texts(),'h2':page.locator('h2').all_inner_texts(),'body':snippet(page,1200),'links':links(page)})

    for r in ['/k/boy','/k/moy']:
        rows=[]
        for label,key in bands:
            page.goto(BASE+r,wait_until='networkidle',timeout=40000)
            page.wait_for_timeout(400)
            ok=True
            try:
                page.get_by_text(re.compile('^'+re.escape(label)+'$', re.I)).first.click(timeout=3000)
            except PWTimeout:
                ok=False
            page.wait_for_timeout(500)
            txt=snippet(page,2200)
            rows.append({'band':key,'label':label,'clicked':ok,'text':txt,'games':[g for g in games if g in txt],'links':links(page)})
        report['live'][r]=rows

    b.close()

Path('audit-output').mkdir(exist_ok=True)
Path('audit-output/live-audit-fast.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print('wrote audit-output/live-audit-fast.json')
