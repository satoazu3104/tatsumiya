<?php
if (portart_get_lang() == 'en') {
    $raw_menu_items = wp_get_nav_menu_items('header-en');
    if (empty($raw_menu_items))
        $raw_menu_items = wp_get_nav_menu_items('header');
} else {
    $menus = wp_get_nav_menu_items('header');
    $raw_menu_items = wp_get_nav_menu_items('header');
}


/**
 * メニューをツリー化（安全な2パス）
 * - どの順番で返ってきても親子関係を構築
 * - children プロパティを必ず持たせる
 */
function build_menu_tree($menu_items)
{
    $indexed = array();
    foreach ($menu_items as $item) {
        $item->children = array();
        $indexed[$item->ID] = $item;
    }

    $tree = array();
    foreach ($indexed as $item) {
        $parent_id = (int) $item->menu_item_parent;
        if ($parent_id && isset($indexed[$parent_id])) {
            $indexed[$parent_id]->children[] = $item;
        } else {
            $tree[$item->ID] = $item;
        }
    }
    return $tree;
}

$menus = build_menu_tree($raw_menu_items);

$post = get_post(get_the_ID());
$current_slug = $post ? $post->post_name : null;

$pc_menu = '';

$slug_array = array(
    "staff" => "professional",
    "news"  => "magazine",
    "en" => "top"
);

$title_array = array();

/**
 * レベル別のUL/Li/リンクのクラス定義
 * 必要に応じて編集してください
 */
function header_menu_classmap($level)
{
    return array(
        'ul'   => $level === 0 ? 'l-header__list'      : ($level === 1 ? 'l-header__sub-list' : 'l-header__sub-sub-list'),
        'li'   => $level === 0 ? 'l-header__items'     : ($level === 1 ? 'l-header__sub-items' : 'l-header__sub-sub-items'),
        'link' => $level === 0 ? 'l-header__link'      : ($level === 1 ? 'l-header__sub-link' : 'l-header__sub-sub-link'),
        'slug' => $level === 0 ? 'l-header__slug p-text__header-slug c-text--upper' : '',
        'title' => $level === 0 ? 'l-header__title p-text__header' : ($level === 1 ? 'l-header__sub-title p-text__header' : 'l-header__sub-sub-title p-text__header'),
    );
}

/**
 * メニュー項目を再帰描画
 */
function render_menu_items($items, $level = 0, $slug_map = array(), $current_id = null, $title_map = array())
{
    if (empty($items)) return;

    $classes = header_menu_classmap($level);
    echo '<ul class="' . esc_attr($classes['ul']) . '">';

    foreach ($items as $item) {
        // タイトル・スラッグ
        $title = strtoupper($item->title);
        $title_map = [
            '非鉄金属材料販売×スリッター加工' => 'Non-Ferrous Metal Sales & Slitting',
            'CCAC' => 'CCAC',
            'パイプ加工' => 'Pipe Processing',
            'パイプ加工実績' => 'Pipe Processing Works',
            '切削加工' => 'Machining',
            '切削加工実績' => 'Machining Works',
        ];
        if (portart_get_lang() == 'en') {
            $title = $title_map[$title] ?? $title;
        }
        $is_current = ($current_id && (int)$current_id === (int)$item->object_id) ? ' is-active' : '';

        // object_id からスラッグ取得（カスタムリンク等は0のことがある）
        $item_post = !empty($item->object_id) ? get_post($item->object_id) : null;
        $slug      = $item_post ? $item_post->post_name : '';

        // トップ階層だけ slug 表示をカスタム（必要なければ条件を外してOK）
        $slug_text = $level === 0
            ? (isset($slug_map[$slug]) ? $slug_map[$slug] : $slug)
            : '';

        $url = $item->url;
        if (portart_get_lang() == 'en') {
            $url = str_replace(get_site_url(), get_site_url() . '/en', $url);
        }
        console_log($url);

        echo '<li class="' . esc_attr($classes['li'] . $is_current) . '">';

        echo '<a href="' . esc_url($url) . '" class="' . esc_attr($classes['link']) . '" data-slug="' . esc_attr($slug) . '">';

        if ($level === 0 && $slug_text !== '') {
            echo '<p class="' . esc_attr($classes['slug']) . '">' . esc_html($slug_text) . '</p>';
        }

        echo '<p class="' . esc_attr($classes['title']) . '">' . esc_html($title) . '</p>';
        echo '</a>';

        // 子があれば再帰
        if (!empty($item->children)) {
            render_menu_items($item->children, $level + 1, $slug_map, $current_id);
        }

        echo '</li>';
    }

    echo '</ul>';
}

$request_url = str_replace('/tatsumiya/', '', $_SERVER['REQUEST_URI']);
if (portart_get_lang() == 'ja') {
    $change_url = site_url() . '/en/' . $request_url;
} else {
    $request_url = str_replace('en', '', $request_url);
    $change_url = site_url() . $request_url;
}
?>
<div class="l-header__decoy"></div>
<div class="l-header__logo">
    <a class="l-header__logo-link" href="<?php echo is_front_page() ? '#top' : esc_url(get_site_url()); ?>">
        <img
            class="l-header__img--logo p-img__logo-header header"
            src="<?php echo esc_url(get_template_directory_uri() . '/dist/assets/images/common/icon-logo-header.webp'); ?>"
            alt="Logo image">
    </a>
</div>

<header class="l-header__wrap <?php echo is_front_page() ? esc_attr($pc_menu) : 'is-active ' . esc_attr($pc_menu); ?>">

    <div class="l-header__inner <?php echo esc_attr($pc_menu); ?>">
        <nav class="l-header__nav <?php echo esc_attr($pc_menu); ?> js-menu-wrap">
            <?php
            // 現在表示中の投稿ID
            $current_post_id = get_the_ID();

            // ここで再帰的に出力（トップレベルから）
            render_menu_items($menus, 0, $slug_array, $current_post_id, $title_array);
            ?>
        </nav>

        <div class="l-header__button">
            <button class="p-nav__button js-menu-button">
                <span class="p-nav__button--line js-menu-line"></span>
                <span class="p-nav__button--line js-menu-line"></span>
            </button>
        </div>
    </div>
    <div class="l-header__change__wrap">
        <a href="<?php echo $change_url; ?>" class="l-header__change">
            <p class="text-en p-text__title--button c-text--white c-text--en <?php echo portart_get_lang() == 'en' ? 'is-active' : ''; ?>">
                EN
            </p>
            <p class="p-text__title--button c-text--white c-text--en">|</p>
            <p class="text-jp p-text__title--button c-text--white c-text--en <?php echo portart_get_lang() == 'ja' ? 'is-active' : ''; ?>">
                JP
            </p>
        </a>
    </div>
    <div class="l-header__instagram">
        <a class="c-button__instagram-head" href="https://www.instagram.com/tatsumiya_metal/" target="_blank" rel="noopener noreferrer"></a>
    </div>
</header>