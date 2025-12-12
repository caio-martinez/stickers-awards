# Stickers Awards - Guia de Deploy no GitHub Pages

## 🚀 Como Publicar no GitHub Pages

### Passo 1: Configurar suas Categorias

Edite o arquivo `config.js` e adicione suas categorias e figurinhas:

```javascript
const categoriesConfig = [
    {
        name: "Nome da Categoria",
        nominees: [
            {
                caption: "Legenda da Figurinha",
                path: "categories/Nome da Categoria/arquivo.png"
            }
        ]
    }
];
```

### Passo 2: Organizar as Imagens

Coloque suas imagens na estrutura de pastas:
```
categories/
├── Nome da Categoria/
│   └── arquivo.png
```

### Passo 3: Fazer Commit e Push

```bash
git add .
git commit -m "Update stickers"
git push
```

### Passo 4: Ativar GitHub Pages

1. Vá em **Settings** > **Pages**
2. Em **Source**, selecione **main** branch
3. Clique em **Save**
4. Aguarde alguns minutos e acesse: `https://seu-usuario.github.io/stickers-awards/`

## 📝 Importante

- O GitHub Pages **não executa Node.js**
- A aplicação usa o arquivo `config.js` quando hospedada no GitHub Pages
- Para desenvolvimento local, você ainda pode usar `npm start` para carregar dinamicamente das pastas
- Sempre atualize o `config.js` quando adicionar novas figurinhas para o GitHub Pages

## 🔄 Diferenças entre Local e GitHub Pages

| Recurso | Local (npm start) | GitHub Pages |
|---------|-------------------|--------------|
| Carregamento | Dinâmico (pastas) | Estático (config.js) |
| Servidor | Node.js necessário | Não necessário |
| Atualização | Automática | Manual (editar config.js) |
