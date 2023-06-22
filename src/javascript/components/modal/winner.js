import showModal from './modal';
import { createFighterImage } from '../fighterPreview';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    showModal({
        title: 'WINNER 🏆',
        // eslint-disable-next-line no-use-before-define
        bodyElement: createBodyWinner(fighter),
        onClose: () => document.location.reload()
    });
}

function createBodyWinner(fighter) {
    const fighterElement = createElement({
        tagName: 'div',
        className: 'modal-card___winner'
    });
    fighterElement.appendChild(createFighterImage(fighter));
    fighterElement.innerHTML += `
        <h1>${fighter.name}</h1>
      `;
    return fighterElement;
}
