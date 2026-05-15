import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import {
  IconBold, IconItalic, IconUnderline, IconStrikethrough,
  IconAlignLeft, IconAlignCenter, IconAlignRight,
  IconList, IconListNumbers, IconBlockquote, IconLink, IconLinkOff,
  IconArrowBackUp, IconArrowForwardUp,
} from '@tabler/icons-react';

function ToolBtn({ active, onClick, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        width: 32, height: 32, display: 'inline-flex', alignItems: 'center',
        justifyContent: 'center', border: 'none', borderRadius: 6,
        background: active ? '#046CF2' : 'transparent',
        color: active ? '#fff' : '#5D6B82',
        cursor: 'pointer', transition: 'all 0.1s',
      }}
      onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = '#F1F3F9'; e.currentTarget.style.color = '#010E23'; } }}
      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5D6B82'; } }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 24, background: '#E8E9F1', flexShrink: 0 }} />;
}

function HeadingSelect({ editor }) {
  const levels = [
    { label: 'Paragraph', value: 0 },
    { label: 'H1', value: 1 },
    { label: 'H2', value: 2 },
    { label: 'H3', value: 3 },
  ];
  const current = editor.isActive('paragraph') ? 0
    : editor.isActive('heading', { level: 1 }) ? 1
    : editor.isActive('heading', { level: 2 }) ? 2
    : editor.isActive('heading', { level: 3 }) ? 3
    : 0;

  return (
    <select
      value={current}
      onChange={(e) => {
        const v = parseInt(e.target.value);
        if (v === 0) editor.chain().focus().setParagraph().run();
        else editor.chain().focus().toggleHeading({ level: v }).run();
      }}
      style={{
        height: 32, padding: '0 24px 0 10px', borderRadius: 6,
        border: '1px solid #E8E9F1', fontSize: 12, fontWeight: 500,
        color: '#010E23', background: '#fff', cursor: 'pointer',
        outline: 'none', fontFamily: 'Inter, sans-serif',
        appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235D6B82' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center',
      }}
    >
      {levels.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
    </select>
  );
}

export default function RichEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value || '',
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  const setLink = () => {
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('Masukkan URL:', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div style={{
      border: '1px solid #E8E9F1', borderRadius: 12, overflow: 'hidden',
      background: '#fff', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap',
        padding: '8px 12px', borderBottom: '1px solid #E8E9F1',
        background: '#FAFAFA',
      }}>
        <HeadingSelect editor={editor} />
        <Divider />
        <ToolBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><IconBold size={16} stroke={1.5} /></ToolBtn>
        <ToolBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><IconItalic size={16} stroke={1.5} /></ToolBtn>
        <ToolBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><IconUnderline size={16} stroke={1.5} /></ToolBtn>
        <ToolBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><IconStrikethrough size={16} stroke={1.5} /></ToolBtn>
        <Divider />
        <ToolBtn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align Left"><IconAlignLeft size={16} stroke={1.5} /></ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align Center"><IconAlignCenter size={16} stroke={1.5} /></ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align Right"><IconAlignRight size={16} stroke={1.5} /></ToolBtn>
        <Divider />
        <ToolBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List"><IconList size={16} stroke={1.5} /></ToolBtn>
        <ToolBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List"><IconListNumbers size={16} stroke={1.5} /></ToolBtn>
        <ToolBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote"><IconBlockquote size={16} stroke={1.5} /></ToolBtn>
        <Divider />
        <ToolBtn active={editor.isActive('link')} onClick={setLink} title="Link"><IconLink size={16} stroke={1.5} /></ToolBtn>
        {editor.isActive('link') && (
          <ToolBtn active={false} onClick={() => editor.chain().focus().unsetLink().run()} title="Unlink"><IconLinkOff size={16} stroke={1.5} /></ToolBtn>
        )}
        <div style={{ flex: 1 }} />
        <ToolBtn active={false} onClick={() => editor.chain().focus().undo().run()} title="Undo"><IconArrowBackUp size={16} stroke={1.5} /></ToolBtn>
        <ToolBtn active={false} onClick={() => editor.chain().focus().redo().run()} title="Redo"><IconArrowForwardUp size={16} stroke={1.5} /></ToolBtn>
      </div>

      {/* Editor Area */}
      <div style={{ padding: '4px 0' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
