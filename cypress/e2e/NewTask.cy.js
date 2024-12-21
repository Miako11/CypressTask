describe('Register User', () => {
    let userData; 

    before(() => {
      cy.fixture('user').then((data) => {
        userData = data;
      });
    });
  
    it('should register a new user successfully', () => {
      cy.visit('/');
      cy.get('body').should('contain', 'Home');
      cy.contains('Signup / Login').click();
      cy.get('h2').contains('New User Signup!').should('be.visible');
      cy.get('input[name="name"]').type(userData.name);
      cy.get('[data-qa="signup-email"]').type(userData.email); 
      cy.get('button[type="submit"]').contains('Signup').click();
      cy.contains('Enter Account Information').should('be.visible');
      cy.get('input[value="Mrs"]').check();
      cy.get('input[name="password"]').type(userData.password); 
      cy.get('select[name="days"]').select(userData.dob.day); 
      cy.get('select[name="months"]').select(userData.dob.month); 
      cy.get('select[name="years"]').select(userData.dob.year); 
      cy.get('input#newsletter').check();
      cy.get('input#optin').check(); 
      cy.get('input[name="first_name"]').type(userData.address.first_name);
      cy.get('input[name="last_name"]').type(userData.address.last_name);
      cy.get('input[name="company"]').type(userData.address.company);
      cy.get('input[name="address1"]').type(userData.address.address1);
      cy.get('input[name="address2"]').type(userData.address.address2);
      cy.get('select[name="country"]').select(userData.address.country);
      cy.get('input[name="state"]').type(userData.address.state);
      cy.get('input[name="city"]').type(userData.address.city);
      cy.get('input[name="zipcode"]').type(userData.address.zipcode);
      cy.get('input[name="mobile_number"]').type(userData.address.mobile_number);
      cy.get('button[type="submit"]').contains('Create Account').click();
      cy.contains('Account Created!').should('be.visible');
      cy.contains('Continue').click();
      cy.contains(`Logged in as ${userData.name}`).should('be.visible');
    });
});

describe('Login User with correct email and password', () => {

    beforeEach(() => {
        cy.visit('/'); 
    });
  
    it('Signup/Login and Verify Login', () => {
      cy.fixture('user').then((userData) => {
        cy.get('a[href="/login"]').click();
        cy.get('h2').should('contain', 'Login to your account');
        cy.get('[data-qa="login-email"]').type(userData.email);
        cy.get('input[name="password"]').type(userData.password);
        cy.get('[data-qa="login-button"]').click();
        cy.contains(`Logged in as ${userData.name}`).should('be.visible');
        cy.get('a[href="/delete_account"]').click();
        cy.get('h2').should('contain', 'Account Deleted!');
      });
    });
});
  
describe('Login User with incorrect email and password', () => {

    beforeEach(() => {
        cy.visit('/'); 
    });

    it('should be error for incorrect email and password', () => {
        cy.fixture('user').then((userData) => {
    
            cy.get('a[href="/login"]').click();
            cy.get('[data-qa="login-email"]').type(userData.wemail); 
            cy.get('input[name="password"]').type(userData.wname);
            cy.get('[data-qa="login-button"]').click();
            cy.get('.login-form > form > p').should('be.visible').and('contain', 'Your email or password is incorrect!');
        });
    });

});
