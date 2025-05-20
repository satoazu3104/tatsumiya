<?php
/**
 * ページネーション出力関数
 * $paged : 現在のページ
 * $pages : 全ページ数
 * $range : 左右に何ページ表示するか
 * $show_only : 1ページしかない時に表示するかどうか
 */
function my_redirect($redirect_url){
  if(is_page()){
    $subject = $redirect_url;
    $pattern = '/\/page\//'; // URLに「/page/」があるかチェック
    preg_match($pattern, $subject, $matches);

    if ($matches){
      //リクエストURLに「/page/」があれば、リダイレクトしない。
      $redirect_url = false;
      return $redirect_url;
    }
  }

  if ( is_archive() ){
    $subject = $redirect_url;
    $pattern = '/\/page\//'; // URLに「/page/」があるかチェック
    preg_match($pattern, $subject, $matches);

    if ($matches){
      //リクエストURLに「/page/」があれば、リダイレクトしない。
      $redirect_url = false;
      return $redirect_url;
    }
  }
}
//add_filter('redirect_canonical','my_redirect');


function pagination($pages, $paged, $range = 2, $show_only = true) {
  $pages = (int) $pages; //float型で渡ってくるので明示的に int型 へ
  $paged = $paged ?: 1; //get_query_var('paged')をそのまま投げても大丈夫なように

  //表示テキスト
  $text_first = "";
  $text_before = "";
  $text_next = "";
  $text_last = "";
  global $post;
  $post_type = $post->post_type;
  if($post_type == 'page') {
    $post_type = $post->post_name;
  }

  if ($show_only && $pages === 1) {
    // １ページのみで表示設定が true の時
    echo '<div class="c-pagination"><span class="c-pagination__number" data-state="current">1</span></div>';
    return;
  }

  if ($pages === 1) {
    return;
  } // １ページのみで表示設定もない場合

  if (1 !== $pages) {
    //２ページ以上の時
    echo '<div class="c-pagination">';
    if ($paged > $range + 1) {
      // 「最初へ」 の表示
      // echo '<a href="', get_pagenum_link(1) ,'" class="c-pagination__pager" data-state="prev-first">', $text_first ,'</a>';
    }
    if ($paged > 1) {
      // 「前へ」 の表示
      echo '<a href="',
        site_url('/'.$post_type.'/?paged='.($paged - 1)),
        '" class="c-pagination__pager" data-state="prev">',
        $text_before,
        "</a>";
    }
    for ($i = 1; $i <= $pages; $i++) {
      if ($i <= $paged + $range && $i >= $paged - $range) {
        // $paged +- $range 以内であればページ番号を出力
        if ($paged === $i) {
          echo '<span class="c-pagination__number" data-state="current">', $i, "</span>";
        } else {
          echo '<a href="',
            site_url('/'.$post_type.'/?paged='.$i),
            '" class="c-pagination__number">',
            $i,
            "</a>";
        }
      }
    }
    if ($paged < $pages) {
      // 「次へ」 の表示
      echo '<a href="',
        site_url('/'.$post_type.'/?paged='.($paged + 1)),
        '" class="c-pagination__pager" data-state="next">',
        $text_next,
        "</a>";
    }
    if ($paged + $range < $pages) {
      // 「最後へ」 の表示
      // echo '<a href="', get_pagenum_link( $pages ) ,'" class="c-pagination__pager" data-state="next-last">', $text_last ,'</a>';
    }
    echo '</div>';
  }
}


