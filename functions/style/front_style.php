<?php
// CSS ファイル追加
function add_style()
{
  wp_enqueue_style('style', get_template_directory_uri() . '/dist/assets/css/index.css', array(), '41.0', 'all');
}
add_action('wp_enqueue_scripts', 'add_style');
