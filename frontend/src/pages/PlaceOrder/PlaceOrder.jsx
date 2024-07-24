import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../ context/StoreContext'

function PlaceOrder() {
  const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <form  className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multifields">
          <input type="text" placeholder='First name'/>
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email adress' />
        <input type="text" placeholder='Street' />
        <div className="multifields">
          <input type="text" placeholder='First name'/>
          <input type="text" placeholder='Last name' />
        </div> <div className="multifields">
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State' />
        </div>
        <div className="multifields">
          <input type="text" placeholder='Zip Code'/>
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0 ? 0 : getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button disabled={getTotalCartAmount()===0} >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder