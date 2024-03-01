import React from 'react';
import { Summary } from './Summary';
import { Coupon } from './Coupon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useShopContext } from '../context/shopContext';
import { NoProducts } from './NoProducts';

export const Cart = () => {
    const navigate = useNavigate();

    const { cartItems } = useShopContext();

    const handleShippingOptions = (event) => {
        event.preventDefault();

        // Gather all input fields that need validation
        const nameInput = document.getElementById('name');
        const surnameInput = document.getElementById('surname');
        const emailInput = document.getElementById('email');
        const addressInput = document.getElementById('address');
        const cityInput = document.getElementById('city');
        const stateInput = document.getElementById('state');
        const zipInput = document.getElementById('zip');
        const termsCheckbox = document.getElementById('terms');
        const businCheckbox = document.getElementById('busin');

        // Perform validation checks
        const isValidName = validateInput(nameInput, /^[a-zA-Z]+$/);
        const isValidSurname = validateInput(surnameInput, /^[a-zA-Z]+$/);
        const isValidEmail = validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        const isValidAddress = validateInput(addressInput, /^[a-zA-Z0-9\s,-]+$/);
        const isValidCity = validateInput(cityInput, /^[a-zA-Z\s]+$/);
        const isValidState = validateInput(stateInput, /^[a-zA-Z\s]+$/);
        const isValidZip = validateInput(zipInput, /^[0-9]+$/);
        const isValidTerms = validateCheckbox(termsCheckbox);

        // Optional: Display error messages or apply visual cues

        // If any field fails validation, prevent form submission
        if (!isValidName ) {
            toast.error('Nombre invalido');
            return;
        }
        if (!isValidSurname) {
            toast.error('Apellido invalido');
            return;
        }
        if (!isValidEmail) {
            toast.error('Email invalido');
            return;
        }
        if (!isValidAddress) {
            toast.error('Direccion invalida');
            return;
        }
        if (!isValidCity) {
            toast.error('Ciudad invalida');
            return;
        }
        if (!isValidState) {
            toast.error('Provincia invalida');
            return;
        }
        if (!isValidZip) {
            toast.error('Codigo Postal invalido');
            return;
        }
        if (!isValidTerms) {
            toast.error('Debes aceptar los terminos y condiciones');
            return;
        }
        // Proceed with shipping options
        navigate('/shipping');
    };

    const validateInput = (input, regex) => {
        if (!input.value.trim().match(regex)) {
            input.style.border = '1px solid red';
            return false;
        } else {
            input.style.border = '1px solid #cecece';
            return true;
        }
    };

    const validateCheckbox = (checkbox) => {
        if (!checkbox.checked) {
            checkbox.style.border = '1px solid red';
            return false;
        } else {
            checkbox.style.border = '1px solid #cecece';
            return true;
        }
    };

    return (
            cartItems.length === 0 ? (
                <NoProducts text='tu carrito' />
            ) : (
                <form>
            <section className="cart-section">
                <div className="contact-information">
                    <div className='text'>
                        <h2 className="title">
                            Informacion de Contacto
                        </h2>
                    </div>

                    <form className='contact-form'>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Apellido</label>
                        <input type="text" id="surname" name="surname" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <input type="checkbox" id="terms" name="terms" required />
                        <label htmlFor="terms">Acepto los terminos y condiciones</label>
                    </div>
                    </form>
                </div>

                <div className='address-information'>
                    <div className="text">
                        <h2 className="title">
                            Informacion de Envio
                        </h2>
                    </div>
                    <form className='address-form'>
                    <div className="form-group">
                        <label htmlFor="address">Direccion</label>
                        <input type="text" id="address" name="address" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ciudad</label>
                        <input type="text" id="city" name="city" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">Provincia</label>
                        <input type="text" id="state" name="state" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">Codigo Postal</label>
                        <input type="text" id="zip" name="zip" required />
                    </div>
                    <div className="form-group">
                        <input type="checkbox" id="busin" name="busin" required />
                        <label htmlFor="busin" className='busin'>Guardar informacion para proximas compras</label>
                    </div>
                    </form>
                </div>
                <div className='process-order'>
                    <button className="process-btn" onClick={handleShippingOptions}> Opciones de Envio</button>
                </div>
                <Summary />
                <Coupon />
            </section>
        </form>
            )
    );
};
