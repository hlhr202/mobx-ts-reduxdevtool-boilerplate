declare const require: any

import OrderLine from "./OrderLine";
import Person from "./Person";
import Album from './Album'
import remotedev from '@hlhr202/mobx-remotedev';

@remotedev({global: true, onlyActions: true})
export default class RootStore {
    public orderLine = new OrderLine(this)
    public person = new Person(this)
    public album = new Album(this)
}
