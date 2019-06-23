import { wordcloudSetting } from "../../util/setting";
import "./wordcloud.css"

/**
 * wordcloud组件
 */
export default class wordcloud {
    constructor(props) {
        // 默认元素
        this.element = document.querySelector('.word-cloud');
        this.allEvents = props.allEvents;
    }

    draw() {
        var $ul = document.createElement('ul');
        $ul.className = 'word-cloud';
        var _characters = '';

        for (let index = 0; index < this.data.personArr.length; index++) {
            if (index > 9) {
                _characters += '...';
                break;
            }
            const element = this.data.personArr[index];
            _characters += element + " ";
        }
        console.log(this.data);
        $ul.innerHTML = `
                <li class="word-cloud__word  word-cloud__word--x-small">${this.data["事件"]}</li>
                <li class="word-cloud__word  word-cloud__word--small">${_characters}</li>
                <li class="word-cloud__word  word-cloud__word--x-large">${this.data["章回"]}</li>
                <li class="word-cloud__word  word-cloud__word--large">${this.data["地点（可确定）"]}</li>
                `;
        document.querySelector('.word-cloud').replaceWith($ul);
    }

    updateGraph(value) {
        this._data = this.allEvents[value - 1];
        this.draw();
    }

    // 更新value
    set _data(value) {
        this.data = value;
    }

    // 更新element
    set _element(value) {
        this.element = value;
    }
}