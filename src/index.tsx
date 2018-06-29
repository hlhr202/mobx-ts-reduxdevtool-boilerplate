import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observable, computed, observe, Lambda } from "mobx";
import { observer, Provider, inject } from 'mobx-react'
import RootStore from './store'
import Person from './store/Person'
import OrderLine from './store/OrderLine'
import Book from './store/Book'

type IInjectProps = Pick<RootStore, 'orderLine' | 'person' | 'book'>

@inject('orderLine')
@inject('person')
@inject('book')
@observer
class HelloWorld extends React.Component {
    get store() {
        return this.props as IInjectProps
    }
    render() {
        return (
            <div>
                <p>amount: {this.store.orderLine.amount}</p>
                <p>price: {this.store.orderLine.price}</p>
                <p>total: {this.store.orderLine.total}</p>
                <p>name: {this.store.person.name}</p>

                <p>author: {this.store.book.author}</p>
                <button onClick={() => this.store.orderLine.incrementPrice()}> + </button>
                <button onClick={() => this.store.person.setName('345')}> changeName </button>
                <button onClick={() => this.store.book.changeBookName('333333')}> changeBookName </button>
            </div>
        )
    }
}

class Root extends React.Component {
    render() {
        return (
            <Provider {...new RootStore()}>
                <HelloWorld />
            </Provider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'))