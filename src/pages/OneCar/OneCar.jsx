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

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    } else {
      alert('الرجاء كتابة تعليق قبل الإرسال.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${url}/api/car/one-item/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        // تعيين الصورة الرئيسية فقط عند تحميل البيانات
        if (res.data.images.length > 0) {
          setCurrentImage(res.data.images[0].url); // تعيين أول صورة كصورة رئيسية
          setActiveThumb(res.data.images[0].url); // تعيين الصورة النشطة
        }
      })
      .catch((err) => console.error(err));
      setLoading(false);
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
          <p>
            <ReactMarkdown>{data.description}</ReactMarkdown>
          </p>
        </div>

        <div className="rating-section">
          <h3>تقييم السيارة:</h3>
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
            <h3>إضافة تعليق :</h3>
            <textarea
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
            />
            <button onClick={handleCommentSubmit}>إرسال</button>

            <div id="comments-list">
              {comments.map((c, i) => (
                <p key={i}>{c}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneCar;
