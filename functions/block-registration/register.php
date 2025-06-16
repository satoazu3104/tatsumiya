<?php
function block_enqueue() {
  $blocks = [
    'firstview',
    'contentbox',
    'title',
    'bodytext',
    'middletext',
    'space',
    'medias',
    'wrapper',
    'listproblem',
    'listproblemuser',
    'listfaq',
    'listcompany',
    'linkbutton',
    'splide',
    'dectitle',
    'interview'
  ];
  foreach ($blocks as $key => $value) {
    //アセットファイルをインクルード
    $asset_file = include( get_theme_file_path('/dist/assets/js/blocks/'.$value.'.asset.php'));

    //ブロック用のスクリプトを登録
    wp_register_script(
      $value,
      get_theme_file_uri('/dist/assets/js/blocks/'.$value.'.js'),
      $asset_file['dependencies'], 
      $asset_file['version'] 
    );
    
     // mediasブロックの場合はローカライズされたデータを追加
     if ($value === 'medias') {
      wp_localize_script(
        $value, // スクリプトのハンドル
        'portartMedia', // JavaScriptで使用されるオブジェクト名
        array('themeUrl' => get_template_directory_uri()) // データ
      );
    }


    //ブロックの登録
    register_block_type( 
      'portart/'.$value,
      array(
        'editor_script' => $value, 
      ) 
    );
  }
}
add_action( 'init', 'block_enqueue' );