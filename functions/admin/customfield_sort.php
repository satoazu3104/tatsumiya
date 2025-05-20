<?php
add_filter('manage_posts_columns', 'add_posts_columns');
function add_posts_columns($columns){
  $columns['shop'] = '店舗名';
  return $columns;
}
//カスタム投稿タイプの場合
//add_filter('manage_{post_type}_posts_columns', 'add_posts_columns');


add_filter('manage_works_posts_custom_column', 'add_posts_custom_column', 10, 2);
add_filter('manage_voice_posts_custom_column', 'add_posts_custom_column', 10, 2);
//投稿一覧にカスタムフィールドのカラムを追加する
function add_posts_custom_column($column_name, $post_id){
  global $post_type;
  if($column_name === 'shop'){
    $column_id = get_post_meta($post_id, 'shop', true);
    $column_shop = get_post_meta($column_id, 'name', true);
    if(!empty($column_shop)){
      echo esc_html($column_shop);
    } else {
      echo __('None');
    }
  }
}

add_filter('manage_shop_posts_custom_column', 'add_posts_custom_shop_column', 10, 2);
//投稿一覧にカスタムフィールドのカラムを追加する
function add_posts_custom_shop_column($column_name, $post_id){
  global $post_type;
  if($column_name === 'shop'){
    $column_shop = get_post_meta($post_id, 'name', true);
    if(!empty($column_shop)){
      echo esc_html($column_shop);
    } else {
      echo __('None');
    }
  }
}
