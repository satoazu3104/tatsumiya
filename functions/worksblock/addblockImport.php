<?php
function worksAddBlock() {
  wp_enqueue_script(
    'works-add-block',
    //ブロック用スクリプトの URL は get_theme_file_uri() などを使用
    get_theme_file_uri('/functions/worksblock/block.js'),
    array( 'wp-blocks', 'wp-element' ),
    filemtime(get_theme_file_path('/functions/worksblock/block.js'))
  );
}
add_action( 'enqueue_block_editor_assets', 'worksAddBlock' );
