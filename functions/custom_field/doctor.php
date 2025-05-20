<?php // カスタムフィールドを追加するための関数
function doctor_custom_fields_add_meta_boxes()
{
  add_meta_box(
    'doctor_custom_field', // メタボックスのID（一意の識別子）
    '医師の詳細', // メタボックスのタイトル
    'doctor_custom_fields_display', // メタボックスのコンテンツを表示するコールバック関数
    'doctor', // カスタムフィールドを追加する投稿タイプ（ここでは投稿タイプを指定）
    'normal', // メタボックスの表示位置（'normal', 'advanced', 'side' のいずれか）
    'high' // メタボックスの表示優先度（'high', 'core', 'default', 'low' のいずれか）
  );
}
add_action('add_meta_boxes', 'doctor_custom_fields_add_meta_boxes');

// カスタムフィールドの表示関数
function doctor_custom_fields_display($post)
{
  $custom_field_value = get_post_meta($post->ID, '_doctor_custom_field', true);
  console_log($custom_field_value);
  $value = is_array($custom_field_value) ? $custom_field_value : array(''); // 配列かどうかを確認してデフォルトの空配列をセット
  console_log($value);
  $labels = ['役職', '所属団体', '経歴', '画像'];
  $keys = ['category', 'group', 'career', 'image'];
  ?>
  <style>
    .custom_grid {
      display: grid;
      grid-template-columns: 100%;
      gap: 24px;
    }

    textarea {
      width: 100%;
      height: 240px;
      white-space: pre-wrap; /* テキストエリアの改行を反映 */
    }
  </style>
  <div class="custom_grid">
    <?php for ($i = 0; $i < count($labels); $i++) : ?>
      <div>
        <label for="doctor_custom_field"><?php echo $labels[$i] . ':'; ?></label>
        <?php if ($keys[$i] == 'category') : ?>
          <input type="text" id="doctor_custom_field_<?php echo esc_attr($keys[$i]); ?>" name="doctor_custom_field[<?php echo esc_attr($keys[$i]); ?>]" value="<?php echo esc_attr($custom_field_value[$keys[$i]] ?? ''); ?>" />
        <?php elseif ($keys[$i] == 'image') : ?>
          <?php
          $image_id = isset($custom_field_value[$keys[$i]]) ? intval($custom_field_value[$keys[$i]]) : 0;
          $image_url = wp_get_attachment_image_url($image_id, 'thumbnail');
          ?>
          <img src="<?php echo esc_url($image_url); ?>" id="doctor_custom_field_image_preview" style="max-width: 200px; height: auto;" />
          <input type="hidden" id="doctor_custom_field_image" name="doctor_custom_field[<?php echo esc_attr($keys[$i]); ?>]" value="<?php echo esc_attr($image_id); ?>" />
          <button type="button" id="doctor_custom_field_image_button" class="button">画像を選択</button>
          <button type="button" id="doctor_custom_field_image_remove" class="button">画像を削除</button>
          <script>
            // 画像選択ボタンのクリックイベント
            document.getElementById('doctor_custom_field_image_button').addEventListener('click', function() {
              var image = wp.media({
                title: '画像を選択',
                multiple: false
              }).open().on('select', function() {
                var uploaded_image = image.state().get('selection').first();
                var image_url = uploaded_image.toJSON().url;
                var image_id = uploaded_image.toJSON().id;
                document.getElementById('doctor_custom_field_image').value = image_id;
                document.getElementById('doctor_custom_field_image_preview').src = image_url;
              });
            });

            // 画像削除ボタンのクリックイベント
            document.getElementById('doctor_custom_field_image_remove').addEventListener('click', function() {
              document.getElementById('doctor_custom_field_image').value = '';
              document.getElementById('doctor_custom_field_image_preview').src = '';
            });
          </script>
        <?php else : ?>
          <textarea id="doctor_custom_field_<?php echo esc_attr($keys[$i]); ?>" name="doctor_custom_field[<?php echo esc_attr($keys[$i]); ?>]"><?php echo esc_textarea($custom_field_value[$keys[$i]] ?? ''); ?></textarea>
        <?php endif; ?>
      </div>
    <?php endfor; ?>
  </div>
<?php
}

// カスタムフィールドの保存関数
function doctor_custom_fields_save($post_id)
{
  if (array_key_exists('doctor_custom_field', $_POST)) {
    $custom_field_value = $_POST['doctor_custom_field'];
    $sanitized_value = array_map('sanitize_textarea_field', $custom_field_value); // 各フィールドの値をサニタイズ
    update_post_meta(
      $post_id,
      '_doctor_custom_field',
      $sanitized_value,
    );
  }
}
add_action('save_post', 'doctor_custom_fields_save');
