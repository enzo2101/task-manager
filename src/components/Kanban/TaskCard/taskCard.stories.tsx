import type { Meta, StoryObj } from "@storybook/react";
import TaskCard from ".";
import moment from "moment";

const meta: Meta<typeof TaskCard> = {
  title: "Components/Kanban/TaskCard",
  component: TaskCard,
  decorators: [
    (Story) => {
      return <div className="w-96">{Story()}</div>;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof TaskCard>;

export const Last10Days: Story = {
  args: {
    task: {
      title: "Pesquisa de Mercado",
      description:
        "Criar um protótipo funcional da nova funcionalidade do produto para apresentação aos stakeholders é uma tarefa crucial que requer atenção aos detalhes e uma execução precisa. O protótipo deve incluir todas as funcionalidades essenciais que demonstram claramente o valor agregado e a inovação que a nova funcionalidade traz para o produto. Além disso, é importante que o protótipo seja intuitivo e fácil de entender, permitindo que os stakeholders visualizem como a funcionalidade será integrada no produto final. A apresentação deve ser bem estruturada, destacando os principais benefícios e mostrando exemplos práticos de uso. A preparação adequada e a prática da apresentação também são essenciais para garantir que todas as perguntas dos stakeholders sejam respondidas de maneira eficaz. Este processo não só facilita a compreensão da nova funcionalidade, mas também ajuda a obter o feedback necessário para ajustes e melhorias antes do lançamento oficial.",
      dueDate: moment().add(10, "days"),
      responsible: ["Enzo"],
      columnId: 1,
      id: 12738,
    },
  },
};

export const Last5Days: Story = {
  args: {
    task: {
      title: "Pesquisa de Mercado",
      description:
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante",
      dueDate: moment().add(5, "days"),
      responsible: ["Enzo"],
      columnId: 1,
      id: 12738,
    },
  },
};

export const Last1Days: Story = {
  args: {
    task: {
      title: "Pesquisa de Mercado",
      description:
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante",
      dueDate: moment().add(1, "days"),
      responsible: ["Enzo"],
      columnId: 1,
      id: 12738,
    },
  },
};

export const Late1Days: Story = {
  args: {
    task: {
      title: "Pesquisa de Mercado",
      description:
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante",
      dueDate: moment().subtract(1, "days"),
      responsible: ["Enzo"],
      columnId: 1,
      id: 12738,
    },
  },
};

export const Late5Days: Story = {
  args: {
    task: {
      title: "Pesquisa de Mercado",
      description:
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante",
      dueDate: moment().subtract(5, "days"),
      responsible: ["Enzo"],
      columnId: 1,
      id: 12738,
    },
  },
};

export const Late10Days: Story = {
  args: {
    task: {
      title: "Pesquisa de Mercado",
      description:
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante",
      dueDate: moment().subtract(10, "days"),
      responsible: ["Enzo"],
      columnId: 1,
      id: 12738,
    },
  },
};
