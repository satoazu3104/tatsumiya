<?php
function custom_news_with_pagination_shortcode($atts)
{
    $atts = shortcode_atts(
        array(
            'count' => 3,
            'page-type' => '',
            'splide' => ''
        ),
        $atts,
        'custom_news_with_pagination'
    );

    // 固定ページでの paged 対策
    if (get_query_var('paged')) {
        $paged = get_query_var('paged');
    } elseif (get_query_var('page')) {
        // 「投稿ページ」として指定された固定ページでは 'page' が使われることがある
        $paged = get_query_var('page');
    } elseif (isset($_GET['paged'])) {
        // URLが /news?page=2 形式の場合
        $paged = intval($_GET['paged']);
    } else {
        $paged = 1;
    }

    $page_type = $atts['page-type'];
    $splide = $atts['splide'];

    $args = array(
        'post_type'      => 'post',
        'posts_per_page' => $atts['count'],
        'paged'          => $paged,

        'meta_query'     => array(
            'relation' => 'OR',
            array(
                'key'     => '_language',
                'compare' => 'NOT EXISTS',
            ),
            array(
                'key'     => '_language',
                'value'   => 'en',
                'compare' => '!=',
            ),
        ),
    );
    $query = new WP_Query($args);

    $fallback_image_url = get_template_directory_uri() . '/dist/assets/images/common/noimage.webp';

    ob_start();

    if ($query->have_posts()) {
        echo '<ul class="p-post__list ' . esc_attr($page_type) . '">';
        while ($query->have_posts()) {
            $query->the_post();
            $formatted_date = get_the_date('Y.m.d');
            $thumbnail = get_the_post_thumbnail(get_the_ID(), 'large', array('class' => 'p-post__img--thumb'));
            if (empty($thumbnail)) {
                $thumbnail = '<img src="' . esc_url($fallback_image_url) . '" alt="Fallback Image" class="p-post__img--thumb" />';
            }
?>
            <li class="p-post__item c-button__trigger">
                <?php echo $thumbnail; ?>
                <div class="p-post__item-inner">
                    <p class="p-text__date"><?php echo $formatted_date; ?></p>
                    <p class="p-text__post"><?php echo portart_get_the_title(); ?></p>
                </div>
                <a class="c-button__link" href="<?php echo get_permalink(); ?>"></a>
            </li>
<?php
        }
        echo '</ul>';

        // ページネーション追加
        echo '<div class="c-pagination__wrap">';
        echo paginate_links(array(
            'base' => get_pagenum_link(1) . '%_%',
            'format' => 'page/%#%/',
            'current' => max(1, $paged),
            'total' => $query->max_num_pages,
            'prev_next' => true,
            'prev_text' => '«',
            'next_text' => '»',
        ));
        echo '</div>';
    } else {
        echo 'ニュース記事がありません。';
    }

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('custom_news_with_pagination', 'custom_news_with_pagination_shortcode');
