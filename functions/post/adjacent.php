<?php
function mod_get_adjacent_post($direction = 'prev', $post_types = 'post') {
  global $post, $wpdb;
  if(empty($post)) return NULL;
  if(!$post_types) return NULL;
  if(is_array($post_types)){
    $txt = '';
    for($i = 0; $i <= count($post_types) - 1; $i++){
      $txt .= "'".$post_types[$i]."'";
      if($i != count($post_types) - 1) $txt .= ', ';
    }
    $post_types = $txt;
  }
  $current_post_date = $post->post_date;
  $join = '';
  $in_same_cat = FALSE;
  $excluded_categories = '';
  $adjacent = $direction == 'prev' ? 'previous' : 'next';
  $op = $direction == 'prev' ? '<' : '>';
  $order = $direction == 'prev' ? 'DESC' : 'ASC';
  $join  = apply_filters( "get_{$adjacent}_post_join", $join, $in_same_cat, $excluded_categories );
  $where = apply_filters( "get_{$adjacent}_post_where", $wpdb->prepare("WHERE p.post_date $op %s AND p.post_type IN({$post_types}) AND p.post_status = 'publish'", $current_post_date), $in_same_cat, $excluded_categories );
  $sort  = apply_filters( "get_{$adjacent}_post_sort", "ORDER BY p.post_date $order LIMIT 1" );
  $query = "SELECT p.* FROM $wpdb->posts AS p $join $where $sort";
  $query_key = 'adjacent_post_' . md5($query);
  $result = wp_cache_get($query_key, 'counts');
  if ( false !== $result )
    return $result;
  $result = $wpdb->get_row("SELECT p.* FROM $wpdb->posts AS p $join $where $sort");
  if ( null === $result )
    $result = '';
  wp_cache_set($query_key, $result, 'counts');
  return $result;
}
