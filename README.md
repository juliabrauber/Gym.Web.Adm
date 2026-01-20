# PayCenter

> **Este projeto foi desenvolvido no início dos meus estudos em Angular.**
>
> Ele serviu como base para aprender conceitos fundamentais do framework, organização de módulos, rotas, componentes, serviços, diretivas e integração com bibliotecas de terceiros.

## Sobre o projeto

O PayCenter é uma aplicação web construída em Angular, com foco em gestão de pagamentos e usuários. O projeto possui as seguintes principais funcionalidades e estruturas:

- **Autenticação de usuário**
- **Dashboard** com informações resumidas
- **Gestão de pagamentos** (cartão, link, etc.)
- **Componentes reutilizáveis** (ex: bandeira de cartão)
- **Diretivas e pipes customizados**
- **Integração com bibliotecas como ng-zorro-antd, ng2-charts, ngx-mask**
- **Estrutura modularizada** (layout, pages, shared, etc.)

## Estrutura principal

- `src/app/pages/` — Páginas principais (dashboard, user, payment, error, not-found)
- `src/app/layout/` — Componentes de layout (header, menu)
- `src/app/shared/` — Módulos, componentes, pipes, diretivas e modelos compartilhados
- `src/assets/` — Imagens e recursos estáticos

## Como executar

1. **Pré-requisitos:**
   - Node.js (versão recomendada: 16.x ou superior)
   - Angular CLI instalado globalmente (`npm install -g @angular/cli`)
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   Acesse [http://localhost:4200](http://localhost:4200) no navegador.

## Scripts úteis

- `npm start` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm test` — Executa os testes unitários
- `npm run e2e` — Executa os testes end-to-end

## Observações

- Este projeto foi feito para fins de aprendizado e pode conter práticas e padrões de código que evoluíram ao longo do tempo.
- Sinta-se à vontade para explorar e utilizar como base para seus próprios estudos!

---

Gerado com [Angular CLI](https://github.com/angular/angular-cli).
