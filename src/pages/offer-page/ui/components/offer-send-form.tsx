import { FormEvent, useState } from 'react';
import { StarElement } from './star-element';
import { SendFormType } from '../../../../shared/types/types/send-form-type';
import { StarCount } from '../../../../shared/consts/star-count';
import { INITIAL_SEND_FORM_STATE } from '../../../../shared/consts/Initial-send-form-state';
import {
  MIN_COMMENTS_LENGTH,
  MAX_COMMENTS_LENGTH,
} from '../../consts/comments-length';
import { useAppDispatch } from '../../../../shared/hooks/use-app-dispatch';
import { sendCommentAction } from '../../../../store/action/async-action';

type OfferSendFormProps = {
  offerId: string;
}

export function OfferSendForm({ offerId }: OfferSendFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<SendFormType>(
    INITIAL_SEND_FORM_STATE
  );
  const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
  const [starChecked, setStarChecked] = useState<null | number>(null);
  const onFormChangeHandle = (
    inputName: keyof SendFormType,
    value: number | string
  ): void => {
    setFormData({
      ...formData,
      [inputName]: value,
    });
    if (typeof value === 'number') {
      setStarChecked(value);
    }
    if (
      formData.rating &&
      formData.comment.length >= MIN_COMMENTS_LENGTH &&
      formData.comment.length < MAX_COMMENTS_LENGTH
    ) {
      setSendButtonDisabled(false);
    } else {
      setSendButtonDisabled(true);
    }
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    dispatch(sendCommentAction({ offerId, formData }));
    setSendButtonDisabled(true);
    setStarChecked(null);
    setFormData(INITIAL_SEND_FORM_STATE);
  };
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmitForm}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {StarCount.map(
          (star: number): JSX.Element => (
            <StarElement
              key={star}
              value={star}
              formChangeHandle={(rating) => {
                onFormChangeHandle('rating', rating);
              }}
              isChecked={starChecked === star}
            />
          )
        )}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={(e) => onFormChangeHandle('comment', e.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={sendButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
