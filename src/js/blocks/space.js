import { registerBlockType } from '@wordpress/blocks';
import { RichText, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { MenuItemsChoice, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const variations = {
  316160: {
    pc: 316,
    sp: 104,
  },
  217120: {
    pc: 217,
    sp: 120,
  },
  19280: {
    pc: 192,
    sp: 80,
  },
  160100: {
    pc: 160,
    sp: 80,
  },
  14080: {
    pc: 140,
    sp: 80,
  },
  12080: {
    pc: 120,
    sp: 64,
  },
  10464: {
    pc: 104,
    sp: 48,
  },
  8864: {
    pc: 88,
    sp: 48
  },
  8048: {
    pc: 80,
    sp: 48
  },
  7248: {
    pc: 72,
    sp: 48
  },
  6448: {
    pc: 64,
    sp: 40
  },
  48_32: {
    pc: 48,
    sp: 32
  },
  40_24: {
    pc: 40,
    sp: 32
  },
  3248: {
    pc: 32,
    sp: 24
  },
  3216: {
    pc: 32,
    sp: 22
  },
  2216: {
    pc: 22,
    sp: 16
  },
};
const keys = Object.keys(variations);

const Variation = ({ variation, setAttributes, setHeight }) => {
  return (
    <>
      <select
        value={variation}
        onChange={(event) => {
          setAttributes({ variation: event.target.value });
          setHeight(variations[event.target.value].pc);
        }}
      >
        {keys.map((item) => {
          return (
            <option key={item} value={item}>
              {`PC:${variations[item].pc}px スマホ:${variations[item].sp}px`}
            </option>
          );
        })}
      </select>
    </>
  );
};

registerBlockType('portart/space', {
  title: 'スペーサー',
  icon: 'smiley',
  category: 'layout',
  attributes: {
    variation: {
      type: 'string',
      default: '4024',
    },
    addPc: {
      type: 'string',
      default: '',
    },
    addSp: {
      type: 'string',
      default: '',
    },
  },

  edit: ({ className, attributes: { variation, addPc, addSp }, setAttributes }) => {
    const initheight = addPc ? addPc : variation ? variations[variation].pc : variations['4024'].pc;
    const [height, setHeight] = useState(initheight);

    return (
      <div>
        <BlockControls>
          <Variation variation={variation} setAttributes={setAttributes} setHeight={setHeight} />
        </BlockControls>

        <InspectorControls>
          <TextControl 
            label="PCスペース"
            value={addPc} 
            onChange={(newPc) => {
              setAttributes({ addPc: newPc });
              setHeight(newPc);
            }}
          />
          <TextControl 
            label="SPスペース"
            value={addSp} 
            onChange={(newSp) => {
              setAttributes({ addSp: newSp });
              setHeight(newSp);
            }}
          />
        </InspectorControls>
        <p style={{
          height: height+'px',
          background: 'darkgray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
          }}>スペース</p>
      </div>
    )
  },
  save: ({ className, attributes: { text, variation, addPc, addSp } }) => {
    const pc = addPc ? addPc : variation ? variations[variation]['pc'] : '120';
    const sp = addSp ? addSp : variation ? variations[variation]['sp'] : '120';
    return (
      <>
        <div className='pc' style={{
          height: 'clamp(' + sp + 'px, ' + (pc / 1920 * 100 ) + 'vw, ' + pc + 'px )',
        }}></div>
        <div className='sp' style={{
          height: sp + 'px',
        }}></div>
        {/* <div
          className='js-space'
          data-space-pc={addPc ? addPc : variation ? variations[variation]['pc'] : '120'}
          data-space-sp={addSp ? addSp : variation ? variations[variation]['sp'] : '120'}
        ></div> */}
      </>
    )
  },
});