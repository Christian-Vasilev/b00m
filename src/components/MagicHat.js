import {Container, Text, Sprite, Graphics} from "pixi.js-legacy";
import gsap from 'gsap';

export default class MagicHat extends Container {

    constructor() {
        super();
        this.name = 'magic-hat';

        this._drawHat();
        this._drawItemWithMask();

        this._currentTimeline = null;
    }

    _drawItemWithMask() {
        this._item = new Text(this._getRandomEmoji(), {
            fontFamily: 'Arial',
            fontSize: 180,
            fill: 0xff1010,
            align: 'center'
        });
        this._item.anchor.set(0.5, 1);


        // Emojis initial position will be "hidden" in the hat
        this._item.y = this._body.height;

        // Add hat mask
        const mask = Sprite.from('hatMask');
        mask.anchor.set(0.5, 1);
        mask.y = 100;
        this.addChild(mask);

        // set mask on text element
        this._item.mask = mask;
        this.addChild(this._item);

    }

    _drawHat() {
        this._body = Sprite.from('hat');
        this._body.anchor.set(0.5, 1);
        this._body.y = this._body.height;
        this._body.interactive = true;
        this._body.buttonMode = true;
        this._body.on('click', () => this._hatClicked());
        this.addChild(this._body);
    }

    _hatClicked() {
        // restart previously played animation
        if (this._currentTimeline !== null) {
            this._currentTimeline.restart();
        }

        // set new emoji
        this._item.text = this._getRandomEmoji();

        // animate the new emoji
        this._currentTimeline = gsap.timeline()
            .to(this._item, {
                y: (this._item.y - this._body.height) * -1,
                ease: 'bounce.out'
            }, 0)
            .to(this._body.scale, {
                y: 0.95, ease: 'bounce.inOut', duration: 0.1, onComplete: () => {
                    gsap.to(this._body.scale, {
                        y: 1, ease: 'bounce.inOut', duration: .1,
                    })
                }
            }, 0)

    }

    _getRandomEmoji() {
        const availableEmojis = [
            '😋', '💁', '👌', '🎍', '😍', '😂', '😃', '🧘', '🏻', '‍♂', '🌍', '🍞',
        ];
        return availableEmojis[Math.floor(Math.random() * availableEmojis.length)]
    }
}