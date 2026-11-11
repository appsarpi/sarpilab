/* Sarpi Lab Academy — ilustrações e gráficos em SVG (sem dependências) */
(function () {
  const C = {
    roxo: 'var(--roxo)', ambar: 'var(--ambar)', texto: 'var(--texto)',
    suave: 'var(--suave)', linha: 'var(--linha)', card: 'var(--card2)', verde: 'var(--verde)', vermelho: 'var(--vermelho)'
  };
  const fig = (svg, legenda) =>
    `<figure class="figura">${svg}${legenda ? `<figcaption>${legenda}</figcaption>` : ''}</figure>`;
  const svg = (w, h, inner, label) =>
    `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label || ''}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const t = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" fill="${o.cor || C.texto}" font-size="${o.tam || 13}" text-anchor="${o.anc || 'middle'}" font-weight="${o.peso || 400}">${s}</text>`;
  const seta = (id, cor) =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${cor}"/></marker></defs>`;

  const F = {};

  F.triangulo = () => fig(svg(360, 250,
    `<polygon points="180,25 330,215 30,215" fill="none" stroke="${C.roxo}" stroke-width="3"/>
     <circle cx="180" cy="25" r="7" fill="${C.ambar}"/><circle cx="330" cy="215" r="7" fill="${C.ambar}"/><circle cx="30" cy="215" r="7" fill="${C.ambar}"/>
     ${t(180, 135, 'EXPOSIÇÃO', { peso: 700, tam: 15 })}
     ${t(180, 155, '(quanta luz chega)', { cor: C.suave, tam: 11 })}
     ${t(250, 30, 'ISO', { anc: 'start', peso: 700 })}${t(250, 47, '+ claro / + ruído', { anc: 'start', cor: C.suave, tam: 11 })}
     ${t(330, 242, 'Obturador', { peso: 700 })}${t(250, 242, '', {})}
     ${t(30, 242, 'Abertura', { peso: 700 })}
     ${t(330, 196, 'tempo / movimento', { cor: C.suave, tam: 11, anc: 'end' })}
     ${t(30, 196, 'fixa no celular', { cor: C.suave, tam: 11, anc: 'start' })}`, 'Triângulo da exposição'),
    'Triângulo da exposição. No celular a abertura é fixa, então você controla ISO e obturador (e a luz da cena).');

  F.histograma = () => {
    const curva = (pts, cor) => `<path d="${pts}" fill="${cor}" opacity=".55" stroke="${cor}" stroke-width="1.5"/>`;
    const caixa = (x, rot, path, cor, nota) => `<g transform="translate(${x},20)">
      <rect width="104" height="80" rx="6" fill="${C.card}" stroke="${C.linha}"/>
      ${curva(path, cor)}
      ${t(52, 100, rot, { peso: 700, tam: 12 })}${t(52, 116, nota, { cor: C.suave, tam: 10 })}</g>`;
    return fig(svg(360, 140,
      caixa(4, 'Subexposta', 'M4 76 C10 10, 30 10, 45 60 S80 76, 100 76 Z', C.vermelho, 'tudo à esquerda') +
      caixa(128, 'Equilibrada', 'M4 76 C25 70, 35 20, 52 25 S80 65, 100 76 Z', C.verde, 'espalhada') +
      caixa(252, 'Estourada', 'M4 76 C40 76, 60 70, 75 30 S95 5, 100 4 L100 76 Z', C.vermelho, 'colada à direita'),
      'Histogramas'), 'O histograma mostra a distribuição de sombras (esquerda) a altas luzes (direita).');
  };

  F.lentes = (p) => {
    const lentes = p && p.iphone && p.pro ? [['0,5x', 110], ['1x', 70], ['2x', 42], [p.gen >= 15 ? '5x' : '3x', 20]]
      : [['0,5x', 110], ['1x', 70], ['2x (recorte)', 40]];
    let g = '';
    lentes.forEach(([n, ang], i) => {
      const a = (ang / 2) * Math.PI / 180, L = 150;
      const x = 180 + Math.sin(a) * L, y = 200 - Math.cos(a) * L, x2 = 180 - Math.sin(a) * L;
      const cor = [C.ambar, C.roxo, C.verde, C.vermelho][i];
      g += `<path d="M180 200 L${x2} ${y} L${x} ${y} Z" fill="${cor}" opacity=".13" stroke="${cor}"/>`;
      g += t(180, y - 6 + i * 0, '', {});
      g += t(x + 4, y + 4, n, { anc: 'start', cor, peso: 700 });
    });
    return fig(svg(360, 215, g + `<rect x="168" y="196" width="24" height="14" rx="3" fill="${C.texto}"/>`, 'Campo de visão das lentes'),
      'Quanto maior o “x”, mais fechado o enquadramento. Prefira lentes ópticas reais ao zoom digital.');
  };

  F.proporcoes = () => fig(svg(360, 240,
    `<rect x="40" y="20" width="280" height="210" fill="${C.card}" stroke="${C.texto}" stroke-width="2"/>
     ${t(46, 38, 'Sensor 4:3 (100%)', { anc: 'start', peso: 700 })}
     <rect x="40" y="46.25" width="280" height="157.5" fill="none" stroke="${C.ambar}" stroke-width="2.5" stroke-dasharray="7 5"/>
     ${t(314, 198, '16:9 ≈ 75%', { anc: 'end', cor: C.ambar, peso: 700 })}
     <rect x="75" y="20" width="210" height="210" fill="none" stroke="${C.roxo}" stroke-width="2.5" stroke-dasharray="3 4"/>
     ${t(180, 222, '1:1 = 75%', { cor: C.roxo, peso: 700 })}`, 'Recortes do sensor'),
    'Todo formato diferente de 4:3 é um recorte do sensor: menos pixels. Fotografe em 4:3 e recorte depois.');

  F.tercos = () => fig(svg(360, 330,
    `<rect x="100" y="10" width="170" height="302" rx="10" fill="${C.card}" stroke="${C.texto}" stroke-width="2"/>
     <rect x="100" y="200" width="170" height="112" fill="${C.roxo}" opacity=".18"/>
     <line x1="100" y1="200" x2="270" y2="200" stroke="${C.roxo}" stroke-width="2"/>
     <circle cx="213" cy="110" r="14" fill="${C.ambar}"/>
     <line x1="156.7" y1="10" x2="156.7" y2="312" stroke="${C.suave}" stroke-dasharray="4 4"/>
     <line x1="213.3" y1="10" x2="213.3" y2="312" stroke="${C.suave}" stroke-dasharray="4 4"/>
     <line x1="100" y1="110.7" x2="270" y2="110.7" stroke="${C.suave}" stroke-dasharray="4 4"/>
     <line x1="100" y1="211.3" x2="270" y2="211.3" stroke="${C.suave}" stroke-dasharray="4 4"/>
     ${t(90, 114, 'assunto no', { anc: 'end', tam: 11 })}${t(90, 128, 'ponto forte', { anc: 'end', tam: 11 })}
     ${t(90, 204, 'horizonte na', { anc: 'end', tam: 11 })}${t(90, 218, 'linha de baixo', { anc: 'end', tam: 11 })}
     ${t(280, 40, 'área livre', { anc: 'start', tam: 11, cor: C.suave })}${t(280, 54, 'p/ texto', { anc: 'start', tam: 11, cor: C.suave })}`, 'Regra dos terços no vertical'),
    'Regra dos terços em 9:16. Ative a grade na câmera (Ajustes › Câmera › Grade).');

  F.luz = () => {
    const pessoa = (x, cor) => `<circle cx="${x}" cy="70" r="16" fill="${C.card}" stroke="${C.texto}" stroke-width="2"/>
      <path d="M${x - 16} 70 A16 16 0 0 ${cor === 'e' ? 1 : 0} ${x + 16} 70" fill="${C.ambar}" opacity=".7"/>`;
    return fig(svg(360, 150, `${seta('sl', 'var(--ambar)')}
      <g>${t(60, 25, 'Frontal', { peso: 700 })}<circle cx="60" cy="70" r="16" fill="${C.ambar}" opacity=".7" stroke="${C.texto}" stroke-width="2"/>
        <line x1="60" y1="130" x2="60" y2="92" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sl)"/>${t(60, 145, 'plana', { cor: C.suave, tam: 11 })}</g>
      <g>${t(180, 25, 'Lateral', { peso: 700 })}<circle cx="180" cy="70" r="16" fill="${C.card}" stroke="${C.texto}" stroke-width="2"/>
        <path d="M180 54 A16 16 0 0 0 180 86 Z" fill="${C.ambar}" opacity=".75"/>
        <line x1="128" y1="70" x2="160" y2="70" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sl)"/>${t(180, 145, 'volume e textura', { cor: C.suave, tam: 11 })}</g>
      <g>${t(300, 25, 'Contraluz', { peso: 700 })}<circle cx="300" cy="70" r="16" fill="${C.card}" stroke="${C.ambar}" stroke-width="4"/>
        <line x1="300" y1="8" x2="300" y2="48" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sl)"/>${t(300, 145, 'silhueta / brilho', { cor: C.suave, tam: 11 })}</g>`, 'Direção da luz'),
      'A direção da luz muda o clima da imagem. A câmera fica embaixo em todos os exemplos.');
  };

  F.kelvin = () => fig(svg(360, 90,
    `<defs><linearGradient id="kg" x1="0" x2="1"><stop offset="0" stop-color="#ff8a2a"/><stop offset=".45" stop-color="#fff1d6"/><stop offset=".6" stop-color="#ffffff"/><stop offset="1" stop-color="#8fb6ff"/></linearGradient></defs>
     <rect x="20" y="20" width="320" height="26" rx="6" fill="url(#kg)"/>
     ${t(20, 66, '2.000K', { anc: 'start', tam: 11 })}${t(20, 82, 'vela', { anc: 'start', tam: 10, cor: C.suave })}
     ${t(110, 66, '3.200K', { tam: 11 })}${t(110, 82, 'lâmpada quente', { tam: 10, cor: C.suave })}
     ${t(200, 66, '5.600K', { tam: 11 })}${t(200, 82, 'sol do meio-dia', { tam: 10, cor: C.suave })}
     ${t(340, 66, '7.500K+', { anc: 'end', tam: 11 })}${t(340, 82, 'sombra / nublado', { anc: 'end', tam: 10, cor: C.suave })}`, 'Escala Kelvin'),
    'Temperatura de cor (Kelvin). Em vídeo, trave o balanço de branco para a cor não “passear” no meio do take.');

  F.obturador = () => {
    let g = '';
    for (let i = 0; i < 6; i++) {
      const x = 20 + i * 54;
      g += `<rect x="${x}" y="40" width="54" height="36" fill="none" stroke="${C.linha}"/>`;
      g += `<rect x="${x}" y="40" width="27" height="36" fill="${C.ambar}" opacity=".8"/>`;
    }
    return fig(svg(360, 120, g +
      t(20, 28, '30 fps → cada quadro dura 1/30 s', { anc: 'start', peso: 700 }) +
      t(20, 98, 'parte laranja = obturador aberto 1/60 s (metade do quadro = 180°)', { anc: 'start', tam: 11, cor: C.suave }) +
      t(20, 114, 'Regra: obturador ≈ 1 / (2 × fps)', { anc: 'start', tam: 12, peso: 700, cor: C.ambar }), 'Regra dos 180 graus'),
      'A regra dos 180° deixa um borrão de movimento natural, parecido com o do cinema.');
  };

  F.cores = () => fig(svg(360, 130,
    `<rect x="10" y="20" width="105" height="70" rx="6" fill="#77787a"/>${t(62, 60, 'LOG', { cor: '#e8e8e8', peso: 700 })}
     ${t(62, 108, 'cinza, plano', { tam: 11, cor: C.suave })}
     <text x="140" y="60" fill="${C.ambar}" font-size="22" text-anchor="middle">→</text>${t(140, 80, 'LUT', { tam: 11, cor: C.ambar, peso: 700 })}
     <rect x="165" y="20" width="85" height="70" rx="6" fill="url(#gr)"/>
     <defs><linearGradient id="gr" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#ffb35c"/><stop offset="1" stop-color="#2a6fb8"/></linearGradient>
     <linearGradient id="gr2" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f0a356"/><stop offset="1" stop-color="#3a5f8a"/></linearGradient></defs>
     ${t(207, 60, 'Rec.709', { cor: '#fff', peso: 700 })}${t(207, 108, 'contraste e cor', { tam: 11, cor: C.suave })}
     <rect x="265" y="20" width="85" height="70" rx="6" fill="url(#gr2)"/>${t(307, 60, 'Look', { cor: '#fff', peso: 700 })}${t(307, 108, 'estilo criativo', { tam: 11, cor: C.suave })}`, 'Fluxo do Log'),
    'Fluxo correto: Log → LUT de conversão (para Rec.709) → ajustes finos e estilo.');

  F.fluxoApp = (p) => {
    const box = (x, y, w, s, cor) => `<rect x="${x}" y="${y}" width="${w}" height="34" rx="8" fill="${C.card}" stroke="${cor || C.linha}" stroke-width="2"/>${t(x + w / 2, y + 22, s, { tam: 12 })}`;
    const nativo = p && p.android ? 'Câmera nativa' : 'Câmera do iPhone';
    return fig(svg(360, 250, seta('sf', 'var(--suave)') +
      box(80, 8, 200, 'Vai gravar o quê?', C.roxo) +
      `<line x1="140" y1="42" x2="90" y2="82" stroke="${C.suave}" stroke-width="1.5" marker-end="url(#sf)"/>
       <line x1="220" y1="42" x2="270" y2="82" stroke="${C.suave}" stroke-width="1.5" marker-end="url(#sf)"/>` +
      t(84, 64, 'rápido, stories,', { tam: 10, cor: C.suave, anc: 'end' }) + t(84, 76, 'momento espontâneo', { tam: 10, cor: C.suave, anc: 'end' }) +
      t(276, 64, 'cliente, take planejado,', { tam: 10, cor: C.suave, anc: 'start' }) + t(276, 76, 'luz difícil, cor', { tam: 10, cor: C.suave, anc: 'start' }) +
      box(10, 86, 160, nativo, C.verde) + box(190, 86, 160, 'Blackmagic Camera', C.ambar) +
      t(90, 140, 'automático confiável', { tam: 11, cor: C.suave }) + t(90, 156, 'estabilização forte', { tam: 11, cor: C.suave }) + t(90, 172, 'modo Cinematográfico', { tam: 11, cor: C.suave }) +
      t(270, 140, 'ISO/obturador/WB travados', { tam: 11, cor: C.suave }) + t(270, 156, 'zebra, falsa cor, foco', { tam: 11, cor: C.suave }) + t(270, 172, 'codec e taxa de dados', { tam: 11, cor: C.suave }) +
      t(180, 215, 'Regra prática: controle = Blackmagic · agilidade = nativa', { tam: 12, peso: 700, cor: C.ambar }), 'Qual app usar'),
      'Fluxograma: qual app de câmera usar em cada situação.');
  };

  F.movimentos = () => {
    const card = (x, y, nome, desenho) => `<g transform="translate(${x},${y})"><rect width="110" height="92" rx="8" fill="${C.card}" stroke="${C.linha}"/>${desenho}${t(55, 84, nome, { tam: 12, peso: 700 })}</g>`;
    const cam = `<rect x="47" y="40" width="16" height="11" rx="2" fill="${C.texto}"/>`;
    return fig(svg(360, 205, seta('sm', 'var(--ambar)') +
      card(4, 4, 'Pan', cam + `<path d="M25 30 Q55 10 85 30" fill="none" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sm)"/>`) +
      card(125, 4, 'Tilt', cam + `<path d="M85 18 Q100 45 85 68" fill="none" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sm)"/>`) +
      card(246, 4, 'Push-in', cam + `<line x1="55" y1="64" x2="55" y2="20" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sm)"/>`) +
      card(4, 108, 'Pull-out', cam + `<line x1="55" y1="20" x2="55" y2="64" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sm)"/>`) +
      card(125, 108, 'Órbita', `<circle cx="55" cy="40" r="7" fill="${C.roxo}"/><ellipse cx="55" cy="40" rx="38" ry="22" fill="none" stroke="${C.ambar}" stroke-width="2.5" stroke-dasharray="5 4"/>`) +
      card(246, 108, 'Tracking', `<circle cx="70" cy="30" r="7" fill="${C.roxo}"/><line x1="18" y1="55" x2="88" y2="55" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sm)"/><line x1="18" y1="30" x2="60" y2="30" stroke="${C.roxo}" stroke-width="1.5" stroke-dasharray="3 3"/>`),
      'Movimentos de câmera'), 'Seis movimentos básicos. Cada take: um movimento, começo e fim limpos (segure 1–2 s parado).');
  };

  F.safeZones = () => fig(svg(360, 330,
    `<rect x="100" y="8" width="170" height="302" rx="12" fill="${C.card}" stroke="${C.texto}" stroke-width="2"/>
     <rect x="100" y="8" width="170" height="38" rx="12" fill="${C.vermelho}" opacity=".25"/>
     <rect x="100" y="228" width="170" height="82" fill="${C.vermelho}" opacity=".25"/>
     <rect x="238" y="110" width="32" height="118" fill="${C.vermelho}" opacity=".25"/>
     <rect x="112" y="56" width="120" height="160" rx="6" fill="none" stroke="${C.verde}" stroke-width="2.5" stroke-dasharray="6 4"/>
     ${t(172, 140, 'ÁREA', { cor: C.verde, peso: 700 })}${t(172, 156, 'SEGURA', { cor: C.verde, peso: 700 })}
     ${t(90, 30, 'topo', { anc: 'end', tam: 11 })}${t(90, 268, 'legenda,', { anc: 'end', tam: 11 })}${t(90, 282, 'nome, música', { anc: 'end', tam: 11 })}
     ${t(280, 166, 'botões', { anc: 'start', tam: 11 })}${t(280, 180, 'curtir/', { anc: 'start', tam: 11 })}${t(280, 194, 'comentar', { anc: 'start', tam: 11 })}`, 'Zonas seguras 9:16'),
    'Zonas seguras no Reels/TikTok: deixe rosto e texto importante dentro da área verde.');

  F.dronePlanos = () => {
    const quadro = (x, y, nome, d) => `<g transform="translate(${x},${y})"><rect width="170" height="100" rx="8" fill="${C.card}" stroke="${C.linha}"/><line x1="8" y1="86" x2="162" y2="86" stroke="${C.suave}"/>${d}${t(85, 18, nome, { tam: 12, peso: 700 })}</g>`;
    const pessoa = (x) => `<circle cx="${x}" cy="78" r="5" fill="${C.roxo}"/>`;
    return fig(svg(360, 220, seta('sd', 'var(--ambar)') +
      quadro(4, 4, 'Dronie (afasta e sobe)', pessoa(35) + `<path d="M50 72 Q90 60 150 30" fill="none" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sd)"/>`) +
      quadro(186, 4, 'Reveal (revela o lugar)', `<rect x="60" y="40" width="20" height="46" fill="${C.suave}" opacity=".5"/><path d="M20 62 L140 62" fill="none" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sd)"/>`) +
      quadro(4, 112, 'Rise / Pedestal', pessoa(85) + `<line x1="40" y1="80" x2="40" y2="30" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sd)"/>`) +
      quadro(186, 112, 'Top-down (vista de cima)', `<rect x="62" y="40" width="46" height="36" fill="none" stroke="${C.roxo}" stroke-width="2"/><line x1="85" y1="26" x2="85" y2="52" stroke="${C.ambar}" stroke-width="2.5" marker-end="url(#sd)"/>`),
      'Planos de drone'), 'Planos clássicos de drone. Movimentos lentos e constantes parecem mais cinematográficos.');
  };

  F.nd = () => {
    const linhas = [['Sem filtro', '1/2000 s', 1], ['ND8', '1/250 s', 0.55], ['ND16', '1/125 s', 0.4], ['ND32', '1/60 s', 0.25]];
    let g = t(10, 22, 'Exemplo: dia de sol, gravando a 30 fps', { anc: 'start', peso: 700 });
    linhas.forEach(([n, v, f], i) => {
      const y = 38 + i * 30;
      g += t(10, y + 15, n, { anc: 'start', tam: 12 });
      g += `<rect x="92" y="${y}" width="${200 * f}" height="20" rx="4" fill="${i === 3 ? C.verde : C.ambar}" opacity="${i === 3 ? 0.9 : 0.6}"/>`;
      g += t(100 + 200 * f, y + 15, v + (i === 3 ? ' ✓ 180°' : ''), { anc: 'start', tam: 12, peso: i === 3 ? 700 : 400 });
    });
    return fig(svg(360, 160, g, 'Efeito dos filtros ND'),
      'Barra = quantidade de luz que entra. Cada “parada” de ND corta metade da luz; o ND32 chega perto do 1/60 ideal. Valores ilustrativos.');
  };

  F.barras = (titulo, dados, unidade, nota) => {
    const max = Math.max(...dados.map(d => d.v));
    const h = 40 + dados.length * 32;
    let g = t(10, 22, titulo, { anc: 'start', peso: 700 });
    dados.forEach((d, i) => {
      const y = 36 + i * 32, w = Math.max(4, 190 * d.v / max);
      g += t(118, y + 15, d.n, { anc: 'end', tam: 11 });
      g += `<rect x="124" y="${y}" width="${w}" height="20" rx="4" fill="${d.destaque ? C.ambar : C.roxo}" opacity="${d.destaque ? 1 : 0.65}"/>`;
      g += t(130 + w, y + 15, `${String(d.v).replace('.', ',')} ${unidade}`, { anc: 'start', tam: 11, peso: d.destaque ? 700 : 400 });
    });
    return fig(svg(360, h, g, titulo), nota);
  };

  F.vertical = () => fig(svg(360, 200,
    `<rect x="20" y="40" width="160" height="90" rx="6" fill="${C.card}" stroke="${C.suave}" stroke-width="2"/>${t(100, 90, '16:9', { peso: 700 })}
     ${t(100, 155, 'no feed: fica pequeno', { tam: 11, cor: C.suave })}
     <rect x="215" y="10" width="62" height="110" rx="6" fill="${C.card}" stroke="${C.ambar}" stroke-width="2"/>${t(246, 70, '9:16', { peso: 700, cor: C.ambar })}
     ${t(246, 140, 'Reels/TikTok', { tam: 11 })}
     <rect x="290" y="30" width="60" height="80" rx="6" fill="${C.card}" stroke="${C.roxo}" stroke-width="2"/>${t(320, 75, '3:4', { peso: 700, cor: C.roxo })}
     ${t(320, 140, 'foto no feed', { tam: 11 })}`, 'Formatos para redes'),
    'Formatos que ocupam mais tela: 9:16 para vídeo, 3:4 para foto no feed.');

  F.leitner = () => {
    const d = ['1 dia', '2 dias', '4 dias', '8 dias', '16 dias', '30 dias'];
    let g = '';
    d.forEach((s, i) => {
      const x = 8 + i * 58;
      g += `<rect x="${x}" y="30" width="52" height="44" rx="6" fill="${C.card}" stroke="${C.roxo}"/>${t(x + 26, 50, 'Caixa ' + (i + 1), { tam: 10, peso: 700 })}${t(x + 26, 66, s, { tam: 10, cor: C.suave })}`;
    });
    return fig(svg(360, 100, g + t(8, 20, 'Acertou → sobe de caixa. Errou → volta para a 1.', { anc: 'start', tam: 12 }), 'Revisão espaçada'), '');
  };

  window.FIG = F;
})();
