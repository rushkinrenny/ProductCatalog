# Product Catalog

product catalog website where a customer can visit, register themselves,
browse products, search products, view product details

---

---

# Frontend (Angular)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Assumptions

Admin Added
Admin can add product, add Serviceability, view all products and their details.

---

## User

any user can view product, search product by any of these parameters (productcode,productname, productbrand), select by brands.

registered user can see all of these which are mention above and also see product details,product price and check for serviceability whether this product is available to particular pincode or not.

---

---

# Backend (Spring Boot)

## API

- User authentication API<br>
  Rest API to support successful/unsuccessful user authentication validation.<br>

- User registration API<br>
  Rest API to register new users
- Search product API<br>
  Rest API to search a product by one or many of the following parameters:

1.  Name
2.  Product code
3.  Brand

- Product Details API <br>
  Rest API to get other details such as description for product

- Get Price API<br>
  Rest API to get prices for a product or list of products.
- Get Serviceability API<br>
  Rest API to check if a product is serviceable/deliverable to a certain pincode and what is the
  expected delivery time
