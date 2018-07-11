import { observable, computed, action } from "mobx";
import RootStore from ".";
import { Subject, merge } from "rxjs";
import { filter, map, scan, reduce, startWith } from "rxjs/operators";
import { fromStream } from "mobx-utils";

interface IAlbum {
    userId: number
    id: number
    title: string
}

interface IAction<T> {
    type: string
    payload: T
}

const createReactive = <T>(initialState: T, reducer: (state: T, nextState: T) => T) => {
    class Stream {
        private subject = new Subject<IAction<T>>()
        private _actionFilter: (action: IAction<T>) => boolean = () => false
        private _payloadMapper: (action: IAction<T>) => T = action => action.payload
        filtAction = (predicate: (action: IAction<T>) => boolean) => {
            this._actionFilter = predicate
            return this
        }
        mapPayload = (mapper: (action: IAction<T>) => T) => {
            this._payloadMapper = mapper
            return this
        }
        dispatch = (action: IAction<T>) => this.subject.next(action)
        getStream = () => {
            return merge(
                this.subject.pipe(
                    filter(this._actionFilter),
                    map(this._payloadMapper)
                )
            ).pipe(
                startWith(initialState),
                scan<T>((acc, val) => reducer(acc, val))
            )
        }
    }

    return new Stream()
}

const AlbumReducer = (state: IAlbum[], nextState: IAlbum[]) => {
    return nextState
}

const initAlbum = [
    { id: 1, userId: 1, title: 'dafuq' }
]

const nextAlbum = [
    {
        "userId": 1,
        "id": 1,
        "title": "quidem molestiae enim"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "sunt qui excepturi placeat culpa"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "omnis laborum odio"
    },
    {
        "userId": 1,
        "id": 4,
        "title": "non esse culpa molestiae omnis sed optio"
    },
    {
        "userId": 1,
        "id": 5,
        "title": "eaque aut omnis a"
    },
    {
        "userId": 1,
        "id": 6,
        "title": "natus impedit quibusdam illo est"
    },
    {
        "userId": 1,
        "id": 7,
        "title": "quibusdam autem aliquid et et quia"
    },
    {
        "userId": 1,
        "id": 8,
        "title": "qui fuga est a eum"
    }
]


export default class Album {
    private rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    private AlbumStream = createReactive(initAlbum, AlbumReducer).filtAction(action => action.type === 'SET_ALBUM')

    @observable albums = fromStream<IAlbum[]>(this.AlbumStream.getStream())

    @action getAlbums = () => {
        this.AlbumStream.dispatch({ type: 'SET_ALBUM', payload: nextAlbum })
    }
}