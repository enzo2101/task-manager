# 📝 Kanban de Tarefas - Teste Técnico | Recrutei

Este é um projeto desenvolvido para o processo seletivo de Desenvolvedor(a) Front-End Pleno da Recrutei. O desafio consistia em criar uma aplicação de gestão de tarefas no formato **Kanban**, com funcionalidades de **drag and drop**, **criação de tarefas**, e **integração com API externa**.

---

## 🚀 Tecnologias utilizadas

- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [React Query](https://tanstack.com/query/latest)
- [@dnd-kit](https://docs.dndkit.com/) (drag and drop)
- [Moment.js](https://momentjs.com/)
- [Radix UI](https://www.radix-ui.com/) (modais, popovers)
- [Storybook (opcional)](https://storybook.js.org/)

---

## 💻 Funcionalidades

- ✅ Quadro Kanban com 4 colunas: **Ideias**, **A fazer**, **Fazendo**, **Feito**
- ✅ Scroll horizontal em telas menores
- ✅ Arrastar e soltar tarefas entre colunas (drag and drop)
- ✅ Modal para criar nova tarefa com formulário validado:
  - Título
  - Descrição
  - Responsável
  - Data limite
- ✅ Validação campo a campo com feedback visual
- ✅ Criação dinâmica de cards no Kanban
- ✅ Modal de visualização dos detalhes da tarefa com dados vindos da [API externa](https://api.npoint.io/21c80c25ed65b6f3484f)
- ✅ Feedback visual do status da tarefa:
  - Faltam X dias
  - Atrasado há X dias

---

## 🧠 Organização do projeto

- `components/`: Componentes visuais (TaskCard, Modal, Header, etc.)
- `contexts/TasksContext.tsx`: Gerencia o estado global das tarefas
- `hooks/useStartTasks.ts`: Hook de integração com API
- `lib/`: Helpers, enums e utilitários
- `App.tsx`: Estrutura principal da aplicação
- `Kanban.tsx`: Componente que gerencia o board e a lógica de drag and drop

---

## 🔗 Protótipo no Figma

[🔗 Acesse aqui](https://www.figma.com/design/Kew8NFFejpS37e18Q4BwRP/Teste-frontend?node-id=0-1)

---

## ▶️ Como rodar localmente

1. pnpm install || yarn install || npm install
