# Guia Interativo de Revisão Sistemática

Recurso educacional interativo para apoiar o ensino de revisão sistemática,
com módulos, laboratórios práticos, glossário e referências.

Todo o conteúdo funciona **100% no navegador**: é um site estático, sem banco
de dados e sem servidor próprio. Isso torna a publicação no **GitHub Pages**
simples e gratuita.

> **⚠️ Privacidade dos dados:** todo o progresso dos estudantes (módulos
> visitados, laboratórios completados, respostas dos exercícios) fica salvo
> **apenas no navegador** de quem usa o site (localStorage). **Nada é enviado
> a servidores** — os dados não saem do computador ou celular de quem estuda.

---

## 📋 Passo a passo para publicar no GitHub Pages

Você vai precisar de:

- Uma conta no [GitHub](https://github.com) (gratuita).
- O **Git** instalado no seu computador ([baixe aqui](https://git-scm.com/downloads)).

### 1. Baixar (ou copiar) o código do projeto para o seu computador

- No Skip, baixe o código do projeto (botão de download/exportar o projeto).
- Descompacte o arquivo ZIP em uma pasta do seu computador, por exemplo
  `C:\Users\voce\guia-revisao` (Windows) ou `~/guia-revisao` (Mac/Linux).
- **Importante:** a pasta precisa conter o arquivo `index.html`, a pasta `src/`
  e o arquivo `package.json` na raiz. Se dentro da pasta descompactada houver
  *outra* pasta com o nome do projeto, use essa pasta de dentro.

### 2. Criar o repositório no GitHub

1. Acesse [github.com/new](https://github.com/new) estando logada.
2. Em **Repository name**, escolha um nome — por exemplo `guia-revisao-sistematica`.
   Esse nome aparecerá no endereço do site.
3. Mantenha o repositório como **Public** (necessário para o Pages gratuito).
4. **Não** marque as opções de criar README, .gitignore ou licença
   (o projeto já tem os arquivos dele).
5. Clique em **Create repository**.

### 3. Enviar o código para o GitHub

No computador, abra o **Terminal** (Mac/Linux) ou o **PowerShell** (Windows),
entre na pasta do projeto e execute os comandos abaixo — um por vez.
Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub e
`guia-revisao-sistematica` pelo nome do repositório que você criou:

```bash
# entre na pasta do projeto
cd caminho/ate/guia-revisao

# transforma a pasta em um repositório Git
git init

# marca a branch principal como "main" (nome exigido pelo workflow)
git branch -M main

# prepara todos os arquivos do projeto
git add .

# salva a primeira versão no histórico
git commit -m "Primeira versão do Guia de Revisão Sistemática"

# conecta com o repositório criado no GitHub
git remote add origin https://github.com/SEU-USUARIO/guia-revisao-sistematica.git

# envia o código
git push -u origin main
```

O GitHub vai pedir seu login (pode pedir para criar um *token* — siga as
instruções que aparecerem na tela).

> Sempre que atualizar o projeto depois, basta repetir três comandos:
> `git add .` → `git commit -m "descrição da mudança"` → `git push`.

### 4. Ativar o GitHub Pages

O projeto já vem com um arquivo pronto de automação
(`.github/workflows/deploy-pages.yml`) que **compila e publica o site
automaticamente a cada envio** para a branch `main`. Você só precisa ativar:

1. No seu repositório no GitHub, abra **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** → **Source**, escolha **GitHub Actions**.
4. Pronto! Na primeira vez (e a cada novo `push`), a aba **Actions** do
   repositório vai rodar a publicação automaticamente (leva alguns minutos).

> Opcional: o Node.js e o npm já são instalados automaticamente pelo workflow
> — você **não** precisa instalar nada no seu computador além do Git para
> publicar. (Se quiser testar o site localmente antes, aí sim você precisa do
> [Node.js 20+](https://nodejs.org): rode `npm install` e depois `npm run dev`.)

### 5. Onde o site ficará disponível

Após o workflow terminar (aba **Actions** com o ✅ verde), o site estará no
endereço:

```
https://SEU-USUARIO.github.io/nome-do-repositorio/
```

Por exemplo: `https://maria-silva.github.io/guia-revisao-sistematica/`

Esse endereço também aparece em **Settings → Pages**, no topo da página.

- **Compartilhe com a turma:** basta enviar esse link — funciona em qualquer
  navegador, no computador ou no celular.
- **Cada página tem seu próprio link** no formato
  `.../#/laboratorios`, `.../#/glossario` etc. — dá para linkar direto uma
  atividade específica (o `#` faz parte do formato e é o que garante que
  atualizar a página nunca dê erro 404).
- **Atualizações:** sempre que você enviar novas versões com `git push`, o
  site é atualizado sozinho em poucos minutos.

---

## 🛠️ Para desenvolvedores (opcional)

- **Stack:** React 19 + Vite + TypeScript + Tailwind CSS + shadcn/ui.
- **Roteamento:** `HashRouter` (react-router-dom) — escolhido para funcionar
  em hospedagem 100% estática, sem configuração no servidor.
- **Build:** `npm run build` gera a pasta `dist/` com caminhos relativos
  (`base: './'` no Vite), permitindo hospedar em qualquer subcaminho.
- **Preview local do build:** `npm run build` e depois `npm run preview`.

## 📁 Estrutura do Projeto

```
.
├── .github/workflows/   # Automação de publicação (GitHub Pages)
├── src/                 # Código fonte da aplicação
├── public/              # Arquivos estáticos (ícones, imagens)
├── dist/                # Build de produção (gerado, não versionar)
└── package.json         # Dependências e scripts
```
