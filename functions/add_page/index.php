<?php
function create_custom_page($slug, $title)
{
  // Check if the page already exists by slug
  $page_exists = get_page_by_path($slug, OBJECT, 'page');
  if ($page_exists) {
    // If the page already exists, skip creating it
    return;
  }

  // Prepare page data
  $page_data = array(
    'post_title'    => $title,
    'post_name'     => $slug,
    'post_content'  => '',
    'post_status'   => 'publish',
    'post_type'     => 'page',
  );

  // Insert the page into the database
  wp_insert_post($page_data);
}

// Hook to run the function when the theme is activated
function create_custom_pages_on_theme_activation()
{
  // Array of pages to be created
  $pages = array(
    array(
      'slug'  => 'service',
      'title' => '施工メニュー'
    ),
    array(
      'slug'  => 'request',
      'title' => 'お仕事ご依頼'
    ),
    array(
      'slug'  => 'faq',
      'title' => 'よくあるご質問'
    ),
    array(
      'slug'  => 'voice',
      'title' => 'お客様の声'
    ),
    array(
      'slug'  => 'work',
      'title' => '施工実績'
    ),
    array(
      'slug'  => 'news',
      'title' => 'お知らせ'
    ),
    array(
      'slug'  => 'recruit',
      'title' => '採用情報'
    ),
    array(
      'slug'  => 'company',
      'title' => '会社概要'
    ),

    // ▼固定
    array(
      'slug'  => 'top',
      'title' => 'トップ'
    ),
    array(
      'slug'  => 'contact',
      'title' => 'お問い合わせ'
    ),
    array(
      'slug'  => 'confirm',
      'title' => 'お問い合わせ 確認'
    ),
    array(
      'slug'  => 'thanks',
      'title' => 'お問い合わせ 完了'
    ),
    array(
      'slug'  => 'error',
      'title' => 'お問い合わせ エラー'
    ),

    // Add more pages as needed
  );

  // Loop through the pages and create them
  foreach ($pages as $page) {
    create_custom_page($page['slug'], $page['title']);
  }
}

// Add the function to the theme activation hook
add_action('after_switch_theme', 'create_custom_pages_on_theme_activation');
