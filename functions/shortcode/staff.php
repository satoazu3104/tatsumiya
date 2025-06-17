<?php
function custom_staff_shortcode($atts)
{
    // ショートコードの引数をデフォルト値とマージ
    $atts = shortcode_atts(
        array(
            'count' => 3, // デフォルトで5件表示
            'page-type' => '',
        ),
        $atts,
        'custom_staff'
    );

    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

    $page_type = $atts['page-type'];

    // ニュース記事を取得するクエリを作成
    $args = array(
        'post_type' => 'staff', // 投稿タイプ
        'posts_per_page' => $atts['count'], // 表示する記事の件数
        'paged' => $paged,
    );
    $query = new WP_Query($args);

    // 代替の画像 URL を設定
    $fallback_image_url = get_template_directory_uri() . '/dist/assets/images/common/noimage.webp';


    // ニュース記事のループ
    if ($query->have_posts()) {
        $output = '<ul class="l-list__staff">';
        $number = 0;
        while ($query->have_posts()) {
            $query->the_post();
            $formatted_date = get_the_date('Y.m.d'); // フォーマットした投稿日を取得
            $thumbnail = get_the_post_thumbnail(get_the_ID(), 'large', array('class' => 'p-img__staff'));
            $name = get_the_title();
            $number++;

            // 方法①：正規表現で「(」以降をキャプチャする
            if (preg_match('/^(.+?)\((.+?)\)$/u', $name, $matches)) {
                $title = trim($matches[1]);  // 「社員インタビュー / 山田隆司」
                $user_name = trim($matches[2]);  // 「YAMADA TAKASHI」
            } else {
                // フォーマットが違う場合は全体を part1 に
                $title = $name;
                $user_name = '';
            }

            if (empty($thumbnail)) {
                $thumbnail = '<img src="' . $fallback_image_url . '" alt="Fallback Image" class="p-img__staff" />';
            }

            // カテゴリーを取得
            $terms = get_the_terms(get_the_ID(), 'category');
            $cat_list = '';
            if (! empty($terms) && ! is_wp_error($terms)) {
                $cat_list .= '<ul class="l-list__staff-cat">';
                foreach ($terms as $term) {
                    $cat_list .= sprintf(
                        '<li class="c-item__staff-cat"><p class="p-text__tag">%s</p></li>',
                        esc_html($term->name)
                    );
                }
                $cat_list .= '</ul>';
            }
            ob_start(); ?>
            <li class="c-item__staff l-section__position">
                <a class="c-button__link" href="<?php echo get_the_permalink(); ?>"></a>
                <div class="p-grid__media">
                    <p class="p-text__number name c-text--tate"><?php echo $user_name; ?></p>
                    <p class="p-text__number number c-text--tate"><?php echo '#' . sprintf('%02d', $number);; ?></p>
                    <?php echo $thumbnail; ?>
                </div>
                <div class="p-grid__content">
                    <div class="l-wrap__staff-head">
                        <p class="p-text__date"><?php echo $formatted_date; ?></p>

                        <?php
                        // 動的に生成したカテゴリリストを出力
                        echo $cat_list;
                        ?>
                    </div>
                    <p class="p-text__post">社員インタビュー / <?php echo $title; ?></p>
                </div>
            </li>
<?php
            $output .= ob_get_clean();
        }
        $output .= '</ul>';
        wp_reset_postdata();
        return $output;
    } else {
        return '';
    }
}
add_shortcode('custom_staff', 'custom_staff_shortcode');
