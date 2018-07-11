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
        console.log(this.store.book.covers.current)
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
                <button onClick={() => this.store.book.changeBookName2()}> changeBookName2 </button>


                <ul>
                    {this.store.book.covers.current.map((n, i) => (
                        <li key={i}>{n}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

type IAlbumProps = Pick<RootStore, 'album'>

@inject('album')
@observer
class Album extends React.Component {
    get store() {
        return this.props as IAlbumProps
    }

    render() {
        console.log(this.store.album.albums.current)
        return (
            <div>
                <button onClick={this.store.album.getAlbums}>getAlbum</button>
                {this.store.album.albums.current.map(({ id, userId, title }, index) => (
                    <React.Fragment key={index}>
                        <p>id: {id}</p>
                        <p>userId: {userId}</p>
                        <p>title: {title}</p>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

class Main extends React.Component {
    render() {
        return (
            <>
                <HelloWorld />
                <Album />
            </>
        )
    }
}

class Root extends React.Component {
    render() {
        return (
            <Provider {...new RootStore()}>
                <Main />
            </Provider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'))