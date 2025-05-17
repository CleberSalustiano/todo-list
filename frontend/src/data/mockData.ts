import { Task } from "../types/Task"

// Dados mockados para iniciar a aplicação
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Estudar React",
    description: "Aprender sobre hooks e componentes funcionais",
    completed: false,
    createdAt: "2023-06-15T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Fazer compras",
    description: "Comprar frutas, legumes e pão",
    completed: true,
    createdAt: "2023-06-14T15:30:00.000Z",
  },
  {
    id: "3",
    title: "Ler livro",
    description: "Terminar de ler o capítulo 5",
    completed: false,
    createdAt: "2023-06-13T20:15:00.000Z",
  },
  {
    id: "4",
    title: "Fazer exercícios",
    description: "30 minutos de caminhada",
    completed: false,
    createdAt: "2023-06-12T08:45:00.000Z",
  },
]
