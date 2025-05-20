<?php
function custom_news_shortcode($atts)
{
    // ショートコードの引数をデフォルト値とマージ
    $atts = shortcode_atts(
        array(
            'count' => 3, // デフォルトで5件表示
            'page-type' => '',
            'splide' => ''
        ),
        $atts,
        'custom_news'
    );

    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

    $page_type = $atts['page-type'];
    $splide = $atts['splide'];

    // ニュース記事を取得するクエリを作成
    $args = array(
        'post_type' => 'post', // 投稿タイプ
        'posts_per_page' => $atts['count'], // 表示する記事の件数
        'paged' => $paged,
    );
    $query = new WP_Query($args);

    // 代替の画像 URL を設定
    $fallback_image_url = get_template_directory_uri() . '/dist/assets/images/common/noimage.webp';

    if ($atts['count'] == 1) {
        if ($query->have_posts()) {
            $output = '';
            while ($query->have_posts()) {
                $query->the_post();
                $formatted_date = get_the_date('Y.m.d'); // フォーマットした投稿日を取得
                ob_start(); ?>
                <a href="<?php echo get_permalink(); ?>" class="p-post__wrap-fix c-button__trigger">
                    <p class="c-text--en c-text--main c-text__min c-text--med"><?php echo $formatted_date; ?></p>
                    <p class="c-text__normal c-text--med c-text__line-cut--1"><?php echo get_the_title(); ?></p>
                    <div class="c-button__after-min"></div>
                </a>
            <?php
                $output .= ob_get_clean();
            }
            wp_reset_postdata();
            return $output;
        } else {
            return '';
        }
    } else {
        // ニュース記事のループ
        if ($query->have_posts()) {
            $output = '<ul class="p-post__list ' . $page_type . '">';
            while ($query->have_posts()) {
                $query->the_post();
                $formatted_date = get_the_date('Y.m.d'); // フォーマットした投稿日を取得
                $thumbnail = get_the_post_thumbnail(get_the_ID(), 'large', array('class' => 'p-post__img--thumb'));
                $year = get_the_date('Y'); // フォーマットした投稿日を取得
                $month = ltrim(get_the_date('m.'), '0'); // フォーマットした投稿日を取得
                $date = get_the_date('d'); // フォーマットした投稿日を取得
                $categories = get_the_category(get_the_ID());
                if (empty($thumbnail)) {
                    $thumbnail = '<img src="' . $fallback_image_url . '" alt="Fallback Image" class="p-post__img--thumb" />';
                }
                ob_start(); ?>
                <li class="p-post__item c-button__trigger">
                    <?php echo $thumbnail; ?>
                    <div class="p-post__item-inner">
                        <p class="p-text__date"><?php echo $formatted_date; ?></p>
                        <p class="p-text__post"><?php echo get_the_title(); ?></p>
                    </div>
                    <a class="c-button__link" href="<?php echo get_permalink(); ?>"></a>
                </li>
<?php
                $output .= ob_get_clean();
            }
            $output .= '</ul>';
            wp_reset_postdata();
            return $output;
        } else {
            return 'ニュース記事がありません。';
        }
    }
}
add_shortcode('custom_news', 'custom_news_shortcode');
