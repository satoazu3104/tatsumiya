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
    echo '<a href="' . get_site_url() . '/recruit/entry/" class="p-img__fix-recruit"></a>';
} else {
    echo '<a href="' . get_site_url() . '/contact/" class="p-img__fix-contact"></a>';
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
            } else if ($post_type == 'post') {
                $post_page = get_page_by_path('news', OBJECT, 'page');
                $post_html = apply_filters('the_content', $post_page->post_content);
                echo $post_html;
            } else {
                if (have_posts()) :
                    $post = get_post(get_the_ID());

                    // 親ページがある場合は、親階層込みのパスを作成
                    $ancestors = get_post_ancestors($post->ID);
                    $slugs = [];

                    if (!empty($ancestors)) {
                        $ancestors = array_reverse($ancestors);

                        foreach ($ancestors as $ancestor_id) {
                            $slugs[] = get_post_field('post_name', $ancestor_id);
                        }
                    }

                    $slugs[] = $post->post_name;

                    $path = implode('/', $slugs);

                    // enページだけ top を読む
                    $slug = ($post->post_name === 'en') ? 'top' : $path;
                    $slug = str_replace('en/', '', $slug);
                    $post_page = get_page_by_path($slug, OBJECT, 'page');

                    if ($post_page) {
                        $post_html = apply_filters('the_content', $post_page->post_content);

                        echo $post_html;
                    } else {
                        while (have_posts()) : the_post();
                            the_content();
                        endwhile;
                    }

                endif;
            }
        }
        ?>
        <?php
        get_footer();
        ?>