import createElement from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight } from './fight';
import showWinnerModal from './modal/winner';
import '../../../resources/shield-model.png';

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

function createShields(firstFighter, secondFighter) {
    const container = createElement({ tagName: 'div', className: `arena___shields-container` });
    const firstFighterShield = createShield(firstFighter, 'left');
    const secondFighterShield = createShield(secondFighter, 'right');

    container.append(firstFighterShield, secondFighterShield);
    return container;
}

function createShield(fighter, position) {
    // const shieldImg = createImage(fighter);
    const positionClassName = position === 'right' ? 'right-shield' : 'left-shield';
    const shiel = createElement({
        tagName: 'div',
        className: 'shiel-wrapp'
    });
    const shieldElement = createElement({
        tagName: 'div',
        className: `${positionClassName}`,
        attributes: { id: `${position}-shield` }
    });
    shiel.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="shiel-icon" viewBox="0 0 512 512"><path d="M256 481c-3.5 0-7-1.2-9.9-3.7-21.8-19.1-42.6-36.8-62.1-53.4C73.8 330 0 267.9 0 177.5 0 94 59 31 136 31c60.7 0 99.6 42.4 120 80.5C276.4 73.4 315.3 31 376 31c77 0 136 63 136 146.5 0 90.4-73.8 152.4-184 246.4-19.5 16.6-40.3 34.3-62.1 53.4C263 479.8 259.5 481 256 481z" fill="#FD3018"/><path d="M265.9 477.3c21.8-19.1 42.6-36.8 62.1-53.4C438.2 330 512 267.9 512 177.5 512 94 453 31 376 31c-60.7 0-99.6 42.4-120 80.5V481C259.5 481 263 479.8 265.9 477.3z" fill="#E61E14"/></svg>
    `;
    shieldElement.append(shiel);
    console.log(shieldElement);
    return shieldElement;
}

// export function createImage() {
//     const attributes = {
//         src: './../../../resources/shield-model.png',
//         alt: 'shield'
//     };
//     const imgElement = createElement({
//         tagName: 'img',
//         className: 'shield-img',
//         attributes
//     });

//     return imgElement;
// }
