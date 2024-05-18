
export default class List {
    constructor(list) {
        this.list = list;
    }

    SortAsc = () => {
        this.list.sort();
        return this;
    }

    SortDesc = () => {
        this.list.reverse();
        return this;
    }

    RemoveDuplicateItemList = () => {
        let uniqueItems = [];
        this.list.forEach((item) => {
            if (uniqueItems.indexOf(item) < 0) {
                uniqueItems.push(item);
            }
        })

        this.list = uniqueItems.sort();
        return this;
    }

    SetNumbering = () => {
        this.list = this.list.map((e, i) => {
            return `${i + 1}. ${e}`
        }).join("\n");
        return this;
    }
}