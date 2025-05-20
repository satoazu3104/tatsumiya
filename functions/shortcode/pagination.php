<?php
// [custom_pagination post_type="your_post_type" posts_per_page="5"] のように使用。
// 特定のカスタム投稿タイプの一覧とページネーションを表示することができる。
// post_type には表示したいカスタム投稿タイプを、posts_per_page には1ページあたりに表示したい投稿数を指定。
function custom_pagination_shortcode($atts)
{
    $atts = shortcode_atts(array(
        'post_type' => 'post',
        'posts_per_page' => 10,
    ), $atts);

    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
    $term = (get_query_var('term')) ? get_query_var('term') : '';

    if (!empty($term) && !empty($term)) {
        $tax_query = array(
            array(
                'taxonomy' => 'works-cat',
                'field'    => 'slug',
                'terms'    => $term,
            ),
        );
    } else {
        $tax_query = array(); // タクソノミーが指定されていない場合、空のタクソノミークエリを設定
    }

    $args = array(
        'post_type' => $atts['post_type'],
        'posts_per_page' => $atts['posts_per_page'],
        'paged' => $paged,
        'tax_query' => $tax_query, // タクソノミークエリを追加
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {

        $output = '<div class="c-pagination__wrap">';
        $big = 999999999; // need an unlikely integer


        $output .= paginate_links(array(
            'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
            'format' => '?paged=%#%',
            'current' => max(1, get_query_var('paged')),
            'total' => $query->max_num_pages,
            'prev_next' => true,
            'prev_text' => __('戻る'),
            'next_text' => __('次へ'),
        ));

        wp_reset_postdata();
    }

    $output .= '</div>';

    if (1 < $query->max_num_pages) {
        return $output;
    }
}
add_shortcode('custom_pagination', 'custom_pagination_shortcode');
