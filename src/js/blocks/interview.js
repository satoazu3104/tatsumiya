// src/js/blocks/interview/index.js

import { registerBlockType } from '@wordpress/blocks';
import {
    InspectorControls,
    RichText,
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    TextControl,
} from '@wordpress/components';

registerBlockType('portart/interview', {
    title: 'Interview',
    icon: 'admin-users',
    category: 'layout',
    attributes: {
        iconUrl: {
            type: 'string',
            default: '',     // 回答前に表示するアイコン
        },
        qaList: {
            type: 'array',
            default: [
                { question: '', answer: '' },
            ],
        },
    },

    edit: ({ attributes, setAttributes }) => {
        const { iconUrl, qaList } = attributes;
        const blockProps = useBlockProps();

        // アイテム追加
        const addItem = () => {
            setAttributes({
                qaList: [...qaList, { question: '', answer: '' }],
            });
        };
        // アイテム削除
        const removeItem = (idx) => {
            const newList = qaList.filter((_, i) => i !== idx);
            setAttributes({ qaList: newList });
        };
        // 質問・回答の変更
        const updateItem = (idx, key, val) => {
            const newList = qaList.map((item, i) =>
                i === idx ? { ...item, [key]: val } : item
            );
            setAttributes({ qaList: newList });
        };

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="回答アイコン">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) =>
                                    setAttributes({ iconUrl: media.url })
                                }
                                allowedTypes={['image']}
                                value={iconUrl}
                                render={({ open }) =>
                                    iconUrl ? (
                                        <div style={{ textAlign: 'center' }}>
                                            <img
                                                src={iconUrl}
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                                alt=""
                                            />
                                            <Button
                                                isLink
                                                isDestructive
                                                onClick={() =>
                                                    setAttributes({ iconUrl: '' })
                                                }
                                            >
                                                削除
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button onClick={open} isPrimary>
                                            アイコンを選択
                                        </Button>
                                    )
                                }
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                </InspectorControls>

                {/* Q&A 一覧 */}
                {qaList.map((item, idx) => (
                    <div
                        key={idx}
                        style={{
                            border: '1px solid #ddd',
                            padding: '1rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <TextControl
                            label={`質問 #${idx + 1}`}
                            value={item.question}
                            onChange={(val) =>
                                updateItem(idx, 'question', val)
                            }
                        />
                        <RichText
                            tagName="p"
                            className="interview-answer__text"
                            placeholder={'回答を入力…'}
                            value={item.answer}
                            onChange={(val) => updateItem(idx, 'answer', val)}
                        />
                        <Button
                            isLink
                            isDestructive
                            onClick={() => removeItem(idx)}
                        >
                            この Q&A を削除
                        </Button>
                    </div>
                ))}

                <Button isSecondary onClick={addItem}>
                    Q&A を追加
                </Button>
            </div>
        );
    },

    save: ({ attributes }) => {
        const { iconUrl, qaList } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <>
                <div className='l-list__qa-group'>
                    {qaList.map((item, idx) => (
                        <div className="l-list__qa" key={idx}>
                            <div className='c-item__ques js-scroll-up'>
                                <div className='p-img__ques'></div>
                                <div className='l-wrap__ques'>
                                    <h4 className="p-text__body">
                                        {item.question}
                                    </h4>
                                </div>
                            </div>

                            <div className="c-item__answer js-scroll-up">
                                {iconUrl && (
                                    <img
                                        src={iconUrl}
                                        className="p-img__answer"
                                        alt=""
                                    />
                                )}
                                <div className='l-wrap__answer'>
                                    <RichText.Content
                                        tagName="p"
                                        className="p-text__body"
                                        value={item.answer}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    },
});

