import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, PanelColorSettings, URLInput } from '@wordpress/block-editor';
import { TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

registerBlockType('portart/splide', {
  title: 'splide',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    wrapToggle: {
      type: 'boolean',
      default: false,
    },
    addClassName: {
      type: 'string',
      default: '',
    },
    display: {
      type: 'string',
      default: '', // デフォルト値
    }
  },

  edit: ({ attributes, attributes: { wrapToggle, addClassName, display }, setAttributes }) => {
    const [toggle, setToggle] = useState(wrapToggle);

    return (
      <div className='b-wrapper__box'>
        <div className='b-wrapper__box__tool'>
          <Button
            isSecondary
            onClick={() => {
              if (display == '') {
                setAttributes({ display: 'pc' })
              } else if (display == 'pc') {
                setAttributes({ display: 'sp' })
              } else {
                setAttributes({ display: '' })
              }
            }}
          >
            {display ? display + 'のみ表示' : '両方表示'}
          </Button>
          <Button
            isSecondary
            onClick={() => { setToggle(!toggle); setAttributes({ wrapToggle: !toggle }) }}
          >
            {toggle ? '開く' : '折りたたむ'}
          </Button>
        </div>

        <h3>スプライドボックス</h3>

        <InspectorControls>
          <TextControl
            label="追加class"
            value={addClassName}
            onChange={(newText) => {
              setAttributes({
                addClassName: newText
              })
            }}
          />
        </InspectorControls>

        <div style={{
          height: toggle ? '0px' : 'auto',
          overflow: toggle ? 'hidden' : 'unset',
        }}>
          <InnerBlocks />
        </div>

      </div>
    )
  },

  save: ({ className, attributes: { addClassName, display } }) => {

    let fixClass = addClassName.replace(/\n/g, ' ');
    fixClass += ' '+display;

    return (
      <>
        <section class={'splide ' + fixClass} aria-label="">
          <div class="splide__track">
            <ul class="splide__list">
              <InnerBlocks.Content />
            </ul>
          </div>
        </section>
      </>
    )
  }
});