from playwright.sync_api import sync_playwright
from pathlib import Path
import json

BASE = "https://linc-acadience.lovable.app"
ROUTES = [
    "/", "/literacy", "/architecture", "/green-thinkific",
    "/k/boy", "/k/moy", "/k/eoy",
    "/1/boy", "/1/moy", "/1/eoy",
    "/2/boy", "/2/moy", "/2/eoy",
    "/bad/path",
]

BANDS = [
    ("WELL BELOW BENCHMARK", "red"),
    ("BELOW BENCHMARK", "yellow"),
    ("AT BENCHMARK", "green"),
    ("ABOVE BENCHMARK", "blue"),
]

GAME_TITLES = ["Rhyming Match", "Rhyming Memory", "Syllable Match", "Fly Swat!", "Sound Blender"]


def body_snippet(page, n=2200):
    return page.locator("body").inner_text().strip()[:n]


def link_dump(page):
    links = []
    for a in page.locator("a").all():
        txt = (a.inner_text() or "").strip().replace("\n", " ")
        href = a.get_attribute("href")
        if txt:
            links.append({"text": txt, "href": href})
    return links


def click_text(page, text):
    loc = page.get_by_text(text, exact=False)
    if loc.count() == 0:
        return False
    loc.first.click()
    return True


def inspect_game(page, route, band_label, game):
    page.goto(BASE + route, wait_until="networkidle")
    page.wait_for_timeout(700)
    if not click_text(page, band_label):
        return None
    page.wait_for_timeout(700)
    if not click_text(page, game):
        return None
    page.wait_for_timeout(1000)
    txt = body_snippet(page, n=2600)
    controls = []
    for token in ["New Game", "Play Again", "Start Over", "Reset", "Try Again", "Listen", "Score", "Correct", "Incorrect"]:
        if token.lower() in txt.lower():
            controls.append(token)
    return {
        "game": game,
        "text": txt,
        "detected_controls": controls,
    }


def inspect_band(page, route, band_label, band_key):
    page.goto(BASE + route, wait_until="networkidle")
    page.wait_for_timeout(700)
    ok = click_text(page, band_label)
    if not ok:
        return {"band": band_key, "error": f"Could not click {band_label}"}
    page.wait_for_timeout(900)
    txt = body_snippet(page, n=2600)
    links = link_dump(page)
    games_present = [g for g in GAME_TITLES if g in txt]
    game_details = []
    for g in games_present:
        details = inspect_game(page, route, band_label, g)
        if details:
            game_details.append(details)
    return {
        "band": band_key,
        "label": band_label,
        "text": txt,
        "links": links,
        "games_present": games_present,
        "game_details": game_details,
    }



def run():
    report = {"route_audit": [], "live_details": {}}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 390, "height": 844})

        for route in ROUTES:
            page.goto(BASE + route, wait_until="networkidle")
            page.wait_for_timeout(700)
            report["route_audit"].append({
                "route": route,
                "final_url": page.url,
                "title": page.title(),
                "h1": [h.inner_text() for h in page.locator("h1").all()],
                "h2": [h.inner_text() for h in page.locator("h2").all()],
                "body_snippet": body_snippet(page, 1400),
                "links": link_dump(page),
            })

        for route in ["/k/boy", "/k/moy"]:
            route_data = {"bands": []}
            for label, key in BANDS:
                route_data["bands"].append(inspect_band(page, route, label, key))
            report["live_details"][route] = route_data

        browser.close()

    out = Path("audit-output/live-audit.json")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, indent=2), encoding="utf-8")


if __name__ == "__main__":
    run()
