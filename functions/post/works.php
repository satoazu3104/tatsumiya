<?php
add_action('init', 'create_post_works');


function create_post_works()
{
  register_post_type(
    'works',
    array(
      'label' => '施工実績',
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
    'works-cat',
    'works',
    array(
      'label' => 'カテゴリー',
      'hierarchical' => true,
      'public' => true,
      'show_in_rest' => true,
    )
  );

  register_taxonomy(
    'works-tag',

    array(
      'label' => 'タグ',
      'hierarchical' => false,
      'public' => true,
      'show_in_rest' => true,
      'update_count_callback' => '_update_post_term_count',
    )
  );
}

add_action('add_meta_boxes', 'add_address_meta_box');
add_action('save_post', 'save_address_meta_box_data');

function add_address_meta_box()
{
  add_meta_box(
    'address_meta_box', // メタボックスID
    '住所', // メタボックスのタイトル
    'display_address_meta_box', // コールバック関数
    'works', // 対象のカスタム投稿タイプ
    'side', // 表示位置 ('side'にするとカテゴリ―の近くに表示される)
    'default' // 優先度
  );
}

function display_address_meta_box($post)
{
  // 既存の住所の値を取得
  $address = get_post_meta($post->ID, '_address', true);

  // フィールドの表示
  wp_nonce_field('save_address_meta_box_data', 'address_meta_box_nonce');
  echo '<label for="address_field">住所を入力してください:</label>';
  echo '<input type="text" id="address_field" name="address_field" value="' . esc_attr($address) . '" size="25" />';
}

function save_address_meta_box_data($post_id)
{
  // セキュリティチェック
  if (! isset($_POST['address_meta_box_nonce'])) {
    return;
  }
  if (! wp_verify_nonce($_POST['address_meta_box_nonce'], 'save_address_meta_box_data')) {
    return;
  }
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }
  if (! current_user_can('edit_post', $post_id)) {
    return;
  }

  // フィールドの値を保存
  if (isset($_POST['address_field'])) {
    $address = sanitize_text_field($_POST['address_field']);
    update_post_meta($post_id, '_address', $address);
  }
}
