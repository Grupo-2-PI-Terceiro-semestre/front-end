import React from 'react';
import './TeamCarousel.css';

function TeamCarousel() {
  const teamMembers = ['Ariana', 'Fabio', 'Malu', 'Samuel', 'Márcio'];

  return (
    <div className="team-carousel">
      <h3>Membros da Equipe</h3>
      <div className="carousel">
        {teamMembers.map((member, index) => (
          <div key={index} className="carousel-item">
            <img src={`member-image-url-${index}.jpg`} alt={member} />
            <p>{member}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamCarousel;
