import React, { useState, useEffect } from "react";

const HotDeal = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2); // Incrementa la fecha actual en 2 días
  targetDate.setHours(0, 0, 0, 0); // Establece las horas a 00:00:00 para obtener la fecha exacta

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div id="hot-deal" className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hot-deal">
              <ul className="hot-deal-countdown">
                <li>
                  <div>
                    <h3 className="countdown-number" id="daysValue">
                      {timeLeft.days}
                    </h3>
                    <span className="countdown-unit">Dias</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3 className="countdown-number" id="hoursValue">
                      {timeLeft.hours}
                    </h3>
                    <span className="countdown-unit">Horas</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3 className="countdown-number" id="minutesValue">
                      {timeLeft.minutes}
                    </h3>
                    <span className="countdown-unit">Min</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3 className="countdown-number" id="secondsValue">
                      {timeLeft.seconds}
                    </h3>
                    <span className="countdown-unit">Segundos</span>
                  </div>
                </li>
              </ul>
              <h2 className="text-uppercase">Gran oferta de la semana</h2>
              <p>Nueva colección Hasta 50% de descuento</p>
              <a className="primary-btn cta-btn" href="#">
                Comprar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotDeal;
