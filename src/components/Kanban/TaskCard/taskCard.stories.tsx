import type { Meta, StoryObj } from "@storybook/react";
import TaskCard from ".";
import moment from "moment";

const meta: Meta<typeof TaskCard> = {
  title: "Components/Kanban/TaskCard",
  component: TaskCard,
};

export default meta;

type Story = StoryObj<typeof TaskCard>;

export const Last10Days: Story = {
  args: {
    task: {
      title: "Pesquisa de Mercado",
      description:
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
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
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
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
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
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
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
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
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
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
        "Criar um protótipo funcional e detalhado da nova funcionalidade inovadora do produto para uma apresentação impactante...",
      dueDate: moment().subtract(10, "days"),
      responsible: ["Enzo"],
      columnId: 1,
      id: 12738,
    },
  },
};
