import { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import img1 from "./images/img1.png";
import img2 from "./images/img2.webp";
import img3 from "./images/img3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

function App() {
  const [form, setForm] = useState({
    name: "",
    occupation: "",
    rating: "",
    feedback: ""
  });

  const [allFeedback, setAllFeedback] = useState([]);

  const fetchFeedback = async () => {
    const res = await fetch("https://krishibandh-feedback.onrender.com/api/feedback");
    const data = await res.json();
    setAllFeedback(data);
  };
const images = [img1, img2, img3];
const [current, setCurrent] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, 3000); // 3 sec

  return () => clearInterval(interval);
}, []);
  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("https://krishibandh-feedback.onrender.com/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      occupation: "",
      rating: "",
      feedback: ""
    });

    fetchFeedback();
  };

  const calculateRatings = () => {
    const count = {1:0,2:0,3:0,4:0,5:0};

    allFeedback.forEach(f => {
      if (count[f.rating] !== undefined) count[f.rating]++;
    });

    const total = allFeedback.length;

    let avg = 0;
    if (total > 0) {
      avg = (
        (count[5]*5 + count[4]*4 + count[3]*3 + count[2]*2 + count[1]*1) / total
      ).toFixed(1);
    }

    const percent = {};
    for (let i = 1; i <= 5; i++) {
      percent[i] = total ? Math.round((count[i] / total) * 100) : 0;
    }

    return { percent, avg, total };
  };

  const { percent, avg, total } = calculateRatings();

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <h1>Krishibandh</h1>
        <h3>Digital Bridge Between Farmers & Industries</h3>
        
      </div>
<div className="info-box">
  <h2>Project Overview</h2>

  <p>
    Krishibandh is a smart agricultural platform designed to directly connect farmers with industries,
    eliminating middlemen and ensuring fair pricing. It creates a transparent and efficient system
    that benefits both farmers and businesses.
  </p>

  <p>
     Farmers can upload crop details, get real-time weather updates, and receive AI-based suggestions
    for better farming decisions.
  </p>

  <p>
     Industries can directly place orders, track delivery using GPS, and get high-quality crops at fair prices.
  </p>

  <p>
     The platform uses modern technologies like AI, IoT sensors, and digital payments to improve
    communication, trust, and efficiency in the agricultural supply chain.
  </p>

  <p>
     <b>Goal:</b> Increase farmer income, reduce costs for industries, and build a transparent digital ecosystem.
  </p>
</div>
<div className="slider-container">

  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={20}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 2500 }}
    loop={true}
  >

    <SwiperSlide>
      <img src={img1} alt="slide1" className="slide-img" />
      <div className="slide-text">No middlemen</div>
    </SwiperSlide>

    <SwiperSlide>
      <img src={img2} alt="slide2" className="slide-img" />
      <div className="slide-text"> Smart Farming</div>
    </SwiperSlide>

    <SwiperSlide>
      <img src={img3} alt="slide3" className="slide-img" />
      <div className="slide-text">Live Tracking</div>
    </SwiperSlide>

  </Swiper>

</div>

      {/* GRID */}
      <div className="grid">

        {/* FORM */}
        <div className="form-box">
          <h2> Feedback Form</h2>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e)=>setForm({...form,name:e.target.value})}
            />

            <input
              placeholder="Occupation"
              value={form.occupation}
              onChange={(e)=>setForm({...form,occupation:e.target.value})}
            />

            <select
              value={form.rating}
              onChange={(e)=>setForm({...form,rating: Number(e.target.value)})}
            >
              <option value="">Rating</option>
              <option value="5">5 Star</option>
              <option value="4">4 Star</option>
              <option value="3">3 Star</option>
              <option value="2">2 Star</option>
              <option value="1">1 Star</option>
            </select>

            <textarea
              placeholder="Your Feedback"
              value={form.feedback}
              onChange={(e)=>setForm({...form,feedback:e.target.value})}
            required></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
{/* RATING */}
      <div className="rating-box">
        <h2>⭐ {avg} out of 5</h2>
        <p>{total} ratings</p>

        {[5,4,3,2,1].map((star) => (
          <div key={star} className="rating-row">
            <span>{star} star</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{ width: `${percent[star]}%` }}
              ></div>
            </div>

            <span>{percent[star]}%</span>
          </div>
        ))}
      </div>
        {/* FEEDBACK */}
        <div className="feedback-box">
          <h3>📢 User Feedback</h3>

          {allFeedback.map((f, index) => (
            <div key={index} className="card">
              <h4>{f.name}</h4>
              <p><b>Occupation:</b> {f.occupation}</p>
              <p><b>Rating:</b> ⭐ {f.rating}</p>
              <p>{f.feedback}</p>
            </div>
          ))}
        </div>

      </div>
      {/* FOOTER */}

<footer className="footer">
  <div className="footer-container">

```
{/* LEFT */}
<div className="footer-section">
  <h2> Krishibandh</h2>
  <p>Digital Bridge Between Farmers & Industries</p>
  <p>
    Empowering farmers with technology, transparency, and fair pricing.
  </p>
</div>

{/* CENTER */}
<div className="footer-section">
  <h3>📞 Contact Us</h3>
  <p>Krishibandh Team</p>
  <p>krishibandh@gmail.com</p>
  <p>+91 9970933377</p>
  <a 
    href="https://wa.me/919970933377" 
    target="_blank" 
    rel="noreferrer"
    className="whatsapp-btn"
  >
    Chat on WhatsApp
  </a>
</div>

  </div>

  <hr />

  <p className="footer-bottom">
    © 2026 Krishibandh | All Rights Reserved | Developed by Team Krishibandh
  </p>
</footer>


    </div>
  );
}

export default App;