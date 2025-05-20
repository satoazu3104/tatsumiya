<?php
function meta_headcustomtags() {
  // head内にカスタム用のコードを追加する
  function page_or_home() {
    if ( is_front_page() || is_home() ) {
      return 'website';
    } else {
      return 'article';
    }
  }
  function og_title() {
    if ( is_front_page() || is_home() ) {
      return get_bloginfo( 'name' );
    } else {
      return get_the_title(). ' | ' .get_bloginfo( 'name' );
    }
  }
  function og_desc() {
    if ( is_front_page() || is_home() ) {
      return get_bloginfo( 'description' );
    } else {
      $content = get_the_content();
      $content = apply_filters( 'the_content', $content );
      $content = str_replace( ']]>', ']]>', $content );
      $content = wp_strip_all_tags($content);
      return $content;
    }
  }
  
  $headcustomtag = '
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta property="og:url" content="'.site_url().'" />
  <meta property="og:local" content="ja_JP">
  <meta property="og:type" content="'.page_or_home().'" />
  <meta property="og:title" content="'.og_title().'" />
  <meta property="og:image" content="'. get_template_directory_uri()."/OGP.png" .'" class="">
  <meta property="og:description" content="'.og_desc().'" />
  <meta property="og:site_name" content="'.get_bloginfo( 'name' ).'" />
  <meta name="author" content="'.get_bloginfo( 'name' ).'">
  <meta name="description" content="'.og_desc().'">
  <meta name="keywords" content="">
  <title>'.og_title().'</title>
  ';
  // echo $headcustomtag;
}
add_action( 'wp_head', 'meta_headcustomtags', 99);

