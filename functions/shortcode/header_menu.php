<?php

function create_header_menu_shortcode()
{
  $menus = wp_get_nav_menu_items('header');
  $menu_list = '<ul class="l-header__list fv">';

  if (!empty($menus)) {
    foreach ($menus as $key => $menu) {
      $title = strtoupper($menu->title);
      $active = get_the_ID() == $menu->object_id ? 'is-active' : '';
      $menu_list .= sprintf(
        '<li class="l-header__items %s"><a href="%s" class="c-text__normal c-text--white l-header__link">%s</a></li>',
        $active,
        esc_url($menu->url),
        esc_html($title)
      );
    }
  }

  $menu_list .= '</ul>';
  return $menu_list;
}

add_shortcode('header_menu', 'create_header_menu_shortcode');
