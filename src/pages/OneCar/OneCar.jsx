import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from "axios";
import './OneCar.css';
import ReactMarkdown from 'react-markdown';
import { StoreContext } from "../../context/StoreContext";
import Loader from "../../components/Loader/Loader";
const OneCar = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const { setLoading, loading } = useContext(StoreContext);
  const [currentImage, setCurrentImage] = useState('');
  const [activeThumb, setActiveThumb] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const [data, setData] = useState({
    name: "",
    marka: "",
    price: "",
    year: "",
    description: "",
    image: "", // الصورة الرئيسية
    images: []  // الصور الإضافية
  });

  const handleThumbClick = (src) => {
    setCurrentImage(src);
    setActiveThumb(src);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === '' || rating === 0) {
      alert('يرجى كتابة تعليق واختيار تقييم.');
      return;
    }
  
    try {
      const res = await axios.post(`${url}/api/reviews`, {
        carId: id,
        user: "Gast", // يمكنك لاحقًا استخدام اسم المستخدم من السياق
        rating,
        comment
      });
      setComments([res.data, ...comments]);
      setComment('');
      setRating(0);
    } catch (err) {
      console.error(err);
      alert('Fehler beim Senden des Kommentars');
    }
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const carRes = await axios.get(`${url}/api/car/one-item/${id}`);
        setData(carRes.data);
        setLoading(false);
        if (carRes.data.images.length > 0) {
          setCurrentImage(carRes.data.images[0].url);
          setActiveThumb(carRes.data.images[0].url);
        }
  
        const commentRes = await axios.get(`${url}/api/reviews/${id}`);
        setComments(commentRes.data);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href="/icon.png" />
        <title>{data.name}</title>
        <meta name="description" content="Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen zu attraktiven Preisen. Bei uns erhalten Sie Qualität und Vertrauen in jedem Fahrzeug" />
        <meta name="keywords" content="deluxe-auto, An- und Verkauf von Gebrauchtwagen, We Provide Great Services For your Vehicle, Gebrauchtwagenverkauf, Abschlepp- und Transportservice deutschlandweit" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="one-car">
        <div className="main-image">
          {/* عرض الصورة الرئيسية هنا */}
          {currentImage && <img src={currentImage} alt={data.name} className="main-image-img" loading="lazy" />}
        </div>

        <div className="thumbnails">
          {/* عرض الصور الإضافية في الـ thumbnails */}
          {loading ? <Loader /> : (
          data.images.length > 0 && data.images.map((thumb, index) => (
            <img
              key={index}
              src={thumb.url}
              alt={`thumb-${index}`}
              className={`thumb ${activeThumb === thumb.url ? 'active' : ''}`}
              onClick={() => handleThumbClick(thumb.url)}
            />
          )))}
        </div>

        <div className="car-info">
          <h2>{data.name} {data.marka}</h2>
          <p className="price">price: <strong>{data.price} &#8364;</strong></p>
        </div>

        <div className="car-description">
        
            <ReactMarkdown>{data.description}</ReactMarkdown>
          
        </div>

        <div className="rating-section">
          <h3> Fahrzeugbewertung</h3>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((val) => (
              <span
                key={val}
                className={`star ${rating >= val ? 'active' : ''}`}
                onClick={() => handleRatingClick(val)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <p id="rating-value">
            {rating > 0 ? `تم التقييم بـ ${rating} نجوم` : "لم يتم التقييم بعد."}
          </p>

          <div className="comment-section">
            <h3>Einen Kommentar hinzufügen</h3>
            <textarea
              rows={6}
              
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Schreiben Sie hier Ihren Kommentar..."
            />
            <button onClick={handleCommentSubmit}>schicken</button>

            <div id="comments-list">
            {comments.length > 0 ? (
  comments.map((c, i) => (
    <div key={i} className="single-comment">
      <p><strong>{c.user}:</strong> {c.comment}</p>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((val) => (
          <span key={val} className={`star ${c.rating >= val ? 'active' : ''}`}>&#9733;</span>
        ))}
      </div>
    </div>
  ))
) : (
  <p>Noch keine Kommentare.</p>
)}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneCar;
