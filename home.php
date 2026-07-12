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
$recruit_text = '';
$recruit_text_en = '';
$entry_link = '';
$contact_link = '';
$recruit_link = '';
if (is_page() && get_post_field('post_name', get_post()) === 'recruit') {
    $recruit_text_en = 'ENTRY';
    $recruit_text = 'エントリー';
    $entry_link = 'entry/';
} else {
    $recruit_text_en = 'RECRUIT';
    $recruit_text = '採用情報';
}

if (portart_get_lang() == 'en') {
    $contact_link = get_site_url() . '/en/contact/';
    $recruit_link = get_site_url() . '/en/recruit/' . $entry_link;
} else {
    $contact_link = get_site_url() . '/contact/';
    $recruit_link = get_site_url() . '/recruit/' . $entry_link;
}
?>

<div class="l-wrap__fix">
    <a class="l-wrap__fix__item" href="<?php echo $recruit_link; ?>">
        <p class="p-text__number c-text--white c-text--en"><?php echo $recruit_text_en; ?></p>
        <p class="p-title__jp p-text__section-title-jp c-text--white"><?php echo $recruit_text; ?></p>
    </a>
    <div class="l-wrap__fix__line"></div>
    <a class="l-wrap__fix__item" href="<?php echo $contact_link; ?>">
        <p class="p-text__number c-text--white c-text--en">CONTACT</p>
        <p class="p-title__jp p-text__section-title-jp c-text--white">お問い合わせ</p>
    </a>
</div>

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