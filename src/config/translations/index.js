export default class Translations {
    constructor(translationSource) {
        this.translationSource = translationSource;
    }

    Translate = (word) => {
        if (this.translationSource[word]) {
            return(this.translationSource[word]);
        } else {
            return word;
        }
    }
}