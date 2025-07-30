<?php
add_action('init', 'create_post_pipe_works');


function create_post_pipe_works()
{
  register_post_type(
    'pipe_works',
    array(
      'label' => 'パイプ加工実績',
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
    'pipe_works_material-cat',
    'pipe_works',
    array(
      'label' => '材質テゴリー',
      'hierarchical' => true,
      'public' => true,
      'show_in_rest' => true,
    )
  );

  register_taxonomy(
    'pipe_works_shape-cat',
    'pipe_works',
    array(
      'label' => '形状カテゴリー',
      'hierarchical' => true,
      'public' => true,
      'show_in_rest' => true,
    )
  );

  register_taxonomy(
    'pipe_works-tag',
    'pipe_works',
    array(
      'label' => 'タグ',
      'hierarchical' => false,
      'public' => true,
      'show_in_rest' => true,
      'update_count_callback' => '_update_post_term_count',
    )
  );
}