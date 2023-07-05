// https://docs.cypress.io/guides/end-to-end-testing/working-with-graphql
describe("Probando graphql", () => {
    it("Query with graphql", () => {
        const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
            pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
                url
                name
                image
            }
            }
        }`;
        const gqlVariables = {
            limit: 20,
            offset: 0,
        };
        cy.request({
            method: "POST",
            url: "https://graphql-pokeapi.graphcdn.app/",
            body: {
                query: gqlQuery,
                variables: gqlVariables,
            },
        }).then((response) => {
            expect(response.body.data.pokemons.results[0].name).to.equal(
                "bulbasaur"
            );
        });
    });
});
