import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observer, Provider, inject } from 'mobx-react'
import RootStore from './store'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Fade } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';

type IAlbumProps = Pick<RootStore, 'album'>

@inject('album')
@observer
class Album extends React.Component {
    get store() {
        return this.props as IAlbumProps
    }

    render() {
        console.log(this.store.album.loading.current)
        return (
            <div>
                <Button onClick={this.store.album.getAlbums}>get Albums</Button>
                <Button onClick={this.store.album.resetAlbums}>reset Albums</Button>
                <Button onClick={this.store.album.cancel}>cancel</Button>
                {this.store.album.loading.current && <CircularProgress />}

                <Paper style={{ width: '100%', overflowX: 'auto' }}>
                    <Table style={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow style={{ background: '#333' }}>
                                <TableCell style={{ color: '#eee' }}>id</TableCell>
                                <TableCell style={{ color: '#eee' }}>userId</TableCell>
                                <TableCell style={{ color: '#eee' }}>title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.store.album.albums.current.map(({ id, userId, title }, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{userId}</TableCell>
                                        <TableCell>{title}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

class Main extends React.Component {
    render() {
        return (
            <Album />
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