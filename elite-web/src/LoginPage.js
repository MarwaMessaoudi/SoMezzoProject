import React from "react";

const LoginPage = ({ sessionExpired }) => {
  return (
    <div>
      {sessionExpired ? (
        <p>Votre session a expiré. Veuillez vous reconnecter.</p>
      ) : (
        <p>Connectez-vous pour continuer.</p>
      )}
    </div>
  );
};

export default LoginPage;
