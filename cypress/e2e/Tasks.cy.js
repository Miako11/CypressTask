describe('Verify Subscription in Home Page', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com');
  });
  it('should verify subscription', () => {
    
    //Scroll down to footer
    cy.scrollTo('bottom');

    // Verify text 'SUBSCRIPTION' contains-ით არ გამოვიდა
    cy.get('.single-widget > h2').should('be.visible');

    // Enter email address in input and 
    const email = 'marriemari0@gmail.com';
    cy.get('#susbscribe_email').type(email);

    // click arrow button
    cy.get('#subscribe').click();

    // Verify success message 'You have been successfully subscribed!' is visible
    cy.get('.alert-success').should('be.visible').and('contain.text', 'You have been successfully subscribed!');
  });
});


describe('Add Products in Cart', () => {
  it('should add products to the cart', () => {
    cy.visit('http://automationexercise.com');
    //Already verified home page

    // Click 'Products' button
    cy.contains('Products').click();

    // Hover over the first product and click 'Add to cart'
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo').first().trigger('mouseover').within(() => {
      cy.contains("Add to cart").click();
    })

    // Click 'Continue Shopping' button
    cy.get('.modal-footer > .btn').contains('Continue Shopping').click();

    // Hover over the second product and click 'Add to cart'
    cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo').trigger('mouseover').within(() => {
      cy.contains('Add to cart').click();
    });


    // Click 'View Cart' button
    cy.contains('View Cart').click();

    // Verify both products are added to the cart
    cy.get('.cart_info tbody tr').should('exist'); 

    // Verify their prices, quantity, and total price
    cy.get('#cart_info').should('exist').within(() => {
      cy.get('#product-1').should('contain', 'Rs. 500'); 
      cy.get('#product-1 > .cart_quantity').should('have.value',''); // value 1 was disabled, და გამოვიყენე '' 
      cy.get('#product-1 > .cart_total > .cart_total_price').should('contain', 'Rs. 500'); 
    });

    cy.get('#cart_info').should('exist').within(() => {
      cy.get('#product-2').should('contain', 'Rs. 400'); 
      cy.get('#product-1 > .cart_quantity').should('have.value', ''); 
      cy.get('#product-2 > .cart_total > .cart_total_price').should('contain', 'Rs. 400');

    });
  });
});



describe('Place Order - Login before Checkout', () => {
  it('should place order after logging in', () => {
  
    cy.visit('http://automationexercise.com');

    // Click 'Signup / Login' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();

    // Fill email, password and click 'Login' button
    cy.get('[data-qa="login-email"]').type('marriemari0@gmail.com'); 
    cy.get('[data-qa="login-password"]').type('marriemari0'); 
    cy.get('[data-qa="login-button"]').click();

    // Verify 'Logged in as username' at top
    cy.get('.shop-menu > .nav').should('contain', 'Logged in as Marrie'); 

    // Add products to cart
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo').first().trigger('mouseover').within(() => {
      cy.contains("Add to cart").click();
    })

    // Add a second product
    cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo').trigger('mouseover').within(() => {
      cy.contains('Add to cart').click();
    });
  

    // Click 'Cart' button
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();

    // Verify that cart page is displayed
    cy.url().should('include', '/view_cart');
    cy.get('.cart_info').should('be.visible');

    // Click Proceed To Checkout
    cy.get('.col-sm-6 > .btn').click();

    // Verify Address Details and Review Your Order
    cy.get('#cart_items > .container').should('contain', 'Address Details');
    cy.get('#cart_items > .container').should('contain', 'Review Your Order');

    // Enter description in comment text area and click 'Place Order'
    cy.get('.form-control').type('Hello');
    cy.get(':nth-child(7) > .btn').click();

    // Enter payment details
    cy.get('[data-qa="name-on-card"]').type('Marriemari');
    cy.get('[data-qa="card-number"]').type('11111');
    cy.get('[data-qa="cvc"]').type('111');
    cy.get('[data-qa="expiry-month"]').type('01');
    cy.get('[data-qa="expiry-year"]').type('2028');

    // Click 'Pay and Confirm Order' button
    cy.get('button[data-qa="pay-button"]').click();

    // Verify success message 'Your order has been placed successfully!'
    cy.get('.col-sm-9').should('contain', 'Congratulations! Your order has been confirmed!'); //Congratulations! Your order has been confirmed!-იწერება
  });
});