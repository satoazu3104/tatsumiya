<?php
global $post;
$post_type = isset($post->post_name) ? $post->post_name : '';

// 電話番号
$phone_number = '06-6789-5831';

/**
 * build_menu_tree が未定義なら定義
 * - 返ってくる順序に依存せずに階層を構築
 * - 各項目に children を必ず付与
 */
if (!function_exists('build_menu_tree')) {
    function build_menu_tree($menu_items)
    {
        if (empty($menu_items)) return array();
        $indexed = array();
        foreach ($menu_items as $item) {
            $item->children = array();
            $indexed[$item->ID] = $item;
        }
        $tree = array();
        foreach ($indexed as $item) {
            $parent = (int)$item->menu_item_parent;
            if ($parent && isset($indexed[$parent])) {
                $indexed[$parent]->children[] = $item;
            } else {
                $tree[$item->ID] = $item;
            }
        }
        return $tree;
    }
}

/**
 * フッターメニュー クラスマップ（レベル別）
 * 必要に応じてクラス名は調整してください。
 */
function footer_menu_classmap($level)
{
    return array(
        'ul'   => $level === 0 ? 'l-footer__menu--list'
            : ($level === 1 ? 'l-header__sub-list'
                : 'l-header__sub-sub-list'),
        'li'   => $level === 0 ? 'l-footer__menu--items l-header__items'
            : ($level === 1 ? 'l-header__sub-items'
                : 'l-header__sub-sub-items'),
        'link' => $level === 0 ? 'l-footer__menu--link l-header__link'
            : ($level === 1 ? 'l-header__sub-link'
                : 'l-header__sub-sub-link'),
        'slug' => $level === 0 ? 'l-header__slug p-text__header-slug c-text--upper c-text--white' : '',
        'title' => $level === 0 ? 'l-header__title p-text__header c-text--white'
            : ($level === 1 ? 'l-header__sub-title p-text__header c-text--white'
                : 'l-header__sub-sub-title p-text__header c-text--white'),
        // ul にも白系の装飾が必要なら追加（例：c-text--white）
    );
}

/**
 * 再帰的にメニュー描画
 */
function render_footer_menu_items($items, $level = 0, $slug_map = array(), $current_id = null)
{
    if (empty($items)) return;

    $classes = footer_menu_classmap($level);
    echo '<ul class="' . esc_attr($classes['ul']) . '">';

    foreach ($items as $item) {
        $title = strtoupper($item->title);
        $is_current = ($current_id && (int)$current_id === (int)$item->object_id) ? ' is-active' : '';

        // スラッグ取得（カスタムリンクは object_id=0 のことがある）
        $item_post = !empty($item->object_id) ? get_post($item->object_id) : null;
        $slug      = $item_post ? $item_post->post_name : '';

        // トップ階層のみスラッグの英語表記に差し替え（不要なら条件を外す）
        $slug_text = ($level === 0 && $slug !== '')
            ? (isset($slug_map[$slug]) ? $slug_map[$slug] : $slug)
            : '';

        echo '<li class="' . esc_attr($classes['li'] . $is_current) . '">';

        echo '<a href="' . esc_url($item->url) . '" class="' . esc_attr($classes['link']) . '" data-slug="' . esc_attr($slug) . '">';
        if ($level === 0 && $slug_text !== '') {
            echo '<p class="' . esc_attr($classes['slug']) . '">' . esc_html($slug_text) . '</p>';
        }
        echo '<p class="' . esc_attr($classes['title']) . '">' . esc_html($title) . '</p>';
        echo '</a>';

        // 子があれば再帰
        if (!empty($item->children)) {
            render_footer_menu_items($item->children, $level + 1, $slug_map, $current_id);
        }

        echo '</li>';
    }

    echo '</ul>';
}

/**
 * フッターナビゲーションメニュー表示関数（再帰対応版）
 */
function display_footer_menu()
{
    if (portart_get_lang() == 'en') {
        $raw = wp_get_nav_menu_items('footer-en');
        if (empty($raw))
            $raw = wp_get_nav_menu_items('footer');
    } else {
        $raw = wp_get_nav_menu_items('footer');
    }

    $menus = build_menu_tree($raw);

    if (!empty($menus)) {
        echo '<nav class="l-footer__menu--nav">';
        // 必要であればここで wrapper を追加
        $slug_array = array(
            'staff' => 'professional',
            'news'  => 'magazine',
            'en' => 'top'
        );
        $current_post_id = get_the_ID();
        render_footer_menu_items($menus, 0, $slug_array, $current_post_id);
        echo '</nav>';
    }
}

// ロゴ
function display_logo()
{ ?>
    <div class="l-footer__wrap--logo">
        <a href="<?php echo esc_url(get_site_url()); ?>">
            <img class="l-footer__img--logo p-img__logo-footer"
                src="<?php echo esc_url(get_template_directory_uri() . '/dist/assets/images/common/icon-logo-footer.webp'); ?>"
                alt="Logo image">
        </a>
    </div>
<?php }

// スマホ画面底部固定メニュー
function display_fixed_mobile_menu($phone_number)
{ ?>
    <div class="l-footer__fix sp js-fix-bottom">
        <a class="l-footer__fix--inner" href="tel:<?php echo esc_attr($phone_number); ?>" data-state="red">
            <img class="lazyload block-media l-footer__fix--img" data-src="/dist/assets/images/common/icon-phone.webp" alt="phone">
            <p class="p-text__phone c-text--en c-text--bold"><?php echo esc_html($phone_number); ?></p>
        </a>
        <a class="l-footer__fix--inner" href="<?php echo esc_url(site_url('/contact/')); ?>" data-state="mail">
            <img class="lazyload block-media l-footer__fix--img" data-src="/dist/assets/images/common/icon-mail.webp" alt="mail">
            <p class="c-text__title c-text--white c-text--bold">お問い合わせ</p>
        </a>
    </div>
<?php }

// 会社情報リスト（必要に応じて拡張）
function display_information($phone_number)
{
    $info_list = [
        ['icon' => '', 'text' => ''],
        ['icon' => '', 'text' => 'TEL : ' . $phone_number],
    ];
    echo '<div class="l-footer__information__list">';
    foreach ($info_list as $info) {
        echo '<div class="l-footer__information__items">';
        if (!empty($info['icon'])) {
            echo '<img class="l-footer__img--information-icon" src="' . esc_url(get_template_directory_uri() . '/dist/assets/images/common/icon-' . $info['icon'] . '.webp') . '" alt="icon">';
        }
        echo '<p class="c-text__med c-text--white c-text--bold c-text__space--40">' . esc_html($info['text']) . '</p>';
        echo '</div>';
    }
    echo '</div>';
}
?>

<style>
    html {
        margin-top: 0 !important;
    }
</style>

<footer class="l-footer__wrap">
    <div class="l-row">
        <div class="l-footer__inner">
            <div class="l-footer__left">
                <?php display_logo(); ?>

                <div class="l-footer__address">
                    <p class="p-text__body-m c-text--white">
                        <?php if (portart_get_lang() == 'ja'): ?>
                            【本社】
                        <?php else: ?>
                            [Headquarters]
                        <?php endif; ?>
                    </p>
                    <p class="p-text__body-m c-text--white">
                        <?php if (portart_get_lang() == 'ja'): ?>
                            〒577‐0046 東大阪市西堤本通西1－8－20<br>
                        <?php else: ?>
                            1-8-20 Nishitsutsumi-Hondori Nishi, Higashiosaka City, 577-0046<br>
                        <?php endif ?>
                        TEL：06-6789-5831　FAX：06-6789-5838
                    </p>
                </div>

                <a class="c-button__instagram"
                    href="https://www.instagram.com/tatsumiya_metal/"
                    target="_blank" rel="noopener noreferrer">
                    <p class="p-text__button-m c-text--en c-text--upper c-text--white">instagram</p>
                </a>

                <div class="sp">
                    <?php display_footer_menu(); ?>
                </div>

                <img class="p-img__footer-text"
                    src="<?php echo esc_url(get_template_directory_uri() . '/dist/assets/images/common/footer-text.webp?3.0'); ?>"
                    alt="銅、100年――。">
            </div>

            <div class="pc">
                <?php display_footer_menu(); ?>
            </div>
        </div>
    </div>
</footer>

</main>
<?php
if (!empty($post)) {
    $current_slug = $post->post_name;
}
// スマホ画面底部固定メニュー
display_fixed_mobile_menu($phone_number);

wp_footer();
?>
</body>

</html>