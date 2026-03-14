import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import postsData from './data/posts.json';

const REPO = 'uffdg/maru';
const FILE_PATH = 'src/data/posts.json';
const ADMIN_PASSWORD = 'maru2026';

// ---- Bold text helper ----
const applyBold = (textareaEl, currentValue, onChange) => {
  const start = textareaEl.selectionStart;
  const end = textareaEl.selectionEnd;
  const selected = currentValue.substring(start, end);
  const newValue = currentValue.substring(0, start) + '**' + selected + '**' + currentValue.substring(end);
  onChange(newValue);
  setTimeout(() => {
    textareaEl.focus();
    textareaEl.setSelectionRange(start + 2, end + 2);
  }, 0);
};

// ---- Slug generator ----
const slugify = (title) =>
  title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

// ---- GitHub API ----
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

// ---- Text → Blocks parser ----
const parseTextToBlocks = (raw) => {
  const lines = raw.split('\n');
  const blocks = [];
  let i = 0;
  let isFirst = true;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { i++; continue; }

    // Markdown headings
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4) });
      i++; continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3) });
      i++; continue;
    }
    if (line.startsWith('# ')) {
      blocks.push({ type: 'h2', text: line.slice(2) });
      i++; continue;
    }

    // List items (-, *, •, numbers)
    if (line.match(/^[-*•]\s/) || line.match(/^\d+\.\s/)) {
      const items = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l.match(/^[-*•]\s/)) { items.push(l.replace(/^[-*•]\s/, '')); i++; }
        else if (l.match(/^\d+\.\s/)) { items.push(l.replace(/^\d+\.\s/, '')); i++; }
        else break;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    // Quotes: line starts with " or "
    if (line.startsWith('"') || line.startsWith('\u201c') || line.startsWith('\u2018')) {
      let text = line;
      while (i + 1 < lines.length && lines[i + 1].trim() && !lines[i + 1].trim().match(/^[-*•#]|\d+\./)) {
        i++;
        text += ' ' + lines[i].trim();
      }
      blocks.push({ type: 'quote', text });
      i++; continue;
    }

    // Collect paragraph (until empty line)
    let text = line;
    while (i + 1 < lines.length && lines[i + 1].trim()) {
      i++;
      text += ' ' + lines[i].trim();
    }

    if (isFirst) {
      blocks.push({ type: 'intro', text });
      isFirst = false;
    } else {
      blocks.push({ type: 'paragraph', text });
    }

    i++;
  }

  return blocks;
};

// ---- Block types config ----
const BLOCK_TYPES = [
  { type: 'paragraph', label: 'Párrafo' },
  { type: 'intro', label: 'Intro' },
  { type: 'h2', label: 'H2' },
  { type: 'h3', label: 'H3' },
  { type: 'list', label: 'Lista' },
  { type: 'quote', label: 'Cita' },
  { type: 'callout', label: 'Destacado' },
  { type: 'image', label: 'Imagen' },
];

const newBlock = (type) => {
  if (type === 'list') return { type, items: [''] };
  if (type === 'image') return { type, url: '', alt: '' };
  return { type, text: '' };
};

const changeBlockType = (block, newType) => {
  if (newType === 'list') {
    const items = block.text ? block.text.split('\n').map(l => l.trim()).filter(Boolean) : [''];
    return { type: newType, items };
  }
  if (newType === 'image') return { type: newType, url: '', alt: '' };
  if (block.type === 'list') return { type: newType, text: (block.items || []).join('. ') };
  return { type: newType, text: block.text || '' };
};

const emptyPost = () => ({
  slug: '',
  date: new Date().toISOString().split('T')[0],
  label: 'Product Leadership',
  en: { title: '', excerpt: '', content: [] },
  es: { title: '', excerpt: '', content: [] },
});

const bgMap = {
  paragraph: 'bg-white', intro: 'bg-violet-50', h2: 'bg-gray-50',
  h3: 'bg-gray-50', list: 'bg-white', quote: 'bg-sky-50',
  callout: 'bg-pink-50', image: 'bg-emerald-50',
};

// ---- Block Editor ----
const BlockEditor = ({ block, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const taRef = useRef(null);
  const hasText = ['paragraph', 'intro', 'quote', 'callout'].includes(block.type);

  return (
    <div className={`rounded-xl border border-gray-200 p-4 ${bgMap[block.type] || 'bg-white'}`}>
      <div className="flex items-center justify-between mb-3 gap-2">
        {/* Type selector */}
        <select
          value={block.type}
          onChange={e => onChange(changeBlockType(block, e.target.value))}
          className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-transparent border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-pink-300 cursor-pointer"
        >
          {BLOCK_TYPES.map(({ type, label }) => (
            <option key={type} value={type}>{label}</option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <button onClick={onMoveUp} disabled={isFirst} className="px-2 py-1 text-gray-300 hover:text-gray-600 disabled:opacity-20 text-sm">↑</button>
          <button onClick={onMoveDown} disabled={isLast} className="px-2 py-1 text-gray-300 hover:text-gray-600 disabled:opacity-20 text-sm">↓</button>
          <button onClick={onDelete} className="px-2 py-1 text-gray-300 hover:text-red-400 transition-colors text-lg ml-1 leading-none">×</button>
        </div>
      </div>

      {hasText && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => taRef.current && applyBold(taRef.current, block.text || '', (v) => onChange({ ...block, text: v }))}
              className="px-3 py-1 text-xs font-black border border-gray-200 rounded-lg hover:border-pink-300 hover:text-pink-500 transition-colors"
            >
              B
            </button>
            <span className="text-[10px] text-gray-400">Seleccioná → B para negrita</span>
          </div>
          <textarea
            ref={taRef}
            value={block.text || ''}
            onChange={e => onChange({ ...block, text: e.target.value })}
            rows={block.type === 'paragraph' ? 4 : 3}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 resize-y focus:outline-none focus:border-pink-300 font-sans"
            placeholder={
              block.type === 'intro' ? 'Subtítulo en itálica...' :
              block.type === 'quote' ? 'Texto de la cita...' :
              block.type === 'callout' ? 'Texto del destacado...' :
              'Texto del párrafo...'
            }
          />
        </div>
      )}

      {(block.type === 'h2' || block.type === 'h3') && (
        <input
          value={block.text || ''}
          onChange={e => onChange({ ...block, text: e.target.value })}
          className={`w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-pink-300 ${block.type === 'h2' ? 'text-xl font-black' : 'text-base font-bold text-pink-500'}`}
          placeholder={block.type === 'h2' ? 'Título de sección...' : 'Subtítulo...'}
        />
      )}

      {block.type === 'list' && (
        <div className="space-y-2">
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
                className="flex-1 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-pink-300"
                placeholder={`Item ${idx + 1}...`}
              />
              <button
                onClick={() => {
                  const items = (block.items || ['']).filter((_, i) => i !== idx);
                  onChange({ ...block, items: items.length ? items : [''] });
                }}
                className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
              >×</button>
            </div>
          ))}
          <button
            onClick={() => onChange({ ...block, items: [...(block.items || ['']), ''] })}
            className="text-xs font-bold text-pink-500 hover:underline mt-1"
          >
            + Agregar item
          </button>
        </div>
      )}

      {block.type === 'image' && (
        <div className="space-y-2">
          <input
            value={block.url || ''}
            onChange={e => onChange({ ...block, url: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-pink-300"
            placeholder="URL de la imagen (https://...)..."
          />
          <input
            value={block.alt || ''}
            onChange={e => onChange({ ...block, alt: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-pink-300"
            placeholder="Descripción (texto alternativo)..."
          />
          {block.url && (
            <img src={block.url} alt={block.alt || ''} className="max-h-40 rounded-lg object-cover mt-2" />
          )}
        </div>
      )}
    </div>
  );
};

// ---- Paste Panel ----
const PastePanel = ({ onConvert, onClose }) => {
  const [text, setText] = useState('');

  const handleConvert = () => {
    const blocks = parseTextToBlocks(text);
    if (blocks.length) onConvert(blocks);
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">
          Pegar texto completo
        </p>
        <button onClick={onClose} className="text-amber-400 hover:text-amber-600 text-lg leading-none">×</button>
      </div>
      <p className="text-[11px] text-amber-700 leading-relaxed">
        Pegá el texto completo del artículo. Se parsea automáticamente en bloques — <strong>## Título</strong>, <strong>### Subtítulo</strong>, guiones para listas, comillas para citas. Luego podés ajustar el tipo de cada bloque con el selector.
      </p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={14}
        autoFocus
        className="w-full border border-amber-200 rounded-xl p-4 text-sm text-gray-700 resize-y focus:outline-none focus:border-amber-400 font-sans bg-white"
        placeholder={`Ejemplo:\n\nEste es el párrafo introductorio del artículo.\n\n## Primera sección\n\nTexto del párrafo...\n\n### Subtítulo\n\n- Item uno\n- Item dos\n\n"Una cita destacada del artículo."`}
      />
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 border border-amber-200 text-amber-600 py-2.5 rounded-xl font-bold text-xs hover:bg-amber-100 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleConvert}
          disabled={!text.trim()}
          className="flex-1 bg-amber-500 text-white py-2.5 rounded-xl font-black text-xs hover:bg-amber-600 transition-colors disabled:opacity-40"
        >
          Convertir a bloques →
        </button>
      </div>
    </div>
  );
};

// ---- Main Admin Component ----
const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [posts, setPosts] = useState(() => JSON.parse(JSON.stringify(postsData)));

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenInput, setTokenInput] = useState(() => localStorage.getItem('admin_gh_token') || '');

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [activeLang, setActiveLang] = useState('es');
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [showPaste, setShowPaste] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) { setAuthed(true); setPasswordError(false); }
    else setPasswordError(true);
  };

  const handleSelectPost = (index) => {
    setSelectedIndex(index);
    setEditingPost(index === -1 ? emptyPost() : JSON.parse(JSON.stringify(posts[index])));
    setActiveLang('es');
    setSuccess('');
    setError('');
    setShowPaste(false);
  };

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

  const addBlockToPost = (type) => {
    setEditingPost(prev => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        content: [...(prev[activeLang]?.content || []), newBlock(type)],
      },
    }));
    setShowAddBlock(false);
  };

  const handlePasteConvert = (blocks) => {
    setEditingPost(prev => ({
      ...prev,
      [activeLang]: { ...prev[activeLang], content: blocks },
    }));
    setShowPaste(false);
  };

  const doPublish = async (token) => {
    const post = { ...editingPost };
    if (!post.slug) post.slug = slugify(post.en.title || post.es.title || '');
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const newPosts = selectedIndex === -1
        ? [post, ...posts]
        : posts.map((p, i) => i === selectedIndex ? post : p);

      const { sha: currentSha } = await ghGet(token);
      const result = await ghPut(token, newPosts, currentSha);
      setSha(result.content.sha);
      setPosts(newPosts);
      localStorage.setItem('admin_gh_token', token);
      if (selectedIndex === -1) setSelectedIndex(0);
      setEditingPost(post);
      setSuccess('¡Publicado! Vercel redeploy en ~1 min.');
      setShowTokenModal(false);
    } catch (e) {
      setError(e.message);
      if (e.message.includes('401') || e.message.includes('token') || e.message.includes('Bad credentials')) {
        localStorage.removeItem('admin_gh_token');
        setTokenInput('');
        setShowTokenModal(true);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!editingPost.en?.title && !editingPost.es?.title) { setError('El título es obligatorio'); return; }
    const savedToken = localStorage.getItem('admin_gh_token');
    if (savedToken) doPublish(savedToken);
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
            <button
              onClick={handleLogin}
              className="w-full bg-pink-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-pink-600 transition-colors"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const contentBlocks = editingPost?.[activeLang]?.content || [];

  // ---- Main editor ----
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* Token modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-2">GitHub Token</p>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Necesitás un token con scope <code className="bg-gray-100 px-1 rounded">repo</code>. Se guarda en tu navegador.
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
                <button
                  onClick={() => { setShowTokenModal(false); setError(''); }}
                  className="flex-1 border border-gray-200 text-gray-500 py-3 rounded-xl font-bold text-xs hover:border-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => tokenInput && doPublish(tokenInput)}
                  disabled={saving || !tokenInput}
                  className="flex-1 bg-pink-500 text-white py-3 rounded-xl font-black text-xs hover:bg-pink-600 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Maru · Blog Editor</p>
          <Link to="/" className="text-xs text-pink-500 hover:underline">← Ver sitio</Link>
        </div>

        <div className="p-4">
          <button
            onClick={() => handleSelectPost(-1)}
            className="w-full bg-pink-500 text-white py-2.5 px-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-pink-600 transition-colors"
          >
            + Nuevo post
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {posts.map((post, i) => (
            <button
              key={post.slug || i}
              onClick={() => handleSelectPost(i)}
              className={`w-full text-left p-4 border-b border-gray-50 hover:bg-pink-50/50 transition-colors ${selectedIndex === i ? 'bg-pink-50 border-l-2 border-l-pink-500' : 'border-l-2 border-l-transparent'}`}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-1">{post.label}</p>
              <p className="text-sm font-bold text-gray-900 leading-tight line-clamp-2">{post.es?.title || post.en?.title || post.slug}</p>
              <p className="text-[10px] text-gray-400 mt-1">{post.date}</p>
            </button>
          ))}
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
                placeholder="auto desde título"
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

          {/* Lang tabs */}
          <div className="bg-white border-b border-gray-100 px-6 flex gap-6">
            {['es', 'en'].map(lang => (
              <button
                key={lang}
                onClick={() => { setActiveLang(lang); setShowPaste(false); }}
                className={`py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors ${activeLang === lang ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                {lang === 'en' ? 'English' : 'Español'}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-4">

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Título</label>
                <input
                  value={editingPost[activeLang]?.title || ''}
                  onChange={e => setEditingPost(p => ({ ...p, [activeLang]: { ...p[activeLang], title: e.target.value } }))}
                  className="w-full border border-gray-200 rounded-xl p-4 text-2xl font-black focus:outline-none focus:border-pink-300"
                  placeholder="Título del post..."
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Excerpt</label>
                <textarea
                  value={editingPost[activeLang]?.excerpt || ''}
                  onChange={e => setEditingPost(p => ({ ...p, [activeLang]: { ...p[activeLang], excerpt: e.target.value } }))}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-600 resize-none focus:outline-none focus:border-pink-300"
                  placeholder="Resumen que aparece en la lista del blog..."
                />
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Contenido · {contentBlocks.length} bloque{contentBlocks.length !== 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={() => setShowPaste(p => !p)}
                    className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors ${showPaste ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}
                  >
                    Pegar texto
                  </button>
                </div>

                {showPaste && (
                  <PastePanel
                    onConvert={handlePasteConvert}
                    onClose={() => setShowPaste(false)}
                  />
                )}
              </div>

              {contentBlocks.map((block, i) => (
                <BlockEditor
                  key={i}
                  block={block}
                  onChange={(updated) => updateBlock(activeLang, i, updated)}
                  onDelete={() => deleteBlock(activeLang, i)}
                  onMoveUp={() => moveBlock(activeLang, i, -1)}
                  onMoveDown={() => moveBlock(activeLang, i, 1)}
                  isFirst={i === 0}
                  isLast={i === contentBlocks.length - 1}
                />
              ))}

              {/* Add block */}
              <div className="relative">
                <button
                  onClick={() => setShowAddBlock(prev => !prev)}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:border-pink-300 hover:text-pink-400 transition-colors"
                >
                  + Agregar bloque
                </button>
                {showAddBlock && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-xl p-3 z-10 grid grid-cols-4 gap-2">
                    {BLOCK_TYPES.map(({ type, label }) => (
                      <button
                        key={type}
                        onClick={() => addBlockToPost(type)}
                        className="py-2.5 px-2 text-xs font-bold text-gray-600 bg-gray-50 rounded-lg hover:bg-pink-50 hover:text-pink-500 transition-colors text-center"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
