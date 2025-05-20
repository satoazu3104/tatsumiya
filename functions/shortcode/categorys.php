<?php
// works-cat タクソノミーを取得するショートコード
function get_works_cat_taxonomy()
{
  // タクソノミーを取得
  $taxonomy = 'works-cat';
  $terms = get_terms(array(
    'taxonomy' => $taxonomy,
    'hide_empty' => false, // 空のタームも含める場合は true
  ));

  $select = get_query_var('term') ?? '';

  // タームを表示
  if (!empty($terms)) {
    $output = '<div class="l-row" >';
    $output .= '<div class="p-post__cate" >';
    $output .= '<p class="c-text__title c-text--white p-post__cate--title">気になるキーワードから絞り込む</p>';
    $output .= '<ul class="p-post__cate__list" >';
    $output .= '<li><a href="' . site_url() . '/work/" class="c-text--bold c-text--white p-post__cate__items c-text__normal" data-state="">全て</a></li>';
    foreach ($terms as $term) {
      if ($term->name == $select) {
        $output .= '<li><a href="' . site_url() . '/work/?term=' . $term->slug . '&id=' . $term->term_id . '" class="c-text--bold c-text--white p-post__cate__items c-text__normal" data-state="select">' . esc_html($term->name) . '</a></li>';
      } else {
        $output .= '<li><a href="' . site_url() . '/work/?term=' . $term->slug . '&id=' . $term->term_id . '" class="c-text--bold c-text--white p-post__cate__items c-text__normal">' . esc_html($term->name) . '</a></li>';
      }
    }
    $output .= '</ul>';
    $output .= '</div>';
    $output .= '</div>';
  } else {
    // $output = '<p class="c-text--white">タクソノミーが見つかりません。</p>';
  }

  return $output;
}
add_shortcode('works-cat-list', 'get_works_cat_taxonomy');
