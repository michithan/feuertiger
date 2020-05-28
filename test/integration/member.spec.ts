describe('Member Page', () => {
    it('login', () => {
        cy.visit('/member');
        cy.login();
        cy.wait(1000);
        cy.get('#add-member-button').click();
    });
});
