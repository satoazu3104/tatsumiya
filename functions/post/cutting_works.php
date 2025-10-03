<?php
add_action('init', 'create_post_cutting_works');


function create_post_cutting_works()
{
  register_post_type(
    'cutting_works',
    array(
      'label' => '切削加工実績',
      'public' => true,
      'has_archive' => true,
      'show_in_rest' => true,
      'menu_position' => 5,
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
    )
  );

  register_taxonomy(
    'cutting_works_material-cat',
    'cutting_works',
    array(
      'label' => '材質テゴリー',
      'hierarchical' => true,
      'public' => true,
      'show_in_rest' => true,
    )
  );

  register_taxonomy(
    'cutting_works_shape-cat',
    'cutting_works',
    array(
      'label' => '形状カテゴリー',
      'hierarchical' => true,
      'public' => true,
      'show_in_rest' => true,
    )
  );

  register_taxonomy(
    'cutting_works-tag',
    'cutting_works',
    array(
      'label' => 'タグ',
      'hierarchical' => false,
      'public' => true,
      'show_in_rest' => true,
      'update_count_callback' => '_update_post_term_count',
    )
  );
}