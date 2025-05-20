<?php
add_action('init', 'create_post_voice');

function create_post_voice()
{

  register_post_type(
    'voice',
    array(
      'label' => 'お客様の声',
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
    'voice-cat',
    'voice',
    array(
      'label' => 'カテゴリー',
      'hierarchical' => true,
      'public' => true,
      'show_in_rest' => true,
    )
  );

  register_taxonomy(
    'voice-tag',
    'voice',
    array(
      'label' => 'タグ',
      'hierarchical' => false,
      'public' => true,
      'show_in_rest' => true,
      'update_count_callback' => '_update_post_term_count',
    )
  );
}

// カスタムフィールドを追加するアクションフック
// add_action('add_meta_boxes', 'add_custom_fields_to_voice');

// カスタムフィールドを追加する関数
function add_custom_fields_to_voice()
{
  // カスタムフィールドの配列
  $custom_fields = array(
    array(
      'name' => 'ビフォー画像',
      'slug' => 'before_image',
      'type' => 'image', // 画像をアップロードするフィールド
    ),
    array(
      'name' => 'アフター画像',
      'slug' => 'after_image',
      'type' => 'image',
    ),
    array(
      'name' => 'エリア',
      'slug' => 'area',
      'type' => 'text', // 複数行のテキストを入力するフィールド
    ),
    array(
      'name' => 'お客様名',
      'slug' => 'name',
      'type' => 'text', // 複数行のテキストを入力するフィールド
    ),
    array(
      'name' => '評価',
      'slug' => 'review',
      'type' => 'number', // 複数行のテキストを入力するフィールド
    ),
    array(
      'name' => '一言コメント',
      'slug' => 'comment',
      'type' => 'textarea', // 複数行のテキストを入力するフィールド
    ),
  );

  // カスタムフィールドを追加するループ
  foreach ($custom_fields as $field) {
    add_post_type_support('voice', 'custom-fields'); // カスタムフィールドをサポート

    // カスタムフィールドを登録
    add_meta_box(
      $field['slug'] . '_field',
      $field['name'],
      'render_custom_field_for_voice',
      'voice',
      'normal',
      'high',
      array('field_slug' => $field['slug'], 'field_type' => $field['type'])
    );
  }
}

// カスタムフィールドの表示と入力フィールドの生成
function render_custom_field_for_voice($post, $args)
{
  $field_slug = $args['args']['field_slug'];
  $field_type = $args['args']['field_type'];
  $field_value = get_post_meta($post->ID, $field_slug, true);

  if ($field_type === 'image') {
    // 画像をアップロードするフィールドの場合
    echo '<input type="hidden" name="' . $field_slug . '_nonce" id="' . $field_slug . '_nonce" value="' . wp_create_nonce(plugin_basename(__FILE__)) . '" />';
    echo '<div><input type="button" id="' . $field_slug . '_button" class="button" value="画像を選択" /></div>';
    echo '<div><img id="' . $field_slug . '_preview" src="' . $field_value . '" style="max-width: 100%; height: auto;" /></div>';
?>
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        var button = document.getElementById('<?php echo $field_slug; ?>_button');
        var preview = document.getElementById('<?php echo $field_slug; ?>_preview');
        var input = document.getElementById('<?php echo $field_slug; ?>');
        console.log('<?php echo $field_slug; ?>_preview');

        button.addEventListener("click", function(event) {
          event.preventDefault();
          var mediaUploader = wp.media({
            title: '画像を選択',
            multiple: false
          });

          mediaUploader.on('select', function() {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            preview.src = attachment.url;
            input.value = attachment.url;
          });

          mediaUploader.open();
        });
      });
    </script>
<?php
    echo '<input type="hidden" name="' . $field_slug . '" id="' . $field_slug . '" value="' . esc_attr($field_value) . '" />';
  } else {
    // その他のフィールドの場合
    echo '<input type="' . $field_type . '" name="' . $field_slug . '" id="' . $field_slug . '" value="' . esc_attr($field_value) . '" style="width: 100%;" />';
  }
}

// カスタムフィールドの値を保存
add_action('save_post', 'save_custom_fields_for_voice');
function save_custom_fields_for_voice($post_id)
{
  $custom_fields = array(
    'review',
    'area',
    'name',
    'before_image',
    'after_image',
    'comment',
  );

  foreach ($custom_fields as $field) {
    if (array_key_exists($field, $_POST)) {
      update_post_meta(
        $post_id,
        $field,
        $_POST[$field]
      );
    }
  }
}
