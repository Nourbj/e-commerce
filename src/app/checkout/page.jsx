"use client"; 
import { useRouter } from 'next/navigation'; 
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Order from '@/Components/Client/Order';
import CategoryTitle from '@/Components/Server/CategoryTitle';
import { clearCart } from '@/Redux/cartSlice'; 

const Checkout = () => {

  const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm({
    mode: 'onChange',
  });

  const [isChecked, setIsChecked] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setIsFormVisible(event.target.checked);
  };

  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const tax = useSelector((state) => state.cart.tax);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const orderData = {
    id: new Date().toISOString(),
    total,
    subTotal,
    tax,
    items: cartItems.map(item => ({
      id: item.id,
      name: item.name,
      imageName: item.imageName,
      price: item.price,
      qty: item.qty
    })),
    customer: {
      email: watch("billing_email"),
      phone: watch("billing_phone"),
      billingAddress: {
        civility: watch("billing_country"),
        firstName: watch("billing_first_name"),
        lastName: watch("billing_last_name"),
        zipCode: watch("billing_postcode"),
        street: watch("shipping_address_1"),
        companyName: watch("shipping_company"),
        county: watch("shipping_country"),
        city: watch("shipping_city")
      },
      shippingAddress: {
        civility: watch("shipping_country"),
        firstName: watch("shipping_first_name"),
        lastName: watch("shipping_last_name"),
        zipCode: watch("shipping_postcode"),
        street: watch("shipping_address_1"),
        city: watch("shipping_city")
      }
    }
  };

  const validateBillingDetails = async () => {
    const isValid = await trigger([
      "billing_country",
      "billing_first_name",
      "billing_last_name",
      "billing_email",
      "billing_phone",
      "billing_address_1",
      "billing_city",
      "billing_postcode"
    ]);
    return isValid;
  };

  const validateShippingAddress = async () => {
    const isValid = await trigger([
      "shipping_country",
      "shipping_first_name",
      "shipping_last_name",
      "shipping_address_1",
      "shipping_city",
      "shipping_postcode"
    ]);
    return isValid;
  };

  const validatePayment = async () => {
    const isValid = await trigger("payment_method");
    return isValid;
  };

  const router = useRouter();
  const dispatch = useDispatch(); 

  const handlePlaceOrder = async () => {
    const isBillingValid = await validateBillingDetails();
    const isShippingValid = await validateShippingAddress();
    const isPaymentValid = await validatePayment();

    if (!isBillingValid || !isShippingValid || !isPaymentValid) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Order placement failed');
      }

      const data = await response.json();
      console.log('Order placed successfully:', data);
      toast.success('Your order has been placed successfully!');
      setOrderPlaced(true);

      localStorage.removeItem('cart');
      
      dispatch(clearCart()); 

      setTimeout(() => {
        router.push('/'); 
      }, 1000);

    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('There was an error placing your order.');
    }
  };

  

  return (
    <div>
      <CategoryTitle categoryTitle="Checkout" />
      <div className="single-product-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-content-right">
                <div className="woocommerce">
                <form
                  action="#"
                  className="checkout"
                  encType="multipart/form-data"
                  method="post"
                  name="checkout"
                  onSubmit={handleSubmit(handlePlaceOrder)}
                >
                    <div className="col2-set" id="customer_details">
                      <div className="col-6">
                        <div className="woocommerce-billing-fields">
                          <h3>Billing Details</h3>
                          <p className="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated" id="billing_country_field">
                            <label className="" htmlFor="billing_country">Civility <abbr className="required" title="required">*</abbr></label>
                            <select
                              {...register("billing_country", { required: "Civility is required" })}
                              id="billing_country"
                              name="billing_country"
                            >
                              <option value="">Select Civility</option>
                              <option value="Mr">Mr</option>
                              <option value="Mlle">Mlle</option>
                              <option value="Mme">Mme</option>
                            </select>
                            {errors.billing_country && <span className="error">{errors.billing_country.message}</span>}
                          </p>

                          <p className="form-row form-row-first validate-required" id="billing_first_name_field">
                            <label className="" htmlFor="billing_first_name">First Name <abbr className="required" title="required">*</abbr></label>
                            <input
                              {...register("billing_first_name", { required: "First name is required" })}
                              id="billing_first_name"
                              type="text"
                            />
                            {errors.billing_first_name && <span className="error">{errors.billing_first_name.message}</span>}
                          </p>

                          <p className="form-row form-row-last validate-required" id="billing_last_name_field">
                            <label className="" htmlFor="billing_last_name">Last Name <abbr className="required" title="required">*</abbr></label>
                            <input
                              {...register("billing_last_name", { required: "Last name is required" })}
                              id="billing_last_name"
                              type="text"
                            />
                            {errors.billing_last_name && <span className="error">{errors.billing_last_name.message}</span>}
                          </p>

                          <div className="clear" />

                          <p className="form-row form-row-wide" id="billing_company_field">
                            <label className="" htmlFor="billing_company">Company Name</label>
                            <input
                              {...register("billing_company")}
                              id="billing_company"
                              type="text"
                            />
                          </p>

                          <p className="form-row form-row-wide address-field validate-required" id="billing_address_1_field">
                            <label className="" htmlFor="billing_address_1">Address <abbr className="required" title="required">*</abbr></label>
                            <input
                              {...register("billing_address_1", { required: "Address is required" })}
                              id="billing_address_1"
                              type="text"
                            />
                            {errors.billing_address_1 && <span className="error">{errors.billing_address_1.message}</span>}
                          </p>

                          <p className="form-row form-row-wide address-field validate-required" id="billing_city_field">
                            <label className="" htmlFor="billing_city">Town / City <abbr className="required" title="required">*</abbr></label>
                            <input
                              {...register("billing_city", { required: "City is required" })}
                              id="billing_city"
                              type="text"
                            />
                            {errors.billing_city && <span className="error">{errors.billing_city.message}</span>}
                          </p>

                          <p className="form-row form-row-first address-field validate-required" id="billing_postcode_field">
                            <label className="" htmlFor="billing_postcode">Postcode <abbr className="required" title="required">*</abbr></label>
                            <input
                              {...register("billing_postcode", { required: "Postcode is required" })}
                              id="billing_postcode"
                              type="text"
                            />
                            {errors.billing_postcode && <span className="error">{errors.billing_postcode.message}</span>}
                          </p>

                          <div className="clear" />

                          <p className="form-row form-row-first validate-required validate-email" id="billing_email_field">
                            <label className="" htmlFor="billing_email">Email Address <abbr className="required" title="required">*</abbr></label>
                            <input
                              {...register("billing_email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address"
                                }
                              })}
                              id="billing_email"
                              type="text"
                            />
                            {errors.billing_email && <span className="error">{errors.billing_email.message}</span>}
                          </p>

                          <p className="form-row form-row-last validate-required validate-phone" id="billing_phone_field">
                            <label className="" htmlFor="billing_phone">Phone <abbr className="required" title="required">*</abbr></label>
                            <input
                              {...register("billing_phone", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^[0-9]{8}$/,
                                  message: "Invalid phone number"
                                }
                              })}
                              id="billing_phone"
                              type="text"
                            />
                            {errors.billing_phone && <span className="error">{errors.billing_phone.message}</span>}
                          </p>

                          <div className="clear" />
                        </div>
                      </div>

                     <div className="col-6">
                    <div className="woocommerce-shipping-fields">
                      <h3 id="ship-to-different-address">
                        <label className="checkbox" htmlFor="ship-to-different-address-checkbox">
                          Ship to a different address?
                        </label>
                        <input
                          type="checkbox"
                          value="1"
                          name="ship_to_different_address"
                          checked={isChecked}  
                          onChange={handleCheckboxChange}  
                          className="input-checkbox"
                          id="ship-to-different-address-checkbox"
                        />
                      </h3>
                      {isFormVisible && (
                        <div className="shipping_address" style={{ display: 'block' }}>
                          <p className="form-row form-row-wide address-field">
                            <label htmlFor="shipping_country">
                              Civility <abbr title="optional" className="optional">*</abbr>
                            </label>
                            <select
                              {...register("shipping_country")}
                              id="shipping_country"
                              name="shipping_country"
                            >
                              <option value="">Select Civility</option>
                              <option value="Mr">Mr</option>
                              <option value="Mlle">Mlle</option>
                              <option value="Mme">Mme</option>
                            </select>
                          </p>

                          {/* First Name Field */}
                          <p className="form-row form-row-first">
                            <label htmlFor="shipping_first_name">First Name</label>
                            <input
                              {...register("shipping_first_name")}
                              id="shipping_first_name"
                              type="text"
                            />
                          </p>

                          {/* Last Name Field */}
                          <p className="form-row form-row-last">
                            <label htmlFor="shipping_last_name">Last Name</label>
                            <input
                              {...register("shipping_last_name")}
                              id="shipping_last_name"
                              type="text"
                            />
                          </p>

                          <div className="clear" />

                          {/* Address Field */}
                          <p className="form-row form-row-wide address-field">
                            <label htmlFor="shipping_address_1">Address</label>
                            <input
                              {...register("shipping_address_1")}
                              id="shipping_address_1"
                              type="text"
                            />
                          </p>

                          {/* City Field */}
                          <p className="form-row form-row-wide address-field">
                            <label htmlFor="shipping_city">Town / City</label>
                            <input
                              {...register("shipping_city")}
                              id="shipping_city"
                              type="text"
                            />
                          </p>

                          {/* Postcode Field */}
                          <p className="form-row form-row-first address-field">
                            <label htmlFor="shipping_postcode">Postcode</label>
                            <input
                              {...register("shipping_postcode")}
                              id="shipping_postcode"
                              type="text"
                            />
                          </p>

                          <div className="clear" />
                        </div>
                      )}
                    </div>
                  </div>
                  </div>
                                  

                    <h3 id="order_review_heading">Your order</h3>
                    <div id="order_review" style={{ position: "relative" }}>
                      <Order />
                    </div>

                    <div id="payment">
                      <ul className="payment_methods methods">
                        <li className="payment_method_bacs">
                          <input
                            className="input-radio"
                            type="radio"
                            id="payment_method_bacs"
                            value="bacs"
                            {...register('payment_method')} 
                            defaultChecked
                          />
                          <label htmlFor="payment_method_bacs">
                            Direct Bank Transfer
                          </label>
                          <div className="payment_box payment_method_bacs">
                            <p>
                              Make your payment directly into our bank account.
                              Please use your Order ID as the payment reference.
                              Your order won’t be shipped until the funds have
                              cleared in our account.
                            </p>
                          </div>
                        </li>
                        <li className="payment_method_cheque">
                          <input
                            className="input-radio"
                            type="radio"
                            id="payment_method_cheque"
                            value="cheque"
                            {...register('payment_method')} 
                          />
                          <label htmlFor="payment_method_cheque">
                            Cheque Payment
                          </label>
                          <div className="payment_box payment_method_cheque" style={{ display: 'none' }}>
                            <p>
                              Please send your cheque to Store Name, Store Street,
                              Store Town, Store State / County, Store Postcode.
                            </p>
                          </div>
                        </li>
                        <li className="payment_method_paypal">
                          <input
                            className="input-radio"
                            type="radio"
                            id="payment_method_paypal"
                            value="paypal"
                            {...register('payment_method')} 
                          />
                          <label htmlFor="payment_method_paypal">
                            PayPal
                            <img
                              alt="PayPal Acceptance Mark"
                              src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png"
                            />
                            <a
                              className="about_paypal"
                              href="https://www.paypal.com/gb/webapps/mpp/paypal-popup"
                              onClick={() => window.open('https://www.paypal.com/gb/webapps/mpp/paypal-popup', 'WIPaypal', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700')}
                              title="What is PayPal?"
                            >
                              What is PayPal?
                            </a>
                          </label>
                          <div className="payment_box payment_method_paypal" style={{ display: 'none' }}>
                            <p>
                              Pay via PayPal; you can pay with your credit card if
                              you don’t have a PayPal account.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="form-row place-order">
                      <button
                        type="submit"
                        className={`button alt${orderPlaced ? ' disabled' : ''}`}
                        disabled={orderPlaced}
                      >
                        {orderPlaced ? "Order Placed" : "Place Order"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;