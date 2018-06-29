import RootStore from ".";
import { observable, action } from "mobx";

export default class Person {
    private rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable name = ''
    @observable age = 2
    @action public setName = (name: string) => {
        this.name = this.name === '' ? name : ''
        this.rootStore.orderLine.incrementPrice()
    }
}
