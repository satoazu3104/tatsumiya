<?php
add_theme_support('title-tag');

function portart_get_lang()
{
    return str_contains($_SERVER['REQUEST_URI'], '/en/') ? 'en' : 'ja';
}

function portart_add_en_permalink($permalink, $post)
{
    if (portart_get_lang() !== 'en') {
        return $permalink;
    }

    switch ($post->post_type) {

        case 'post':
            return home_url('/en/blog/' . $post->post_name . '/');

        case 'staff':
            return home_url('/en/staff/' . $post->post_name . '/');

        default:
            return $permalink;
    }
}
add_filter('post_link', 'portart_add_en_permalink', 10, 2);
add_filter('post_type_link', 'portart_add_en_permalink', 10, 2);

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

function portart_add_en_rewrite()
{
    // 投稿
    add_rewrite_rule(
        '^en/blog/([^/]+)/?$',
        'index.php?post_type=post&name=$matches[1]',
        'top'
    );

    // staff
    add_rewrite_rule(
        '^en/staff/([^/]+)/?$',
        'index.php?post_type=staff&name=$matches[1]',
        'top'
    );
}
add_action('init', 'portart_add_en_rewrite');

/**
 * 英語タイトル用のメタを登録
 */
function portart_add_english_title_meta_box()
{
    add_meta_box(
        'portart_english_title',
        '英語タイトル',
        'portart_english_title_meta_box_callback',
        ['post', 'staff', 'cutting_works', 'pipe_works'],
        'side',
        'high'
    );
}
add_action('add_meta_boxes', 'portart_add_english_title_meta_box');

function portart_english_title_meta_box_callback($post)
{
    $title_en = get_post_meta($post->ID, 'title_en', true);

    wp_nonce_field('portart_save_english_title', 'portart_english_title_nonce');
?>
    <input
        type="text"
        name="portart_title_en"
        value="<?php echo esc_attr($title_en); ?>"
        placeholder="English title"
        style="width:100%;">
<?php
}

function portart_save_english_title($post_id)
{
    if (
        !isset($_POST['portart_english_title_nonce']) ||
        !wp_verify_nonce($_POST['portart_english_title_nonce'], 'portart_save_english_title')
    ) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['portart_title_en'])) {
        update_post_meta(
            $post_id,
            'title_en',
            sanitize_text_field($_POST['portart_title_en'])
        );
    }
}
add_action('save_post', 'portart_save_english_title');

function portart_get_the_title($post_id = null)
{
    $post_id = $post_id ?: get_the_ID();

    if (portart_get_lang() === 'en') {
        $title_en = get_post_meta($post_id, 'title_en', true);

        if ($title_en) {
            return $title_en;
        }
    }

    return get_the_title($post_id);
}