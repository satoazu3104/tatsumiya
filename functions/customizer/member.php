<?php
function custom_member_customizer( $wp_customize ) {
  // 新しいセクションを作成
  $wp_customize->add_section( 'member_section', array(
    'title'    => __( '互助会情報', 'custom_theme' ),
    'priority' => 100,
  ) );
  
  // Facebookリンク設定項目を追加
  $wp_customize->add_setting( 'member', array(
    'default'           => '',
    'sanitize_callback' => 'sanitize_textarea_field',
  ) );
  
  $wp_customize->add_control( 'member', array(
    'label'   => __( 'メンバー数', 'custom_theme' ),
    'section' => 'member_section',
    'type'    => 'text',
  ) );
}
add_action( 'customize_register', 'custom_member_customizer' );
