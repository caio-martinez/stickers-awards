# Stickers Awards 🏆

Uma aplicação web premium para apresentação de premiação de figurinhas, com design inspirado no Oscar, Grammy e The Game Awards.

## 🎨 Características

- **Design Premium**: Tema preto e dourado com efeitos de glassmorfismo
- **Animações Suaves**: Transições elegantes entre telas
- **Carregamento Dinâmico**: Categorias e nominadas carregadas automaticamente das pastas
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## 📁 Estrutura de Pastas

Organize suas figurinhas da seguinte forma:

```
stickers-awards/
├── categories/
│   ├── Melhor Figurinha Engraçada/
│   │   ├── gato surpreso.gif
│   │   ├── cachorro rindo.png
│   │   └── meme stonks.jpg
│   ├── Figurinha Mais Fofa/
│   │   ├── gatinho dormindo.gif
│   │   └── ursinho panda.png
│   └── Melhor Reação/
│       ├── surprised pikachu.png
│       └── facepalm.gif
├── index.html
├── styles.css
├── script.js
├── server.js
└── package.json
```

**Importante:**
- Cada pasta dentro de `categories/` representa uma categoria
- O nome da pasta é o título da categoria
- As imagens dentro da pasta são as nominadas
- O nome do arquivo (sem extensão) é a legenda da figurinha
- Formatos suportados: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Organizar suas Figurinhas

Crie a pasta `categories` e adicione suas categorias e figurinhas conforme a estrutura acima.

### 3. Iniciar o Servidor

```bash
npm start
```

### 4. Abrir no Navegador

Acesse: http://localhost:3000

## 🎯 Como Funciona

1. **Tela de Nominadas**: Mostra todas as figurinhas nominadas para a categoria atual
2. **Seleção**: Clique em uma figurinha para escolhê-la como vencedora
3. **Tela de Vencedora**: Exibe a figurinha vencedora ampliada com animação
4. **Próxima Categoria**: Clique no botão para avançar para a próxima categoria
5. **Tela Final**: Após todas as categorias, mostra uma tela de conclusão

## 🎨 Personalização

### Alterar Cores

Edite as variáveis CSS em `styles.css`:

```css
:root {
    --color-gold: #d4af37;
    --color-gold-light: #f4d03f;
    --color-gold-dark: #b8941e;
}
```

### Alterar Porta do Servidor

Edite `server.js`:

```javascript
const PORT = 3000; // Altere para a porta desejada
```

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js + Express
- **Fontes**: Google Fonts (Playfair Display, Inter)

## 📝 Dicas

- Use GIFs animados para figurinhas mais dinâmicas
- Mantenha os nomes dos arquivos descritivos e curtos
- Recomendado: 5-6 nominadas por categoria para melhor visualização
- As imagens são redimensionadas automaticamente para caber nos cards

## 🎭 Créditos

Design inspirado em premiações de prestígio como Oscar, Grammy e The Game Awards.

---

Desenvolvido com ❤️ para celebrar as melhores figurinhas!
