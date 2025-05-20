<?php
// カスタム投稿タイプ「スタッフ」を登録
function create_staff_post_type()
{
  register_post_type(
    'staff',
    array(
      'labels' => array(
        'name' => __('スタッフ'),
        'singular_name' => __('スタッフ')
      ),
      'public' => true,
      'show_in_rest' => true,
      'has_archive' => true,
      'supports' => array(
        "title",
        "editor",
        "thumbnail",
        "custom-fields",
        "excerpt",
        "author",
        "trackbacks",
        "comments",
        "revisions",
        "page-attributes",
      ),
      'rewrite' => array('slug' => 'staff'),
    )
  );
}
add_action('init', 'create_staff_post_type');
