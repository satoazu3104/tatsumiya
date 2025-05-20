<?php
function custom_profile_customizer( $wp_customize ) {
  // 新しいセクションを作成
  $wp_customize->add_section( 'profile_section', array(
    'title'    => __( '会社情報', 'custom_theme' ),
    'priority' => 100,
  ) );
  
  // Facebookリンク設定項目を追加
  $wp_customize->add_setting( 'address', array(
    'default'           => '',
    'sanitize_callback' => 'sanitize_textarea_field',
  ) );
  
  $wp_customize->add_control( 'address', array(
    'label'   => __( '住所', 'custom_theme' ),
    'section' => 'profile_section',
    'type'    => 'textarea',
  ) );
}
add_action( 'customize_register', 'custom_profile_customizer' );
