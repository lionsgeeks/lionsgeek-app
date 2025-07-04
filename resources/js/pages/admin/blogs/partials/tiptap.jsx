import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

import { FaBold, FaItalic, FaStrikethrough, FaListOl, FaListUl, FaQuoteLeft, FaRedo, FaUndo } from 'react-icons/fa'

const buttonConfigs = [
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
        icon: 'Horizontal Line',
    },
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
        action: (editor) => editor.chain().focus().setTextAlign('left').run(),
        icon: 'Left',
        isActive: (editor) => editor.isActive({ textAlign: 'left' }),
    },
    {
        action: (editor) => editor.chain().focus().setTextAlign('center').run(),
        icon: 'Center',
        isActive: (editor) => editor.isActive({ textAlign: 'center' }),
    },
    {
        action: (editor) => editor.chain().focus().setTextAlign('right').run(),
        icon: 'Right',
        isActive: (editor) => editor.isActive({ textAlign: 'right' }),
    },
    {
        action: (editor) => editor.chain().focus().setTextAlign('justify').run(),
        icon: 'Justify',
        isActive: (editor) => editor.isActive({ textAlign: 'justify' }),
    },
];

const headingConfigs = [1, 2, 3, 4, 5, 6].map(level => ({
    action: (editor) => editor.chain().focus().toggleHeading({ level }).run(),
    isActive: (editor) => editor.isActive('heading', { level }),
    icon: `H${level}`,
}));



const MenuBar = ({ editor }) => {

    if (!editor) {
        return null;
    }

    return (
        <div className='flex items-center flex-wrap gap-2 mt-4 '>
            {buttonConfigs.map(({ action, isActive, icon, disabled }, index) => (
                <button
                    key={index}
                    type='button'
                    onClick={() => action(editor)}
                    disabled={disabled ? disabled(editor) : false}
                    className={`${isActive && isActive(editor) ? 'is-active' : ''} cursor-pointer rounded-lg border-[1px] p-2 hover:bg-gray-800 hover:text-white`}
                >
                    {icon}
                </button>
            ))}

            {headingConfigs.map(({ action, isActive, icon }, index) => (
                <button
                    type='button'
                    key={index}
                    onClick={() => action(editor)}
                    className={`${isActive(editor) ? 'is-active' : ''} cursor-pointer rounded-lg border-[1px] p-2 hover:bg-gray-800 hover:text-white`}
                >
                    {icon}
                </button>
            ))}
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
                class: '',
            },
        },
    })
    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent
                // className='prose-lg dangerous mt-4 w-full'
                className={`reset-tw `}
                editor={editor}
            />
        </>
    )
}

export default Tiptap;
