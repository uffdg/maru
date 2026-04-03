import { useState, useRef, useEffect, useLayoutEffect, useCallback, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import postsData from './data/posts.json';
import { parseBold, renderRichBlock } from './features/blog/lib/renderRichText';

const REPO = 'uffdg/maru';
const FILE_PATH = 'src/data/posts.json';
const ADMIN_PASSWORD = 'maru2026';

// ---- Utils ----
const slugify = (title) =>
  title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const b64ToUtf8 = (b64) => {
  const binary = atob(b64.replace(/\n/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
};

const utf8ToB64 = (str) => {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};

const ghGet = async (token) => {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}: verificá el token`);
  }
  const data = await res.json();
  return { posts: JSON.parse(b64ToUtf8(data.content)), sha: data.sha };
};

const ghPut = async (token, posts, sha) => {
  const encoded = utf8ToB64(JSON.stringify(posts, null, 2));
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({ message: 'Update blog posts via admin', content: encoded, sha }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
};

const BLOCK_TYPES = [
  { type: 'paragraph', label: 'Párrafo', icon: '¶' },
  { type: 'intro', label: 'Intro', icon: 'I' },
  { type: 'h2', label: 'Título H2', icon: 'H2' },
  { type: 'h3', label: 'Subtítulo H3', icon: 'H3' },
  { type: 'list', label: 'Lista', icon: '—' },
  { type: 'quote', label: 'Cita', icon: '"' },
  { type: 'callout', label: 'Destacado', icon: '★' },
  { type: 'image', label: 'Imagen', icon: '⬜' },
];

const newBlock = (type) => {
  if (type === 'list') return { type, items: [''] };
  if (type === 'image') return { type, url: '', alt: '' };
  return { type, text: '' };
};

const emptyPost = () => ({
  slug: '',
  date: new Date().toISOString().split('T')[0],
  label: 'Product Leadership',
  en: { title: '', excerpt: '', content: [] },
  es: { title: '', excerpt: '', content: [] },
});

// ---- Cursor helpers ----
const getCursorOffset = (el) => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return 0;
  const range = sel.getRangeAt(0);
  const pre = range.cloneRange();
  pre.selectNodeContents(el);
  pre.setEnd(range.startContainer, range.startOffset);
  return pre.toString().length;
};

const setCursorAtOffset = (el, offset) => {
  el.focus();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let rem = offset;
  let node;
  while ((node = walker.nextNode())) {
    if (rem <= node.textContent.length) {
      const range = document.createRange();
      range.setStart(node, rem);
      range.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      return;
    }
    rem -= node.textContent.length;
  }
  // fallback: move to end
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
};

// ---- Block styles ----
const BLOCK_STYLES = {
  paragraph: 'text-base text-gray-700 leading-relaxed',
  intro: 'text-lg italic text-gray-500 leading-relaxed',
  h2: 'text-2xl font-black text-gray-900',
  h3: 'text-sm font-black text-pink-500 uppercase tracking-widest',
  quote: 'text-xl italic font-semibold text-gray-700 border-l-4 border-pink-300 pl-5',
  callout: 'text-base text-gray-700 bg-pink-50 rounded-xl px-5 py-3',
};

const BLOCK_PLACEHOLDERS = {
  h2: 'Título de sección...',
  h3: 'Subtítulo...',
  intro: 'Introducción en itálica...',
  quote: 'Cita...',
  callout: 'Destacado...',
  paragraph: 'Escribe algo, o escribe / para elegir un bloque...',
};

// ---- BlockRow ----
const BlockRow = forwardRef(({
  block,
  index,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onFocusChange,
  onSplitRequest,
  onMergeUpRequest,
  onSlashTrigger,
  pendingFocus,
  onFocusHandled,
}, forwardedRef) => {
  // Internal ref for DOM access; also wire up the forwarded ref (callback style)
  const innerRef = useRef(null);
  const setRef = useCallback((el) => {
    innerRef.current = el;
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  }, [forwardedRef]);

  const isTextBlock = !['list', 'image'].includes(block.type);

  // Sync DOM ← state only when this element is NOT focused
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (el && document.activeElement !== el && isTextBlock) {
      const stored = block.text || '';
      if (el.innerText.replace(/\n$/, '') !== stored) {
        el.innerText = stored;
      }
    }
  });

  // Restore cursor after split/merge
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (pendingFocus !== null && el) {
      setCursorAtOffset(el, pendingFocus);
      onFocusHandled();
    }
  }, [pendingFocus]);

  const handleInput = (e) => {
    const text = e.currentTarget.innerText.replace(/\n$/, '');
    onChange({ ...block, text });
    onFocusChange(index, text.trim() === '');
    if (text === '/') onSlashTrigger(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSplitRequest(index, getCursorOffset(innerRef.current));
    } else if (e.key === 'Backspace' && index > 0 && getCursorOffset(innerRef.current) === 0) {
      e.preventDefault();
      onMergeUpRequest(index);
    }
  };

  const handleFocus = () => onFocusChange(index, (block.text || '').trim() === '');
  const handleBlur = () => onFocusChange(null, false);

  const controls = (
    <div className="absolute -right-16 top-0 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
      <button onClick={onMoveUp} disabled={isFirst} className="p-1 text-gray-300 hover:text-gray-500 disabled:opacity-20 text-xs">↑</button>
      <button onClick={onMoveDown} disabled={isLast} className="p-1 text-gray-300 hover:text-gray-500 disabled:opacity-20 text-xs">↓</button>
      <button onClick={onDelete} className="p-1 text-gray-300 hover:text-red-400 text-sm leading-none">×</button>
    </div>
  );

  if (block.type === 'list') {
    return (
      <div className="group relative py-1">
        {controls}
        <div className="space-y-1.5">
          {(block.items || ['']).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-pink-400 font-black shrink-0 text-sm">—</span>
              <input
                value={item}
                onChange={e => {
                  const items = [...(block.items || [''])];
                  items[idx] = e.target.value;
                  onChange({ ...block, items });
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const items = [...(block.items || [''])];
                    items.splice(idx + 1, 0, '');
                    onChange({ ...block, items });
                  } else if (e.key === 'Backspace' && item === '' && (block.items || []).length > 1) {
                    e.preventDefault();
                    const items = (block.items || ['']).filter((_, i) => i !== idx);
                    onChange({ ...block, items });
                  }
                }}
                className="flex-1 bg-transparent text-base text-gray-700 focus:outline-none border-b border-transparent focus:border-pink-200 pb-0.5"
                placeholder="Item..."
              />
              <button
                onClick={() => {
                  const items = (block.items || ['']).filter((_, i) => i !== idx);
                  onChange({ ...block, items: items.length ? items : [''] });
                }}
                className="text-gray-200 hover:text-red-400 text-base leading-none"
              >×</button>
            </div>
          ))}
          <button
            onClick={() => onChange({ ...block, items: [...(block.items || ['']), ''] })}
            className="text-xs text-pink-400 hover:text-pink-500 ml-5"
          >
            + item
          </button>
        </div>
      </div>
    );
  }

  if (block.type === 'image') {
    return (
      <div className="group relative py-1">
        {controls}
        <div className="space-y-2">
          <input
            value={block.url || ''}
            onChange={e => onChange({ ...block, url: e.target.value })}
            className="w-full bg-transparent text-sm text-gray-500 focus:outline-none border-b border-gray-200 focus:border-pink-300 pb-1"
            placeholder="URL de la imagen..."
          />
          <input
            value={block.alt || ''}
            onChange={e => onChange({ ...block, alt: e.target.value })}
            className="w-full bg-transparent text-xs text-gray-400 focus:outline-none border-b border-gray-100 focus:border-pink-200 pb-1"
            placeholder="Alt text..."
          />
          {block.url && (
            <img src={block.url} alt={block.alt || ''} className="max-h-48 rounded-lg object-cover mt-1" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group relative py-0.5">
      {controls}
      <div
        ref={setRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-placeholder={BLOCK_PLACEHOLDERS[block.type] || ''}
        className={`w-full focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 ${BLOCK_STYLES[block.type] || BLOCK_STYLES.paragraph}`}
      />
    </div>
  );
});

BlockRow.displayName = 'BlockRow';

// ---- SlashCommandPicker ----
const SlashCommandPicker = ({ pos, onSelect, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, BLOCK_TYPES.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); onSelect(BLOCK_TYPES[activeIdx].type); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [activeIdx, onSelect, onClose]);

  return (
    <div
      style={{ top: pos.top, left: pos.left }}
      className="absolute z-50 bg-white border border-gray-100 rounded-xl shadow-2xl py-1 w-48 overflow-hidden"
    >
      {BLOCK_TYPES.map((bt, i) => (
        <button
          key={bt.type}
          onMouseDown={e => { e.preventDefault(); onSelect(bt.type); }}
          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${i === activeIdx ? 'bg-pink-50 text-pink-500' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          <span className="text-[10px] font-black w-4 text-center opacity-50">{bt.icon}</span>
          {bt.label}
        </button>
      ))}
    </div>
  );
};

// ---- SelectionToolbar ----
const SelectionToolbar = ({ pos, visible, onBold, onH2, onH3, onQuote }) => {
  if (!visible) return null;
  return (
    <div
      style={{ top: pos.top, left: pos.left, transform: 'translateX(-50%)' }}
      className="absolute z-50 bg-gray-900 text-white rounded-lg px-1 py-1 flex gap-0.5 shadow-xl pointer-events-auto"
    >
      <button onMouseDown={e => { e.preventDefault(); onBold(); }} className="px-3 py-1.5 text-xs font-black hover:bg-gray-700 rounded transition-colors">B</button>
      <button onMouseDown={e => { e.preventDefault(); onH2(); }} className="px-3 py-1.5 text-xs font-black hover:bg-gray-700 rounded transition-colors">H2</button>
      <button onMouseDown={e => { e.preventDefault(); onH3(); }} className="px-3 py-1.5 text-xs font-black hover:bg-gray-700 rounded transition-colors">H3</button>
      <button onMouseDown={e => { e.preventDefault(); onQuote(); }} className="px-2 py-1.5 text-sm hover:bg-gray-700 rounded transition-colors">"</button>
    </div>
  );
};

// ---- Main Admin ----
const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [search, setSearch] = useState('');

  const [posts, setPosts] = useState(() => JSON.parse(JSON.stringify(postsData)));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenInput, setTokenInput] = useState(() => localStorage.getItem('admin_gh_token') || '');

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [activeLang, setActiveLang] = useState('en');
  const [preview, setPreview] = useState(false);

  // Canvas refs & state
  const canvasRef = useRef(null);
  const blockRefs = useRef([]);
  const [activeBlockIndex, setActiveBlockIndex] = useState(null);
  const [activeBlockEmpty, setActiveBlockEmpty] = useState(false);
  const [plusPos, setPlusPos] = useState({ top: 0 });
  const [showPicker, setShowPicker] = useState(false);
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });
  const [slashTargetIndex, setSlashTargetIndex] = useState(null);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
  const [toolbarActiveIndex, setToolbarActiveIndex] = useState(null);
  const [pendingFocus, setPendingFocus] = useState({});

  const filteredPosts = posts.filter(p => {
    const q = search.toLowerCase();
    return !q || p.en?.title?.toLowerCase().includes(q) || p.label?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q);
  });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) { setAuthed(true); setPasswordError(false); }
    else setPasswordError(true);
  };

  const handleSelectPost = (index) => {
    setSelectedIndex(index);
    setEditingPost(index === -1 ? emptyPost() : JSON.parse(JSON.stringify(posts[index])));
    setActiveLang('en');
    setSuccess('');
    setError('');
    setShowPicker(false);
    setToolbarVisible(false);
    blockRefs.current = [];
  };

  // --- Block operations ---
  const updateBlock = (lang, index, updated) => {
    setEditingPost(prev => {
      const content = [...(prev[lang]?.content || [])];
      content[index] = updated;
      return { ...prev, [lang]: { ...prev[lang], content } };
    });
  };

  const deleteBlock = (lang, index) => {
    setEditingPost(prev => {
      const content = (prev[lang]?.content || []).filter((_, i) => i !== index);
      return { ...prev, [lang]: { ...prev[lang], content } };
    });
  };

  const moveBlock = (lang, index, dir) => {
    setEditingPost(prev => {
      const content = [...(prev[lang]?.content || [])];
      const to = index + dir;
      if (to < 0 || to >= content.length) return prev;
      [content[index], content[to]] = [content[to], content[index]];
      return { ...prev, [lang]: { ...prev[lang], content } };
    });
  };

  const splitBlock = (lang, index, offset) => {
    setEditingPost(prev => {
      const content = [...(prev[lang]?.content || [])];
      const block = content[index];
      const text = block.text || '';
      content.splice(index, 1,
        { ...block, text: text.slice(0, offset) },
        { type: 'paragraph', text: text.slice(offset) }
      );
      return { ...prev, [lang]: { ...prev[lang], content } };
    });
    setPendingFocus(prev => ({ ...prev, [index + 1]: 0 }));
  };

  const mergeBlockUp = (lang, index) => {
    const prevText = editingPost[lang]?.content[index - 1]?.text || '';
    const mergeOffset = prevText.length;
    setEditingPost(prev => {
      const content = [...(prev[lang]?.content || [])];
      const merged = { ...content[index - 1], text: prevText + (content[index].text || '') };
      content.splice(index - 1, 2, merged);
      return { ...prev, [lang]: { ...prev[lang], content } };
    });
    setPendingFocus(prev => ({ ...prev, [index - 1]: mergeOffset }));
  };

  const insertBlock = (lang, type, afterIndex) => {
    setEditingPost(prev => {
      const content = [...(prev[lang]?.content || [])];
      const insertAt = afterIndex < 0 ? 0 : afterIndex + 1;
      content.splice(insertAt, 0, newBlock(type));
      return { ...prev, [lang]: { ...prev[lang], content } };
    });
    const focusIdx = afterIndex < 0 ? 0 : afterIndex + 1;
    setPendingFocus(prev => ({ ...prev, [focusIdx]: 0 }));
  };

  const changeBlockType = (lang, index, type) => {
    setEditingPost(prev => {
      const content = [...(prev[lang]?.content || [])];
      const b = content[index];
      if (type === 'list') content[index] = { type, items: b.text ? [b.text] : [''] };
      else if (type === 'image') content[index] = { type, url: '', alt: '' };
      else content[index] = { type, text: b.text || (b.items || []).join(', ') || '' };
      return { ...prev, [lang]: { ...prev[lang], content } };
    });
    setPendingFocus(prev => ({ ...prev, [index]: 0 }));
  };

  // --- Floating + position ---
  useEffect(() => {
    if (activeBlockIndex !== null && blockRefs.current[activeBlockIndex] && canvasRef.current) {
      const bRect = blockRefs.current[activeBlockIndex].getBoundingClientRect();
      const cRect = canvasRef.current.getBoundingClientRect();
      setPlusPos({ top: bRect.top - cRect.top + bRect.height / 2 - 14 });
    }
  }, [activeBlockIndex, editingPost]);

  // --- Selection toolbar ---
  useEffect(() => {
    const handler = () => {
      if (!canvasRef.current) return;
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) { setToolbarVisible(false); return; }
      const range = sel.getRangeAt(0);
      if (!canvasRef.current.contains(range.commonAncestorContainer)) { setToolbarVisible(false); return; }
      const rect = range.getBoundingClientRect();
      const cRect = canvasRef.current.getBoundingClientRect();
      setToolbarPos({ top: rect.top - cRect.top - 44, left: rect.left - cRect.left + rect.width / 2 });
      setToolbarVisible(true);
    };
    document.addEventListener('selectionchange', handler);
    return () => document.removeEventListener('selectionchange', handler);
  }, []);

  // Close picker on outside click
  useEffect(() => {
    if (!showPicker) return;
    const handler = (e) => {
      if (!canvasRef.current?.contains(e.target)) setShowPicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showPicker]);

  const handleBold = () => {
    if (toolbarActiveIndex === null) return;
    const block = editingPost[activeLang]?.content[toolbarActiveIndex];
    if (!block || !block.text) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const selected = sel.getRangeAt(0).toString();
    if (!selected) return;
    const idx = block.text.indexOf(selected);
    if (idx === -1) return;
    const newText = block.text.slice(0, idx) + '**' + selected + '**' + block.text.slice(idx + selected.length);
    updateBlock(activeLang, toolbarActiveIndex, { ...block, text: newText });
    setToolbarVisible(false);
  };

  const handleSlashTrigger = (index) => {
    setSlashTargetIndex(index);
    setShowPicker(true);
    if (blockRefs.current[index] && canvasRef.current) {
      const bRect = blockRefs.current[index].getBoundingClientRect();
      const cRect = canvasRef.current.getBoundingClientRect();
      setPickerPos({ top: bRect.bottom - cRect.top + 4, left: 0 });
    }
  };

  const handlePickerSelect = (type) => {
    setShowPicker(false);
    if (slashTargetIndex !== null) changeBlockType(activeLang, slashTargetIndex, type);
    setSlashTargetIndex(null);
  };

  const handlePlusClick = () => {
    if (activeBlockIndex === null) return;
    setSlashTargetIndex(activeBlockIndex);
    setShowPicker(true);
    if (blockRefs.current[activeBlockIndex] && canvasRef.current) {
      const bRect = blockRefs.current[activeBlockIndex].getBoundingClientRect();
      const cRect = canvasRef.current.getBoundingClientRect();
      setPickerPos({ top: bRect.bottom - cRect.top + 4, left: 0 });
    }
  };

  // --- Publish ---
  const doPublish = async (token) => {
    const post = { ...editingPost };
    if (!post.slug) post.slug = slugify(post.en.title);
    setSaving(true); setError(''); setSuccess('');
    try {
      const { sha: currentSha } = await ghGet(token);
      const newPosts = selectedIndex === -1
        ? [post, ...posts]
        : posts.map((p, i) => i === selectedIndex ? post : p);
      await ghPut(token, newPosts, currentSha);
      setPosts(newPosts);
      localStorage.setItem('admin_gh_token', token);
      if (selectedIndex === -1) setSelectedIndex(0);
      setEditingPost(post);
      setSuccess('¡Publicado! Vercel redeploy en ~1 min.');
      setShowTokenModal(false);
    } catch (e) {
      setError(e.message);
      if (e.message.includes('401') || e.message.includes('Bad credentials')) {
        localStorage.removeItem('admin_gh_token');
        setTokenInput('');
        setShowTokenModal(true);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSave = () => {
    if (!editingPost.en?.title) { setError('El título EN es obligatorio'); return; }
    const saved = localStorage.getItem('admin_gh_token');
    if (saved) doPublish(saved);
    else setShowTokenModal(true);
  };

  // ---- Password gate ----
  if (!authed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4 text-center">Admin</p>
          <h1 className="text-4xl font-black text-gray-900 mb-8 text-center">Blog Editor</h1>
          <div className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setPasswordError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Contraseña"
              autoFocus
              className={`w-full border rounded-xl p-4 text-sm focus:outline-none ${passwordError ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-300'}`}
            />
            {passwordError && <p className="text-red-400 text-xs">Contraseña incorrecta</p>}
            <button onClick={handleLogin} className="w-full bg-pink-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-pink-600 transition-colors">
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const content = editingPost?.[activeLang]?.content || [];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* Token modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-2">GitHub Token</p>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Token con scope <code className="bg-gray-100 px-1 rounded">repo</code>. Se guarda en tu navegador.
            </p>
            <div className="space-y-3">
              <input
                type="password"
                value={tokenInput}
                onChange={e => setTokenInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && tokenInput && doPublish(tokenInput)}
                placeholder="ghp_..."
                autoFocus
                className="w-full border border-gray-200 rounded-xl p-3 text-sm font-mono focus:outline-none focus:border-pink-300"
              />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <div className="flex gap-3">
                <button onClick={() => { setShowTokenModal(false); setError(''); }} className="flex-1 border border-gray-200 text-gray-500 py-3 rounded-xl font-bold text-xs hover:border-gray-300 transition-colors">
                  Cancelar
                </button>
                <button onClick={() => tokenInput && doPublish(tokenInput)} disabled={saving || !tokenInput} className="flex-1 bg-pink-500 text-white py-3 rounded-xl font-black text-xs hover:bg-pink-600 transition-colors disabled:opacity-50">
                  {saving ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar — unchanged structure, search added */}
      <div className="w-72 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Maru · Blog Editor</p>
          <Link to="/" className="text-xs text-pink-500 hover:underline">← Ver sitio</Link>
        </div>

        <div className="p-4 space-y-2">
          <button
            onClick={() => handleSelectPost(-1)}
            className="w-full bg-pink-500 text-white py-2.5 px-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-pink-600 transition-colors"
          >
            + Nuevo post
          </button>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-pink-300 pr-7"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 text-sm leading-none">×</button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredPosts.length === 0 && (
            <p className="text-xs text-gray-400 text-center px-4 py-6">Sin resultados</p>
          )}
          {filteredPosts.map((post) => {
            const realIndex = posts.indexOf(post);
            return (
              <button
                key={post.slug || realIndex}
                onClick={() => handleSelectPost(realIndex)}
                className={`w-full text-left p-4 border-b border-gray-50 hover:bg-pink-50/50 transition-colors ${selectedIndex === realIndex ? 'bg-pink-50 border-l-2 border-l-pink-500' : 'border-l-2 border-l-transparent'}`}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-1">{post.label}</p>
                <p className="text-sm font-bold text-gray-900 leading-tight line-clamp-2">{post.en?.title || post.slug}</p>
                <p className="text-[10px] text-gray-400 mt-1">{post.date}</p>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => { localStorage.removeItem('admin_gh_token'); setTokenInput(''); setSuccess('Token eliminado'); }}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cambiar token
          </button>
        </div>
      </div>

      {/* Editor area */}
      {!editingPost ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Seleccioná un post o creá uno nuevo</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Top bar */}
          <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 shrink-0">Slug</label>
              <input
                value={editingPost.slug}
                onChange={e => setEditingPost(p => ({ ...p, slug: e.target.value }))}
                placeholder="auto desde título EN"
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-pink-300 w-44"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 shrink-0">Fecha</label>
              <input
                type="date"
                value={editingPost.date}
                onChange={e => setEditingPost(p => ({ ...p, date: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-pink-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 shrink-0">Label</label>
              <input
                value={editingPost.label}
                onChange={e => setEditingPost(p => ({ ...p, label: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-pink-300 w-40"
              />
            </div>
            <div className="ml-auto flex items-center gap-3">
              {error && <p className="text-red-400 text-xs max-w-xs">{error}</p>}
              {success && <p className="text-green-500 text-xs max-w-xs">{success}</p>}
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-pink-500 text-white px-6 py-2 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-pink-600 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {saving ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </div>

          {/* Lang tabs + preview toggle */}
          <div className="bg-white border-b border-gray-100 px-6 flex items-center gap-6">
            {['en', 'es'].map(lang => (
              <button
                key={lang}
                onClick={() => { setActiveLang(lang); setPreview(false); }}
                className={`py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors ${activeLang === lang && !preview ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                {lang === 'en' ? 'English' : 'Español'}
              </button>
            ))}
            <button
              onClick={() => setPreview(p => !p)}
              className={`ml-auto py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors ${preview ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {preview ? 'Editar' : 'Preview'}
            </button>
          </div>

          {/* Preview mode */}
          {preview && (
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-2xl mx-auto px-20 py-12">
                <p className="text-xs font-black uppercase tracking-widest text-pink-400 mb-2">{editingPost.label}</p>
                <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
                  {editingPost[activeLang]?.title || <span className="text-gray-300">Sin título</span>}
                </h1>
                <p className="text-xl text-gray-400 italic mb-10 leading-relaxed">
                  {parseBold(editingPost[activeLang]?.excerpt || '')}
                </p>
                <hr className="border-gray-100 mb-10" />
                {(editingPost[activeLang]?.content || []).map((block, i) => renderRichBlock(block, i))}
              </div>
            </div>
          )}

          {/* Medium canvas */}
          {!preview && <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-20 py-12">

              {/* Title */}
              <input
                value={editingPost[activeLang]?.title || ''}
                onChange={e => setEditingPost(p => ({ ...p, [activeLang]: { ...p[activeLang], title: e.target.value } }))}
                className="w-full text-4xl font-black text-gray-900 focus:outline-none mb-3 bg-transparent placeholder-gray-200 leading-tight"
                placeholder="Título..."
              />

              {/* Excerpt */}
              <textarea
                value={editingPost[activeLang]?.excerpt || ''}
                onChange={e => setEditingPost(p => ({ ...p, [activeLang]: { ...p[activeLang], excerpt: e.target.value } }))}
                rows={2}
                className="w-full text-lg text-gray-400 italic focus:outline-none resize-none mb-8 bg-transparent placeholder-gray-200 leading-relaxed"
                placeholder="Excerpt..."
              />

              <hr className="border-gray-100 mb-8" />

              {/* Blocks */}
              <div ref={canvasRef} className="relative" key={activeLang}>

                <SelectionToolbar
                  pos={toolbarPos}
                  visible={toolbarVisible}
                  onBold={handleBold}
                  onH2={() => toolbarActiveIndex !== null && changeBlockType(activeLang, toolbarActiveIndex, 'h2')}
                  onH3={() => toolbarActiveIndex !== null && changeBlockType(activeLang, toolbarActiveIndex, 'h3')}
                  onQuote={() => toolbarActiveIndex !== null && changeBlockType(activeLang, toolbarActiveIndex, 'quote')}
                />

                {/* Floating + */}
                {activeBlockEmpty && activeBlockIndex !== null && !showPicker && (
                  <button
                    onMouseDown={e => { e.preventDefault(); handlePlusClick(); }}
                    style={{ top: plusPos.top }}
                    className="absolute -left-10 w-7 h-7 rounded-full border-2 border-gray-300 text-gray-400 hover:border-pink-500 hover:text-pink-500 flex items-center justify-center font-black transition-colors z-10 bg-white text-base"
                  >
                    +
                  </button>
                )}

                {/* Slash picker */}
                {showPicker && (
                  <SlashCommandPicker
                    pos={pickerPos}
                    onSelect={handlePickerSelect}
                    onClose={() => { setShowPicker(false); setSlashTargetIndex(null); }}
                  />
                )}

                {/* Block rows */}
                <div className="space-y-2">
                  {content.map((block, i) => (
                    <BlockRow
                      key={`${activeLang}-${i}`}
                      ref={el => { blockRefs.current[i] = el; }}
                      block={block}
                      index={i}
                      onChange={(updated) => updateBlock(activeLang, i, updated)}
                      onDelete={() => deleteBlock(activeLang, i)}
                      onMoveUp={() => moveBlock(activeLang, i, -1)}
                      onMoveDown={() => moveBlock(activeLang, i, 1)}
                      isFirst={i === 0}
                      isLast={i === content.length - 1}
                      onFocusChange={(idx, isEmpty) => {
                        setActiveBlockIndex(idx);
                        setActiveBlockEmpty(isEmpty);
                        if (idx !== null) setToolbarActiveIndex(idx);
                      }}
                      onSplitRequest={(idx, offset) => splitBlock(activeLang, idx, offset)}
                      onMergeUpRequest={(idx) => mergeBlockUp(activeLang, idx)}
                      onSlashTrigger={handleSlashTrigger}
                      pendingFocus={pendingFocus[i] !== undefined ? pendingFocus[i] : null}
                      onFocusHandled={() => setPendingFocus(prev => { const n = { ...prev }; delete n[i]; return n; })}
                    />
                  ))}
                </div>

                {content.length === 0 && (
                  <button
                    onClick={() => insertBlock(activeLang, 'paragraph', -1)}
                    className="text-sm text-gray-300 hover:text-pink-400 transition-colors"
                  >
                    + Empezar a escribir...
                  </button>
                )}

                {/* Clickable area below last block */}
                {content.length > 0 && (
                  <div
                    className="min-h-16 cursor-text"
                    onClick={() => insertBlock(activeLang, 'paragraph', content.length - 1)}
                  />
                )}
              </div>
            </div>
          </div>}
        </div>
      )}
    </div>
  );
};

export default Admin;
