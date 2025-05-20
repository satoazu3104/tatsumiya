<?php
function custom_theme_customize_register($wp_customize) {
    // セクションを追加
    $wp_customize->add_section('line_qr_section', array(
        'title' => 'LINE設定',
        'priority' => 30,
    ));

    // 画像アップロード用のコントロールを追加
    $wp_customize->add_setting('line_qr_image', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'custom_image_control', array(
        'label' => 'カスタム画像をアップロード',
        'section' => 'line_qr_section',
        'settings' => 'line_qr_image',
    )));
    
    // LINE ID用のテキストコントロールを追加
    $wp_customize->add_setting('line_id', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('line_id', array(
        'label' => 'LINE ID',
        'section' => 'line_qr_section',
        'type' => 'text',
    ));
}

add_action('customize_register', 'custom_theme_customize_register');