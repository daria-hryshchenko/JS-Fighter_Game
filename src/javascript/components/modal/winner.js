import showModal from './modal';
import { createFighterImage } from '../fighterPreview';

export default function showWinnerModal(fighter) {
    const imageElement = createFighterImage(fighter);
    const modalElement = {
        title: `${fighter.name.toUpperCase()} WON 🏆`,
        bodyElement: imageElement,
        onClose: () => document.location.reload()
    };

    showModal(modalElement);
}
