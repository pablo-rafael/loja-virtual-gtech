# Loja Virtual (React + PrimeReact + Axios)

Aplicação simples de loja virtual que consome a [Fake Store API](https://fakestoreapi.com),
mostra os produtos em cards do PrimeReact e permite adicionar novos produtos.

## Como rodar
```bash
npm install
npm run dev
```
Acesse o endereço mostrado no terminal (normalmente http://localhost:5173).

## O que foi feito
| Requisito | Onde |
|---|---|
| PrimeReact, PrimeIcons, PrimeFlex e Axios instalados | `package.json` e imports em `src/main.jsx` |
| Consumo da Fake Store API com Axios | `src/services/api.js` |
| `ProductList` busca os produtos e exibe os cards | `src/components/ProductList.jsx` |
| `ProductCard` recebe o produto via props e usa o `Card` do PrimeReact | `src/components/ProductCard.jsx` |
| Formulário para adicionar produtos à lista | `src/components/ProductForm.jsx` |
| Layout responsivo com PrimeFlex (`grid`, `col-12 sm:col-6 lg:col-4 xl:col-3`, `flex`, espaçamentos) | `ProductList.jsx`, `ProductForm.jsx`, `App.jsx` |

Extras: indicador de carregamento, mensagem de erro com "Tentar novamente", validação do formulário e avisos com `Toast`.

## Observações
- A Fake Store API simula o `POST /products`, mas **não salva** o produto. Por isso o novo produto é incluído na lista da tela (e some ao recarregar a página).
- O projeto usa Vite em vez de create-react-app, que foi descontinuado. O código da pasta `src` é o mesmo nos dois.
