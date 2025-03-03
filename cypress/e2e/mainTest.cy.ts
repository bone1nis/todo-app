describe('main test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/todo-app');
  });

  const checkItemsLeft = (count) => {
    cy.contains(`${count} items left`).should("exist");
  };

  it('task creation, filtering, and completion', () => {
    cy.get('label:contains("Add Task")').parent().find('input').type("Завершенная задача");
    cy.contains('button', 'Add').click();

    cy.get('label:contains("Add Task")').parent().find('input').clear().type("Активная задача");
    cy.contains('button', 'Add').click();

    cy.get('[data-testid="task-item"]').should("have.length", 2);
    checkItemsLeft(2);

    cy.get('[data-testid="task-item"]')
      .first()
      .find('input[type="checkbox"]')
      .click();
    cy.get('[data-testid="task-item"]')
      .first()
      .find('input[type="checkbox"]')
      .should('be.checked');

    checkItemsLeft(1);

    cy.contains("button", "All").click();
    cy.get('[data-testid="task-item"]').should("have.length", 2);
    checkItemsLeft(1);

    cy.contains("button", "Active").click();
    cy.get('[data-testid="task-item"]')
      .should("have.length", 1)
      .first()
      .should("have.text", "Активная задача");
    checkItemsLeft(1);

    cy.contains("button", "Completed").click();
    cy.get('[data-testid="task-item"]')
      .should("have.length", 1)
      .first()
      .should("have.text", "Завершенная задача");
    checkItemsLeft(1);

    cy.contains('button', 'Clear completed').click();
    cy.get('[data-testid="task-item"]')
      .should("have.length", 0)
    checkItemsLeft(1);

    cy.contains("button", "Active").click();
    cy.get('[data-testid="task-item"]')
      .should("have.length", 1)
      .first()
      .should("have.text", "Активная задача");
    checkItemsLeft(1);

    cy.contains("button", "All").click();
    checkItemsLeft(1);

    cy.get('[data-testid="task-item"]')
      .first()
      .find('input[type="checkbox"]')
      .click();
    cy.get('[data-testid="task-item"]')
      .first()
      .find('input[type="checkbox"]')
      .should('be.checked');
    checkItemsLeft(0);

    cy.contains('button', 'Clear completed').click();
    cy.get('[data-testid="task-item"]')
      .should("have.length", 0)
    checkItemsLeft(0);
  });
});