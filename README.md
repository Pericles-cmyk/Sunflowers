# 🌻 Feliz Aniversário — Página Especial

Uma página web romântica criada para celebrar um aniversário especial, com vídeo hospedado no Google Drive, galeria de fotos com lightbox e música de fundo.

---

## ✨ Funcionalidades

- **Vídeo especial** — modal estilo Netflix com player do Google Drive embutido
- **Galeria de fotos** — lightbox com miniaturas, navegação por setas e teclado
- **Música de fundo** — toca automaticamente ao abrir a galeria e para ao fechar
- **Design responsivo** — funciona em celular e desktop
- **Animações suaves** — transições de fade e slide em todos os modais

---

## 📁 Estrutura de arquivos

```
/
├── index.html          ← página principal
├── estilo.css          ← estilos e layout
├── script.js           ← lógica de modais, galeria e música
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

> O vídeo **não fica mais em uma pasta local**. Ele é carregado diretamente do Google Drive via `<iframe>`.

---

## 🎬 Vídeo no Google Drive

O vídeo é hospedado no Google Drive e exibido através de um `<iframe>` com o player nativo do Drive.

### Como trocar o vídeo

1. Faça upload do novo vídeo no [Google Drive](https://drive.google.com)
2. Clique com o botão direito → **Compartilhar** → mude o acesso para **"Qualquer pessoa com o link"**
3. Copie o link — ele terá este formato:
   ```
   https://drive.google.com/file/d/SEU_ID_AQUI/view?usp=drive_link
   ```
4. Copie apenas o ID (a parte entre `/d/` e `/view`)
5. Abra o `script.js` e substitua o ID na constante do topo do arquivo:
   ```js
   const DRIVE_VIDEO_URL = 'https://drive.google.com/file/d/SEU_ID_AQUI/preview';
   ```

> ⚠️ O vídeo **deve estar compartilhado publicamente**, caso contrário o iframe exibirá uma tela de erro para os visitantes.

---

## 🚀 Como usar localmente

Basta abrir o arquivo `index.html` diretamente no navegador. Não é necessário instalar nada.

> **Atenção:** alguns navegadores bloqueiam o carregamento de arquivos locais (imagens, áudio) por restrições de segurança. Se isso ocorrer, use uma extensão como **Live Server** no VS Code, ou publique o projeto online.

---

## 🌐 Publicando online (GitHub Pages)

1. Crie um repositório **público** em [github.com](https://github.com)
2. Faça upload de todos os arquivos e pastas
3. Vá em **Settings → Pages → Branch: main → / (root) → Save**
4. Aguarde ~1 minuto — o site estará disponível em:
   ```
   https://seu-usuario.github.io/nome-do-repositorio
   ```

> O vídeo **não precisa** ser enviado para o GitHub — ele continua vindo do Google Drive automaticamente.

---

## ⚙️ Personalização

### Trocar as fotos

Coloque os arquivos na pasta `fotos/` com os nomes `foto1.jpg`, `foto2.jpg`, etc., e atualize a lista no início de `script.js`:

```js
const PHOTOS = [
  'fotos/foto1.jpg',
  'fotos/foto2.jpg',
  // adicione ou remova fotos aqui
];
```

### Trocar a música

Substitua o arquivo em `musica/musica.mp3` ou atualize o atributo `src` da tag `<audio>` no `index.html`:

```html
<audio id="bg-music" loop src="musica/sua-musica.mp3"></audio>
```

### Trocar o fundo

Substitua a imagem em `img/girassois.jpg.png` ou atualize a propriedade no `estilo.css`:

```css
background-image: url('img/sua-imagem.jpg');
```

### Trocar os textos

Edite diretamente as tags `<h1>`, `<h2>` e `<p>` no `index.html`:

```html
<h1>Feliz Aniversario Amor ❤️</h1>
<h2>O dia é todo seu ❤️</h2>
<p>Clique para assistir a um video especial ou ver as fotos</p>
```

---

## 🎹 Controles de teclado

| Tecla | Ação |
|-------|------|
| `←` `→` | Navegar entre fotos na galeria |
| `Esc` | Fechar modal ativo |

---

## 🛠️ Tecnologias utilizadas

- HTML5, CSS3 e JavaScript puro (sem frameworks)
- Google Fonts — [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) e [Lato](https://fonts.google.com/specimen/Lato)
- Google Drive como hospedagem de vídeo via `<iframe>`
- API nativa de `<audio>` do navegador

---

## 📝 Licença

Projeto pessoal — livre para uso e adaptação.
