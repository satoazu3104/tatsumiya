<!doctype html>
<!-- -->
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="profile" href="https://gmpg.org/xfn/11" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp-narrow.min.css">

    <!-- Adobe fonts -->
    <!-- /Adobe fonts -->

    <!-- google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet">
    <!-- google fonts -->
    <?php
    wp_head();
    ?>
</head>

<body <?php body_class(); ?>>
    <?php
    include get_template_directory() . '/head_menu.php';
    wp_body_open(); ?>