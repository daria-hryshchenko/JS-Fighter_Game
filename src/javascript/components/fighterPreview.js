import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (fighter) {
        // eslint-disable-next-line no-use-before-define
        fighterElement.appendChild(createFighterImage(fighter));
        // eslint-disable-next-line no-use-before-define
        fighterElement.appendChild(createFighterDescription(fighter));
    }

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

function createFighterDescription(fighter) {
    const descrElement = createElement({
        tagName: 'div',
        className: 'fighter-preview___description'
    });

    descrElement.innerHTML = `
    <h1>${fighter.name}</h1>
    <span>Health: ❤️${fighter.health}HP</span></br>
    <span>Attack: 🗡️${fighter.attack}</span></br>
    <defence>Defence: 🛡️${fighter.defense}</defence></br>
  `;

    return descrElement;
}
