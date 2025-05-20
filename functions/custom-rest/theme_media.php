<?php
add_action('rest_api_init', function () {
  register_rest_route('mytheme/v1', '/theme-images/', array(
    'methods' => 'GET',
    'callback' => 'get_theme_images',
    'permission_callback' => '__return_true', 
  ));
});

function get_theme_images($data)
{
  $images_dir = get_template_directory() . '/dist/assets/images/media'; // 画像が格納されているディレクトリ
  $images_url = get_template_directory_uri() . '/dist/assets/images/media';
  $all_files = array_diff(scandir($images_dir), array('..', '.')); // '.' と '..' を除外

  // 拡張子が .webp のファイルのみをフィルタリング
  $images = array_filter($all_files, function ($filename) {
    return pathinfo($filename, PATHINFO_EXTENSION) === 'webp';
  });


  $image_list = [];
  foreach ($images as $image) {
    $image_list[] = array(
      'name' => $image,
      'url' => $images_url . '/' . $image,
    );
  }
  return new WP_REST_Response($image_list, 200);
}