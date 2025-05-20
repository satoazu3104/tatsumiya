<?php
function my_admin_script(){
  wp_enqueue_script( 'my_admin_script', get_template_directory_uri().'/dist/assets/js/admin.js', '', '', true);
}
add_action( 'admin_enqueue_scripts', 'my_admin_script' );
