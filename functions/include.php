<?php
add_theme_support('title-tag');

function portart_get_lang()
{
    return str_contains($_SERVER['REQUEST_URI'], '/en/') ? 'en' : 'ja';
}
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');

add_filter(
    'wpcf7_recaptcha_threshold',

    function ($threshold) {
        $threshold = 0.5; // decrease threshold to 0.3

        return $threshold;
    },

    10,
    1
);
add_filter('acf/settings/rest_api_format', function () {
    return 'standard';
});
/*
 * スタイルシート
 */
include get_template_directory() . '/functions/style/admin_style.php';
include get_template_directory() . '/functions/style/front_style.php';
/*
 * スクリプト
 */
include get_template_directory() . '/functions/script/front_script.php';
include get_template_directory() . '/functions/script/admin_script.php';
/**
 * サムネイル表示関数
 */
include get_template_directory() . '/functions/after_setup_theme.php';
/*
 * console.log機能追加
 */
include get_template_directory() . '/functions/console_log.php';
/*
 * ページネーション機能追加
 */
include get_template_directory() . '/functions/pagination.php';
/*
 * カスタム投稿タイプ
 */
include get_template_directory() . '/functions/post/works.php';
include get_template_directory() . '/functions/post/pipe_works.php';
include get_template_directory() . '/functions/post/cutting_works.php';
include get_template_directory() . '/functions/post/staff.php';
/*
 * Custom REST api
 */
include get_template_directory() . '/functions/custom-rest/theme_media.php';
/*
 * ショートコード
 */
include get_template_directory() . '/functions/shortcode/news.php';
include get_template_directory() . '/functions/shortcode/news_page.php';
include get_template_directory() . '/functions/shortcode/voice.php';
include get_template_directory() . '/functions/shortcode/categorys.php';
include get_template_directory() . '/functions/shortcode/works.php';
include get_template_directory() . '/functions/shortcode/pipe_works.php';
include get_template_directory() . '/functions/shortcode/cutting_works.php';
include get_template_directory() . '/functions/shortcode/staff.php';
include get_template_directory() . '/functions/shortcode/google_map.php';
include get_template_directory() . '/functions/shortcode/pagination.php';
include get_template_directory() . '/functions/shortcode/header_menu.php';
include get_template_directory() . '/functions/shortcode/header_button.php';
include get_template_directory() . '/functions/shortcode/circle_text_path.php';
include get_template_directory() . '/functions/shortcode/contact.php';
/*
 *
 */
add_action('registered_post_type', 'kaiza_posts_hierarchical', 10, 2);
function kaiza_posts_hierarchical($post_type, $pto)
{
    global $wp_post_types;
    if ($post_type != 'post') return;
    $wp_post_types['post']->hierarchical = 1;
    add_post_type_support('post', 'page-attributes');
}
/*
 * 個別ページ内での次の投稿、前の投稿
 */
include get_template_directory() . '/functions/post/adjacent.php';
/*
 * URLパラメータ
 */
include get_template_directory() . '/functions/parm.php';
/*
 *  ブロック追加
 */
include get_template_directory() . '/functions/block-registration/register.php';
