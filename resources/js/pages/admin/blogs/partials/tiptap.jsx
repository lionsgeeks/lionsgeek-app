import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

import { FaBold, FaItalic, FaStrikethrough, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaUndo, FaAlignLeft, FaAlignCenter, FaAlignJustify, FaAlignRight, FaMinus } from 'react-icons/fa'
import { Listbox, } from '@headlessui/react';
import { useState } from 'react';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

const buttonConfigs = [
    {
        action: (editor) => editor.chain().focus().undo().run(),
        icon: <FaUndo />,
        disabled: (editor) => !editor.can().chain().focus().undo().run(),
    },
    {
        action: (editor) => editor.chain().focus().redo().run(),
        icon: <FaRedo />,
        disabled: (editor) => !editor.can().chain().focus().redo().run(),
    },
    {
        action: (editor) => editor.chain().focus().toggleBold().run(),
        isActive: (editor) => editor.isActive('bold'),
        icon: <FaBold />,
        disabled: (editor) => !editor.can().chain().focus().toggleBold().run(),
    },
    {
        action: (editor) => editor.chain().focus().toggleItalic().run(),
        isActive: (editor) => editor.isActive('italic'),
        icon: <FaItalic />,
        disabled: (editor) => !editor.can().chain().focus().toggleItalic().run(),
    },
    {
        action: (editor) => editor.chain().focus().toggleStrike().run(),
        isActive: (editor) => editor.isActive('strike'),
        icon: <FaStrikethrough />,
        disabled: (editor) => !editor.can().chain().focus().toggleStrike().run(),
    },
    {
        action: (editor) => editor.chain().focus().toggleBulletList().run(),
        isActive: (editor) => editor.isActive('bulletList'),
        icon: <FaListUl />,
    },
    {
        action: (editor) => editor.chain().focus().toggleOrderedList().run(),
        isActive: (editor) => editor.isActive('orderedList'),
        icon: <FaListOl />,
    },
    {
        action: (editor) => editor.chain().focus().setHorizontalRule().run(),
        icon: <FaMinus />,
    },


];

const textAlignment = [
    { value: 'left', icon: <FaAlignLeft /> },
    { value: 'center', icon: <FaAlignCenter /> },
    { value: 'right', icon: <FaAlignRight /> },
    { value: 'justify', icon: <FaAlignJustify /> },
];
const headingConfigs = [1, 2, 3, 4].map(level => ({
    action: (editor) => editor.chain().focus().toggleHeading({ level }).run(),
    isActive: (editor) => editor.isActive('heading', { level }),
    icon: `H${level}`,
}));






const MenuBar = ({ editor }) => {
    const [selected, setSelected] = useState(textAlignment[1])
    if (!editor) {
        return null;
    }

    return (
        <div className='flex items-center flex-wrap gap-2 mt-1 border p-1 m-0'>
            <select
                onChange={(e) => {
                    const selectedIndex = e.target.value
                    headingConfigs[selectedIndex].action(editor)
                }}
                className="cursor-pointer px-2 py-1 border rounded text-xs focus:outline-0"
            >
                {headingConfigs.map(({ isActive }, index) => (
                    <option
                        key={index}
                        value={index}
                        className={`
        ${isActive(editor) ? "bg-alpha" : ""}
        ${index === 0 ? "text-2xl font-semibold " : ""}
        ${index === 1 ? "text-xl font-medium" : ""}
        ${index === 2 ? "text-lg " : ""}
        `}
                    >
                        {index === 0 ? "Heading 1" : index === 1 ? "Heading 2" : index === 2 ? "Heading 3" : "Normal"}
                    </option>
                ))}
            </select>

            {buttonConfigs.map(({ action, isActive, icon, disabled }, index) => (
                <button
                    key={index}
                    type='button'
                    onClick={() => action(editor)}
                    disabled={disabled ? disabled(editor) : false}
                    className={`${isActive && isActive(editor) ? 'is-active' : ''} cursor-pointer text-xs rounded-lg hover:text-blue-700`}
                >
                    {icon}
                </button>
            ))}

            <Listbox value={selected} onChange={(item) => {
                setSelected(item)
                editor.chain().focus().setTextAlign(item.value).run()
            }}>
                <div className="relative">
                    <Listbox.Button className="px-2 py-1 focus:outline-0">
                        {selected.icon}
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 bg-white border rounded shadow">
                        {textAlignment.map((item, idx) => (
                            <Listbox.Option
                                key={idx}
                                value={item}
                                className="cursor-pointer p-2 hover:bg-gray-100 flex justify-center"
                            >
                                {item.icon}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>





        </div>
    );
};


const Tiptap = (props) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            
        ],
        content: props.content,
        onUpdate({ editor }) {
            props.setData(props.lang == 'English' ? 'description_en' : props.lang == 'العربية' ? 'description_ar' : 'description_fr', editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'reset-tw',
            },
        },
    })
    return (
        <div>
            <MenuBar editor={editor} />
            <div className="border min-h-[200px] max-h-[40vh] overflow-y-auto">
                <EditorContent
                    className="reset-tw w-full p-2"
                    editor={editor}
                />
            </div>
        </div>
    )
}

export default Tiptap;
