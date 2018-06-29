import { observable, computed, action } from "mobx";
import RootStore from ".";

export default class OrderLine {
    private rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable price = 0;
    @observable amount = 1;
    @action incrementPrice = () => {
        this.price += 1
        this.amount += 2
    }

    @computed get total() {
        return this.price * this.amount;
    }
}