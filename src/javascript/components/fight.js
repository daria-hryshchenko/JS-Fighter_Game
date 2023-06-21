import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    const leftHealthBar = document.querySelector('#left-fighter-indicator');
    const rightHealthBar = document.querySelector('#right-fighter-indicator');
    const firstPlayer = { ...firstFighter };
    const secondPlayer = { ...secondFighter };
    firstPlayer.currenthealth = firstFighter.health;
    secondPlayer.currenthealth = secondFighter.health;
    firstPlayer.isCriticalActive = true;
    secondPlayer.isCriticalActive = true;

    return new Promise(resolve => {
        const hit = (attacker, defender, damage, bar, isCriticalActive) => {
            const currentDefender = defender;
            const currentBar = bar;
            if ((!attacker.isBlock && !defender.isBlock) || isCriticalActive) {
                currentDefender.currenthealth -= damage(attacker, defender);
                const hpBar = defender.currenthealth / defender.health;

                currentBar.style.width = defender.currenthealth >= 0 ? `${hpBar * 100}%` : '0%';
                if (hpBar < 0.55) {
                    currentBar.style.backgroundColor = 'yellow';
                }
                if (hpBar < 0.25) {
                    currentBar.style.backgroundColor = 'red';
                }
            }

            if (currentDefender.currenthealth <= 0) {
                resolve(attacker);
            }
        };

        const checkCombo = (pressedCombo, expectedCombo) => {
            return expectedCombo.every(value => pressedCombo.includes(value));
        };

        const tryToCriticalHit = (fighter, attacker, defender, fighterHit, bar, keyPressed, combo) => {
            const currentFighter = fighter;
            const currentAttacker = attacker;
            if (!currentFighter.pressedCombo) currentFighter.pressedCombo = new Set();
            if (currentFighter.pressedCombo.has(keyPressed)) {
                currentFighter.pressedCombo.delete(keyPressed);
            } else {
                currentFighter.pressedCombo.add(keyPressed);
            }

            const { isCriticalActive, isBlock } = currentAttacker;

            if (checkCombo(Array.from(currentAttacker.pressedCombo), combo) && isCriticalActive && !isBlock) {
                // eslint-disable-next-line no-use-before-define
                fighterHit(currentAttacker, defender, getCriticalDamage, bar, true);
                currentAttacker.isCriticalActive = false;
                setTimeout(() => {
                    currentAttacker.isCriticalActive = true;
                }, 10000);
            }
        };

        document.addEventListener('keydown', event => {
            switch (event.code) {
                case controls.PlayerOneBlock:
                    firstPlayer.isBlock = true;
                    break;
                case controls.PlayerTwoBlock:
                    secondPlayer.isBlock = true;
                    break;
                default:
                    if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                        tryToCriticalHit(
                            firstPlayer,
                            secondPlayer,
                            hit,
                            rightHealthBar,
                            event.code,
                            controls.PlayerOneCriticalHitCombination
                        );
                    }
                    if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
                        // eslint-disable-next-line no-use-before-define
                        tryToCriticalHit(
                            secondPlayer,
                            firstPlayer,
                            hit,
                            leftHealthBar,
                            event.code,
                            controls.PlayerTwoCriticalHitCombination
                        );
                    }
                    break;
            }
        });

        document.addEventListener('keyup', event => {
            switch (event.code) {
                case controls.PlayerOneAttack:
                    // eslint-disable-next-line no-use-before-define
                    hit(firstPlayer, secondPlayer, getDamage, rightHealthBar);
                    break;
                case controls.PlayerOneBlock:
                    firstPlayer.isBlock = false;
                    break;
                case controls.PlayerTwoAttack:
                    // eslint-disable-next-line no-use-before-define
                    hit(secondPlayer, firstPlayer, getDamage, leftHealthBar);
                    break;
                case controls.PlayerTwoBlock:
                    secondPlayer.isBlock = false;
                    break;
                default:
                    if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                        tryToCriticalHit(firstPlayer, event.code);
                    }
                    if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
                        tryToCriticalHit(secondPlayer, event.code);
                    }
                    break;
            }
        });
    });
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

export function getDamage(attacker, defender) {
    // eslint-disable-next-line no-use-before-define
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
    const { attack } = fighter;
    const criticalHitChance = randomRange(1, 2);
    const power = attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const dodgeChance = randomRange(1, 2);
    const power = defense * dodgeChance;
    return power;
}

function getCriticalDamage(fighter) {
    const { attack } = fighter;
    return attack * 2;
}
