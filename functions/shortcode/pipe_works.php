<?php
add_shortcode('pipe_works_list', 'display_pipe_works_list');
function display_pipe_works_list()
{
    // タクソノミークエリの取得
    $material = isset($_GET['pipe_works_material']) ? sanitize_text_field($_GET['pipe_works_material']) : '';
    $shape = isset($_GET['pipe_works_shape']) ? sanitize_text_field($_GET['pipe_works_shape']) : '';

    // タクソノミークエリの構築
    $tax_query = array('relation' => 'AND');

    if ($material) {
        $tax_query[] = array(
            'taxonomy' => 'pipe_works_material-cat',
            'field'    => 'slug',
            'terms'    => $material,
        );
    }

    if ($shape) {
        $tax_query[] = array(
            'taxonomy' => 'pipe_works_shape-cat',
            'field'    => 'slug',
            'terms'    => $shape,
        );
    }

    // 投稿の取得
    $args = array(
        'post_type' => 'pipe_works',
        'posts_per_page' => -1,
        'tax_query' => count($tax_query) > 1 ? $tax_query : '',
    );

    $query = new WP_Query($args);

    // 代替の画像 URL を設定
    $fallback_image_url = get_template_directory_uri() . '/dist/assets/images/common/noimage.webp';
    // カテゴリリスト取得
    $materials = get_terms(array('taxonomy' => 'pipe_works_material-cat', 'hide_empty' => false));
    $shapes = get_terms(array('taxonomy' => 'pipe_works_shape-cat', 'hide_empty' => false));
    ob_start();

    // フィルターフォーム
?>
    <form class="l-wrap__cat-form" method="get" action="<?php echo site_url().'/business/pipe/works'; ?>">
        <p class="p-text__body c-text--white">材質・形状から検索する</p>
        <div class="l-wrap__cat-form__inner">
            <select class="c-input__select" name="pipe_works_material">
                <option value="">材質で絞り込む</option>
                <?php foreach ($materials as $term): ?>
                    <option value="<?php echo esc_attr($term->slug); ?>" <?php selected($material, $term->slug); ?>>
                        <?php echo esc_html($term->name); ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <select class="c-input__select" name="pipe_works_shape">
                <option value="">形状で絞り込む</option>
                <?php foreach ($shapes as $term): ?>
                    <option value="<?php echo esc_attr($term->slug); ?>" <?php selected($shape, $term->slug); ?>>
                        <?php echo esc_html($term->name); ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <button type="submit">検索</button>
        </div>
    </form>
    <div class="pipe-works-results">
        <?php if ($query->have_posts()): ?>
            <ul class="l-list__works">
                <?php while ($query->have_posts()): $query->the_post();
                    $thumbnail = get_the_post_thumbnail(get_the_ID(), 'large', array('class' => 'p-post__img--thumb'));
                    if (empty($thumbnail)) {
                        $thumbnail = '<img src="' . $fallback_image_url . '" alt="Fallback Image" class="p-post__img--thumb" />';
                    }
                ?>
                    <li class="c-item__works">
                        <?php echo $thumbnail; ?>
                        <div class="c-item__works__content">
                            <div class="l-wrap__cat-list__group">
                                <div class="l-wrap__cat-list">
                                    <p class="p-text__min">材質 :</p>
                                    <p class="p-text__min">
                                        <?php
                                        $material_terms = get_the_terms(get_the_ID(), 'pipe_works_material-cat');
                                        if (!empty($material_terms) && !is_wp_error($material_terms)) {
                                            $materials_list = wp_list_pluck($material_terms, 'name');
                                            echo esc_html(implode(', ', $materials_list));
                                        } else {
                                            echo 'なし';
                                        }
                                        ?>
                                    </p>
                                </div>
                                <div class="l-wrap__cat-list">
                                    <p class="p-text__min">形状 :</p>
                                    <p class="p-text__min">
                                        <?php
                                        $shape_terms = get_the_terms(get_the_ID(), 'pipe_works_shape-cat');
                                        if (!empty($shape_terms) && !is_wp_error($shape_terms)) {
                                            $shapes_list = wp_list_pluck($shape_terms, 'name');
                                            echo esc_html(implode(', ', $shapes_list));
                                        } else {
                                            echo 'なし';
                                        }
                                        ?>
                                    </p>
                                </div>
                            </div>
                            <p class="p-text__item-m"><?php the_title(); ?></p>
                        </div>
                    </li>
                <?php endwhile; ?>
            </ul>
        <?php else: ?>
            <br>
            <p>該当する加工実績は見つかりませんでした。</p>
        <?php endif; ?>
    </div>
<?php

    wp_reset_postdata();
    return ob_get_clean();
}
