describe("Probando request", () => {
    it("Debe de crear un empleado", () => {
        //Debemos de pasar la propiedad failOnStatusCode
        cy.request({
            url: "employees",
            method: "POST",
            body: {
                first_name: "Prueba",
                last_name: "Desarrollador",
                email: "aa@cc.com",
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("id");
            // Guardar el id del empleado
            const id = response.body.id;
            cy.wrap(id).as("id");
        });
    });
    it("Debemos validar que se haya creado en la BD", () => {
        cy.request("GET", "employees").then((response) => {
            expect(response.body[response.body.length - 1].first_name).to.eq(
                "Prueba"
            );
        });
    });
    it("Debemos de modificar al empleado con un nuevo correo", function () {
        // primer manera de hacerlo
        // cy.request("GET", "employees").then((response) => {
        //   //validate that the last record was created
        //   const lastEmployeeId = response.body[response.body.length - 1].id;
        //   cy.request({
        //     url: `employees/${lastEmployeeId}`,
        //     method: "PUT",
        //     body: {
        //       first_name: "Pepito",
        //       last_name: "Desarrollador",
        //       email: "nuevo@correo.com",
        //     },
        //   }).then((response) => {
        //     cy.log(response);
        //     expect(response.status).to.eq(200);
        //     expect(response.body).to.have.property("id");
        //   });
        // });
        cy.request({
            url: `employees/${this.id}`,
            method: "PUT",
            body: {
                first_name: "Pepito 3",
                last_name: "Desarrollador",
                email: "nuevo@correo.com",
            },
        }).then((response) => {
            cy.log(response);
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id");
        });
    });

    it("Debemos de eliminar el registro creado", function () {
        cy.request({
            url: `employees/${this.id}`,
            method: "DELETE",
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});
