const Newsletter = () => {
  return (
    <div className="col-md-4 col-sm-6">
    <div className="footer-newsletter">
      <h2 className="footer-wid-title">Newsletter</h2>
      <p>Inscrivez-vous pour recevoir nos offres exclusives directement dans votre boîte mail !</p>
      <div className="newsletter-form">
        <form action="#">
          <input type="email" placeholder="Votre email" required />
          <input type="submit" value="S'inscrire" />
        </form>
      </div>
    </div>
  </div>
  );
};

export default Newsletter;
