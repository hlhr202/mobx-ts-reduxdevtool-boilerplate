import { observable, computed, action } from "mobx";
import RootStore from ".";
import { fromStream } from 'mobx-utils'
import { of, Subject, merge, Observable, timer } from 'rxjs'
import { startWith, mergeMap, scan, debounce, filter, mapTo } from 'rxjs/operators'

export default class Book {
    private rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    private sub = new Subject<string>()

    @observable name = ''
    @observable author = 'aaa'

    @observable covers = fromStream<number[]>(
        merge(this.sub.pipe(
            filter(val => val === 'fuck'),
            mapTo({action: 'fuck'})
        )).pipe<number[]>(
            startWith([1, 2, 3]),
            scan<number[]>((acc, cur) => {
                console.log(cur)
                return acc.map(n => n + 1)
            })
        )
    )

    @action changeBookName = (name: string) => {
        this.name = this.name === '' ? name : ''
        this.author = 'bbb'
        this.sub.next('fuck')
    }

    @action changeBookName2 = () => {
        this.sub.next('fuck2')
    }
}