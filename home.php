<?php
get_header();
$post = get_post(get_the_ID());
$slug = $post ? $post->post_name : null;
?>
<?php if (is_front_page()) : ?>
    <div class="u-anim__first js-first-animation">

        <div class="u-anim__first-block js-first-animation"></div>
        <div class="u-anim__first-block js-first-animation"></div>
        <div class="u-anim__first-block js-first-animation"></div>
        <div class="u-anim__first-block js-first-animation"></div>

        <div class="u-anim__first-block js-first-animation"></div>
        <div class="u-anim__first-block js-first-animation"></div>
        <div class="u-anim__first-block js-first-animation"></div>
        <div class="u-anim__first-block js-first-animation"></div>

        <div class="u-anim__first-block js-first-animation"></div>
        <div class="u-anim__first-block js-first-animation"></div>
        <div class="u-anim__first-block js-first-animation"></div>
        <div class="u-anim__first-block js-first-animation"></div>

        <div class="u-anim__first--icon js-first-animation"></div>
    </div>

    <div class="u-anim__first u-anim__first--page js-first-animation"></div>
<?php else: ?>
    <div class="u-anim__first u-anim__first--page js-first-animation"></div>
<?php endif; ?>

<a href="<?php echo site_url() . '/contact'; ?>" class="p-img__fix-recruit pc js-loaded-animation"></a>

<div class="l-section__load"></div>
<main
    class="l-section__main <?php echo is_front_page() ? '' : 'page'; ?>"
    data-state="main"
    data-slug="<?php echo $slug; ?>">
    <div class="l-section__back"></div>
    <div class="l-section__wp-inner">
        <?php
        if (is_single()) {
            $post_type = get_post_type(get_the_ID());
            if ($post_type == 'works') {
                // include get_template_directory().'/works.php';
                include get_template_directory() . '/post.php';
            } else {
                include get_template_directory() . '/post.php';
            }
        } else {
            // 現在の投稿の本文を出力（固定ページ含む）
            if (have_posts()) :
                while (have_posts()) : the_post();
                    the_content(); // ←これがショートコードも処理してくれます
                endwhile;
            endif;
        }
        ?>
        <?php
        get_footer();
        ?>