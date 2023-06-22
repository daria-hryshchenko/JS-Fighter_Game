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
    const positionClassName = position === 'right' ? 'right-shield' : 'left-shield';
    const shieldImg = createElement({
        tagName: 'div',
        className: 'shiel-wrapp'
    });
    const shieldElement = createElement({
        tagName: 'div',
        className: `${positionClassName}`,
        attributes: { id: `${position}-shield` }
    });
    shieldImg.innerHTML = `
        <svg width="300px" height="300px" class=="shield-icon " viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#CCD6DD" d="M33 3c-7-3-15-3-15-3S10 0 3 3C0 18 3 31 18 36c15-5 18-18 15-33z"></path><path fill="#55ACEE" d="M18 33.884C6.412 29.729 1.961 19.831 4.76 4.444C11.063 2.029 17.928 2 18 2c.071 0 6.958.04 13.24 2.444c2.799 15.387-1.652 25.285-13.24 29.44z"></path><path fill="#269" d="M31.24 4.444C24.958 2.04 18.071 2 18 2v31.884c11.588-4.155 16.039-14.053 13.24-29.44z"></path></svg>
    `;
    shieldElement.append(shieldImg);
    return shieldElement;
}
