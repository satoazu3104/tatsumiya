<?php
// functions.php
function custom_contact_shortcode($atts)
{

  $items = array(
    [
      'title' => 'リフォーム工事',
    ],
    [
      'title' => '住宅設備トラブル',
    ],
    [
      'title' => '害虫駆除',
    ],
    [
      'title' => '水回りトラブル',
    ],
  );

  // SVGコードを定義
  ob_start(); ?>
  <section class="l-section__contact l-row">
    <div class="l-wrap__contact">
      <ul class="l-list__contact pc">
        <?php foreach ($items as $key => $value): ?>
          <li class="c-card__contact">
            <p class="p-text__number c-text--en c-text--main2 c-text--med"><?php echo sprintf('%02d.', $key + 1); ?></p>
            <img class="p-img__contact-item" src="<?php echo get_template_directory_uri() . '/dist/assets/images/common/contact-icon-' . ($key + 1) . '.webp'; ?>" alt="<?php echo $value['title'] ?>">
            <p class="c-text--center c-text--main2 c-text__title"><?php echo $value['title']; ?></p>
          </li>
        <?php endforeach; ?>
      </ul>

      <div class="l-content__contact">
        <div class="p-img__free-contact"></div>
        <div class="l-content__def">
          <div class="l-content__med">
            <div class="p-text__fukidashi">
              <div class="pc">
                <p class="c-text--bold c-text__normal">
                  お家に関するお悩みには、各分野の専門家が対応します！
                </p>
              </div>
              <div class="sp">
                <p class="c-text--bold c-text__normal">
                  各分野の専門家が対応します！
                </p>
              </div>
            </div>

            <div class="pc">
              <p class="c-text__middle c-text--main2 c-text--bold">
                ご相談だけでも大歓迎です！
              </p>
            </div>

            <div class="sp">
              <p class="c-text__list-title c-text--main2 c-text--bold">
                ご相談だけでも大歓迎です！
              </p>
            </div>
          </div>

          <ul class="l-list__contact sp">
            <?php foreach ($items as $key => $value): ?>
              <li class="c-card__contact">
                <p class="p-text__number c-text--en c-text--main2 c-text--med"><?php echo sprintf('%02d.', $key + 1); ?></p>
                <img class="p-img__contact-item" src="<?php echo get_template_directory_uri() . '/dist/assets/images/common/contact-icon-' . ($key + 1) . '.webp'; ?>" alt="<?php echo $value['title'] ?>">
                <p class="c-text--center c-text--main2 c-text__title"><?php echo $value['title']; ?></p>
              </li>
            <?php endforeach; ?>
          </ul>

          <p class="c-text__normal c-text__lh--2 c-text__space--40 c-text--bold">
            相談無料！お住まいの状態やご家族の生活スタイルをお伺いし、<br class="pc">最適なリフォームプランをご提案いたします。
          </p>
        </div>

        <a href="<?php echo site_url() . '/contact/'; ?>" class="c-button__wrap">
          <div class='c-button__before'></div>
          <div class='c-button pc'>
            <p class='c-text__list-content c-text--bold c-text__space--40 c-button__text'>
              お問い合わせはこちらから
            </p>
          </div>
          <div class='c-button sp'>
            <p class='c-text__normal c-text--bold c-text__space--40 c-button__text'>
              お問い合わせはこちらから
            </p>
          </div>
          <div class='c-button__after'></div>
        </a>
      </div>
    </div>
  </section>
<?php
  $contact_section = ob_get_clean();
  // SVGコードを返す
  return $contact_section;
}
add_shortcode('contact_section', 'custom_contact_shortcode');
