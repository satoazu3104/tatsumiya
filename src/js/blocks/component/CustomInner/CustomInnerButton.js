import { RichTextToolbarButton } from '@wordpress/block-editor';

const CustomInnerButton = ({attributes, setAttributes}) => {
  
  const Label = () => {
    const selectRich = window.getSelection().focusNode.parentElement.closest('.rich-text');
    const id = selectRich.id;
    const label = id.replace('attr-', '');
    return label;
  }
  
  const tagDot = (selectedText, name) => {
    const tag = {
      dot: '<span class="c-text--dot">' + selectedText + '</span>',
      mainColor: '<span class="c-text--main">'+selectedText+'</span>',
      subColor: '<span class="c-text--main2">'+selectedText+'</span>',
      accentColor: '<span class="c-text--accent">'+selectedText+'</span>',
      backColor: '<span class="c-text--back">'+selectedText+'</span>',
      backBlackColor: '<span class="c-text--back--black">'+selectedText+'</span>',
    };
    return tag[name];
  }

  const insertCustomTag = (name) => {
    const selectedText = window.getSelection().toString();
    const selectRich = window.getSelection().focusNode.parentElement.closest('.rich-text');
    if(!selectRich) return;

    const id = selectRich.id;
    const label = id.replace('attr-', '');
    const tag = tagDot(selectedText, name);
    let content = attributes[label];
    const newContent = content.replace(selectedText, tag);
    setAttributes({ [label]: newContent });
  };
  
  const insertBrTag = (className) => {
    const label = Label();
    let selectPos = window.getSelection().getRangeAt(0);
    console.log(selectPos);
    const elm = document.createElement('br');
    elm.classList.add(className);
    selectPos.insertNode(elm);
    const content = selectPos.commonAncestorContainer.innerHTML;
    console.log(label, content);
    setAttributes({[label]: content})
  }

  return(
    <>
      <RichTextToolbarButton
        icon="editor-code"
        title="上付きドットタグ"
        onClick={() => insertCustomTag('dot')}
      />
      <RichTextToolbarButton
        icon="editor-code"
        title="メインカラータグ"
        onClick={() => insertCustomTag('mainColor')}
      />
      <RichTextToolbarButton
        icon="editor-code"
        title="サブカラータグ"
        onClick={() => insertCustomTag('subColor')}
      />
      <RichTextToolbarButton
        icon="editor-code"
        title="アクセントカラータグ"
        onClick={() => insertCustomTag('accentColor')}
      />
      <RichTextToolbarButton
        icon="editor-code"
        title="背景カラータグ"
        onClick={() => insertCustomTag('backColor')}
      />
      <RichTextToolbarButton
        icon="editor-code"
        title="背景黒タグ"
        onClick={() => insertCustomTag('backBlackColor')}
      />
      <RichTextToolbarButton
        icon="editor-code"
        title="PCサイズにbrタグを挿入"
        onClick={() => insertBrTag('pc')}
      />
      <RichTextToolbarButton
        icon="editor-code"
        title="スマホサイズにbrタグを挿入"
        onClick={() => insertBrTag('sp')}
      />
      <RichTextToolbarButton
        icon="editor-code"
        title="brタグを挿入"
        onClick={insertBrTag}
      />
    </>
  )
};


export default CustomInnerButton;