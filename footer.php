<?php
global $post;
$post_type = $post->post_name;

// 電話番号
$phone_number = '06-6789-5831';

// フッターナビゲーションメニュー表示関数
function display_footer_menu()
{
    $menus = wp_get_nav_menu_items('footer');

    $menus = build_menu_tree($menus);
    if (!empty($menus)) {
        echo '<nav class="l-footer__menu--nav"><ul class="l-footer__menu--list">';
        foreach ($menus as $menu) {
            $title = $menu->title;
            $post_loop = get_post($menu->object_id);
            $slug = $post_loop->post_name;

            $slug_array = array(
                "staff" => "professional",
                "post" => "magazine"
            );
?>
            <li class="l-header__items l-footer__menu--items">
                <a href="<?php echo $menu->url; ?>" class="l-header__link l-footer__menu--link" data-slug="<?php echo $slug; ?>">
                    <p class="l-header__slug p-text__header-slug c-text--upper c-text--white">
                        <?php echo esc_html($slug_array[$slug] ?? $slug); ?>
                    </p>
                    <p class="l-header__title p-text__header c-text--white"><?php echo esc_html($title); ?></p>
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
                            <li class="l-header__sub-items white <?php echo $child_active; ?>">
                                <a href="<?php echo esc_url($child->url); ?>"
                                    class="l-header__sub-link"
                                    data-slug="<?php echo esc_attr($child_slug); ?>">
                                    <p class="l-header__sub-title p-text__header c-text--white">
                                        <?php echo esc_html($child_title); ?>
                                    </p>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </li>
    <?php }
        echo '</ul></nav>';
    }
}

// ロゴ
function display_logo()
{ ?>
    <div class="l-footer__wrap--logo">
        <a href="<?php echo esc_url(get_site_url()); ?>" class="">
            <img class="l-footer__img--logo p-img__logo-footer" src="<?php echo esc_url(get_template_directory_uri() . '/dist/assets/images/common/icon-logo-footer.webp'); ?>" alt="Logo image">
        </a>
    </div>
<?php }

// スマホ画面底部固定メニュー
function display_fixed_mobile_menu($phone_number)
{ ?>
    <div class="l-footer__fix sp js-fix-bottom">
        <a class="l-footer__fix--inner" href="tel:<?php echo esc_attr($phone_number); ?>" data-state="red">
            <img class="lazyload block-media l-footer__fix--img" data-src="/dist/assets/images/common/icon-phone.webp" alt="phone">
            <p class="p-text__phone c-text--en c-text--bold"><?php echo $phone_number; ?></p>
        </a>
        <a class="l-footer__fix--inner" href="<?php echo esc_url(site_url('/contact/')); ?>" data-state="mail">
            <img class="lazyload block-media l-footer__fix--img" data-src="/dist/assets/images/common/icon-mail.webp" alt="phone">
            <p class="c-text__title c-text--white c-text--bold">お問い合わせ</p>
        </a>
    </div>
<?php }

// 会社情報リスト
function display_information($phone_number)
{
    $info_list = [
        ['icon' => '', 'text' => ''],
        ['icon' => '', 'text' => 'TEL : ' . $phone_number],
    ];
    echo '<div class="l-footer__information__list">';
    foreach ($info_list as $info) {
        echo '<div class="l-footer__information__items">';
        if ($info['icon']) {
            echo '<img class="l-footer__img--information-icon" src="' . esc_url(get_template_directory_uri() . '/dist/assets/images/common/icon-' . $info['icon'] . '.webp') . '" alt="icon">';
        }
        echo '<p class="c-text__med c-text--white c-text--bold c-text__space--40">' . $info['text'] . '</p>';
        echo '</div>';
    }
    echo '</div>';
}
?>

<style>
    html {
        margin-top: 0px !important;
    }
</style>

<footer class="l-footer__wrap">
    <div class="l-row">
        <div class="l-footer__inner">
            <div class="l-footer__left">
                <?php display_logo(); ?>

                <div class="l-footer__address">
                    <p class="p-text__body-m c-text--white">
                        【本社】
                    </p>
                    <p class="p-text__body-m c-text--white">
                        〒577‐0046 東大阪市西堤本通西1－8－20<br>
                        TEL：06-6789-5831　FAX：06-6789-5838
                    </p>
                </div>

                <a
                    class="c-button__instagram"
                    href=""
                    target="_blank"
                    rel="noopener noreferrer">
                    <p class="p-text__button-m c-text--en c-text--upper c-text--white">instagram</p>
                </a>

                <div class="sp">
                    <?php display_footer_menu(); ?>
                </div>

                <img class="p-img__footer-text" src="<?php echo get_template_directory_uri() . '/dist/assets/images/common/footer-text.webp'; ?>" alt="銅、100年――。">
            </div>

            <div class="pc">
                <?php display_footer_menu(); ?>
            </div>
        </div>
    </div>
</footer>


</main>
<?php
global $post;
if ($post) {
    $current_slug = $post->post_name;
}
?>

<?php
// スマホ画面底部固定メニュー
display_fixed_mobile_menu($phone_number);
?>

<?php wp_footer(); ?>

</body>

</html>