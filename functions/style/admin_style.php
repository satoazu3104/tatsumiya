<?php
function my_admin_style(){
  wp_enqueue_style( 'my_admin_style', get_template_directory_uri().'/dist/assets/css/admin.css' );
}
add_action( 'admin_enqueue_scripts', 'my_admin_style' );
