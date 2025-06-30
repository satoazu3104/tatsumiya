<?php
$menus = wp_get_nav_menu_items('header');
// メニュー項目を階層構造に整理する関数
function build_menu_tree($menu_items)
{
    $menu = array();
    $menu_by_id = array();

    foreach ($menu_items as $menu_item) {
        $menu_by_id[$menu_item->ID] = $menu_item;
        if ($menu_item->menu_item_parent == 0) {
            $menu[$menu_item->ID] = $menu_item;
            $menu[$menu_item->ID]->children = array();
        } else {
            if (!isset($menu_by_id[$menu_item->menu_item_parent]->children)) {
                $menu_by_id[$menu_item->menu_item_parent]->children = array();
            }
            $menu_by_id[$menu_item->menu_item_parent]->children[] = $menu_item;
        }
    }
    return $menu;
}

$menus = build_menu_tree($menus);
$head_index = 0;
$head_count = count($menus);

$post = get_post(get_the_ID());
$slug = $post ? $post->post_name : null;
$head_index = 0;
$head_count = count($menus);
$pc_menu = '';

$slug_array = array(
    "staff" => "professional",
    "news" => "magazine"
);
?>

<div class="l-header__decoy"></div>
<div class="l-header__logo">
    <a
        class="l-header__logo-link"
        href="<?php echo is_front_page() ? '#top' : get_site_url(); ?>">
        <img
            class="l-header__img--logo p-img__logo-header header"
            src="<?php echo get_template_directory_uri() . '/dist/assets/images/common/icon-logo-header.webp'; ?>" alt="Logo image">
    </a>
</div>
<header class="l-header__wrap <?php echo is_front_page() ? $pc_menu : 'is-active ' . $pc_menu; ?>">
    <div class="l-header__inner <?php echo $pc_menu; ?>">
        <!-- ロゴ -->

        <!-- ナビゲーション -->
        <nav class="l-header__nav <?php echo $pc_menu; ?> js-menu-wrap">
            <ul class="l-header__list <?php echo $pc_menu; ?>">
                <?php if (! empty($menus)) : foreach ($menus as $menu) :
                        // トップレベルメニュー情報
                        $head_index++;
                        $title      = strtoupper($menu->title);
                        $post_loop  = get_post($menu->object_id);
                        $slug       = $post_loop ? $post_loop->post_name : '';
                        $active     = get_the_ID() == $menu->object_id ? 'is-active' : '';
                ?>
                        <li class="l-header__items <?php echo $active; ?>">
                            <a href="<?php echo esc_url($menu->url); ?>"
                                class="l-header__link"
                                data-slug="<?php echo esc_attr($slug); ?>">
                                <p class="l-header__slug p-text__header-slug c-text--upper">
                                    <?php echo esc_html($slug_array[$slug] ?? $slug); ?>
                                </p>
                                <p class="l-header__title p-text__header"><?php echo esc_html($title); ?></p>
                            </a>

                            <?php if (! empty($menu->children)) : ?>
                                <ul class="l-header__sub-list">
                                    <?php foreach ($menu->children as $child) :
                                        // サブメニュー情報
                                        $child_title = strtoupper($child->title);
                                        $child_post  = get_post($child->object_id);
                                        $child_slug  = $child_post ? $child_post->post_name : '';
                                        $child_active = get_the_ID() == $child->object_id ? 'is-active' : '';
                                    ?>
                                        <li class="l-header__sub-items <?php echo $child_active; ?>">
                                            <a href="<?php echo esc_url($child->url); ?>"
                                                class="l-header__sub-link"
                                                data-slug="<?php echo esc_attr($child_slug); ?>">
                                                <p class="l-header__sub-title p-text__header">
                                                    <?php echo esc_html($child_title); ?>
                                                </p>
                                            </a>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php endif; ?>

                        </li>
                <?php endforeach;
                endif; ?>
            </ul>
        </nav>

        <div class="l-header__button">
            <button class="p-nav__button js-menu-button">
                <span class="p-nav__button--line js-menu-line"></span>
                <span class="p-nav__button--line js-menu-line"></span>
            </button>
        </div>
    </div>

    <div class="l-header__instagram">
        <a class="c-button__instagram-head" href="https://www.instagram.com/tatsumiya_metal/" target="_blank" rel="noopener noreferrer"></a>
    </div>
</header>