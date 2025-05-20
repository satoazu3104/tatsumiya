<?php
//ブロック登録用ファイルのインクルードする処理
//テーマディレクトリからブロック登録用ファイルのあるディレクトリへのパス
$block_registration_dir = '/functions/block-registration/';
//ブロック登録用ファイルのあるディレクトリへのパス
$block_registration_dir_path = get_theme_file_path($block_registration_dir);
//ファイル名を格納する配列
$block_registration_files = [];
//dir() の read() メソッドを使ってファイル名を取得
if($dir = dir($block_registration_dir_path)) {
  while(FALSE !== ($filename = $dir -> read())) {
    //is_file() でファイルのみを取得（ . や .. を除外）
    if(is_file($block_registration_dir_path.$filename)) {
      $block_registration_files[] = $filename;
    }
  }
}
//ディレクトリを閉じる
$dir -> close();
//取得した配列を使ってインクルード
foreach($block_registration_files as $file) {
  include($block_registration_dir_path.$file);
}