import { observable, action } from "mobx";
import RootStore from ".";
import ReObserve from '@hlhr202/reobserve'
import { fromStream } from "mobx-utils";
import { filter, takeUntil, delay, mapTo, map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

interface IAlbum {
    userId: number
    id: number
    title: string
}

const initAlbum = [
    { id: 0, userId: 0, title: 'initial' }
]

const album$ = new ReObserve<IAlbum[]>(initAlbum)
    .merge(ReObserve.fromAction('RESET_ALBUM').pipe(mapTo(initAlbum)))
    .mergeReduce(
        ReObserve.fromAjax('FETCH_ALBUM').pipe(
            filter(ajax => !!ajax.payload.response),
            map(ajax => ajax.payload.response)
        ),
        (curr, next) => curr.concat(next)
    )

const loading$ = new ReObserve<boolean>(false)
    .merge(ReObserve.fromAction('CANCEL').pipe(mapTo(false)))
    .merge(ReObserve.fromAction('RESET_ALBUM').pipe(mapTo(false)))
    .merge(ReObserve.fromAjax('FETCH_ALBUM').pipe(mapTo(false)))

export default class Album {
    private rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable albums = fromStream<IAlbum[]>(album$)

    @observable loading = fromStream(loading$)

    @action getAlbums = () => {
        loading$.next(true)
        ReObserve.fetch({
            type: 'FETCH_ALBUM',
            ajax$: ajax({ url: 'https://jsonplaceholder.typicode.com/albums', method: 'GET' })
                .pipe(
                    delay(1000),
                    takeUntil(ReObserve.fromAction('CANCEL'))
                )
        })
    }

    @action resetAlbums = () => {
        ReObserve.dispatch({ type: 'RESET_ALBUM' })
    }

    @action cancel = () => {
        ReObserve.dispatch({ type: 'CANCEL' })
    }
}