# 🌻 Feliz Aniversário — Página Especial

Uma página web romântica criada para celebrar um aniversário especial, com player de vídeo do YouTube totalmente customizado, galeria de fotos com lightbox e música de fundo.

---

## ✨ Funcionalidades

- **Player de vídeo YouTube customizado** — controles que somem automaticamente e reaparecem ao tocar na tela
- **Galeria de fotos** — lightbox com miniaturas, navegação por setas, swipe e teclado
- **Música de fundo** — toca automaticamente ao abrir a galeria e para ao fechar
- **Design retrató (9:16)** — player otimizado para vídeos gravados no celular
- **Galeria em tela cheia** — ocupa toda a tela no mobile como um app nativo
- **Animações suaves** — transições de fade e slide em todos os modais

---

## 📁 Estrutura de arquivos

```
/
├── index.html          ← página principal
├── estilo.css          ← estilos e layout
├── script.js           ← lógica do player, galeria e música
│
├── img/
│   └── girassois.jpg.png   ← imagem de fundo da página
│
├── fotos/
│   ├── foto1.jpg
│   ├── foto2.jpg
│   └── ...             ← até foto20.jpg (ou mais)
│
└── musica/
    └── musica.mp3          ← música da galeria de fotos
```

> O vídeo é carregado diretamente do **YouTube** via API IFrame — não ocupa espaço no repositório.

---

## 🎬 Vídeo no YouTube

O vídeo é hospedado no YouTube e exibido com um player 100% customizado (sem os controles padrão do YouTube).

### Como trocar o vídeo

1. Faça upload do vídeo em [studio.youtube.com](https://studio.youtube.com)
2. Em **Visibilidade**, escolha **Não listado** — só quem tiver o link consegue ver
3. Após o processamento, copie o link no formato:
   ```
   https://youtu.be/SEU_ID_AQUI
   ```
4. Abra o `script.js` e substitua o ID na primeira linha:
   ```js
   const YT_VIDEO_ID = 'SEU_ID_AQUI';
   ```

> O ID é a parte que vem após a `/` no link curto do YouTube.

### Configurações recomendadas para upload

| Configuração | Valor ideal |
|---|---|
| Resolução | 1080p (1920×1080) |
| Formato | `.mp4` |
| Codec de vídeo | H.264 |
| Taxa de bits | VBR (variável) |
| Orientação | Retrato (9:16) para vídeos de celular |

---

## 🎮 Controles do player de vídeo

| Ação | Como fazer |
|---|---|
| Mostrar controles | Tocar/clicar na tela |
| Esconder controles | Automático após 3 segundos |
| Play / Pause | Tocar no botão central ou tecla `Espaço` |
| Avançar/voltar | Arrastar a barra de progresso |
| Mudo | Botão de som na barra inferior |
| Tela cheia | Botão de fullscreen na barra inferior |
| Fechar | Botão ✕ ou tecla `Esc` |

---

## 🚀 Como usar localmente

Basta abrir o arquivo `index.html` diretamente no navegador. Não é necessário instalar nada.

> **Atenção:** alguns navegadores bloqueiam o carregamento de arquivos locais (imagens, áudio) por restrições de segurança. Se isso ocorrer, use a extensão **Live Server** no VS Code.

---

## 🌐 Publicando online (GitHub Pages)

1. Crie um repositório **público** em [github.com](https://github.com)
2. Faça upload de todos os arquivos e pastas
3. Vá em **Settings → Pages → Branch: main → / (root) → Save**
4. Aguarde ~1 minuto — o site estará disponível em:
   ```
   https://seu-usuario.github.io/nome-do-repositorio
   ```

> O vídeo **não precisa** ser enviado para o GitHub — ele vem do YouTube automaticamente.

---

## ⚙️ Personalização

### Trocar as fotos

Coloque os arquivos na pasta `fotos/` e atualize a lista no `script.js`:

```js
const PHOTOS = [
  'fotos/foto1.jpg',
  'fotos/foto2.jpg',
  // adicione ou remova fotos aqui
];
```

### Trocar a música

Substitua o arquivo em `musica/musica.mp3` ou atualize o `src` no `index.html`:

```html
<audio id="bg-music" loop src="musica/sua-musica.mp3"></audio>
```

### Trocar o fundo

Substitua a imagem em `img/girassois.jpg.png` ou atualize o `estilo.css`:

```css
background-image: url('img/sua-imagem.jpg');
```

### Trocar os textos

Edite as tags `<h1>`, `<h2>` e `<p>` no `index.html`:

```html
<h1>Feliz Aniversario Amor ❤️</h1>
<h2>O dia é todo seu ❤️</h2>
<p>Clique para assistir a um video especial ou ver as fotos</p>
```

### Ajustar o tempo para esconder os controles

No `script.js`, localize e altere o valor em milissegundos (padrão: 3000 = 3 segundos):

```js
controlsTimer = setTimeout(() => { ... }, 3000);
```

---

## 🎹 Atalhos de teclado

| Tecla | Ação |
|---|---|
| `Espaço` | Play / Pause no vídeo |
| `←` `→` | Navegar entre fotos |
| `Esc` | Fechar modal ativo |

---

## 🛠️ Tecnologias utilizadas

- HTML5, CSS3 e JavaScript puro (sem frameworks)
- Google Fonts — Playfair Display e Lato
- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) — player customizado sem controles nativos
- API nativa de `<audio>` do navegador

---

## 📝 Licença

Projeto pessoal — livre para uso e adaptação.
