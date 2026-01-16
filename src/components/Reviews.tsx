import Avatar from '../../markup/img/avatar-max.jpg';
import {AppState} from '../types/AppState.ts';
import {Dispatch, FormEvent, useEffect, useState} from 'react';
import {actions} from '../redux/actions.ts';
import {connect} from 'react-redux';
import {Review} from '../types/Review.ts';
import {RATING_TITLES} from '../const.ts';
import {api} from '../services/api.ts';

interface ReviewsProps {
  offerId: number;
  reviews: Review[];
  addReview: (review: Review) => void;
  setReviews: (reviews: Review[]) => void;
  isAuthorized: boolean;
}

const ReviewsComponent = ({offerId, reviews, addReview, setReviews, isAuthorized}: ReviewsProps) => {

  const [rating, setRating] = useState<number | null>(0);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    api.post<Review[]>('/review/search', undefined, {offerId})
      .then((reviewResponse: Review[]) => setReviews(reviewResponse));
  }, [offerId, setReviews]);

  const handleSubmit = (evt: FormEvent) => {

    evt.preventDefault();
    if (!rating || text.trim().length < 50) {
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      offerId,
      userName: 'Max', // w realu z auth / user store
      userAvatar: Avatar,
      rating,
      description: text.trim(),
      date: new Date().toISOString(),
    };

    api.post<void>('/review/add', undefined, newReview)
      .then(() => addReview(newReview));

    setRating(null);
    setText('');

  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <li key={review.id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={review.userAvatar} width="54" height="54"
                  alt="Reviews avatar"
                />
              </div>
              <span className="reviews__user-name"> {review.userName}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{'width': `${review.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {review.description}
              </p>
              <time className="reviews__time" dateTime="2019-04-24">
                {new Date(review.date).toLocaleTimeString('en-EN', {
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </li>
        ))}
      </ul>
      { isAuthorized && (
        <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
          <label className="reviews__label form__label" htmlFor="review">Your review</label>
          <div className="reviews__rating-form form__rating">
            {
              Array.from({length: 5}, (_, i) => 5 - i).map((value) => (
                <>
                  <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`}
                    type="radio" checked={rating === value} onChange={() => setRating(value)}
                  />
                  <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label"
                    title={RATING_TITLES[value - 1]}
                  >
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>
                </>
              ))
            }
          </div>
          <textarea
            className="reviews__textarea form__textarea"
            id="review"
            name="review"
            placeholder="Tell how was your stay, what you like and what can be improved"
            value={text}
            onChange={(evt) => setText(evt.target.value)}
          >
          </textarea>
          <div className="reviews__button-wrapper">
            <p className="reviews__help">
              To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
              stay with at least <b className="reviews__text-amount">50 characters</b>.
            </p>
            <button className="reviews__submit form__submit button" type="submit" disabled={!rating || text.trim().length < 50}>Submit</button>
          </div>
        </form>
      )}
    </section>
  );
};

const mapStateToProps = (state: AppState) => ({
  reviews: state.reviewState.reviews.filter((review) => review.offerId === state.offerState.currentOffer?.id),
  offerId: state.offerState.currentOffer!.id,
  isAuthorized: state.authState.isAuthorized,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addReview: (review: Review) => dispatch(actions.addReview(review)),
  setReviews: (reviews: Review[]) => dispatch(actions.setReviews(reviews)),
});

export const Reviews = connect(mapStateToProps, mapDispatchToProps)(ReviewsComponent);
