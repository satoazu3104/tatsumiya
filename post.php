<?php
$formatted_date = get_the_date('Y.m.d'); // フォーマットした投稿日を取得

$fallback_image_url = get_template_directory_uri() . '/dist/assets/images/common/noimage.webp';

function Space($space, $sp_space)
{
?>
    <div class="pc" style="height: clamp(<?php echo $sp_space . 'px'; ?>, <?php echo $space / 1920 * 100 . 'vw'; ?>, <?php echo $space . 'px'; ?>);"></div>
    <div class="sp" style="height: <?php echo $sp_space . 'px'; ?>;"></div>
<?php
}

$thumbnail = get_the_post_thumbnail(get_the_ID(), '', array('class' => 'p-post__img--thumb'));
if (empty($thumbnail)) {
    $thumbnail = '<img src="' . $fallback_image_url . '" alt="Fallback Image" class="p-post__img--thumb" />';
}
$post_type = get_post_type(get_the_ID());
$title_en = $post_type == 'works' ? "WORKS" : "NEWS";
$title_ja = $post_type == 'works' ? "お仕事実績" : "お知らせ";
$hero = $post_type == 'works' ? 'hero-works' : 'hero-news';
$works_link = get_site_url() . '/work';
$blog_link = get_site_url() . '/news';
$post_type_slug = get_post_type();
$name = get_the_title();

$return_link = [
    "post" => get_site_url() . "/news",
    "works" => get_site_url() . "/work",
    "staff" => get_site_url() . '/professional',
];

// 方法①：正規表現で「(」以降をキャプチャする
if (preg_match('/^(.+?)\((.+?)\)$/u', $name, $matches)) {
    $title = trim($matches[1]);  // 「社員インタビュー / 山田隆司」
    $user_name = trim($matches[2]);  // 「YAMADA TAKASHI」
} else {
    // フォーマットが違う場合は全体を part1 に
    $title = $name;
    $user_name = '';
}

if ($post_type == 'works') {
    $categories = get_terms(array(
        'taxonomy' => 'works-cat',
        'hide_empty' => true,
    ));
}
$header_slug = "{$post_type_slug}-header";
$header_page = get_page_by_path($header_slug, OBJECT, 'page');
?>

<div class="">
    <?php
    if ($header_page) {
        $header_html = apply_filters('the_content', $header_page->post_content);
        echo $header_html;
    }
    ?>
    <div class="l-row" data-state="min">
        <div class="p-width__fit">
            <h1 class="c-text__middle c-text--bold"><?php echo $title; ?></h1>
        </div>
        <?php Space(32, 24); ?>
        <p class="c-text__med c-text--bold c-text--main c-text--en"><?php echo $formatted_date ?></p>

        <?php
        // カテゴリーを取得
        $terms = get_the_terms(get_the_ID(), 'category');
        $cat_list = '';
        if (! empty($terms) && ! is_wp_error($terms)) {
            $cat_list .= '<ul class="l-list__staff-cat">';
            foreach ($terms as $term) {
                $cat_list .= sprintf(
                    '<li class="c-item__staff-cat">
                <p class="p-text__tag">%s</p>
            </li>',
                    esc_html($term->name)
                );
            }
            $cat_list .= '</ul>';
        }

        ?>

        <?php Space(24, 20); ?>

        <?php
        // 動的に生成したカテゴリリストを出力
        echo $cat_list;
        ?>
        <?php Space(48, 40); ?>

        <!-- 画像ギャラリー-->
        <?php echo $thumbnail; ?>
        <!-- /画像ギャラリー-->

        <?php Space(80, 48); ?>

        <div class="c-text__title-reg p-post__content">
            <?php echo the_content(); ?>
        </div>

        <?php Space(80, 48); ?>

        <a href="<?php echo $return_link[$post_type]; ?>" class="c-button__wrap center color return">
            <div class="c-button__before"></div>
            <div class="c-button__inner">
                <p class="p-text__button">return view</p>
            </div>
            <div class="c-button__after"></div>
        </a>

        <?php Space(120, 80); ?>

    </div>
</div>