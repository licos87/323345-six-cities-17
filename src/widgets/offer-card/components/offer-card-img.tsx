type OffersCardProps = {
  place: string;
  previewImage: string;
}

function OfferCardImg({ place, previewImage }:OffersCardProps):JSX.Element {
  return (
    <div className={`place-card__image-wrapper ${ place === 'main' ? 'cities__image-wrapper' : place === 'favorites' && 'favorites__image-wrapper'}`}>
      <a href="#">
        <img
          className="place-card__image"
          src={previewImage}
          width="260"
          height="200"
          alt="Place image"
        />
      </a>
    </div>
  );
}

export default OfferCardImg;
