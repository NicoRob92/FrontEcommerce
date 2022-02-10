import React from 'react';
import style from './_footer.module.scss';
export default function Footer() {
  return (
    <div className={style.footerContainer}>
      <div className={style.firstContainer}>
        <h1>Nuestras Políticas</h1>
        <div>Política de privacidad</div>
        <div>Política de cookies</div>
        <div>Politica de calidad</div>
      </div>
      <div className={style.secondContainer}>
        <div className={style.logo}>Kwik-E-Mart</div>
        <div className={style.bar} />
        <div className={style.containerLogo}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'>
            <path
              className={style.path}
              d='M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'>
            <path
              className={style.path}
              d='M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='34'
            height='34'
            viewBox='0 0 24 24'>
            {' '}
            <path
              className={style.path}
              d='M 4 4 C 2.895 4 2 4.895 2 6 L 2 18 C 2 19.105 2.895 20 4 20 L 20 20 C 21.105 20 22 19.105 22 18 L 22 6 C 22 4.895 21.105 4 20 4 L 4 4 z M 5.5976562 6 L 18.402344 6 L 12 10 L 5.5976562 6 z M 5 8.6269531 L 12 13 L 19 8.6269531 L 19 18 L 5 18 L 5 8.6269531 z'
            />
          </svg>
        </div>
      </div>
      <div className={style.lastContainer}>
        <h1>Acerca de Kwik-E-Mart</h1>
        <li>Historia</li>
        <li>Ayuda</li>
        <li>Términos y condiciones</li>
        <li>Trabaja con nosotros</li>
      </div>
    </div>
  );
}
