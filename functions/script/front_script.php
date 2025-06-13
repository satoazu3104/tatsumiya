<?php
//js ファイル追加
function add_script() {
  $tmp_path_arr = array(
    'temp_uri' => get_template_directory_uri(),
    'site_url' => site_url()
  );
  wp_enqueue_script( 'custom_script', get_template_directory_uri() . '/dist/assets/js/index.js', ['wp-element', 'wp-api'], '4.5', true);
  // wp_enqueue_script( 'custom_script', 'https://www.google.com/recaptcha/api.js', ['wp-element', 'wp-api'], '2.4', true);
  wp_localize_script( 'custom_script', 'tmp_path', $tmp_path_arr );
  $data_array = array(
    'ajaxurl' => admin_url('admin-ajax.php')
  );
  wp_localize_script('custom_script', 'ajax_obj', $data_array);
  wp_enqueue_script('jquery');

}
add_action('wp_enqueue_scripts', 'add_script');

