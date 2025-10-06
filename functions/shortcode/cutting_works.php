<?php
add_shortcode('cutting_works_list', 'display_cutting_works_list');
function display_cutting_works_list()
{
    // パラメータ取得
    $material = isset($_GET['cutting_works_material']) ? sanitize_text_field($_GET['cutting_works_material']) : '';
    $shape    = isset($_GET['cutting_works_shape'])    ? sanitize_text_field($_GET['cutting_works_shape'])    : '';

    // tax_query 組み立て
    $tax_query = array();

    if ($material) {
        $tax_query[] = array(
            'taxonomy' => 'cutting_works_material-cat',
            'field'    => 'id',   // ★ここをslugからidに変更
            'terms'    => (int) $material,
        );
    }

    if ($shape) {
        $tax_query[] = array(
            'taxonomy' => 'cutting_works_shape-cat',
            'field'    => 'id',   // ★ここもidに
            'terms'    => (int) $shape,
        );
    }

    if (!empty($tax_query) && count($tax_query) > 1) {
        // 両方指定時は AND
        $tax_query = array_merge(array('relation' => 'AND'), $tax_query);
    }

    // 投稿取得
    $args = array(
        'post_type'      => 'cutting_works',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    );

    if (!empty($tax_query)) {
        $args['tax_query'] = $tax_query;
    }

    $query = new WP_Query($args);

    // 代替画像
    $fallback_image_url = get_template_directory_uri() . '/dist/assets/images/common/noimage.webp';

    // カテゴリ（タクソノミー）取得
    $materials = get_terms(array('taxonomy' => 'cutting_works_material-cat', 'hide_empty' => false));
    $shapes    = get_terms(array('taxonomy' => 'cutting_works_shape-cat',    'hide_empty' => false));

    ob_start();
?>
    <form class="l-wrap__cat-form" method="get" action="<?php echo site_url() . '/business/cutting/works'; ?>">
        <p class="p-text__body c-text--white">材質・形状から検索する</p>
        <div class="l-wrap__cat-form__inner">
            <select class="c-input__select" name="cutting_works_material">
                <option value="">材質で絞り込む</option>
                <?php if (!is_wp_error($materials)) : foreach ($materials as $term): ?>
                        <option value="<?php echo esc_attr($term->term_id); ?>" <?php selected($material, $term->term_id); ?>>
                            <?php echo esc_html($term->name); ?>
                        </option>
                <?php endforeach;
                endif; ?>
            </select>

            <select class="c-input__select" name="cutting_works_shape">
                <option value="">形状で絞り込む</option>
                <?php if (!is_wp_error($shapes)) : foreach ($shapes as $term): ?>
                        <option value="<?php echo esc_attr($term->term_id); ?>" <?php selected($shape, $term->term_id); ?>>
                            <?php echo esc_html($term->name); ?>
                        </option>
                <?php endforeach;
                endif; ?>
            </select>

            <button type="submit">検索</button>
        </div>
    </form>

    <div class="cutting-works-results">
        <?php if ($query->have_posts()): ?>
            <ul class="l-list__works">
                <?php while ($query->have_posts()): $query->the_post();
                    $thumbnail = get_the_post_thumbnail(get_the_ID(), 'large', array('class' => 'p-post__img--thumb js-popup'));
                    if (empty($thumbnail)) {
                        $thumbnail = '<img src="' . esc_url($fallback_image_url) . '" alt="Fallback Image" class="p-post__img--thumb js-popup" />';
                    }
                ?>
                    <li class="c-item__works">
                        <p class="p-text__item-m"><?php the_title(); ?></p>
                        <?php echo $thumbnail; ?>
                        <div class="c-item__works__content">
                            <div class="l-wrap__cat-list__group">
                                <div class="l-wrap__cat-list">
                                    <p class="p-text__min">材質 :</p>
                                    <p class="p-text__min">
                                        <?php
                                        $material_terms = get_the_terms(get_the_ID(), 'cutting_works_material-cat');
                                        if (!empty($material_terms) && !is_wp_error($material_terms)) {
                                            echo esc_html(implode(', ', wp_list_pluck($material_terms, 'name')));
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
                                        $shape_terms = get_the_terms(get_the_ID(), 'cutting_works_shape-cat');
                                        if (!empty($shape_terms) && !is_wp_error($shape_terms)) {
                                            echo esc_html(implode(', ', wp_list_pluck($shape_terms, 'name')));
                                        } else {
                                            echo 'なし';
                                        }
                                        ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                <?php endwhile;
                wp_reset_postdata(); ?>
            </ul>
        <?php else: ?>
            <br>
            <p>該当する加工実績は見つかりませんでした。</p>
        <?php endif; ?>
    </div>
<?php
    return ob_get_clean();
}
