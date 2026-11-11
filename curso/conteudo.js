/* Sarpi Lab Academy — conteúdo das aulas
   Cada aula: corpo(p) devolve HTML personalizado pelo perfil "p" (ver app.js › perfilDerivado). */
(function () {
  const F = window.FIG;
  const dica = (h) => `<div class="bloco dica"><b>Dica</b>${h}</div>`;
  const seu = (h) => `<div class="bloco seu"><b>No seu equipamento</b>${h}</div>`;
  const atencao = (h) => `<div class="bloco atencao"><b>Atenção</b>${h}</div>`;
  const tabela = (cab, linhas) => `<div class="tabela-wrap"><table><thead><tr>${cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${linhas.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  const MODULOS = [
    { id: 'm1', nome: 'Fundamentos', desc: 'Câmera, luz, exposição e composição' },
    { id: 'm2', nome: 'Fotografia', desc: 'Formatos, retrato, produto e edição' },
    { id: 'm3', nome: 'Vídeo no celular', desc: 'Configurações, cor, apps, movimento e áudio' },
    { id: 'm4', nome: 'Drone', desc: 'Regras, filtros e planos aéreos' },
    { id: 'm5', nome: 'Edição e redes', desc: 'Montagem, exportação e conteúdo' },
    { id: 'm6', nome: 'Negócio', desc: 'Captação profissional para clientes' }
  ];

  const AULAS = [
    /* ───────────── M1 FUNDAMENTOS ───────────── */
    {
      id: 'camera', modulo: 'm1', nivel: 'básico', min: 7, tags: ['config'],
      titulo: 'Como a câmera do celular funciona',
      corpo: p => `
<p>Seu celular tem um sensor pequeno, várias lentes fixas e muito processamento. Entender isso explica quase todos os “porquês” do curso.</p>
<h3>Sensor e processamento</h3>
<p>O sensor recebe a luz e vira pixels. Como ele é pequeno, o celular compensa juntando várias fotos em uma (HDR, modo noite) e “juntando” pixels vizinhos em pouca luz. Por isso fotos de dia ficam ótimas e, à noite, aparecem ruído e perda de detalhe.</p>
<h3>Lentes: use as reais</h3>
${F.lentes(p)}
<p>Cada “x” no app é uma câmera física diferente (ou um recorte do sensor principal). A <b>1x (principal)</b> é sempre a de melhor qualidade, especialmente com pouca luz. Evite o zoom com os dedos entre as lentes: isso é zoom digital e perde nitidez.</p>
${p.iphone ? seu(`<p>No <b>${p.celular}</b>${p.mp48 ? ', a câmera principal tem 48 MP e o “2x” é um recorte do centro do sensor, ainda com ótima qualidade' : ', a câmera principal é a mais nítida — prefira chegar mais perto em vez de usar zoom'}.${p.pro ? ' Você também tem teleobjetiva real: ótima para retrato e produto.' : ''}</p>`) :
          seu(`<p>No <b>${p.celular}</b>, confira no app de câmera quais botões de zoom trocam de lente de verdade (geralmente 0,5x, 1x e o da tele, se houver). Valores intermediários costumam ser digitais.</p>`)}
<h3>Lente limpa</h3>
<p>A lente do celular vive no bolso e na mão. Uma passada com pano de microfibra antes de gravar elimina o “véu” e os halos em luzes — é o ajuste mais barato do curso.</p>`,
      resumo: ['Sensor pequeno = celular depende de processamento e de boa luz.', 'A lente 1x é a de melhor qualidade.', 'Use os botões de lente; evite zoom digital com os dedos.', 'Limpe a lente antes de fotografar.'],
      missao: 'Fotografe o mesmo objeto com cada lente do seu celular (0,5x, 1x e tele/2x) sem mudar de lugar. Compare nitidez e “sensação” de cada uma.',
      quiz: p => [
        { q: 'Qual câmera do celular costuma ter a melhor qualidade, principalmente com pouca luz?', o: ['A ultra-angular (0,5x)', 'A principal (1x)', 'A frontal', 'Qualquer uma, são iguais'], c: 1, e: 'A principal tem o maior sensor e a lente mais clara.' },
        { q: 'Fazer zoom “com os dedos” entre 1x e 2x geralmente é…', o: ['Zoom óptico', 'Zoom digital (recorte que perde nitidez)', 'Troca de sensor', 'Estabilização'], c: 1, e: 'Entre as lentes reais, o celular apenas recorta e amplia a imagem.' },
        { q: 'Por que fotos noturnas do celular perdem detalhe?', o: ['O sensor é pequeno e capta pouca luz', 'O flash está desligado', 'A tela é escura', 'O arquivo é HEIF'], c: 0, e: 'Sensor pequeno + pouca luz = ruído, que o processamento tenta limpar apagando detalhes.' }
      ]
    },
    {
      id: 'exposicao', modulo: 'm1', nivel: 'básico', min: 9, tags: ['config', 'luz'], prereq: ['camera'],
      titulo: 'Exposição: ISO, obturador e abertura',
      corpo: p => `
<p>Exposição é a quantidade de luz que forma a imagem. Clara demais “estoura” (branco sem detalhe); escura demais “empapa” (preto com ruído).</p>
${F.triangulo(p)}
<h3>Os três controles</h3>
${tabela(['Controle', 'O que faz', 'Efeito colateral'], [
        ['ISO', 'Amplifica o sinal do sensor', 'ISO alto = ruído/granulado'],
        ['Obturador', 'Tempo que o sensor recebe luz', 'Lento = borrão de movimento'],
        ['Abertura (f/)', 'Tamanho do “furo” da lente', p.abertVar ? 'f/1.48 (mais luz, fundo desfocado) a f/4 (menos luz, mais coisa em foco)' : 'Na maioria dos celulares é fixa']
      ])}
${p.abertVar ? `<p>Seu <b>${p.celular}</b> é exceção: a câmera principal tem <b>abertura variável</b> (f/1.48, f/1.8, f/2.8 e f/4). Abrir dá mais luz e mais desfoque; fechar escurece e aumenta a área em foco. Nas outras lentes ela continua fixa.</p>
${seu('<p>Na câmera nativa você ajusta <b>abertura</b>, <b>velocidade do obturador</b>, balanço de branco e vê o <b>histograma</b>, mas <b>não existe controle de ISO</b>: ele fica no automático e compensa o que você travar. Se travar abertura e obturador ao mesmo tempo com pouca luz, o ISO dispara e aparece ruído. Para ISO manual, use o Blackmagic Camera.</p>')}` : `<p>Como a abertura do celular é fixa, sobra: <b>mais luz na cena</b>, <b>ISO</b> e <b>obturador</b>.</p>`}
<p>Em foto você pode usar obturador rápido para congelar ação. Em vídeo o obturador fica preso a uma regra (aula de vídeo) — então, quando falta luz, o caminho é <b>acender luz</b>, não subir ISO.</p>
<h3>Trave exposição e foco</h3>
<p>Na câmera nativa, toque e segure no assunto até aparecer <b>AE/AF Travado</b>. Depois arraste o sol (ícone ao lado do quadrado) para cima ou para baixo para ajustar. Assim a imagem não muda de brilho no meio do vídeo.</p>
<h3>Leia o histograma</h3>
${F.histograma()}
${dica('<p>Na dúvida, proteja as altas luzes: céu e pele estourados não voltam na edição; sombras um pouco escuras costumam voltar.</p>')}`,
      resumo: ['Exposição = ISO + obturador + abertura (fixa na maioria dos celulares).', 'ISO alto gera ruído; obturador lento gera borrão.', 'Toque e segure para travar AE/AF.', 'Proteja as altas luzes: estouro não tem volta.'],
      missao: 'Grave 10 s de uma janela com AE/AF travado no céu e outros 10 s travado no interior. Observe o que estoura e o que escurece.',
      quiz: p => [
        { q: 'Na maioria dos celulares, qual elemento do triângulo da exposição é fixo?', o: ['ISO', 'Obturador', 'Abertura', 'Balanço de branco'], c: 2, e: p.abertVar ? 'Na maioria, sim — o seu iPhone 18 Pro é exceção, com abertura variável na câmera principal.' : 'A lente do celular costuma ter abertura fixa.' },
        { q: 'Subir muito o ISO causa…', o: ['Borrão de movimento', 'Ruído/granulado', 'Cores mais quentes', 'Menos estabilização'], c: 1, e: 'ISO amplifica o sinal — e o ruído junto.' },
        { q: 'Num histograma “colado” à direita a imagem está…', o: ['Subexposta', 'Equilibrada', 'Estourada', 'Fora de foco'], c: 2, e: 'A direita representa as altas luzes.' },
        { q: 'O que é mais difícil de recuperar na edição?', o: ['Sombras levemente escuras', 'Altas luzes estouradas', 'Balanço de branco', 'Inclinação do horizonte'], c: 1, e: 'Pixel estourado não guarda informação.' }
      ]
    },
    {
      id: 'luz', modulo: 'm1', nivel: 'básico', min: 8, tags: ['luz', 'cor'], prereq: ['exposicao'],
      titulo: 'Luz e balanço de branco',
      corpo: p => `
<p>Mais que o equipamento, é a luz que separa imagem amadora de profissional. Antes de pensar em configuração, pergunte: <b>de onde vem a luz e qual a qualidade dela?</b></p>
<h3>Dura x suave</h3>
<p><b>Luz dura</b> (sol do meio-dia, lâmpada nua) cria sombras marcadas. <b>Luz suave</b> (céu nublado, sombra aberta, janela grande) envolve o rosto e esconde imperfeições. Para pessoas e produtos, procure a suave.</p>
<h3>Direção</h3>
${F.luz()}
<h3>Melhores horários</h3>
<ul><li><b>Golden hour</b>: cerca de 1 h após o nascer e antes do pôr do sol — luz baixa, quente e lateral.</li>
<li><b>Blue hour</b>: logo após o pôr do sol — céu azul profundo e luzes da cidade acesas.</li>
<li><b>Meio-dia</b>: procure sombra aberta ou use o sol como contraluz.</li></ul>
<h3>Balanço de branco (WB)</h3>
${F.kelvin()}
<p>O balanço de branco diz à câmera o que é “branco”. Em foto você corrige depois; em vídeo, trave o WB (no Blackmagic Camera ou em apps manuais) para a cor não mudar quando a câmera se move.</p>
${dica('<p>Não misture fontes: luz de janela (fria) com lâmpada amarela no mesmo rosto deixa a pele com duas cores. Desligue uma das duas.</p>')}`,
      resumo: ['Luz suave favorece pessoas e produtos.', 'Lateral dá volume; contraluz dá brilho e silhueta.', 'Golden hour e blue hour são os horários mais bonitos.', 'Em vídeo, trave o balanço de branco.'],
      missao: 'Fotografe uma pessoa (ou objeto) perto de uma janela em três posições: de frente, de lado e de costas para a janela.',
      quiz: p => [
        { q: 'Qual luz é mais favorável para um retrato?', o: ['Sol do meio-dia direto', 'Luz suave de janela', 'Flash do celular', 'Lâmpada nua acima da cabeça'], c: 1, e: 'Luz suave reduz sombras duras e textura da pele.' },
        { q: 'Luz lateral é usada principalmente para…', o: ['Achatar a imagem', 'Dar volume e textura', 'Criar silhueta', 'Corrigir cor'], c: 1, e: 'Sombras de um lado revelam forma e textura.' },
        { q: '5.600K corresponde aproximadamente a…', o: ['Luz de vela', 'Lâmpada quente', 'Luz do dia', 'Sombra azulada'], c: 2, e: 'É o padrão de “luz do dia”.' },
        { q: 'Por que travar o balanço de branco no vídeo?', o: ['Para o arquivo ficar menor', 'Para a cor não variar durante o take', 'Para ativar o HDR', 'Para estabilizar'], c: 1, e: 'No automático o WB pode mudar no meio da gravação.' }
      ]
    },
    {
      id: 'composicao', modulo: 'm1', nivel: 'básico', min: 8, tags: ['composicao', 'ideias'], prereq: ['camera'],
      titulo: 'Composição para o formato vertical',
      corpo: p => `
<p>Composição é decidir o que entra no quadro, onde fica e o que sai. No vertical (9:16 e 3:4), o espaço é estreito e alto — isso muda o jogo.</p>
${F.tercos()}
<h3>Ferramentas principais</h3>
<ul>
<li><b>Regra dos terços</b>: assunto nos pontos de cruzamento, horizonte numa das linhas.</li>
<li><b>Linhas que guiam</b>: calçadas, píer, cercas e estradas levando o olhar ao assunto.</li>
<li><b>Primeiro plano</b>: folhas, areia ou uma moldura perto da lente dão profundidade.</li>
<li><b>Espaço negativo</b>: área vazia valoriza o assunto e serve para texto.</li>
<li><b>Ponto de vista</b>: abaixe-se ou suba. A altura do olho é a mais comum — e a mais sem graça.</li>
</ul>
<h3>Específico do vertical</h3>
<p>Pense em camadas de cima para baixo: céu → assunto → chão. Pessoas inteiras cabem bem; paisagens largas, não — procure um elemento alto (coqueiro, farol, prédio) para preencher.</p>
${dica('<p>Sempre confira as bordas antes de disparar: postes saindo da cabeça e lixo no canto estragam uma boa foto.</p>')}`,
      resumo: ['Use a grade e a regra dos terços.', 'Linhas e primeiro plano criam profundidade.', 'Mude a altura da câmera.', 'No vertical, pense em camadas de cima para baixo.'],
      missao: 'Escolha um lugar e faça 5 fotos verticais do mesmo assunto, cada uma usando uma ferramenta diferente da lista.',
      quiz: p => [
        { q: 'Na regra dos terços, onde fica idealmente o horizonte?', o: ['Exatamente no meio', 'Numa das linhas dos terços', 'Fora do quadro', 'Na diagonal'], c: 1, e: 'Linha de cima ou de baixo, conforme o que é mais interessante.' },
        { q: 'Para que serve o espaço negativo?', o: ['Encher o quadro', 'Valorizar o assunto e abrir espaço para texto', 'Reduzir o tamanho do arquivo', 'Aumentar a nitidez'], c: 1, e: 'Área “vazia” chama atenção para o que importa.' },
        { q: 'Uma paisagem larga no vertical funciona melhor quando…', o: ['Tem um elemento alto para preencher', 'É fotografada com zoom digital', 'Fica toda na metade de cima', 'Não tem primeiro plano'], c: 0, e: 'O formato alto pede elementos verticais.' }
      ]
    },

    /* ───────────── M2 FOTOGRAFIA ───────────── */
    {
      id: 'formatos-foto', modulo: 'm2', nivel: 'básico', min: 7, tags: ['config'], prereq: ['camera'],
      quando: p => p.foco !== 'video',
      titulo: 'Proporção, formato de arquivo e resolução',
      corpo: p => `
<h3>Proporção: fotografe em 4:3</h3>
${F.proporcoes()}
<p>O sensor do celular é 4:3. Qualquer outra proporção (16:9, 1:1) descarta parte dele. Fotografe em 4:3 e recorte depois — você mantém qualidade e liberdade de enquadramento.</p>
<h3>Para o Instagram</h3>
${F.vertical()}
<p>A grade do perfil do Instagram usa 3:4. Uma foto vertical em 3:4 (1080×1440) ocupa mais tela no feed e não é cortada no perfil. Basta segurar o celular em pé e fotografar em 4:3.</p>
<h3>Formato de arquivo</h3>
${tabela(['Formato', 'Quando usar'], [
        ['HEIF/JPG', 'Dia a dia, postagem rápida'],
        [p.proraw ? 'ProRAW / RAW' : 'RAW (se disponível)', 'Luz difícil, edição pesada, trabalho de cliente'],
      ])}
${p.iphone ? seu(`<p>No <b>${p.celular}</b>: ${p.proraw ? `ative em Ajustes › Câmera › Formatos › <b>ProRAW e Controle de Resolução</b>${p.mp48 ? '. Use 24 MP ou 12 MP no dia a dia e 48 MP (ProRAW Máx.) quando for recortar muito ou imprimir' : ''}.` : 'seu modelo não grava ProRAW; para editar mais, use um app como Lightroom com captura em DNG.'}</p>`) : seu(`<p>Procure “RAW” ou “DNG” no modo Pro/Expert da câmera do <b>${p.celular}</b> ou use o Lightroom para capturar em DNG.</p>`)}
${atencao('<p>RAW ocupa muito espaço (dezenas de MB por foto). Use quando for editar de verdade.</p>')}`,
      resumo: ['4:3 usa o sensor inteiro; outros formatos recortam.', 'Feed do Instagram: vertical 3:4.', 'HEIF para o dia a dia; RAW para editar.', 'Resolução máxima só quando for recortar ou imprimir.'],
      missao: 'Faça a mesma foto em 4:3 e em 16:9 e compare a resolução nas informações da foto.',
      quiz: p => [
        { q: 'Qual proporção usa o sensor inteiro do celular?', o: ['16:9', '1:1', '4:3', '9:16'], c: 2, e: 'As demais são recortes.' },
        { q: 'Qual proporção ocupa melhor o feed/grade do Instagram para fotos?', o: ['16:9 horizontal', '3:4 vertical', '1:1', '21:9'], c: 1, e: 'A grade do perfil é 3:4.' },
        { q: 'Quando vale a pena fotografar em RAW/ProRAW?', o: ['Sempre, em qualquer foto', 'Em luz difícil ou quando vai editar bastante', 'Só para stories', 'Nunca, é só para câmeras grandes'], c: 1, e: 'RAW guarda mais informação, mas ocupa muito espaço.' }
      ]
    },
    {
      id: 'retrato-produto', modulo: 'm2', nivel: 'intermediário', min: 8, tags: ['luz', 'composicao'], prereq: ['luz', 'composicao'],
      quando: p => p.foco !== 'video',
      titulo: 'Retrato e produto',
      corpo: p => `
<h3>Retrato</h3>
<ul>
<li><b>Lente:</b> use ${p.pro ? 'a teleobjetiva ou o 2x' : 'o 2x (ou a 1x um pouco mais longe)'}. A 0,5x perto do rosto distorce nariz e testa.</li>
<li><b>Altura:</b> câmera na altura dos olhos ou levemente acima.</li>
<li><b>Luz:</b> rosto virado para a janela ou para a sombra aberta; olhos com brilho (“catchlight”).</li>
<li><b>Fundo:</b> afaste a pessoa da parede — o fundo desfoca mais e a sombra some.</li>
<li><b>Modo Retrato:</b> ótimo para foto; cuidado com recortes errados em cabelo e óculos. Dá para ajustar o desfoque depois.</li>
</ul>
<h3>Produto (lojas e clientes)</h3>
<ul>
<li>Fundo limpo (papel, parede, tecido) e uma única fonte de luz suave lateral.</li>
<li>Um rebatedor (cartolina branca) do lado oposto clareia as sombras.</li>
<li>Mostre escala e uso: produto na mão, na mesa, no ambiente.</li>
<li>Sequência padrão: frente, ¾, detalhe, embalagem, em uso.</li>
</ul>
${dica('<p>Para clientes, monte um “kit”: foto de capa vertical 3:4, 3 detalhes e 1 em uso. Isso vira carrossel pronto.</p>')}`,
      resumo: ['Retrato: tele/2x, luz suave, fundo afastado.', 'Evite 0,5x perto do rosto.', 'Produto: fundo limpo, luz lateral e rebatedor.', 'Entregue sequência: frente, ¾, detalhe, uso.'],
      missao: 'Faça um mini ensaio de produto com 5 fotos (frente, ¾, detalhe, embalagem, em uso) usando só a luz de uma janela e uma folha branca.',
      quiz: p => [
        { q: 'Por que evitar a lente 0,5x perto do rosto?', o: ['Ela não tem foco', 'Distorce as proporções do rosto', 'Grava em preto e branco', 'Não tem HDR'], c: 1, e: 'Grande-angular de perto exagera o que está mais próximo.' },
        { q: 'Para que serve o rebatedor branco?', o: ['Desfocar o fundo', 'Clarear as sombras', 'Aumentar o ISO', 'Esquentar a cor'], c: 1, e: 'Ele devolve parte da luz para o lado escuro.' },
        { q: 'Afastar a pessoa da parede ajuda a…', o: ['Desfocar o fundo e sumir com a sombra', 'Deixar a foto mais nítida no fundo', 'Ativar o modo noite', 'Mudar a proporção'], c: 0, e: 'Mais distância = mais desfoque e menos sombra projetada.' }
      ]
    },
    {
      id: 'edicao-foto', modulo: 'm2', nivel: 'intermediário', min: 8, tags: ['edicao', 'cor'], prereq: ['exposicao'],
      quando: p => p.foco !== 'video',
      titulo: 'Edição de fotos em ordem',
      corpo: p => `
<p>Editar em ordem evita ficar “empurrando” os mesmos controles. Use ${p.editorFoto || 'o Lightroom (grátis), Snapseed ou o próprio app Fotos'}.</p>
<ol>
<li><b>Recorte e endireite</b> — horizonte reto, proporção final (3:4 para feed).</li>
<li><b>Exposição</b> — brilho geral.</li>
<li><b>Altas luzes e sombras</b> — recupere céu; abra sombras sem exagero.</li>
<li><b>Balanço de branco</b> — neutralize (pele natural, branco branco).</li>
<li><b>Contraste e textura</b> — com moderação.</li>
<li><b>Cor</b> — saturação/vibração; ajuste cores específicas (HSL), ex.: azul do céu, verde do mato.</li>
<li><b>Ajustes locais</b> — clarear rosto, escurecer bordas.</li>
<li><b>Nitidez e ruído</b> — por último.</li>
</ol>
${dica('<p>Crie um <b>preset</b> com seus ajustes favoritos e aplique a todas as fotos de um ensaio. Consistência é o que faz um perfil parecer profissional.</p>')}
${atencao('<p>Pele é o termômetro: se a pele ficou laranja, magenta ou cinza, a edição passou do ponto.</p>')}`,
      resumo: ['Ordem: recorte → exposição → luzes/sombras → WB → contraste → cor → local → nitidez.', 'Use HSL para ajustar cores específicas.', 'Presets dão consistência.', 'Pele natural é o limite.'],
      missao: 'Edite 3 fotos seguindo a ordem exata da aula e salve os ajustes como preset. Aplique em uma 4ª foto.',
      quiz: p => [
        { q: 'Qual deve ser um dos primeiros passos da edição?', o: ['Nitidez', 'Recorte e endireitar', 'Vinheta', 'Granulação'], c: 1, e: 'Defina o quadro final antes de ajustar luz e cor.' },
        { q: 'Para mudar só o azul do céu, use…', o: ['Exposição', 'HSL/Mistura de cores', 'Nitidez', 'Recorte'], c: 1, e: 'HSL ajusta matiz, saturação e luminância por cor.' },
        { q: 'Por que usar presets?', o: ['Para aumentar a resolução', 'Para dar consistência ao perfil', 'Para remover o RAW', 'Para gravar vídeo'], c: 1, e: 'Mesma linguagem visual em todas as fotos.' }
      ]
    },

    /* ───────────── M3 VÍDEO ───────────── */
    {
      id: 'config-video', modulo: 'm3', nivel: 'básico', min: 9, tags: ['config'], prereq: ['exposicao'],
      quando: p => p.foco !== 'foto',
      titulo: 'Resolução, fps e a regra dos 180°',
      corpo: p => `
<h3>Resolução</h3>
<p>Grave em <b>4K</b> sempre que possível, mesmo postando em 1080p: sobra margem para recortar, reenquadrar e estabilizar na edição. Use 1080p só para economizar espaço em gravações longas.</p>
<h3>Taxa de quadros (fps)</h3>
${tabela(['fps', 'Uso'], [
        ['24', 'Visual “cinema”, conteúdo narrativo'],
        ['30', 'Padrão para redes sociais e conversas'],
        ['60', 'Ação e câmera lenta 2x'],
        ['120+', 'Câmera lenta forte (precisa de muita luz)']
      ])}
<p>Escolha um fps por projeto e não misture sem motivo.</p>
<h3>Obturador: regra dos 180°</h3>
${F.obturador()}
${tabela(['Gravando em', 'Obturador ideal'], [['24 fps', '1/50'], ['30 fps', '1/60'], ['60 fps', '1/120']])}
<h3>Brasil = rede elétrica de 60 Hz</h3>
<p>Lâmpadas aqui piscam em ritmo ligado aos 60 Hz. Gravar a <b>30 ou 60 fps</b> com obturador <b>1/60 ou 1/120</b> evita listras e cintilação. Se precisar de 24 fps em ambiente interno, use 1/60 em vez de 1/50.</p>
${atencao('<p>Em sol forte, o celular sobe o obturador para 1/1000+ e o vídeo fica “picotado”. A solução é filtro ND (lição de drone/filtros) — ou aceitar o look em conteúdos rápidos.</p>')}
${p.iphone ? seu(`<p>No app Câmera do iPhone, as opções ficam em Ajustes › Câmera › Gravar Vídeo. No Blackmagic Camera você define fps e obturador direto na tela.</p>`) : ''}`,
      resumo: ['Grave em 4K mesmo para postar em 1080p.', '30 fps para redes, 24 para cinema, 60 para câmera lenta.', 'Obturador = 1/(2×fps).', 'No Brasil (60 Hz), use 30/60 fps em luz artificial.'],
      missao: 'Grave alguém andando a 30 fps com obturador 1/60 e depois com 1/1000 (Blackmagic Camera ou app manual). Compare o movimento.',
      quiz: p => [
        { q: 'Gravando a 30 fps, qual obturador segue a regra dos 180°?', o: ['1/30', '1/60', '1/120', '1/1000'], c: 1, e: '1 / (2 × 30) = 1/60.' },
        { q: 'Por que gravar em 4K se o Reels exibe em 1080p?', o: ['Para o arquivo ficar menor', 'Para ter margem de recorte e estabilização', 'Porque o Instagram exige', 'Para ativar o HDR'], c: 1, e: 'Sobra resolução para reenquadrar sem perder qualidade.' },
        { q: 'Num ambiente com lâmpadas no Brasil, qual combinação evita cintilação?', o: ['25 fps e 1/50', '30 fps e 1/60', '24 fps e 1/48', '50 fps e 1/100'], c: 1, e: 'A rede de 60 Hz combina com 30/60 fps.' },
        { q: 'Qual fps você usaria para câmera lenta 2x numa timeline de 30?', o: ['24', '30', '60', '25'], c: 2, e: '60 fps reproduzidos a 30 = metade da velocidade.' }
      ]
    },
    {
      id: 'codecs', modulo: 'm3', nivel: 'intermediário', min: 8, tags: ['config', 'edicao'], prereq: ['config-video'],
      quando: p => p.foco !== 'foto',
      titulo: 'Codecs, taxa de dados e armazenamento',
      corpo: p => `
<p>O codec define como o vídeo é comprimido. Mais compressão = arquivo menor, mas menos “margem” para editar cor.</p>
${F.barras('Espaço por minuto em 4K 30 fps (aprox.)', [
        { n: 'ProRes 422 HQ', v: 6.6 }, { n: 'ProRes 422', v: 4.4 }, { n: 'ProRes 422 LT', v: 3.1 },
        { n: 'ProRes Proxy', v: 1.4 }, { n: 'HEVC Máx 81Mbps', v: 0.6, destaque: true }, { n: 'HEVC Alta 54Mbps', v: 0.4, destaque: true }
      ], 'GB', 'Um minuto de ProRes 422 ocupa cerca de 10× mais que HEVC. Valores aproximados.')}
${tabela(['Codec', 'Quando usar'], [
        ['HEVC (H.265)', 'Padrão para redes sociais. Pequeno e 10-bit'],
        ['H.264', 'Só se o editor/computador não abrir HEVC'],
        ['ProRes 422 / LT', 'Log, correção de cor pesada, trabalho de cliente'],
        ['ProRes RAW', 'Máximo controle; exige armazenamento externo e editor compatível']
      ])}
${p.prores ? seu(`<p>Seu <b>${p.celular}</b> grava ProRes. Para Reels/TikTok editados no ${p.editor}, use <b>HEVC</b> com taxa <b>Alta</b> (Rec.709) ou <b>Máx</b> (Log). Reserve ProRes para projetos especiais${p.ssd ? ' — e grave no SSD externo' : '; considere um SSD externo via USB-C'}.</p>`) :
          seu(`<p>Seu celular não grava ProRes${p.iphone ? '' : ' (ou equivalente)'}, e tudo bem: HEVC em taxa alta é mais do que suficiente para redes sociais.</p>`)}
${dica('<p>As redes recomprimem tudo. O ganho de ProRes só aparece se você realmente mexer muito na cor.</p>')}`,
      resumo: ['HEVC é o padrão para redes.', 'ProRes ocupa ~10× mais e serve para cor pesada.', 'Log pede taxa de dados Máx (ou ProRes).', 'As redes recomprimem tudo.'],
      missao: 'Grave 30 s em HEVC Alta e 30 s em outro codec disponível. Compare o tamanho dos arquivos e se o editor roda liso.',
      quiz: p => [
        { q: 'Para Reels editados no celular, qual codec é o mais equilibrado?', o: ['ProRes 422 HQ', 'HEVC (H.265)', 'ProRes RAW', 'MJPEG'], c: 1, e: 'Boa qualidade e arquivo leve.' },
        { q: 'ProRes 422 ocupa aproximadamente…', o: ['O mesmo que HEVC', 'Metade do HEVC', 'Cerca de 10× mais que HEVC', '100× menos'], c: 2, e: 'Cerca de 4,4 GB/min contra ~0,4–0,6 GB/min.' },
        { q: 'Se for gravar em Log com HEVC, qual taxa de dados escolher?', o: ['Baixa', 'Média', 'Máx', 'Tanto faz'], c: 2, e: 'Log sofre mais com compressão.' }
      ]
    },
    {
      id: 'cor-log', modulo: 'm3', nivel: 'avançado', min: 10, tags: ['cor', 'edicao'], prereq: ['codecs', 'luz'],
      quando: p => p.foco !== 'foto',
      titulo: 'Perfis de cor: Rec.709, HDR e Log',
      corpo: p => `
${tabela(['Perfil', 'Visual', 'Para quem'], [
        ['Rec.709 (SDR)', 'Pronto, contraste normal', 'Postagem rápida, edição simples'],
        ['HDR (HLG/Rec.2020)', 'Brilho extra em telas HDR', 'Pode estourar/lavar nas redes'],
        ['Log', 'Cinza e plano', 'Quem vai corrigir cor com LUT']
      ])}
${F.cores()}
<h3>Por que o Log parece cinza?</h3>
<p>Ele “achata” a imagem para guardar mais informação em sombras e altas luzes. A cor e o contraste voltam quando você aplica uma <b>LUT de conversão</b> para Rec.709 — e depois ajusta.</p>
<h3>Quando vale a pena</h3>
<ul><li>Cenas de alto contraste: pôr do sol, praia ao meio-dia, interior com janela.</li>
<li>Projetos em que você vai caprichar na cor ou precisa combinar com outra câmera.</li></ul>
<h3>O preço do Log</h3>
<ul><li>Exige exposição correta — exponha um pouco mais claro (+0,3 a +0,7) e use zebra/falsa cor.</li>
<li>Todo clipe precisa de LUT + ajuste: mais tempo de edição.</li>
<li>Pede taxa de dados Máx ou ProRes.</li></ul>
${p.log ? seu(`<p>Seu <b>${p.celular}</b> grava <b>${p.log2 ? 'Apple Log 2' : 'Apple Log'}</b>. ${p.log2 ? 'O Log 2 usa uma gama de cores ajustada ao sensor do iPhone; use LUTs feitas para Log 2 (as do Log 1 funcionam, mas a pele pode sair diferente).' : 'Use a LUT oficial da Apple de Apple Log para Rec.709 como ponto de partida.'} No Blackmagic Camera, uma <b>LUT de visualização</b> mostra a imagem colorida na tela, mas o arquivo continua em Log.</p>`) :
          (p.androidLog === 'sim' ? seu(`<p>Seu <b>${p.celular}</b> tem perfil Log. Baixe a LUT oficial da fabricante para converter para Rec.709.</p>`) :
            seu(`<p>Seu celular ${p.androidLog === 'nao_sei' ? 'talvez não tenha' : 'não tem'} Log — e não faz falta para redes. Concentre-se em boa luz e Rec.709 bem exposto.</p>`))}
${p.editor === 'CapCut' ? atencao('<p>O CapCut aceita LUT .cube, mas tem controle de cor limitado. Teste antes de usar Log num trabalho de cliente. O DaVinci Resolve (grátis) lida muito melhor com Log.</p>') : ''}`,
      resumo: ['Rec.709 = pronto; HDR = arriscado nas redes; Log = precisa de LUT.', 'Log guarda mais alcance dinâmico.', 'Fluxo: Log → LUT de conversão → ajustes → estilo.', 'Exponha o Log um pouco mais claro.'],
      missao: p => p.log || p.androidLog === 'sim' ? 'Grave o mesmo pôr do sol em Rec.709 e em Log. Aplique a LUT de conversão no Log e compare céu e sombras.' : 'Grave uma cena de alto contraste (janela + interior) em Rec.709 e veja o que estoura. Tente resolver mudando a posição da câmera ou a luz.',
      quiz: p => [
        { q: 'Por que o vídeo em Log aparece cinza?', o: ['Defeito do sensor', 'Ele guarda informação com pouco contraste para corrigir depois', 'Está em preto e branco', 'A taxa de dados é baixa'], c: 1, e: 'O contraste e a cor voltam com a LUT.' },
        { q: 'Qual é a ordem correta?', o: ['Look criativo → LUT de conversão', 'LUT de conversão → ajustes → look', 'Exportar → LUT', 'Nitidez → LUT'], c: 1, e: 'Primeiro normaliza para Rec.709, depois estiliza.' },
        { q: 'Se o app mostra a imagem colorida mas você gravou em Log, provavelmente…', o: ['O arquivo está em Rec.709', 'Há uma LUT só de visualização ativa', 'O Log está desligado', 'O vídeo é HDR'], c: 1, e: 'A LUT de monitoramento não é gravada no arquivo.' },
        { q: 'Para postar rápido sem correção de cor, o melhor perfil é…', o: ['Log', 'Rec.709', 'HDR', 'RAW'], c: 1, e: 'Sai pronto e previsível nas redes.' }
      ]
    },
    {
      id: 'apps-camera', modulo: 'm3', nivel: 'intermediário', min: 7, tags: ['config'], prereq: ['config-video'],
      quando: p => p.foco !== 'foto',
      titulo: 'Câmera nativa x Blackmagic Camera',
      corpo: p => `
${F.fluxoApp(p)}
<h3>Câmera nativa</h3>
<p>Rápida, confiável e com a melhor estabilização${p.iphone ? ' (modo Ação) e modo Cinematográfico' : ''}. O automático é bom, mas pode mudar exposição, foco e cor no meio do take.</p>
<h3>Blackmagic Camera (grátis)</h3>
<p>Controle manual completo: ISO, obturador, balanço de branco, foco, codec e taxa de dados. Ferramentas de profissional: <b>zebra</b> (mostra o que estourou), <b>falsa cor</b>, <b>focus peaking</b>, histograma e LUT de visualização — a próxima aula ensina a usar cada uma.</p>
<h3>Configuração-base sugerida (Blackmagic)</h3>
${tabela(['Item', 'Para redes (rápido)', 'Para cor (Log)'], [
        ['Resolução', '4K', '4K'],
        ['fps / obturador', '30 / 1/60 (180°)', '24–30 / 180°'],
        ['Codec', 'HEVC, taxa Alta', p.prores ? 'ProRes 422 LT ou HEVC Máx' : 'HEVC Máx'],
        ['Espaço de cor', 'Rec.709', p.log2 ? 'Apple Log 2' : (p.log ? 'Apple Log' : 'Log (se tiver)')],
        ['WB', 'Travado (ex.: 5600K)', 'Travado'],
      ])}
${dica('<p>Salve esses dois conjuntos como <b>presets</b> no Blackmagic Camera e alterne em segundos.</p>')}`,
      resumo: ['Nativa = agilidade e estabilização.', 'Blackmagic = controle manual e ferramentas pro.', 'Trave WB, ISO e obturador em takes planejados.', 'Crie presets “Redes” e “Log”.'],
      missao: 'Crie no Blackmagic Camera os presets “Redes” e “Log” da tabela e grave 10 s com cada um.',
      quiz: p => [
        { q: 'Para que serve a zebra?', o: ['Mostrar áreas estouradas', 'Estabilizar', 'Mudar a cor', 'Gravar áudio'], c: 0, e: 'Ela listra as áreas acima de um nível de brilho.' },
        { q: 'Num story espontâneo, qual app é mais prático?', o: ['Blackmagic Camera', 'Câmera nativa', 'DaVinci Resolve', 'Lightroom'], c: 1, e: 'Abre rápido e o automático resolve.' },
        { q: 'Focus peaking ajuda a…', o: ['Ver o que está em foco', 'Reduzir o ruído', 'Medir o áudio', 'Mudar o codec'], c: 0, e: 'Ele destaca as bordas nítidas.' }
      ]
    },
    {
      id: 'medir-exposicao', modulo: 'm3', nivel: 'intermediário', min: 10, tags: ['config', 'luz'], prereq: ['exposicao', 'apps-camera'],
      quando: p => p.foco !== 'foto',
      titulo: 'Histograma, zebra e falsa cor',
      corpo: p => `
<p>A tela do celular mente: ela muda de brilho, reflete o sol e, em Log, mostra uma imagem cinza. Para saber se a exposição está certa, use as <b>ferramentas de medição</b> — elas leem o sinal de verdade.</p>
<h3>1. Histograma</h3>
${F.histograma()}
<p>É um gráfico de quantos pixels existem em cada nível de brilho: sombras à esquerda, altas luzes à direita. O que importa são as <b>pontas</b>: dados “colados” na parede direita = estouro; colados na esquerda = preto sem detalhe. Um pico alto e fino perto da direita (parede branca no sol, céu) é sinal de alerta.</p>
<h3>2. Zebra</h3>
${F.zebra()}
<p>A zebra desenha listras por cima de tudo que passou de um nível de brilho que você escolhe. É o jeito mais rápido de ver <b>onde</b> está estourando, não só <b>se</b> está.</p>
${tabela(['Nível da zebra', 'Para quê'], [
        ['100%', 'Avisa o que estourou de vez — o padrão mais seguro'],
        ['90–95%', 'Avisa um pouco antes de estourar'],
        ['~70%', 'Conferir pele em Rec.709 (listras leves na testa/bochecha = pele bem exposta)']
      ])}
${dica('<p>Regra prática: zebra em 100%. Se listrar o rosto ou o assunto, escureça. Se listrar só um reflexo pequeno ou o sol, tudo bem.</p>')}
<h3>3. Falsa cor</h3>
${F.falsaCor()}
<p>A falsa cor troca a imagem por um mapa de cores conforme o brilho. Ela é ótima em <b>Log</b>, porque não depende de como a imagem “parece” na tela. Procure: rosto no rosa ou um pouco acima, nada importante em amarelo/vermelho, sombras sem roxo.</p>
<h3>Quando está estourando: o que fazer</h3>
${F.fluxoEstouro(p)}
${p.abertVar ? seu(`<p>Caso real no <b>${p.celular}</b> com Blackmagic: Apple Log, ISO 55, íris f/4, obturador 1/60 travado, sol do meio-dia — e a parede ainda estoura. Os passos 1 e 2 já estão no limite (ISO mínimo e íris mais fechada). Restam: <b>filtro ND</b> (mantém o 1/60), obturador mais rápido (1/120–1/250) ou trocar para Rec.709.</p>`) :
          seu(`<p>No <b>${p.celular}</b> a abertura é fixa: depois de chegar ao ISO mínimo, as saídas são <b>filtro ND</b> para celular, obturador mais rápido ou mudar a luz (sombra, horário).</p>`)}
<h3>Onde ativar</h3>
<ul><li><b>Blackmagic Camera:</b> histograma, zebra e falsa cor ficam nas ferramentas de monitoramento do app. Ligue zebra em 100% e deixe o histograma sempre visível.</li>
<li><b>Câmera nativa${p.abertVar ? ' (18 Pro)' : ''}:</b> ${p.abertVar ? 'o histograma está nos controles Pro; não há zebra nem falsa cor.' : 'não tem zebra nem falsa cor — use o Blackmagic quando a exposição importar.'}</li></ul>
${p.log ? atencao('<p>Em Log, a imagem cinza e “lavada” é normal. Não julgue pelo olho: confie na zebra/falsa cor. Ligar uma LUT de visualização ajuda a enxergar, mas não muda o arquivo.</p>') : ''}`,
      resumo: ['A tela engana; histograma, zebra e falsa cor medem de verdade.', 'Histograma: cuidado com dados colados na direita.', 'Zebra 100%: listras no assunto = escureça.', 'Falsa cor: pele no rosa, nada importante em vermelho.', 'Estourou com ISO mínimo: ND, obturador mais rápido ou outra luz.'],
      missao: 'No Blackmagic Camera, ligue zebra em 100% e falsa cor. Grave uma cena ao sol e outra na sombra; ajuste até a zebra sumir do assunto principal.',
      quiz: p => [
        { q: 'Num histograma, dados colados na borda direita significam…', o: ['Imagem escura', 'Altas luzes estouradas', 'Cor errada', 'Foco errado'], c: 1, e: 'A direita representa o brilho máximo.' },
        { q: 'O que a zebra mostra?', o: ['Áreas fora de foco', 'Áreas acima do nível de brilho escolhido', 'O balanço de branco', 'Tremidas'], c: 1, e: 'Ela listra o que passou do limite.' },
        { q: 'Na falsa cor, a área vermelha indica…', o: ['Pele', 'Sombra', 'Estouro', 'Cinza médio'], c: 2, e: 'Vermelho = altas luzes estouradas.' },
        { q: 'ISO já no mínimo e ainda estoura, mantendo 1/60. Qual a melhor solução?', o: ['Subir o ISO', 'Filtro ND', 'Mais fps', 'Tirar a LUT'], c: 1, e: 'O ND tira luz sem mudar o obturador.' },
        { q: 'Por que não confiar só na tela quando grava em Log?', o: ['Porque a imagem parece cinza mesmo bem exposta', 'Porque o Log grava sem cor', 'Porque a zebra não funciona em Log', 'Porque o histograma some'], c: 0, e: 'O Log é plano de propósito; meça com as ferramentas.' }
      ]
    },
    {
      id: 'movimento', modulo: 'm3', nivel: 'intermediário', min: 8, tags: ['estabilidade', 'ideias'], prereq: ['composicao'],
      quando: p => p.foco !== 'foto',
      titulo: 'Movimentos de câmera e estabilização',
      corpo: p => `
${F.movimentos()}
<h3>Regras de ouro</h3>
<ul><li>Um movimento por take, com intenção (revelar, acompanhar, aproximar).</li>
<li>Segure 1–2 s parado no começo e no fim — facilita o corte.</li>
<li>Ande com joelhos flexionados e passos curtos (“passo ninja”).</li>
<li>Prefira a lente 1x ou 0,5x para movimento: as teles tremem mais.</li></ul>
${p.gimbal ? seu(`<p>Com o <b>${p.gimbalNome}</b>: use o modo <b>Follow</b> (padrão) para caminhadas, <b>Tilt Lock/Pan Follow</b> para movimentos horizontais e o rastreamento de assunto para acompanhar pessoas. Calibre e balanceie o celular antes de cada sessão.${p.gimbalNome.includes('Mobile') ? ' Desligue a estabilização máxima do app ao usar gimbal para evitar “flutuações” estranhas.' : ''}</p>`) :
          seu(`<p>Sem gimbal: use a estabilização do celular${p.iphone ? ' (modo Ação para corrida)' : ''}, segure com as duas mãos e cotovelos colados no corpo, ou apoie em algo fixo. Um gimbal é o acessório que mais melhora movimento.</p>`)}
${dica('<p>Movimento + parallax = cinema: passe perto de um objeto em primeiro plano (folha, pilastra) enquanto se move.</p>')}`,
      resumo: ['Um movimento por take, com começo e fim parados.', 'Passo ninja e lentes mais abertas.', 'Gimbal: Follow para andar, rastreamento para pessoas.', 'Primeiro plano em movimento cria parallax.'],
      missao: 'Grave os 6 movimentos da figura, cada um com 5 s, e monte uma sequência de 30 s.',
      quiz: p => [
        { q: 'O que fazer no início e no fim de cada movimento?', o: ['Acelerar', 'Segurar 1–2 s parado', 'Trocar de lente', 'Mudar o fps'], c: 1, e: 'Dá pontos limpos para o corte.' },
        { q: 'Qual lente treme menos durante o movimento?', o: ['Teleobjetiva', 'Ultra-angular / 1x', 'Zoom digital 10x', 'Todas iguais'], c: 1, e: 'Lentes mais abertas disfarçam a tremedeira.' },
        { q: 'Órbita é…', o: ['Girar a câmera no lugar', 'Circular ao redor do assunto', 'Subir a câmera', 'Aproximar em linha reta'], c: 1, e: 'A câmera dá a volta mantendo o assunto no quadro.' }
      ]
    },
    {
      id: 'audio', modulo: 'm3', nivel: 'intermediário', min: 6, tags: ['audio'], prereq: ['config-video'],
      quando: p => p.foco !== 'foto',
      titulo: 'Áudio: metade do vídeo',
      corpo: p => `
<p>As pessoas perdoam imagem mediana, mas abandonam áudio ruim. Se tem fala, áudio é prioridade.</p>
<ul><li><b>Distância:</b> o microfone deve estar perto da boca (palmo e meio).</li>
<li><b>Ambiente:</b> evite cômodos vazios com eco; cortinas, sofá e roupas ajudam.</li>
<li><b>Vento:</b> use o “gatinho” (espuma/pelúcia) do microfone ao ar livre.</li>
<li><b>Nível:</b> o pico da voz deve ficar perto de −12 dB, sem bater no vermelho.</li></ul>
${p.mic ? seu('<p>Com seu microfone sem fio: prenda o transmissor no peito, a uma mão da boca, escondido da câmera se possível. Grave também o áudio interno do transmissor (se tiver) como backup.</p>') :
          seu('<p>Sem microfone: grave a fala com o celular perto da pessoa (pode ser um segundo celular gravando só o áudio) e sincronize na edição. Um microfone sem fio de lapela é o melhor investimento para quem grava falas.</p>')}
${dica('<p>Grave 10 s de “silêncio” do ambiente. Ele serve para tapar buracos na edição.</p>')}`,
      resumo: ['Microfone perto da boca.', 'Evite eco e vento.', 'Pico da voz em torno de −12 dB.', 'Grave som ambiente para a edição.'],
      missao: 'Grave a mesma frase com o microfone a 20 cm e a 2 m. Ouça com fone e compare.',
      quiz: p => [
        { q: 'O que mais melhora a qualidade da voz?', o: ['Mais resolução', 'Microfone perto da boca', 'Mais fps', 'Filtro ND'], c: 1, e: 'A distância é o fator principal.' },
        { q: 'Num cômodo vazio com eco, o que ajuda?', o: ['Superfícies macias (cortina, sofá)', 'Gravar em 60 fps', 'Aumentar o volume', 'Usar HDR'], c: 0, e: 'Materiais macios absorvem reflexões.' },
        { q: 'Onde deve ficar o pico da voz?', o: ['Em 0 dB', 'Perto de −12 dB', 'Em −40 dB', 'Não importa'], c: 1, e: 'Dá margem para risadas e gritos sem distorcer.' }
      ]
    },

    /* ───────────── M4 DRONE ───────────── */
    {
      id: 'drone-regras', modulo: 'm4', nivel: 'básico', min: 8, tags: ['config'],
      quando: p => !!p.drone,
      titulo: 'Drone: regras e checklist de segurança',
      corpo: p => `
<p>Antes de qualquer plano bonito: voo legal e seguro. Em 2026 as regras brasileiras mudaram e ficaram mais rígidas.</p>
${tabela(['Órgão', 'O que cuida'], [
        ['ANAC', 'Cadastro do drone (SISANT) e regras de operação (RBAC nº 100, em vigor desde 16/06/2026)'],
        ['DECEA', 'Autorização de voo no SARPAS (ICA 100-40, em vigor desde 01/07/2026)'],
        ['Anatel', 'Homologação do rádio do drone']
      ])}
${atencao(`<p>Desde 1º de julho de 2026 a ICA 100-40 do DECEA passou a exigir autorização no SARPAS também para drones abaixo de 250 g${p.drone && /Neo|Mini/.test(p.drone) ? ' — isso inclui o seu ' + p.droneNome : ''}. E para pedir autorização o drone precisa estar cadastrado no SISANT. As regras estão em mudança: confira sempre o site da ANAC e do DECEA antes de voar, principalmente para trabalhos pagos.</p>`)}
<h3>Checklist pré-voo</h3>
<ol><li>Cadastro SISANT ativo e autorização SARPAS para o local/horário.</li>
<li>Clima: vento, chuva, previsão.</li>
<li>Local: longe de aeroportos/helipontos, sem sobrevoar pessoas que não participam.</li>
<li>Baterias carregadas, hélices sem trincas, lente e filtro limpos.</li>
<li>Cartão de memória com espaço; firmware e app atualizados.</li>
<li>Ponto de retorno (RTH) gravado e altura de retorno acima dos obstáculos.</li>
<li>Drone sempre à vista (linha de visada).</li></ol>
${dica('<p>Praia e mar: cuidado com vento na orla, maresia (limpe o drone depois) e reflexo da água, que confunde sensores de altura.</p>')}`,
      resumo: ['ANAC (SISANT), DECEA (SARPAS) e Anatel.', 'Desde 07/2026, SARPAS também para drones abaixo de 250 g.', 'Checklist antes de toda decolagem.', 'Sempre na linha de visada, longe de pessoas e aeroportos.'],
      missao: 'Confira se seu drone está no SISANT, crie/acesse sua conta no SARPAS e simule uma solicitação para um local onde você costuma voar.',
      quiz: p => [
        { q: 'Qual órgão autoriza o voo no espaço aéreo (SARPAS)?', o: ['Anatel', 'DECEA', 'Detran', 'Receita Federal'], c: 1, e: 'O DECEA controla o espaço aéreo.' },
        { q: 'Desde julho de 2026, drones abaixo de 250 g…', o: ['Estão livres de qualquer regra', 'Também precisam de autorização no SARPAS', 'Só voam à noite', 'Precisam de placa'], c: 1, e: 'A nova ICA 100-40 acabou com a exceção.' },
        { q: 'O cadastro do drone é feito em qual sistema?', o: ['SARPAS', 'SISANT (ANAC)', 'Detran', 'Anatel'], c: 1, e: 'SISANT é o cadastro da ANAC.' }
      ]
    },
    {
      id: 'drone-filtros', modulo: 'm4', nivel: 'intermediário', min: 9, tags: ['config', 'luz'], prereq: ['drone-regras', 'config-video'],
      quando: p => !!p.drone,
      titulo: 'Configurações e filtros ND/CPL no drone',
      corpo: p => `
<p>O drone segue as mesmas regras de vídeo do curso: 4K, fps definido e obturador em 180°. O problema: lá em cima quase sempre tem sol forte — e a câmera do drone tem abertura fixa. É aí que entram os filtros.</p>
${F.nd()}
${tabela(['Situação', 'Filtro sugerido'], [
        ['Nublado / fim de tarde', 'Sem filtro ou ND8'],
        ['Sol suave, manhã', 'ND16'],
        ['Sol forte, praia, meio-dia', 'ND32 (ou ND64)'],
        ['Água, vidros, céu mais azul', 'CPL (polarizador)']
      ])}
<h3>CPL (polarizador)</h3>
<p>Corta reflexos da água e de vidros e satura o céu. O efeito é mais forte a 90° do sol. Cuidado: num movimento de órbita o efeito muda e o céu pode “manchar”.</p>
${p.filtros.length ? seu(`<p>Você tem <b>${p.filtros.join(', ')}</b>${p.drone ? ` para o ${p.droneNome}` : ''}. ${p.filtros.includes('ND16') && p.filtros.includes('ND32') ? 'Regra prática: ND16 de manhã e fim de tarde; ND32 do meio da manhã ao meio da tarde, ou na praia.' : 'Use a tabela acima e anote o que funcionou em cada local.'}</p>`) :
          seu('<p>Você ainda não tem filtros. Um kit ND8/16/32 + CPL é o acessório que mais melhora o vídeo aéreo.</p>')}
<h3>Ajustes</h3>
<ul><li>Modo <b>Pro/Manual</b>: ISO mínimo, obturador 1/60 (30 fps), WB fixo.</li>
<li>Se a imagem ficar escura demais, troque para um ND mais fraco — não suba o ISO.</li>
<li>Foto: filtro desnecessário na maioria das vezes (exceto CPL).</li></ul>`,
      resumo: ['Sol forte + abertura fixa = obturador alto demais.', 'ND reduz luz para manter 1/60 a 30 fps.', 'ND16 luz moderada; ND32 sol forte/praia.', 'CPL corta reflexo e satura o céu; cuidado em órbitas.'],
      missao: 'Num dia de sol, grave o mesmo trajeto sem filtro e com ND32 a 30 fps/1/60. Compare a fluidez.',
      quiz: p => [
        { q: 'Para que serve um filtro ND no drone?', o: ['Aumentar a nitidez', 'Reduzir a luz para usar obturador mais lento', 'Esquentar as cores', 'Aumentar o alcance'], c: 1, e: 'Permite respeitar a regra dos 180° em luz forte.' },
        { q: 'Praia, meio-dia, 30 fps. Qual filtro faz mais sentido?', o: ['Sem filtro', 'ND8', 'ND32', 'Nenhum, use ISO alto'], c: 2, e: 'Luz muito forte pede ND mais escuro.' },
        { q: 'O filtro CPL é útil para…', o: ['Cortar reflexos da água e saturar o céu', 'Gravar à noite', 'Câmera lenta', 'Reduzir o vento'], c: 0, e: 'É um polarizador.' },
        { q: 'Se a imagem ficou escura com o ND, o que fazer?', o: ['Subir o ISO ao máximo', 'Usar um ND mais fraco', 'Mudar para 120 fps', 'Desligar o WB'], c: 1, e: 'Mantenha ISO baixo e ajuste a luz com o filtro.' }
      ]
    },
    {
      id: 'drone-planos', modulo: 'm4', nivel: 'intermediário', min: 8, tags: ['ideias', 'composicao'], prereq: ['drone-filtros', 'movimento'],
      quando: p => !!p.drone,
      titulo: 'Planos cinematográficos de drone',
      corpo: p => `
${F.dronePlanos()}
<h3>Os planos que mais vendem</h3>
<ul><li><b>Reveal:</b> começa num obstáculo (árvore, prédio) e revela o lugar.</li>
<li><b>Dronie:</b> afasta e sobe a partir de uma pessoa — ótimo para abertura ou fechamento.</li>
<li><b>Top-down:</b> câmera a 90° para baixo; padrões, piscinas, ondas.</li>
<li><b>Órbita:</b> volta ao redor de um ponto de interesse.</li>
<li><b>Tracking:</b> acompanha carro, barco ou pessoa de lado ou por trás.</li>
<li><b>Rise com tilt down:</b> sobe enquanto inclina a câmera para baixo, mantendo o assunto.</li></ul>
${p.drone && /Neo/.test(p.drone) ? seu(`<p>O <b>${p.droneNome}</b> tem modos automáticos (QuickShots como Dronie, Círculo, Hélice e Foguete) que executam esses planos sozinhos. Use-os para aprender a trajetória e depois tente reproduzir no manual para ter mais controle de velocidade.</p>`) : seu('<p>Use os modos inteligentes (QuickShots/MasterShots) para aprender as trajetórias e depois reproduza no manual com movimentos mais lentos.</p>')}
<h3>Para o vertical</h3>
<p>${p.drone && /Neo 2|Mini 4|Mini 5|Air 3|Mavic 4/.test(p.drone) ? 'Se seu drone grava na vertical nativamente, use isso para Reels.' : 'Se o drone não gira a câmera para vertical, grave em 4K horizontal e recorte 9:16 na edição — planejando o assunto no centro.'} Top-down e rise funcionam muito bem no vertical.</p>
${dica('<p>Lento e constante sempre parece mais caro. Diminua a sensibilidade/velocidade dos sticks no modo Cine.</p>')}`,
      resumo: ['Reveal, dronie, top-down, órbita, tracking, rise.', 'Modos automáticos ensinam trajetórias.', 'Para vertical: planeje o recorte 9:16.', 'Lento e constante = cinematográfico.'],
      missao: 'Planeje 5 planos para um local de Rio das Ostras (ou da sua cidade), voe e monte um vídeo de 15 s.',
      quiz: p => [
        { q: 'Qual plano começa atrás de um obstáculo e mostra o local?', o: ['Top-down', 'Reveal', 'Dronie', 'Tracking'], c: 1, e: 'Revelar cria curiosidade.' },
        { q: 'No top-down, a câmera fica…', o: ['Apontada para o horizonte', 'Apontada 90° para baixo', 'Girando ao redor', 'Para trás'], c: 1, e: 'Vista de cima, perpendicular ao chão.' },
        { q: 'O que deixa os planos de drone mais cinematográficos?', o: ['Movimentos rápidos e bruscos', 'Movimentos lentos e constantes', 'Zoom digital', 'ISO alto'], c: 1, e: 'Suavidade transmite produção cara.' }
      ]
    },

    /* ───────────── M5 EDIÇÃO E REDES ───────────── */
    {
      id: 'edicao-video', modulo: 'm5', nivel: 'intermediário', min: 10, tags: ['edicao'], prereq: ['config-video'],
      quando: p => p.foco !== 'foto',
      titulo: p => `Edição de vídeo no ${p.editor}`,
      corpo: p => `
<h3>Fluxo de edição</h3>
<ol><li><b>Organize</b>: separe os melhores takes antes de abrir o editor.</li>
<li><b>Estrutura</b>: gancho (0–3 s) → conteúdo → fechamento/chamada.</li>
<li><b>Cortes no ritmo</b>: corte na batida da música ou no fim de uma frase; tire respirações e silêncios.</li>
<li><b>Cor</b>: ${p.log ? 'LUT de conversão nos clipes Log, depois ajuste de exposição e WB, ' : ''}consistência entre clipes.</li>
<li><b>Texto e legendas</b>: legenda automática revisada; texto na área segura.</li>
<li><b>Áudio</b>: voz clara, música abaixo da voz (cerca de −20 a −25 dB).</li>
<li><b>Exportação</b>.</li></ol>
<h3>Exportação para Reels/TikTok</h3>
${tabela(['Item', 'Valor'], [['Resolução', '1080×1920 (9:16)'], ['fps', 'Igual ao da gravação (30 ou 24)'], ['Taxa de bits', 'Alta / recomendada'], ['Codec', 'H.264 ou HEVC']])}
${p.editor === 'CapCut' ? seu('<p>No CapCut: Proporção 9:16 → importe → use “Legendas automáticas” e revise → em Ajustar, importe sua LUT .cube se gravou em Log → Exportar com 1080p, taxa de quadros igual à gravação e taxa de bits alta.</p>') :
          p.editor === 'DaVinci Resolve' ? seu('<p>No DaVinci Resolve: Project Settings em 1080×1920; na aba Color use um nó para a conversão (Color Space Transform ou LUT) e outro para o look; exporte em H.264/H.265 com qualidade alta.</p>') :
            seu(`<p>No ${p.editor}: configure o projeto em 9:16 desde o início e mantenha o fps da gravação na exportação.</p>`)}
${dica('<p>Postar em 4K não ajuda: as redes reduzem tudo. 1080×1920 com bitrate alto é o ideal.</p>')}`,
      resumo: ['Gancho → conteúdo → fechamento.', 'Corte no ritmo e tire silêncios.', 'Legendas revisadas na área segura.', 'Exporte 1080×1920, fps da gravação, bitrate alto.'],
      missao: 'Edite um vídeo de 20–30 s com gancho, legendas e música, e exporte nas configurações da tabela.',
      quiz: p => [
        { q: 'Qual resolução exportar para Reels/TikTok?', o: ['720×1280', '1080×1920', '3840×2160 horizontal', '1080×1080'], c: 1, e: 'Vertical Full HD é o padrão das plataformas.' },
        { q: 'O fps da exportação deve ser…', o: ['Sempre 60', 'Igual ao da gravação', 'Sempre 24', 'O menor possível'], c: 1, e: 'Mudar o fps cria trepidação.' },
        { q: 'Onde a música deve ficar em relação à voz?', o: ['Mais alta que a voz', 'Bem abaixo da voz', 'No mesmo volume', 'Sem música'], c: 1, e: 'A voz precisa ser entendida.' }
      ]
    },
    {
      id: 'redes', modulo: 'm5', nivel: 'intermediário', min: 9, tags: ['ideias'], prereq: ['composicao'],
      titulo: 'Conteúdo para Instagram e TikTok',
      corpo: p => `
${F.safeZones()}
<h3>Os 3 primeiros segundos</h3>
<p>O gancho decide se a pessoa fica. Funciona: começar no meio da ação, mostrar o resultado final antes, uma pergunta direta ou um texto curto com promessa (“3 ajustes que mudam seus vídeos”).</p>
<h3>Formatos que funcionam</h3>
<ul><li><b>Antes e depois</b> (edição, cor, ambiente).</li>
<li><b>Bastidores</b> (como foi feito o take).</li>
<li><b>Tutorial rápido</b> (1 dica por vídeo).</li>
<li><b>Lista</b> (“5 lugares para…”).</li>
<li><b>Carrossel</b> de fotos 3:4 com história.</li></ul>
<h3>Rotina</h3>
<ul><li>Constância vale mais que quantidade: escolha uma frequência que você aguenta.</li>
<li>Grave em lote: um dia de captação rende vários posts.</li>
<li>Responda comentários e transforme perguntas em novos vídeos.</li>
<li>Olhe retenção e salvamentos, não só curtidas.</li></ul>
${p.plataformas.includes('TikTok') && p.plataformas.includes('Instagram') ? seu('<p>Você posta nas duas redes: publique sem marca d’água (exporte o arquivo original do editor, não baixe de uma rede para postar na outra).</p>') : ''}
${p.objetivos.includes('seguidores') ? dica('<p>Para crescer, feche cada vídeo com um motivo para seguir: “parte 2 amanhã”, “sigo testando — acompanha”.</p>') : ''}`,
      resumo: ['Gancho nos 3 primeiros segundos.', 'Texto e rosto dentro da área segura.', 'Formatos: antes/depois, bastidores, tutorial, lista.', 'Constância, gravação em lote e métricas de retenção.'],
      missao: 'Escreva 5 ganchos diferentes para o mesmo vídeo e grave as 5 aberturas. Poste a melhor.',
      quiz: p => [
        { q: 'Onde colocar textos importantes no Reels?', o: ['No rodapé', 'Na área segura central', 'No canto direito', 'No topo'], c: 1, e: 'Rodapé, topo e direita ficam cobertos pela interface.' },
        { q: 'O que define se a pessoa continua assistindo?', o: ['A hashtag', 'O gancho dos primeiros segundos', 'O filtro', 'O horário'], c: 1, e: 'O início decide a retenção.' },
        { q: 'Postar o vídeo baixado do TikTok no Instagram é ruim porque…', o: ['Fica com marca d’água e mais compressão', 'Fica em 4K', 'Perde o áudio sempre', 'Muda para horizontal'], c: 0, e: 'Exporte o original do editor.' }
      ]
    },

    /* ───────────── M6 NEGÓCIO ───────────── */
    {
      id: 'clientes', modulo: 'm6', nivel: 'avançado', min: 9, tags: ['ideias'], prereq: ['redes', 'edicao-video'],
      quando: p => p.objetivos.includes('clientes'),
      titulo: 'Captação para clientes',
      corpo: p => `
<h3>Antes</h3>
<ul><li><b>Briefing</b>: objetivo do vídeo, público, onde vai ser postado, referências.</li>
<li><b>Roteiro e shot list</b>: lista de planos (abertura, detalhes, pessoas, ambiente, fechamento).</li>
<li><b>Logística</b>: horário pela luz (golden hour?), autorização de drone, baterias, cartões.</li></ul>
<h3>Durante</h3>
<ul><li>Grave cada plano 2–3 vezes, com variações (aberto, médio, detalhe).</li>
<li>Pegue material extra (“B-roll”): mãos, texturas, ambiente.</li>
<li>Grave vertical e, se o cliente usar site/YouTube, também horizontal${p.drone ? ' (ou 4K para recorte)' : ''}.</li></ul>
<h3>Depois</h3>
<ul><li>Backup em dois lugares no mesmo dia.</li>
<li>Entregue no formato combinado (1080×1920, legendas, versões de 15 e 30 s).</li>
<li>Peça autorização para usar no seu portfólio.</li></ul>
${dica('<p>Shot list padrão para comércio local: fachada (drone/reveal), ambiente, produto em detalhe, pessoa usando, equipe, fechamento com logo. Dá para gravar tudo em 1 h.</p>')}`,
      resumo: ['Briefing e shot list antes de gravar.', 'Cada plano em 2–3 versões + B-roll.', 'Backup duplo no mesmo dia.', 'Entrega no formato combinado.'],
      missao: 'Monte uma shot list de 10 planos para um comércio da sua cidade e grave um vídeo-teste de 30 s.',
      quiz: p => [
        { q: 'O que é B-roll?', o: ['Áudio extra', 'Imagens de apoio (detalhes, ambiente)', 'Segundo drone', 'Legenda'], c: 1, e: 'Material para cobrir cortes e enriquecer a edição.' },
        { q: 'Quando fazer o backup do material?', o: ['No fim do mês', 'No mesmo dia, em dois lugares', 'Só após a entrega', 'Não precisa'], c: 1, e: 'Cartão perdido = trabalho perdido.' },
        { q: 'O que deve vir antes da gravação?', o: ['Exportação', 'Briefing e shot list', 'Legendas', 'Color grading'], c: 1, e: 'Planejamento evita retrabalho.' }
      ]
    }
  ];

  window.CURSO = { MODULOS, AULAS };
})();
