<?php
function add_query_vars_filter( $vars ){
  $vars[] = "works_cat";
  $vars[] = "works_area";
  $vars[] = "area";
  return $vars;
}
add_filter( 'query_vars', 'add_query_vars_filter' );
