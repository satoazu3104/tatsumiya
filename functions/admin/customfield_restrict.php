<?php
/*
add_action('restrict_manage_posts', 'add_subtitle_filter');
function add_subtitle_filter(){
	global $post_type;
  global $user_ID;
  $user = new WP_User($user_ID);
  
	//表示するのは投稿一覧画面のみ
	if ( $post_type == 'works' ) {
	  echo '<input type="text" name="subtitle" value="'. $user->shop .'" placeholder="subtitle" />';
    add_filter('posts_where', 'posts_where_subtitle');
	}
};
add_filter('query_vars', 'add_subtitle');
function add_subtitle($vars) {
  $vars[] = 'subtitle';
  return $vars;
}
 */

add_filter('posts_where', 'posts_where_subtitle');
function posts_where_subtitle($where) {
  global $wpdb;
  global $post_type;
  global $user_ID;
  $user = new WP_User($user_ID);
  //管理画面でのみ実行
  if(is_admin()) {
    if($post_type == 'works' || $post_type == 'voice') {
      $value = $user->shop;
      if(!empty($value)) {
        //検索条件にカスタムフィールド「subtitle」の値を追加
        $where .= $wpdb->prepare(" AND EXISTS ( SELECT * FROM {$wpdb->postmeta} as m
          WHERE m.post_id = {$wpdb->posts}.ID AND m.meta_key = 'shop' AND m.meta_value like %s )",
          "%{$value}%" );
      }
    } elseif($post_type == 'shop') {
      $value = $user->shop;
      $value = get_post_meta($value, 'name', true);
      if(!empty($value)) {
        //検索条件にカスタムフィールド「subtitle」の値を追加
        $where .= $wpdb->prepare(" AND EXISTS ( SELECT * FROM {$wpdb->postmeta} as m
          WHERE m.post_id = {$wpdb->posts}.ID AND m.meta_key = 'name' AND m.meta_value like %s )",
          "%{$value}%" );
      }
    } else {
      return $where;
    }
	}
	return $where;
};

function remove_admin_bar_edit() { ?>
  <script>
    setTimeout(() => {
      const postEditButton = document.getElementById('wp-admin-bar-edit');
      if(postEditButton) {
        const postEditButtonInner = postEditButton.querySelector('.ab-item');
        postEditButtonInner.href = '';
        postEditButtonInner.addEventListener('click', () => {
          alert('編集権限がありません');
        });
      };
    }, 100)
  </script>
<?php }

add_action('wp_footer', 'posts_edit_stop');
function posts_edit_stop() {
  global $user_ID;
  global $post;
  $post_type = get_post_type($post->ID);
  $user = new WP_User($user_ID);
  $user_shop_id = $user->shop;
  $post_shop_id = get_post_meta($post->ID, 'shop', true);
  if($post_type == 'works' || $post_type == 'voice' || $post_type == 'shop') {
    if($user_shop_id != 0) {
      $post_shop_id = $post_type == 'shop' ? $post->ID : $post_shop_id;
      if($user_shop_id != $post_shop_id ) {
        remove_admin_bar_edit();
      }
    }
  }
  if($post_type == 'post' && $user_shop_id != 0) {
    remove_admin_bar_edit();
  }
}

add_action('admin_menu', 'posts_remove_has');
function posts_remove_has() {
  global $user_ID;
  global $post;
  $post_type = get_post_type($post->ID);
  $user = new WP_User($user_ID);
  $user_shop_id = $user->shop;
  if($user_shop_id != 0) {
    remove_menu_page( 'edit.php' ); // 投稿.
  }
}
