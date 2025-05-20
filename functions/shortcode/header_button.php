<?php
function custom_header_shortcode($atts)
{
  $atts = shortcode_atts(
    array(
      'phone_type' => '',
      'button_type' => ''
    ),
    $atts
  );

  ob_start(); ?>
  <div class="l-header__buttons">
    <a href="tel:080-4768-7744" class="c-button__phone <?php echo $atts['phone_type']; ?>"></a>
    <a class="c-button__header <?php echo $atts['button_type']; ?>" href="<?php echo site_url() . '/contact'; ?>">
      <p class="c-text--white c-text__normal c-text__bold">
        お問い合わせ・お見積り
      </p>
    </a>
  </div>
<?php
  $elm = ob_get_clean();
  return $elm;
}
add_shortcode('header_button', 'custom_header_shortcode');
?>