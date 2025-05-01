// تغيير الصورة الكبيرة
const currentImage = document.getElementById('currentImage');
const thumbnails = document.querySelectorAll('.thumb');

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', function() {
    currentImage.classList.add('fade');
    setTimeout(() => {
      currentImage.src = this.src;
      currentImage.classList.remove('fade');
    }, 200);

    thumbnails.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// تأثير الفيد
currentImage.addEventListener('load', () => {
  currentImage.style.opacity = 1;
});

const style = document.createElement('style');
style.innerHTML = `
  .fade {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
`;
document.head.appendChild(style);

// نظام التقييم
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');

stars.forEach(star => {
  star.addEventListener('click', function() {
    const rating = this.getAttribute('data-value');
    ratingValue.textContent = `تم التقييم بـ ${rating} نجوم`;

    stars.forEach(s => s.classList.remove('active'));
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('active');
    }
  });
});

// نظام التعليقات
const submitComment = document.getElementById('submitComment');
const commentInput = document.getElementById('comment');
const commentsList = document.getElementById('comments-list');

submitComment.addEventListener('click', function() {
  const commentText = commentInput.value.trim();
  if (commentText !== '') {
    const newComment = document.createElement('p');
    newComment.textContent = commentText;
    commentsList.appendChild(newComment);
    commentInput.value = '';
  } else {
    alert('الرجاء كتابة تعليق قبل الإرسال.');
  }
});
