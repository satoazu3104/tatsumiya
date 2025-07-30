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

<?php
if (is_page() && get_post_field('post_name', get_post()) === 'recruit') {
    // recruitスラッグのページだけに表示する内容
    echo '<a href="' . get_site_url() . '/recruit-form" class="p-img__fix-recruit"></a>';
}
?>

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
            $post_type = get_post_type(get_the_ID());
            if ($post_type == 'staff') {
                $staff_page = get_page_by_path('professional', OBJECT, 'page');
                $staff_html = apply_filters('the_content', $staff_page->post_content);
                echo $staff_html;
            } else {
                if (have_posts()) :
                    while (have_posts()) : the_post();
                        the_content(); // ←これがショートコードも処理してくれます
                    endwhile;
                endif;
            }
        }
        ?>
        <?php
        get_footer();
        ?>