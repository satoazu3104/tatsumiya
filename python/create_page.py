import requests
from requests.auth import HTTPBasicAuth
from config import wordpress_url, username, application_password

# ページのリストを定義（パスで親子関係を表現）
pages = [
    {"path": "top", "title": "トップ"},
    {"path": "business", "title": "ビジネス"},
    {"path": "business/metal", "title": "非鉄金属材料販売×スリッター加工"},
    {"path": "business/pipe", "title": "パイプ加工"},
    {"path": "business/cutting", "title": "切削加工"},
    {"path": "magazine", "title": "新着情報"},
    {"path": "professional", "title": "社員紹介"},
    {"path": "recruit", "title": "求人情報"},
    {"path": "company", "title": "会社概要"},
    {"path": "contact", "title": "お問い合わせ"},
    {"path": "thanks", "title": "お問い合わせ 完了"},
]

def get_page_by_slug(slug):
    """slugに一致するページ情報を返す。なければNone。"""
    resp = requests.get(
        f"{wordpress_url}?slug={slug}",
        auth=HTTPBasicAuth(username, application_password),
    )
    data = resp.json()
    return data[0] if data else None

def page_exists(slug):
    """slugが存在すればTrue"""
    return get_page_by_slug(slug) is not None

def create_page(path, title):
    # pathから親・子を切り分け
    parts = path.split('/')
    slug = parts[-1]            # 実際にWPに渡すslug
    parent_id = None
    if len(parts) > 1:
        parent_slug = parts[-2]
        parent = get_page_by_slug(parent_slug)
        if not parent:
            print(f"親ページ '{parent_slug}' が存在しません。先に作成してください。")
            return
        parent_id = parent['id']

    if page_exists(slug):
        print(f"スラッグ '{slug}' のページは既に存在します。スキップします。")
        return

    payload = {
        "title": title,
        "slug": slug,
        "status": "publish",
    }
    if parent_id:
        payload["parent"] = parent_id

    resp = requests.post(
        wordpress_url,
        json=payload,
        auth=HTTPBasicAuth(username, application_password),
    )
    if resp.status_code == 201:
        print(f"ページ '{title}' を作成しました。（slug: {slug}）")
    else:
        print(f"ページ '{title}' の作成に失敗しました: {resp.status_code} {resp.text}")

# 実行
for p in pages:
    create_page(p["path"], p["title"])
