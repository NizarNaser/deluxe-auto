import React, { useState , useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import i18n from '../../i18n';
import './OneCar.css';

const OneCar = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const url= import.meta.env.VITE_API_URL;

  
  const thumbnails = [
    "/deluxe-auto/images/work-1.jpg",
    "/deluxe-auto/images/work-2.jpg",
    "/deluxe-auto/images/work-3.jpg",
    "/deluxe-auto/images/work-4.jpg",
    "/deluxe-auto/images/work-2.jpg",
    "/deluxe-auto/images/work-3.jpg",
    "/deluxe-auto/images/work-4.jpg",
    "/deluxe-auto/images/work-2.jpg",
    "/deluxe-auto/images/work-3.jpg",
    "/deluxe-auto/images/work-4.jpg",
    "/deluxe-auto/images/work-2.jpg",
    "/deluxe-auto/images/work-3.jpg",
    "/deluxe-auto/images/work-4.jpg",
    "/deluxe-auto/images/work-2.jpg",
    "/deluxe-auto/images/work-3.jpg",
    "/deluxe-auto/images/work-4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(thumbnails[0]);
  const [activeThumb, setActiveThumb] = useState(thumbnails[0]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

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
  const [data, setData] = useState({
    name: "",
    name_de: "",
    name_ar: "",
    marka:"",
    price: "",
    year: "",
    description: "",
    description_de:"",
    description_ar:"",
    image: "", // تأكد من أن الصورة مهيأة مسبقًا
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${url+"/api/car/one-item/"+id}`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => console.error(err));
  }, [id]);
  return (
    <>
      <Helmet>
      <link rel="icon" type="image/svg+xml" href="/deluxe-auto/icon.png" />
        <title>{data.name}</title>
        <meta name="description" content={t('description')} />
        <meta name="keywords" content={t('keywords')} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="one-car">
        <div className="main-image">
         
          <img src={data.image} alt={data.name} className="main-image-img" loading="lazy"/>
        </div>

        <div className="thumbnails">
          {thumbnails.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={data.name}
              className={`thumb ${activeThumb === thumb ? 'active' : ''}`}
              onClick={() => handleThumbClick(thumb)}
            />
          ))}
        </div>

        <div className="car-info">
          <h2>  {data.name} {data.marka}</h2>
          <p className="price">price: <strong>{data.price}  &#8364;</strong></p>
          <ul className="specs">
            <li>marka : {data.marka} </li>
            <li>model :{data.year}</li>
            <li>color : </li>
            <li>المحرك: 2.5 لتر هايبرد</li>
            <li>ناقل الحركة: أوتوماتيكي</li>
          </ul>
        </div>

        <div className="car-description">
          <h3>description :</h3>
          <p>
            {data.description}
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
            <h3> add comment :</h3>
            <textarea
            rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
            />
            <button onClick={handleCommentSubmit}>send </button>

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
