<?php
function custom_sns_customizer( $wp_customize ) {
  // 新しいセクションを作成
  $wp_customize->add_section( 'social_links_section', array(
    'title'    => __( 'ソーシャルリンク', 'custom_theme' ),
    'priority' => 100,
  ) );

  // Facebookリンク設定項目を追加
  $wp_customize->add_setting( 'facebook_link', array(
    'default'           => '',
    'sanitize_callback' => 'esc_url_raw',
  ) );

  $wp_customize->add_control( 'facebook_link', array(
    'label'   => __( 'Facebookリンク', 'custom_theme' ),
    'section' => 'social_links_section',
    'type'    => 'text',
  ) );

  // Twitterリンク設定項目を追加
  $wp_customize->add_setting( 'twitter_link', array(
    'default'           => '',
    'sanitize_callback' => 'esc_url_raw',
  ) );

  $wp_customize->add_control( 'twitter_link', array(
    'label'   => __( 'Twitterリンク', 'custom_theme' ),
    'section' => 'social_links_section',
    'type'    => 'text',
  ) );

  // Youtubeリンク設定項目を追加
  $wp_customize->add_setting( 'youtube_link', array(
    'default'           => '',
    'sanitize_callback' => 'esc_url_raw',
  ) );

  $wp_customize->add_control( 'youtube_link', array(
    'label'   => __( 'Youtubeリンク', 'custom_theme' ),
    'section' => 'social_links_section',
    'type'    => 'text',
  ) );

  // Instagramリンク設定項目を追加
  $wp_customize->add_setting( 'instagram_link', array(
    'default'           => '',
    'sanitize_callback' => 'esc_url_raw',
  ) );

  $wp_customize->add_control( 'instagram_link', array(
    'label'   => __( 'Instagramリンク', 'custom_theme' ),
    'section' => 'social_links_section',
    'type'    => 'text',
  ) );

  // Lineリンク設定項目を追加
  $wp_customize->add_setting( 'line_link', array(
    'default'           => '',
    'sanitize_callback' => 'esc_url_raw',
  ) );

  $wp_customize->add_control( 'line_link', array(
    'label'   => __( 'Lineリンク', 'custom_theme' ),
    'section' => 'social_links_section',
    'type'    => 'text',
  ) );

  // TikTokリンク設定項目を追加
  $wp_customize->add_setting( 'tiktok_link', array(
    'default'           => '',
    'sanitize_callback' => 'esc_url_raw',
  ) );

  $wp_customize->add_control( 'tiktok_link', array(
    'label'   => __( 'TikTokリンク', 'custom_theme' ),
    'section' => 'social_links_section',
    'type'    => 'text',
  ) );
}
add_action( 'customize_register', 'custom_sns_customizer' );
