import { observable, computed, action } from "mobx";
import RootStore from ".";

export default class Book {
    private rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable name = ''
    @observable author = 'aaa'
    @action changeBookName = (name: string) => {
        this.name = this.name === '' ? name : ''
        this.author = 'bbb'
    }
}