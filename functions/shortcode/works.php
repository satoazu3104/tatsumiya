<?php
function custom_works_shortcode($atts)
{
    // ショートコードの引数をデフォルト値とマージ
    $atts = shortcode_atts(
        array(
            'count' => 3, // デフォルトで5件表示
            'splide' => false, // デフォルトではスライドオフ
        ),
        $atts,
        'custom_works'
    );

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

    // ニュース記事を取得するクエリを作成
    $args = array(
        'post_type' => 'works', // 投稿タイプ
        'posts_per_page' => $atts['count'], // 表示する記事の件数
        'paged' => $paged,
        'tax_query' => $tax_query, // タクソノミークエリを追加
    );
    $query = new WP_Query($args);

    $splide_list = $atts['splide'] ? 'splide__list' : '';
    $splide_slide = $atts['splide'] ? 'splide__slide' : '';

    // 代替の画像 URL を設定
    $fallback_image_url = get_template_directory_uri() . '/dist/assets/images/common/noimage.webp';

    // ニュース記事のループ
    if ($query->have_posts()) {
        if ($atts['splide']) {
            // splide 有り
            $output = '<section class="splide splide__works c-splide__works js-scroll-left"><div class="splide__track"><ul class="splide__list">';
            $index = 0;
            while ($query->have_posts()) {
                $index++;
                $query->the_post();
                $formatted_date = get_the_date('Y.m.d'); // フォーマットした投稿日を取得
                $thumbnail = get_the_post_thumbnail(get_the_ID(), 'large', array('class' => 'p-post__img--thumb'));
                $categories = get_the_terms(get_the_ID(), 'works-cat');
                if (empty($thumbnail)) {
                    $thumbnail = '<img src="' . $fallback_image_url . '" alt="Fallback Image" class="p-post__img--thumb" />';
                }
                $address = get_post_meta(get_the_ID(), '_address', true);

                ob_start(); ?>
                <li class="splide__slide c-splide__works-slide">
                    <a href="<?php echo get_permalink(); ?>" class="p-post__item c-button__trigger">
                        <?php echo $thumbnail; ?>
                        <div class="p-post__item-inner">
                            <?php if ($categories): ?>
                                <ul class="p-post__cate__list no-mt">
                                    <?php foreach ($categories as $key => $value): ?>
                                        <li>
                                            <object data="" type="">
                                                <a class="c-text--bold c-text--white p-post__cate__items c-text__normal" href="<?php echo site_url() . '/work/?term=' . $value->slug . '&id=' . $value->term_id; ?>">
                                                    <?php echo $value->name; ?>
                                                </a>
                                            </object>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                            <?php endif; ?>
                            <p class="c-text__normal c-text--en c-text--bold c-text--white"><?php echo $formatted_date; ?></p>
                            <p class="c-text__page-title c-text--bold c-text--white"><?php echo get_the_title(); ?></p>
                        </div>
                        <!-- <div class="c-button__after-min"></div> -->
                    </a>
                </li>
            <?php
                $output .= ob_get_clean();
            }
            $output .= '</ul></div></section>';
        } else {
            // splide 無し
            $output = '<ul class="p-post__list ' . $splide_list . '">';
            while ($query->have_posts()) {
                $query->the_post();
                $formatted_date = get_the_date('Y.m.d'); // フォーマットした投稿日を取得
                $thumbnail = get_the_post_thumbnail(get_the_ID(), 'large', array('class' => 'p-post__img--thumb'));
                $categories = get_the_terms(get_the_ID(), 'works-cat');
                if (empty($thumbnail)) {
                    $thumbnail = '<img src="' . $fallback_image_url . '" alt="Fallback Image" class="p-post__img--thumb" />';
                }
                $address = get_post_meta(get_the_ID(), '_address', true);

                ob_start(); ?>
                <li>
                    <a href="<?php echo get_permalink(); ?>" class="p-post__item c-button__trigger">
                        <?php echo $thumbnail; ?>
                        <div class="p-post__item-inner">
                            <?php if ($categories): ?>
                                <ul class="p-post__cate__list no-mt">
                                    <?php foreach ($categories as $key => $value): ?>
                                        <li>
                                            <object data="" type="">
                                                <a class="c-text--bold c-text--white p-post__cate__items c-text__normal" href="<?php echo site_url() . '/work/?term=' . $value->slug . '&id=' . $value->term_id; ?>">
                                                    <?php echo $value->name; ?>
                                                </a>
                                            </object>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                            <?php endif; ?>
                            <p class="p-text__date"><?php echo $formatted_date; ?></p>
                            <p class="p-text__post"><?php echo get_the_title(); ?></p>
                        </div>
                        <!-- <div class="c-button__after-min"></div> -->
                    </a>
                </li>
<?php
                $output .= ob_get_clean();
            }
            $output .= '</ul>';
        }
        wp_reset_postdata();
        return $output;
    } else {
        return '記事がありません。';
    }
}
add_shortcode('custom_works', 'custom_works_shortcode');
