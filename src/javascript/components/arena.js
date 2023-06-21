import createElement from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight } from './fight';
import showWinnerModal from './modal/winner';

function createFighter(fighter, position) {
    const imgElement = createFighterImage(fighter);
    const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
    const fighterElement = createElement({
        tagName: 'div',
        className: `arena___fighter ${positionClassName}`
    });

    fighterElement.append(imgElement);
    return fighterElement;
}

function createFighters(firstFighter, secondFighter) {
    const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
    const firstFighterElement = createFighter(firstFighter, 'left');
    const secondFighterElement = createFighter(secondFighter, 'right');

    battleField.append(firstFighterElement, secondFighterElement);
    return battleField;
}

function createHealthIndicator(fighter, position) {
    const { name } = fighter;
    const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
    const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
    const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
    const bar = createElement({
        tagName: 'div',
        className: 'arena___health-bar',
        attributes: { id: `${position}-fighter-indicator` }
    });

    fighterName.innerText = name;
    indicator.append(bar);
    container.append(fighterName, indicator);

    return container;
}

function createHealthIndicators(leftFighter, rightFighter) {
    const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
    const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
    const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
    const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

    healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
    return healthIndicators;
}

function createArena(selectedFighters) {
    const arena = createElement({ tagName: 'div', className: 'arena___root' });
    const healthIndicators = createHealthIndicators(...selectedFighters);
    const fighters = createFighters(...selectedFighters);
    // eslint-disable-next-line no-use-before-define
    const shields = createShields(...selectedFighters);

    arena.append(healthIndicators, fighters, shields);
    return arena;
}

export default function renderArena(selectedFighters) {
    const root = document.getElementById('root');
    const arena = createArena(selectedFighters);

    root.innerHTML = '';
    root.append(arena);

    fight(...selectedFighters).then(fighter => {
        showWinnerModal(fighter);
    });
}

function createShields(leftFighter, rightFighter) {
    const container = createElement({ tagName: 'div', className: `arena___shields-container` });
    // eslint-disable-next-line no-use-before-define
    const firstFighterShield = createShield(leftFighter, 'left');
    // eslint-disable-next-line no-use-before-define
    const secondFighterShield = createShield(rightFighter, 'right');

    container.append(firstFighterShield, secondFighterShield);
    return container;
}

function createShield(fighter, position) {
    // eslint-disable-next-line no-use-before-define
    const imgElement = createShieldImage();
    const positionClassName = position === 'right' ? 'arena___right-shield' : 'arena___left-shield';
    const shieldElement = createElement({
        tagName: 'div',
        className: `${positionClassName}`,
        attributes: { id: `${position}-shield` }
    });

    shieldElement.append(imgElement);
    return shieldElement;
}

function createShieldImage() {
    const attributes = {
        src: '../../../resources/Shield_Model.png',
        alt: 'shield'
    };
    return createElement({
        tagName: 'img',
        className: 'shield-img',
        attributes
    });
}
