import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { handleSucess } from '../utils';
import './Home.js';
import Chatbot from "./chatboot.js"; 
import { ToastContainer } from 'react-toastify';
// import '../images/coffee1.jpg';
import coffee1 from '../images/coffee1.jpg';
import coffee2 from '../images/coffee2.jpg';
import coffee3 from '../images/coffee3.jpg';
import coffee4 from '../images/coffee4.jpg';
import coffee5 from '../images/coffee5.jpg';
import coffee6 from '../images/coffee6.jpg';

function Home() {
    
    const menuItems = [
        {
            id: 1,
            title: "Cappuccino",
            description: "Rich and foamy coffee.",
            image: coffee1,
        },
        {
            id: 2,
            title: "Chocolate Cake",
            description: "Decadent and moist.",
            image: coffee2,
        },
        {
            id: 3,
            title: "Sandwich",
            description: "Fresh and delicious.",
            image: coffee3,
        },
        {
            id: 4,
            title: "Latte",
            description: "Smooth and creamy coffee.",
            image: coffee4,
        },
        {
            id: 5,
            title: "Croissant",
            description: "Flaky and buttery pastry.",
            image: coffee5,
        },
        {
            id: 6,
            title: "Pasta",
            description: "Savory and flavorful.",
            image:coffee6,
        },
        {
            id: 7,
            title: "Pasta",
            description: "Savory and flavorful.",
            image:coffee6,
        },
        {
            id: 8,
            title: "Pasta",
            description: "Savory and flavorful.",
            image:coffee6,
    },
];
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSucess('User logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    return (
        <div className="home">
            <Chatbot />
            {/* Header Section */}
            <header className="header">
                <div className="logo">
                    <img src="your-logo.png" alt="Cafe Logo" />
                </div>
                <nav className="navbar">
                <Link to="/#home">Home</Link>

                    <a href="#aboutus">About Us</a>
                    <a href="#menu">Menu</a>
                    <a href="#review">Reviews</a>
                    <a href="#giftcard">giftcard</a>
                    <a href="#contact">Contact</a>
                    {/* <a href="#blog">Blog</a> */}

                    {loggedInUser ? (
                        <>
                            <span className="user-greeting">Welcome, {loggedInUser}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </nav>
                <div className="icons">
                    <a href="#search" aria-label="Search">🔍</a>
                    <a href="#cart" aria-label="Cart">🛒</a>
                </div>
            </header>

            {/* Home Section */}
            <section className="home-section" id="home">
                <h1>Welcome to Our Café</h1>
                <p>Step into a world of flavors and cozy moments. Enjoy our curated menu and relaxing atmosphere!</p>
      </section>

            {/* About Section */}
            <section className="about-section" id='aboutus'>
                <div className="image-container"></div>
                <div className="text-container">
                    <h2>About Us</h2>
                    <p>
                        Welcome to our café! We are passionate about serving the finest coffee 
                        and creating a cozy environment where you can relax and connect with others.
                    </p>
                </div>
     </section>

            {/* Menu Section */}
            <section className="menu-section" id="menu">
                <h2>Our Menu</h2>
                <p>
                    Discover a variety of treats—from artisanal coffees to delicious pastries and savory dishes.
                    Whether you're here for breakfast, lunch, or a snack, we have something to satisfy every craving.
                </p>
                <div className="menu-grid">
        {menuItems.map((item) => (
            <div key={item.id} className="menu-card">
                <div className="image-circle">
                    <img src={item.image} alt={item.title} className="menu-image" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        ))}
    </div>
</section>

        
            <div class="circle small"></div>
<div class="circle medium"></div>
<div class="circle large"></div>
<div class="circle small"></div>
<div class="circle medium"></div>
<div class="circle large"></div>


<section class="review-section" id="review">
  <div class="review-container">
    <div class="review-content">
      <h2>Customer Reviews</h2>
      <p>
        "Absolutely love this place! The ambiance is cozy, and the coffee is perfect." <br />
        "Friendly staff and delicious pastries—my new favorite spot in town!"
      </p>
    </div>
  </div>
</section>


<section className="giftcard-section" id='giftcard'>
            <div className="giftcard-content">
                <h2>Give the Gift of Coffee</h2>
                <p>
                    Looking for the perfect gift for a coffee lover? Our gift cards are the ideal way 
                    to share the joy of a warm cup of coffee and delicious treats!
                </p>
                <button className="btn">Buy Gift Card</button>
            </div>
 </section>

            {/* Contact Section */}
            <section className="contact-section" id="contact">
      <h2>Contact Us</h2>
      <p className="contact-intro">
        We'd love to hear from you! Reach out with any questions or to reserve a
        spot for your next visit.
      </p>
      <div className="contact-details">
        <p>
          📞 <strong>Phone:</strong> (123) 456-7890
        </p>
        <p>
          ✉ <strong>Email:</strong> cafe@example.com
        </p>
      </div>
    </section>



            <ToastContainer />
        </div>
    );
}

export default Home;
