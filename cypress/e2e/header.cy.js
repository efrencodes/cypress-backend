describe("Probando headers", () => {
    it("Validar el header y el content type", () => {
        cy.request("/employees")
            .its("headers")
            .its("content-type")
            .should("include", "application/json");
    });
    it("Validando el status correcto", () => {
        cy.request("/employees").its("status").should("eq", 200);
    });
    it("Validando el status incorrecto", () => {
        cy.request({ url: "/employees/12", failOnStatusCode: false })
            .its("status")
            .should("eq", 404);
    });
});
