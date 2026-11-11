/* Sarpi Lab Academy — app (SPA sem dependências; progresso salvo no aparelho por nome de usuário) */
(function () {
  const { MODULOS, AULAS } = window.CURSO;
  const CHAVE = 'sarpiAcademy:v1';
  const DIA = 86400000;
  const INTERVALOS = [0, 2, 4, 8, 16, 30]; // dias por caixa (revisão espaçada)
  const $app = document.getElementById('app');

  /* ───────── opções do cadastro ───────── */
  const IPHONES = [
    ['18pro', 'iPhone 18 Pro / Pro Max', 18, true], ['air', 'iPhone Air', 17, false], ['17pro', 'iPhone 17 Pro / Pro Max', 17, true],
    ['17', 'iPhone 17', 17, false], ['16pro', 'iPhone 16 Pro / Pro Max', 16, true], ['16', 'iPhone 16 / 16 Plus / 16e', 16, false],
    ['15pro', 'iPhone 15 Pro / Pro Max', 15, true], ['15', 'iPhone 15 / 15 Plus', 15, false], ['14pro', 'iPhone 14 Pro / Pro Max', 14, true],
    ['14', 'iPhone 14 / 14 Plus', 14, false], ['13pro', 'iPhone 13 Pro / Pro Max', 13, true], ['13', 'iPhone 13 / mini', 13, false],
    ['12pro', 'iPhone 12 Pro / Pro Max', 12, true], ['12', 'iPhone 12 / mini', 12, false], ['old', 'iPhone 11 ou anterior', 11, false]
  ];
  const DRONES = ['DJI Neo', 'DJI Neo 2', 'DJI Mini 3', 'DJI Mini 4 Pro', 'DJI Mini 5 Pro', 'DJI Air 3 / 3S', 'DJI Mavic 3 / 4', 'DJI Avata / FPV', 'Outro drone'];
  const GIMBALS = ['DJI Osmo Mobile', 'DJI Osmo Pocket', 'Outro gimbal'];
  const FILTROS = ['ND8', 'ND16', 'ND32', 'ND64', 'CPL'];
  const ACESS = [['mic', 'Microfone sem fio'], ['tripe', 'Tripé'], ['luz', 'Luz LED'], ['ssd', 'SSD externo']];
  const EDITORES = ['CapCut', 'DaVinci Resolve', 'Edits (Instagram)', 'InShot', 'VN', 'iMovie', 'Final Cut Pro', 'Premiere / Rush', 'Ainda não edito'];
  const EDIT_FOTO = ['Lightroom', 'Snapseed', 'App Fotos', 'VSCO', 'Ainda não edito'];
  const OBJETIVOS = [['seguidores', 'Crescer nas redes'], ['clientes', 'Trabalhar com clientes'], ['viagens', 'Registrar viagens'], ['hobby', 'Hobby / aprender']];
  const PLATAFORMAS = ['Instagram', 'TikTok', 'YouTube', 'WhatsApp / outros'];
  const NIVEIS = ['Nunca estudei', 'Sei o básico', 'Intermediário', 'Avançado'];
  const DIFICULDADES = [['luz', 'Luz'], ['composicao', 'Enquadramento'], ['config', 'Configurações da câmera'], ['estabilidade', 'Imagem tremida'], ['cor', 'Cor'], ['audio', 'Áudio'], ['edicao', 'Edição'], ['ideias', 'Ideias de conteúdo']];
  const TEMPOS = [['10', '10 min por dia'], ['20', '20 min por dia'], ['40', '40 min por dia'], ['fds', 'Só nos fins de semana']];
  const NIVELAMENTO = [
    { q: 'Gravando a 30 fps, qual obturador deixa o movimento mais natural?', o: ['1/30', '1/60', '1/500', '1/2000'], c: 1 },
    { q: 'O que acontece quando o ISO fica muito alto?', o: ['Borrão', 'Ruído/granulado', 'Cores frias', 'Nada'], c: 1 },
    { q: 'Na regra dos terços, onde fica o horizonte?', o: ['No meio exato', 'Numa linha dos terços', 'Na diagonal', 'Fora do quadro'], c: 1 }
  ];

  /* ───────── armazenamento ───────── */
  const lerDB = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || { users: {} }; } catch (e) { return { users: {} }; } };
  let db = lerDB();
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(db)); } catch (e) { toast('Não foi possível salvar neste navegador.'); } };
  const slug = n => n.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hoje = () => new Date().toISOString().slice(0, 10);
  let atual = db.ultimo && db.users[db.ultimo] ? db.users[db.ultimo] : null;

  function novoUsuario(nome) {
    return { nome, criado: Date.now(), cad: null, prog: { aulas: {}, q: {}, xp: 0, dias: [], missoes: {} } };
  }

  /* ───────── perfil derivado (usado nas aulas) ───────── */
  function perfilDerivado(u) {
    const c = u.cad || {};
    const p = { nome: u.nome, foco: c.foco || 'ambos', objetivos: c.objetivos || [], plataformas: c.plataformas || [], dificuldades: c.dificuldades || [] };
    if (c.marca === 'iphone') {
      const m = IPHONES.find(i => i[0] === c.modelo) || IPHONES[IPHONES.length - 1];
      Object.assign(p, { iphone: true, celular: m[1], gen: m[2], pro: m[3] });
      p.log = p.pro && p.gen >= 15; p.log2 = p.pro && p.gen >= 17; p.prores = p.pro && p.gen >= 13;
      p.proraw = p.pro && p.gen >= 12; p.mp48 = (p.pro && p.gen >= 14) || p.gen >= 15;
      p.abertVar = p.pro && p.gen >= 18;
    } else {
      Object.assign(p, { android: true, celular: c.modeloTexto ? c.modeloTexto : 'seu celular Android', gen: 0, pro: c.tier === 'topo' });
      p.androidLog = c.androidLog || 'nao_sei'; p.log = false; p.log2 = false; p.prores = false; p.proraw = c.tier !== 'basico'; p.mp48 = false;
    }
    p.drone = c.drone || null; p.droneNome = c.drone || '';
    p.filtros = p.drone ? (c.filtros || []) : [];
    p.gimbal = !!c.gimbal; p.gimbalNome = c.gimbal || '';
    p.mic = (c.acess || []).includes('mic'); p.ssd = (c.acess || []).includes('ssd');
    p.editor = c.editor && c.editor !== 'Ainda não edito' ? c.editor : 'CapCut';
    p.editorFoto = c.editorFoto && c.editorFoto !== 'Ainda não edito' ? c.editorFoto : '';
    p.nivel = Number(c.nivel || 0); p.nivelamento = c.nivelamento || 0;
    return p;
  }

  const tituloAula = (a, p) => typeof a.titulo === 'function' ? a.titulo(p) : a.titulo;
  function trilha(u) {
    const p = perfilDerivado(u);
    return AULAS.filter(a => !a.quando || a.quando(p));
  }
  const dominaBasico = p => p.nivel >= 2 && p.nivelamento >= 2;
  const prioridade = (a, p) => (a.tags || []).some(t => p.dificuldades.includes(t));

  function proximaAula(u) {
    const t = trilha(u), p = perfilDerivado(u);
    const pend = t.filter(a => !(u.prog.aulas[a.id] && u.prog.aulas[a.id].feita));
    if (!pend.length) return null;
    if (dominaBasico(p)) return pend.find(a => a.nivel !== 'básico') || pend[0];
    return pend[0];
  }

  /* ───────── revisão espaçada ───────── */
  function perguntasDaAula(a, p) { return a.quiz(p).map((q, i) => Object.assign({ id: `${a.id}-${i}`, aula: a.id }, q)); }
  function registrarResposta(u, qid, certo, revisao) {
    const s = u.prog.q[qid] || { caixa: 0, prox: 0 };
    if (certo) { s.caixa = revisao ? Math.min(s.caixa + 1, INTERVALOS.length - 1) : Math.max(s.caixa, 1); s.prox = Date.now() + INTERVALOS[s.caixa] * DIA; }
    else { s.caixa = 0; s.prox = Date.now(); }
    s.erros = (s.erros || 0) + (certo ? 0 : 1);
    u.prog.q[qid] = s;
  }
  function pendentesRevisao(u) {
    const p = perfilDerivado(u), agora = Date.now(), out = [];
    trilha(u).forEach(a => {
      if (!(u.prog.aulas[a.id] && u.prog.aulas[a.id].feita)) return;
      perguntasDaAula(a, p).forEach(q => { const s = u.prog.q[q.id]; if (s && s.prox <= agora) out.push(Object.assign({ caixa: s.caixa }, q)); });
    });
    return out.sort((x, y) => x.caixa - y.caixa);
  }
  function marcarDia(u) { const d = hoje(); if (!u.prog.dias.includes(d)) u.prog.dias.push(d); }
  function sequencia(u) {
    const set = new Set(u.prog.dias); let n = 0; let d = new Date();
    if (!set.has(d.toISOString().slice(0, 10))) d = new Date(Date.now() - DIA);
    while (set.has(d.toISOString().slice(0, 10))) { n++; d = new Date(d.getTime() - DIA); }
    return n;
  }

  /* ───────── utilidades de UI ───────── */
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => t.classList.add('on'), 10); setTimeout(() => { t.classList.remove('on'); setTimeout(() => t.remove(), 300); }, 2600);
  }
  function modal(html) {
    const m = document.createElement('div'); m.className = 'modal';
    m.innerHTML = `<div class="sheet"><button class="fechar" aria-label="Fechar">×</button>${html}</div>`;
    m.addEventListener('click', e => { if (e.target === m || e.target.classList.contains('fechar') || e.target.dataset.fechar !== undefined) m.remove(); });
    document.body.appendChild(m); return m;
  }
  const embaralhar = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const ir = h => { location.hash = h; };

  function navegacao(ativo) {
    const n = atual ? pendentesRevisao(atual).length : 0;
    document.getElementById('nav').innerHTML = atual && atual.cad ? `
      <a href="#/inicio" class="${ativo === 'inicio' ? 'on' : ''}"><span>⌂</span>Início</a>
      <a href="#/trilha" class="${ativo === 'trilha' ? 'on' : ''}"><span>☰</span>Trilha</a>
      <a href="#/revisar" class="${ativo === 'revisar' ? 'on' : ''}"><span>↻</span>Revisar${n ? `<i class="badge">${n}</i>` : ''}</a>
      <a href="#/perfil" class="${ativo === 'perfil' ? 'on' : ''}"><span>◉</span>Perfil</a>` : '';
    document.getElementById('usuario').textContent = atual ? atual.nome : '';
  }

  /* ───────── telas ───────── */
  function telaLogin() {
    navegacao();
    const lista = Object.values(db.users);
    $app.innerHTML = `
    <section class="hero">
      <p class="kicker">Sarpi Lab Academy</p>
      <h1>Fotografia e filmagem<br>do seu jeito</h1>
      <p class="sub">Um curso que se adapta ao seu celular, drone e objetivo — com aulas curtas, ilustrações, quizzes e revisão inteligente.</p>
      <form id="fLogin" class="card">
        <label for="nome">Seu nome de usuário</label>
        <input id="nome" autocomplete="nickname" maxlength="40" placeholder="Ex.: Pedro Sarpi" required>
        <button class="btn">Entrar / Criar conta</button>
        <p class="nota">Seu progresso fica salvo neste aparelho com esse nome. Para usar em outro aparelho, gere um código de backup no Perfil.</p>
      </form>
      ${lista.length ? `<div class="card"><p class="label">Perfis neste aparelho</p><div class="chips">${lista.map(u => `<button class="chip" data-u="${esc(slug(u.nome))}">${esc(u.nome)}</button>`).join('')}</div></div>` : ''}
    </section>`;
    document.getElementById('fLogin').onsubmit = e => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim().replace(/\s+/g, ' ');
      const s = slug(nome);
      if (!s) return toast('Digite um nome válido.');
      if (!db.users[s]) db.users[s] = novoUsuario(nome);
      entrar(s);
    };
    $app.querySelectorAll('[data-u]').forEach(b => b.onclick = () => entrar(b.dataset.u));
  }
  function entrar(s) {
    db.ultimo = s; atual = db.users[s]; salvar();
    toast(atual.cad ? `Bem-vindo de volta, ${atual.nome.split(' ')[0]}!` : `Olá, ${atual.nome.split(' ')[0]}! Vamos montar seu curso.`);
    ir(atual.cad ? '#/inicio' : '#/cadastro');
  }

  /* cadastro em etapas */
  let rascunho = null, etapa = 0;
  function telaCadastro() {
    navegacao();
    if (!rascunho) { rascunho = JSON.parse(JSON.stringify(atual.cad || { marca: 'iphone', modelo: '18pro', tier: 'topo', androidLog: 'nao_sei', drone: '', filtros: [], gimbal: '', acess: [], editor: 'CapCut', editorFoto: 'Lightroom', objetivos: [], foco: 'ambos', plataformas: [], nivel: '1', dificuldades: [], tempo: '20', respostas: [] })); etapa = 0; }
    const r = rascunho;
    const radio = (nome, ops, val) => `<div class="opcoes">${ops.map(([v, l]) => `<label class="op"><input type="radio" name="${nome}" value="${esc(v)}" ${String(val) === String(v) ? 'checked' : ''}><span>${esc(l)}</span></label>`).join('')}</div>`;
    const check = (nome, ops, vals) => `<div class="opcoes">${ops.map(([v, l]) => `<label class="op"><input type="checkbox" name="${nome}" value="${esc(v)}" ${vals.includes(v) ? 'checked' : ''}><span>${esc(l)}</span></label>`).join('')}</div>`;
    const sel = (nome, ops, val) => `<select name="${nome}">${ops.map(([v, l]) => `<option value="${esc(v)}" ${String(val) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
    const etapas = [
      () => `<h2>Seu celular</h2>
        ${radio('marca', [['iphone', 'iPhone'], ['android', 'Android']], r.marca)}
        <div id="blocoIphone" ${r.marca !== 'iphone' ? 'hidden' : ''}><label>Modelo</label>${sel('modelo', IPHONES.map(i => [i[0], i[1]]), r.modelo)}</div>
        <div id="blocoAndroid" ${r.marca !== 'android' ? 'hidden' : ''}>
          <label>Modelo (opcional)</label><input name="modeloTexto" value="${esc(r.modeloTexto || '')}" placeholder="Ex.: Galaxy S25 Ultra">
          <label>Categoria</label>${radio('tier', [['topo', 'Topo de linha'], ['medio', 'Intermediário'], ['basico', 'Básico']], r.tier)}
          <label>Grava em Log?</label>${radio('androidLog', [['sim', 'Sim'], ['nao', 'Não'], ['nao_sei', 'Não sei']], r.androidLog)}
        </div>`,
      () => `<h2>Seus equipamentos</h2>
        <label>Drone</label>${sel('drone', [['', 'Não tenho drone']].concat(DRONES.map(d => [d, d])), r.drone)}
        <div id="blocoFiltros" ${!r.drone ? 'hidden' : ''}><label>Filtros para o drone</label>${check('filtros', FILTROS.map(f => [f, f]), r.filtros)}</div>
        <label>Estabilizador / gimbal</label>${sel('gimbal', [['', 'Não tenho']].concat(GIMBALS.map(d => [d, d])), r.gimbal)}
        <label>Outros acessórios</label>${check('acess', ACESS, r.acess)}`,
      () => `<h2>Como você edita</h2>
        <label>Vídeo</label>${sel('editor', EDITORES.map(e => [e, e]), r.editor)}
        <label>Foto</label>${sel('editorFoto', EDIT_FOTO.map(e => [e, e]), r.editorFoto)}`,
      () => `<h2>Seus objetivos</h2>
        <label>O que você quer com o curso? (marque quantos quiser)</label>${check('objetivos', OBJETIVOS, r.objetivos)}
        <label>Foco</label>${radio('foco', [['foto', 'Foto'], ['video', 'Vídeo'], ['ambos', 'Os dois']], r.foco)}
        <label>Onde você posta?</label>${check('plataformas', PLATAFORMAS.map(x => [x, x]), r.plataformas)}`,
      () => `<h2>Seu momento</h2>
        <label>Seu nível hoje</label>${radio('nivel', NIVEIS.map((n, i) => [String(i), n]), r.nivel)}
        <label>O que mais te atrapalha hoje?</label>${check('dificuldades', DIFICULDADES, r.dificuldades)}
        <label>Quanto tempo você tem?</label>${radio('tempo', TEMPOS, r.tempo)}`,
      () => `<h2>Nivelamento rápido</h2><p class="nota">3 perguntas para ajustar o ponto de partida. Sem pressão — “não sei” também vale.</p>
        ${NIVELAMENTO.map((q, i) => `<div class="pergunta"><p><b>${i + 1}.</b> ${q.q}</p>${radio('n' + i, q.o.map((o, j) => [String(j), o]).concat([['-1', 'Não sei']]), r.respostas[i] !== undefined ? r.respostas[i] : '')}</div>`).join('')}`
    ];
    $app.innerHTML = `<section class="card cadastro">
      <div class="passos">${etapas.map((_, i) => `<i class="${i <= etapa ? 'on' : ''}"></i>`).join('')}</div>
      <p class="kicker">Etapa ${etapa + 1} de ${etapas.length}</p>
      <form id="fCad">${etapas[etapa]()}
        <div class="acoes">${etapa > 0 ? '<button type="button" class="btn sec" id="voltar">Voltar</button>' : (atual.cad ? '<button type="button" class="btn sec" id="cancelar">Cancelar</button>' : '<span></span>')}
        <button class="btn">${etapa === etapas.length - 1 ? 'Montar meu curso' : 'Continuar'}</button></div>
      </form></section>`;
    const f = document.getElementById('fCad');
    const coletar = () => {
      const fd = new FormData(f);
      ['marca', 'modelo', 'modeloTexto', 'tier', 'androidLog', 'drone', 'gimbal', 'editor', 'editorFoto', 'foco', 'nivel', 'tempo'].forEach(k => { if (fd.has(k)) r[k] = fd.get(k); });
      ['filtros', 'acess', 'objetivos', 'plataformas', 'dificuldades'].forEach(k => { if (f.querySelector(`[name="${k}"]`)) r[k] = fd.getAll(k); });
      NIVELAMENTO.forEach((_, i) => { if (fd.has('n' + i)) r.respostas[i] = fd.get('n' + i); });
    };
    f.addEventListener('change', e => {
      if (e.target.name === 'marca') { document.getElementById('blocoIphone').hidden = e.target.value !== 'iphone'; document.getElementById('blocoAndroid').hidden = e.target.value !== 'android'; }
      if (e.target.name === 'drone') document.getElementById('blocoFiltros').hidden = !e.target.value;
    });
    const v = document.getElementById('voltar'); if (v) v.onclick = () => { coletar(); etapa--; telaCadastro(); };
    const c = document.getElementById('cancelar'); if (c) c.onclick = () => { rascunho = null; ir('#/perfil'); };
    f.onsubmit = e => {
      e.preventDefault(); coletar();
      if (etapa === 3 && !r.objetivos.length) return toast('Escolha pelo menos um objetivo.');
      if (etapa < etapas.length - 1) { etapa++; telaCadastro(); window.scrollTo(0, 0); return; }
      r.nivelamento = NIVELAMENTO.reduce((s, q, i) => s + (String(r.respostas[i]) === String(q.c) ? 1 : 0), 0);
      const primeira = !atual.cad;
      atual.cad = r; rascunho = null; salvar();
      ir(primeira ? '#/plano' : '#/trilha');
      toast(primeira ? 'Curso personalizado criado!' : 'Perfil atualizado — trilha recalculada.');
    };
  }

  function telaPlano() {
    navegacao('trilha');
    const p = perfilDerivado(atual), t = trilha(atual);
    const min = t.reduce((s, a) => s + a.min, 0);
    const prio = t.filter(a => prioridade(a, p));
    const tempo = TEMPOS.find(x => x[0] === atual.cad.tempo);
    const porSemana = { '10': 4, '20': 6, '40': 10, 'fds': 3 }[atual.cad.tempo] || 5;
    $app.innerHTML = `<section class="card destaque">
      <p class="kicker">Seu curso está pronto</p>
      <h1>${esc(p.nome.split(' ')[0])}, montamos ${t.length} aulas para você</h1>
      <div class="stats"><div><b>${t.length}</b><span>aulas</span></div><div><b>~${Math.round(min / 6) / 10}h</b><span>de estudo</span></div><div><b>~${Math.ceil(t.length / porSemana)}</b><span>semanas</span></div></div>
      <ul class="lista-check">
        <li>Personalizado para <b>${esc(p.celular)}</b>${p.drone ? `, <b>${esc(p.droneNome)}</b>` : ''}${p.gimbal ? `, <b>${esc(p.gimbalNome)}</b>` : ''} e edição no <b>${esc(p.editor)}</b>.</li>
        ${p.drone ? '<li>Inclui o módulo <b>Drone</b> (regras 2026, filtros e planos).</li>' : '<li>Sem drone: o módulo de drone fica de fora.</li>'}
        ${p.objetivos.includes('clientes') ? '<li>Inclui o módulo <b>Negócio</b> para captação de clientes.</li>' : ''}
        ${dominaBasico(p) ? '<li>Você foi bem no nivelamento: os fundamentos ficam como <b>revisão rápida</b> e começamos pelo intermediário.</li>' : '<li>Começamos pelos fundamentos, do básico ao avançado.</li>'}
        ${prio.length ? `<li>Prioridade para você: ${prio.map(a => `<b>${esc(tituloAula(a, p))}</b>`).join(', ')}.</li>` : ''}
        <li>Ritmo sugerido (${esc(tempo ? tempo[1] : '')}): cerca de ${porSemana} aulas por semana + revisão.</li>
      </ul>
      <button class="btn" onclick="location.hash='#/inicio'">Começar</button>
    </section>`;
  }

  function cartaoAula(a, p, u) {
    const st = u.prog.aulas[a.id] || {};
    const estado = st.feita ? 'feita' : (st.lida ? 'lida' : '');
    const tags = [];
    if (prioridade(a, p) && !st.feita) tags.push('<i class="tag prio">prioridade</i>');
    if (dominaBasico(p) && a.nivel === 'básico' && !st.feita) tags.push('<i class="tag">revisão rápida</i>');
    return `<a class="aula ${estado}" href="#/aula/${a.id}">
      <span class="status">${st.feita ? '✓' : (st.lida ? '◐' : '○')}</span>
      <span class="info"><b>${esc(tituloAula(a, p))}</b><small>${a.nivel} · ${a.min} min${st.feita && st.nota !== undefined ? ` · quiz ${Math.round(st.nota * 100)}%` : ''}</small>${tags.join('')}</span>
      ${st.feita ? `<button class="mini" data-resumo="${a.id}" title="Resumo">Resumo</button>` : ''}
    </a>`;
  }
  function ligarResumos(root) {
    root.querySelectorAll('[data-resumo]').forEach(b => b.onclick = e => { e.preventDefault(); e.stopPropagation(); abrirResumo(b.dataset.resumo); });
  }
  function abrirResumo(id) {
    const a = AULAS.find(x => x.id === id), p = perfilDerivado(atual);
    if (!a) return;
    modal(`<p class="kicker">Resumo rápido</p><h2>${esc(tituloAula(a, p))}</h2><ul class="lista-check">${a.resumo.map(r => `<li>${r}</li>`).join('')}</ul>
      <div class="acoes"><a class="btn sec" href="#/aula/${a.id}" data-fechar>Abrir aula</a><a class="btn" href="#/quiz/${a.id}" data-fechar>Refazer quiz</a></div>`);
  }

  function telaInicio() {
    navegacao('inicio');
    const u = atual, p = perfilDerivado(u), t = trilha(u);
    const feitas = t.filter(a => u.prog.aulas[a.id] && u.prog.aulas[a.id].feita).length;
    const pct = Math.round(feitas / t.length * 100);
    const prox = proximaAula(u), rev = pendentesRevisao(u).length;
    marcarDia(u); salvar();
    const notas = t.map(a => u.prog.aulas[a.id]).filter(s => s && s.feita);
    const media = notas.length ? Math.round(notas.reduce((s, x) => s + x.nota, 0) / notas.length * 100) : 0;
    $app.innerHTML = `
    <section class="ola"><h1>Olá, ${esc(p.nome.split(' ')[0])}</h1><p class="sub">${esc(p.celular)}${p.drone ? ' · ' + esc(p.droneNome) : ''}</p></section>
    <section class="card progresso">
      <div class="anel" style="--p:${pct}"><b>${pct}%</b></div>
      <div class="stats"><div><b>${feitas}/${t.length}</b><span>aulas</span></div><div><b>${u.prog.xp}</b><span>XP</span></div><div><b>${sequencia(u)}🔥</b><span>dias seguidos</span></div><div><b>${media}%</b><span>média quiz</span></div></div>
    </section>
    ${prox ? `<a class="card continuar" href="#/aula/${prox.id}"><p class="kicker">${feitas ? 'Continuar' : 'Comece por aqui'}</p><h2>${esc(tituloAula(prox, p))}</h2><p class="sub">${MODULOS.find(m => m.id === prox.modulo).nome} · ${prox.min} min</p><span class="btn">Abrir aula →</span></a>`
        : `<a class="card continuar" href="#/certificado"><p class="kicker">Trilha concluída 🎉</p><h2>Veja seu certificado</h2><span class="btn">Abrir →</span></a>`}
    <a class="card revisao ${rev ? 'tem' : ''}" href="#/revisar"><div><p class="kicker">Revisão espaçada</p><h2>${rev ? `${rev} pergunta${rev > 1 ? 's' : ''} para revisar` : 'Nada pendente hoje'}</h2>
      <p class="sub">${rev ? 'Revise agora para não esquecer o que já estudou.' : (feitas ? 'Faça um treino livre com as aulas que já concluiu.' : 'Conclua o quiz de uma aula e as perguntas entram aqui.')}</p></div><span class="seta">↻</span></a>
    <section><h3 class="titulo-sec">Seus módulos</h3>${MODULOS.map(m => {
        const am = t.filter(a => a.modulo === m.id); if (!am.length) return '';
        const f = am.filter(a => u.prog.aulas[a.id] && u.prog.aulas[a.id].feita).length;
        return `<a class="card modulo" href="#/trilha?m=${m.id}"><div><b>${m.nome}</b><small>${m.desc}</small></div><div class="barra"><i style="width:${f / am.length * 100}%"></i></div><small>${f}/${am.length}</small></a>`;
      }).join('')}</section>`;
  }

  function telaTrilha(params) {
    navegacao('trilha');
    const u = atual, p = perfilDerivado(u), t = trilha(u);
    $app.innerHTML = `<h1 class="titulo-pag">Sua trilha</h1><p class="sub">Do básico ao avançado, filtrada pelo seu equipamento. Você pode abrir qualquer aula.</p>
      ${MODULOS.map(m => { const am = t.filter(a => a.modulo === m.id); if (!am.length) return '';
        return `<section class="card" id="mod-${m.id}"><h2>${m.nome}</h2><p class="sub">${m.desc}</p>${am.map(a => cartaoAula(a, p, u)).join('')}</section>`; }).join('')}`;
    ligarResumos($app);
    if (params.m) { const el = document.getElementById('mod-' + params.m); if (el) el.scrollIntoView(); }
  }

  function telaAula(id) {
    navegacao('trilha');
    const u = atual, p = perfilDerivado(u), t = trilha(u);
    const a = t.find(x => x.id === id);
    if (!a) return ir('#/trilha');
    const i = t.indexOf(a), ant = t[i - 1], prox = t[i + 1];
    const st = u.prog.aulas[a.id] || {};
    const prereq = (a.prereq || []).map(pid => t.find(x => x.id === pid)).filter(Boolean);
    const missao = typeof a.missao === 'function' ? a.missao(p) : a.missao;
    $app.innerHTML = `<article class="aula-pag">
      <a href="#/trilha?m=${a.modulo}" class="voltar">← ${MODULOS.find(m => m.id === a.modulo).nome}</a>
      <p class="kicker">Aula ${i + 1} de ${t.length} · ${a.nivel} · ${a.min} min</p>
      <h1>${esc(tituloAula(a, p))}</h1>
      ${prereq.length ? `<div class="esqueceu"><span>Esqueceu algo? Revise antes:</span>${prereq.map(x => `<button class="chip" data-resumo="${x.id}">↻ ${esc(tituloAula(x, p))}</button>`).join('')}</div>` : ''}
      <div class="conteudo">${a.corpo(p)}</div>
      <div class="bloco resumo"><b>Pontos-chave</b><ul>${a.resumo.map(r => `<li>${r}</li>`).join('')}</ul></div>
      <div class="bloco missao"><b>Missão prática</b><p>${missao}</p>
        <label class="op inline"><input type="checkbox" id="missao" ${u.prog.missoes[a.id] ? 'checked' : ''}><span>Fiz a missão (+15 XP)</span></label></div>
      <div class="fim-aula">
        <button class="btn" id="irQuiz">${st.feita ? 'Refazer quiz' : 'Fazer o quiz da aula'}</button>
        <div class="acoes">${ant ? `<a class="btn sec" href="#/aula/${ant.id}">← Anterior</a>` : '<span></span>'}${prox ? `<a class="btn sec" href="#/aula/${prox.id}">Próxima →</a>` : ''}</div>
      </div></article>`;
    ligarResumos($app);
    if (!st.lida) { u.prog.aulas[a.id] = Object.assign(st, { lida: true }); u.prog.xp += 10; marcarDia(u); salvar(); }
    document.getElementById('missao').onchange = e => {
      if (e.target.checked && !u.prog.missoes[a.id]) { u.prog.missoes[a.id] = true; u.prog.xp += 15; toast('+15 XP pela missão!'); }
      else if (!e.target.checked && u.prog.missoes[a.id]) { delete u.prog.missoes[a.id]; u.prog.xp -= 15; }
      salvar();
    };
    document.getElementById('irQuiz').onclick = () => ir('#/quiz/' + a.id);
    window.scrollTo(0, 0);
  }

  /* motor de quiz compartilhado (aula e revisão) */
  function rodarQuiz(perguntas, { titulo, revisao, aoTerminar }) {
    let idx = 0, acertos = 0;
    const erradas = [];
    const render = () => {
      const q = perguntas[idx];
      const ordem = embaralhar(q.o.map((t, i) => i));
      const p = perfilDerivado(atual);
      const aulaQ = AULAS.find(a => a.id === q.aula);
      $app.innerHTML = `<section class="card quiz">
        <div class="passos">${perguntas.map((_, i) => `<i class="${i < idx ? 'on' : (i === idx ? 'atual' : '')}"></i>`).join('')}</div>
        <p class="kicker">${esc(titulo)} · ${idx + 1}/${perguntas.length}${revisao && aulaQ ? ' · ' + esc(tituloAula(aulaQ, p)) : ''}</p>
        <h2>${q.q}</h2>
        <div class="alternativas">${ordem.map(i => `<button class="alt" data-i="${i}">${q.o[i]}</button>`).join('')}</div>
        <div id="feedback"></div></section>`;
      $app.querySelectorAll('.alt').forEach(b => b.onclick = () => {
        const escolha = Number(b.dataset.i), certo = escolha === q.c;
        $app.querySelectorAll('.alt').forEach(x => { x.disabled = true; const i = Number(x.dataset.i); if (i === q.c) x.classList.add('certa'); else if (i === escolha) x.classList.add('errada'); });
        if (certo) acertos++; else erradas.push(q);
        registrarResposta(atual, q.id, certo, revisao);
        if (certo) atual.prog.xp += 5;
        marcarDia(atual); salvar();
        document.getElementById('feedback').innerHTML = `<div class="bloco ${certo ? 'ok' : 'erro'}"><b>${certo ? 'Isso!' : 'Não foi dessa vez.'}</b><p>${q.e || ''}</p>
          ${!certo && aulaQ ? `<button class="chip" data-resumo="${aulaQ.id}">↻ Revisar: ${esc(tituloAula(aulaQ, p))}</button>` : ''}</div>
          <button class="btn" id="seguir">${idx < perguntas.length - 1 ? 'Próxima' : 'Ver resultado'}</button>`;
        ligarResumos($app);
        document.getElementById('seguir').onclick = () => { idx++; idx < perguntas.length ? render() : aoTerminar(acertos, perguntas.length, erradas); };
      });
      window.scrollTo(0, 0);
    };
    render();
  }

  function telaQuiz(id) {
    navegacao('trilha');
    const p = perfilDerivado(atual), t = trilha(atual), a = t.find(x => x.id === id);
    if (!a) return ir('#/trilha');
    const prox = t[t.indexOf(a) + 1];
    rodarQuiz(perguntasDaAula(a, p), {
      titulo: 'Quiz', revisao: false,
      aoTerminar: (ac, tot, erradas) => {
        const st = atual.prog.aulas[a.id] || {};
        const primeira = !st.feita;
        atual.prog.aulas[a.id] = Object.assign(st, { lida: true, feita: Date.now(), nota: Math.max(primeira ? 0 : (st.nota || 0), ac / tot) });
        if (primeira) atual.prog.xp += 20;
        salvar();
        const pct = Math.round(ac / tot * 100);
        $app.innerHTML = `<section class="card resultado">
          <div class="anel" style="--p:${pct}"><b>${ac}/${tot}</b></div>
          <h1>${pct === 100 ? 'Perfeito!' : pct >= 70 ? 'Mandou bem!' : 'Bora revisar'}</h1>
          <p class="sub">${pct >= 70 ? 'As perguntas voltam na revisão espaçada daqui a alguns dias para fixar.' : 'As perguntas que você errou já estão na sua fila de revisão.'}</p>
          ${erradas.length ? `<div class="bloco erro"><b>Para rever</b><ul>${erradas.map(q => `<li>${q.q}<br><small>✓ ${q.o[q.c]}</small></li>`).join('')}</ul></div>` : ''}
          <div class="acoes"><a class="btn sec" href="#/aula/${a.id}">Reler aula</a>${prox ? `<a class="btn" href="#/aula/${prox.id}">Próxima aula →</a>` : `<a class="btn" href="#/inicio">Início</a>`}</div>
        </section>`;
        if (!proximaAula(atual)) toast('Trilha concluída! Seu certificado está liberado.');
      }
    });
  }

  function telaRevisar() {
    navegacao('revisar');
    const u = atual, p = perfilDerivado(u);
    const pend = pendentesRevisao(u);
    const feitas = trilha(u).filter(a => u.prog.aulas[a.id] && u.prog.aulas[a.id].feita);
    $app.innerHTML = `<h1 class="titulo-pag">Revisar</h1>
      <section class="card"><p>A revisão espaçada traz de volta cada pergunta no momento em que você está quase esquecendo.</p>${window.FIG.leitner()}
      ${pend.length ? `<button class="btn" id="revPend">Revisar ${Math.min(pend.length, 10)} pergunta${pend.length > 1 ? 's' : ''} pendente${pend.length > 1 ? 's' : ''}</button>` : `<p class="nota">Nenhuma pergunta vencida hoje. 👏</p>`}
      ${feitas.length ? `<button class="btn sec" id="treino">Treino livre (perguntas aleatórias)</button>` : '<p class="nota">Conclua uma aula para liberar a revisão.</p>'}</section>
      ${feitas.length ? `<section class="card"><h2>Resumos das aulas concluídas</h2><p class="sub">Esqueceu algum assunto? Abra o resumo de 30 segundos.</p>
        <div class="chips">${feitas.map(a => `<button class="chip" data-resumo="${a.id}">${esc(tituloAula(a, p))}</button>`).join('')}</div></section>` : ''}`;
    ligarResumos($app);
    const fim = (ac, tot) => {
      $app.innerHTML = `<section class="card resultado"><div class="anel" style="--p:${Math.round(ac / tot * 100)}"><b>${ac}/${tot}</b></div>
        <h1>Revisão feita</h1><p class="sub">Acertos sobem de caixa e voltam mais tarde; erros voltam logo.</p>
        <div class="acoes"><a class="btn sec" href="#/revisar">Revisar mais</a><a class="btn" href="#/inicio">Início</a></div></section>`;
      navegacao('revisar');
    };
    const b1 = document.getElementById('revPend'); if (b1) b1.onclick = () => rodarQuiz(pend.slice(0, 10), { titulo: 'Revisão', revisao: true, aoTerminar: fim });
    const b2 = document.getElementById('treino'); if (b2) b2.onclick = () => {
      const todas = feitas.flatMap(a => perguntasDaAula(a, p));
      rodarQuiz(embaralhar(todas).slice(0, 8), { titulo: 'Treino livre', revisao: true, aoTerminar: fim });
    };
  }

  function telaPerfil() {
    navegacao('perfil');
    const u = atual, p = perfilDerivado(u), c = u.cad;
    const linha = (k, v) => `<div class="linha"><span>${k}</span><b>${v || '—'}</b></div>`;
    $app.innerHTML = `<h1 class="titulo-pag">Perfil</h1>
      <section class="card"><h2>${esc(u.nome)}</h2>
        ${linha('Celular', esc(p.celular))}${linha('Drone', esc(p.droneNome))}${p.drone ? linha('Filtros', esc(p.filtros.join(', '))) : ''}
        ${linha('Gimbal', esc(p.gimbalNome))}${linha('Acessórios', esc((c.acess || []).map(a => (ACESS.find(x => x[0] === a) || [])[1]).join(', ')))}
        ${linha('Edição', esc(c.editor + ' · ' + c.editorFoto))}${linha('Objetivos', esc(c.objetivos.map(o => (OBJETIVOS.find(x => x[0] === o) || [])[1]).join(', ')))}
        ${linha('Nível', NIVEIS[p.nivel])}
        <button class="btn" id="editar">Editar equipamentos e objetivos</button></section>
      <section class="card"><h2>Backup do progresso</h2><p class="sub">O progresso fica salvo neste aparelho. Para continuar em outro, copie o código e cole lá em “Restaurar”.</p>
        <button class="btn sec" id="exportar">Copiar código de backup</button>
        <textarea id="codigo" placeholder="Cole aqui um código de backup" rows="3"></textarea>
        <button class="btn sec" id="importar">Restaurar</button></section>
      <section class="card"><a class="btn sec" href="#/certificado">Certificado</a><button class="btn sec" id="sair">Trocar de usuário</button><button class="btn perigo" id="apagar">Apagar meu progresso</button></section>`;
    document.getElementById('editar').onclick = () => { rascunho = null; ir('#/cadastro'); };
    document.getElementById('sair').onclick = () => { db.ultimo = null; atual = null; salvar(); ir('#/'); };
    document.getElementById('apagar').onclick = () => {
      const m = modal(`<h2>Apagar progresso?</h2><p>Isso remove as aulas concluídas, XP e revisões de <b>${esc(u.nome)}</b> neste aparelho.</p><div class="acoes"><button class="btn sec" data-fechar>Cancelar</button><button class="btn perigo" id="conf">Apagar</button></div>`);
      m.querySelector('#conf').onclick = () => { u.prog = novoUsuario(u.nome).prog; salvar(); m.remove(); toast('Progresso apagado.'); ir('#/inicio'); };
    };
    document.getElementById('exportar').onclick = async () => {
      const cod = btoa(unescape(encodeURIComponent(JSON.stringify(u))));
      document.getElementById('codigo').value = cod;
      try { await navigator.clipboard.writeText(cod); toast('Código copiado!'); } catch (e) { toast('Copie o código da caixa abaixo.'); }
    };
    document.getElementById('importar').onclick = () => {
      try {
        const obj = JSON.parse(decodeURIComponent(escape(atob(document.getElementById('codigo').value.trim()))));
        if (!obj.nome || !obj.prog) throw 0;
        const s = slug(obj.nome); db.users[s] = obj; salvar(); entrar(s);
      } catch (e) { toast('Código inválido.'); }
    };
  }

  function telaCertificado() {
    navegacao('perfil');
    const u = atual, p = perfilDerivado(u), t = trilha(u);
    const feitas = t.filter(a => u.prog.aulas[a.id] && u.prog.aulas[a.id].feita);
    if (feitas.length < t.length) {
      $app.innerHTML = `<section class="card"><h1>Certificado</h1><p>Conclua todas as ${t.length} aulas da sua trilha para liberar. Faltam <b>${t.length - feitas.length}</b>.</p><a class="btn" href="#/inicio">Continuar estudando</a></section>`;
      return;
    }
    const media = Math.round(feitas.reduce((s, a) => s + u.prog.aulas[a.id].nota, 0) / feitas.length * 100);
    const data = new Date(Math.max(...feitas.map(a => u.prog.aulas[a.id].feita))).toLocaleDateString('pt-BR');
    $app.innerHTML = `<section class="certificado">
      <p class="kicker">Sarpi Lab Academy</p><h1>Certificado de conclusão</h1>
      <p>Certificamos que</p><h2>${esc(u.nome)}</h2>
      <p>concluiu a trilha personalizada de <b>Fotografia e Filmagem</b> com ${t.length} aulas (${MODULOS.filter(m => t.some(a => a.modulo === m.id)).map(m => m.nome).join(', ')}), com aproveitamento médio de <b>${media}%</b> nos quizzes.</p>
      <p class="sub">Concluído em ${data}</p><p class="marca">SARPI LAB</p></section>
      <button class="btn" onclick="window.print()">Imprimir / salvar PDF</button>`;
  }

  /* ───────── roteador ───────── */
  function rotear() {
    const [caminho, qs] = (location.hash.slice(1) || '/').split('?');
    const params = Object.fromEntries(new URLSearchParams(qs || ''));
    const partes = caminho.split('/').filter(Boolean);
    document.querySelectorAll('.modal').forEach(m => m.remove());
    if (!atual) return telaLogin();
    if (!atual.cad && partes[0] !== 'cadastro') return ir('#/cadastro');
    switch (partes[0]) {
      case 'cadastro': return telaCadastro();
      case 'plano': return telaPlano();
      case 'inicio': return telaInicio();
      case 'trilha': return telaTrilha(params);
      case 'aula': return telaAula(partes[1]);
      case 'quiz': return telaQuiz(partes[1]);
      case 'revisar': return telaRevisar();
      case 'perfil': return telaPerfil();
      case 'certificado': return telaCertificado();
      default: return ir(atual.cad ? '#/inicio' : '#/cadastro');
    }
  }
  window.addEventListener('hashchange', rotear);
  document.getElementById('marca').onclick = () => ir(atual && atual.cad ? '#/inicio' : '#/');
  rotear();
})();
