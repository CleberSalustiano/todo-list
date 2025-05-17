describe("Todo App", () => {
  beforeEach(() => {
    // Visita a página inicial antes de cada teste
    cy.visit("/")

    // Aguarda o carregamento inicial das tarefas (simulado)
    cy.get('[data-cy="task-list"]', { timeout: 5000 }).should("be.visible")
  })

  it("deve exibir a lista de tarefas", () => {
    cy.get('[data-cy="task-item"]').should("have.length.at.least", 1)
  })

  it("deve adicionar uma nova tarefa", () => {
    // Preenche o formulário
    cy.get('[data-cy="task-title-input"]').type("Nova tarefa de teste")
    cy.get('[data-cy="task-description-input"]').type("Descrição da tarefa de teste")
    cy.get('[data-cy="add-task-button"]').click()

    // Verifica se a tarefa foi adicionada à lista
    cy.get('[data-cy="task-item"]').should("contain", "Nova tarefa de teste")
  })

  it("deve marcar uma tarefa como concluída", () => {
    // Encontra a primeira tarefa não concluída e marca como concluída
    cy.get('[data-cy="task-item"]').find('[data-cy="task-checkbox"]').not("[checked]").first().click()

    // Verifica se a tarefa foi marcada como concluída (tem a classe line-through)
    cy.get('[data-cy="task-item"]').find('[data-cy="task-title"].line-through').should("exist")
  })

  it("deve excluir uma tarefa", () => {
    // Armazena o número inicial de tarefas
    cy.get('[data-cy="task-item"]').then(($items) => {
      const initialCount = $items.length

      // Encontra o botão de excluir da primeira tarefa e clica nele
      cy.get('[data-cy="delete-task-button"]').first().click()

      // Confirma na modal
      cy.get('[data-cy="confirm-modal-confirm"]').click()

      // Verifica se a tarefa foi removida da lista
      cy.get('[data-cy="task-item"]').should("have.length", initialCount - 1)
    })
  })

  it("deve cancelar a exclusão de uma tarefa", () => {
    // Armazena o número inicial de tarefas
    cy.get('[data-cy="task-item"]').then(($items) => {
      const initialCount = $items.length

      // Encontra o botão de excluir da primeira tarefa e clica nele
      cy.get('[data-cy="delete-task-button"]').first().click()

      // Cancela na modal
      cy.get('[data-cy="confirm-modal-cancel"]').click()

      // Verifica se o número de tarefas permanece o mesmo
      cy.get('[data-cy="task-item"]').should("have.length", initialCount)
    })
  })

  it("deve validar o formulário ao tentar adicionar uma tarefa sem título", () => {
    // Tenta enviar o formulário sem preencher o título
    cy.get('[data-cy="add-task-button"]').click()

    // Verifica se a mensagem de erro é exibida
    cy.contains("O título da tarefa é obrigatório").should("be.visible")
  })

  it("deve filtrar tarefas pendentes", () => {
    // Clica na aba de tarefas pendentes
    cy.get('[data-cy="tab-pending"]').click()

    // Verifica se todas as tarefas exibidas não estão concluídas
    cy.get('[data-cy="task-item"]').each(($item) => {
      cy.wrap($item).find('[data-cy="task-checkbox"]').should("not.be.checked")
    })
  })

  it("deve filtrar tarefas concluídas", () => {
    // Clica na aba de tarefas concluídas
    cy.get('[data-cy="tab-completed"]').click()

    // Verifica se todas as tarefas exibidas estão concluídas
    cy.get('[data-cy="task-item"]').each(($item) => {
      cy.wrap($item).find('[data-cy="task-checkbox"]').should("be.checked")
    })
  })
})
