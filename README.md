# Frontend simples de CRUD de funcionários com Angular

Este projeto é uma aplicação frontend básica desenvolvida em Angular. Ele foi projetado para se integrar a uma API de CRUD criada em C# ([veja aqui](https://github.com/Rezende-Fabio/employee-management-api)) e serve como um exemplo para aprender os fundamentos do desenvolvimento frontend com Angular.

## Funcionalidades

- Exibir uma lista de funcionários.
- Adicionar novos funcionários.
- Editar funcionários existentes.
- Remover funcionários.
- Integração com a API backend via HTTP.

## Tecnologias Utilizadas

- **Angular 19**
- **TypeScript**
- **Bootstrap** (para estilização)
- **Angular Material** (para estilização e Ícones)

## Pré-requisitos

- Node.js instalado ([Baixar aqui](https://nodejs.org/))
- Angular CLI instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```

## Começando

### Clonar o Repositório

```bash
git clone https://github.com/Rezende-Fabio/employee-management-web.git
cd employee-management-web
```

### Instalar Dependências

```bash
npm install
```

### Executar o Servidor de Desenvolvimento

```bash
ng serve
```

O frontend estará disponível em `http://localhost:4200`.

## Configuração da API Backend

Certifique-se de que o projeto backend em C# esteja em execução e acessível. Por padrão, a aplicação Angular utiliza o endpoint `http://localhost:5052`. Se for necessário alterar este endpoint, edite o arquivo `environment.ts`:

```typescript
export const environment = {
  apiUrl: 'http://localhost:5052'
};
```

## Objetivos de Aprendizado

- Compreender a estrutura de um projeto Angular.
- Aprender a criar componentes reutilizáveis.
- Usar o Angular para consumir APIs RESTful.
- Implementar roteamento básico no Angular.