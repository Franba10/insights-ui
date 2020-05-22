import React from 'react'
import { DrawerItem } from '@gm/react-commons/lib/Interfaces/Dashboard'
import ProtectedPage from '~/components/commons/ProtectedPage'
import { JWTUser } from '~/@types'
import * as progressBarConfig from '~/config/progressBar'
import { CSSProperties } from '@material-ui/styles'
import Tabla from '~/components/tabla'
import Chip from '@material-ui/core/Chip';
import DashboardLayout from '@gm/react-commons/lib/Dashboard/Layout'
import drawerItems from '~/config/drawerItems'


interface TraceFilters {
    rid: Array<string>
    type: Array<string>
    origin: Array<string>
    level: Array<string>
}

interface Props {
    style?: CSSProperties
    user?: Partial<JWTUser>
    activeItem?: string
}

interface State {
    activeItem: string
    progress: number
    label: string
    rid: string
    type: string
    origin: string
    level: string
    chips: Array<{}> //los {} son para objetos
    datos: Array<{}>
    filters: TraceFilters
}

export default class Trazas extends ProtectedPage<Props, State> {

    state = {
        activeItem: this.props.activeItem || 'trace',
        progress: 0,
        label: progressBarConfig.labels.fetching,
        datos: [
            { id: 100, rid: '1', app: 100, type: 'Login', origin: 'Retraso', level: 'Grave', date: '4/5/2020' },
            { id: 101, rid: '2', app: 101, type: 'Cotización', origin: 'Error', level: 'Grave', date: '4/5/2020' },
            { id: 103, rid: '3', app: 102, type: 'Garantía', origin: 'Error', level: 'Leve', date: '4/5/2020' },
            { id: 104, rid: '3', app: 100, type: 'Login', origin: 'Retraso', level: 'Grave', date: '4/5/2020' },
            { id: 105, rid: '4', app: 101, type: 'Cotización', origin: 'Retraso', level: 'Leve', date: '4/5/2020' },
            { id: 106, rid: '2', app: 102, type: 'Garantía', origin: 'Error', level: 'Leve', date: '4/5/2020' },
            { id: 107, rid: '2', app: 103, type: 'Devolución', origin: 'Retraso', level: 'Grave', date: '4/5/2020' }

        ],
        rid: '',
        type: '',
        origin: '',
        level: '',
        chips: [],
        filters: { rid: [], type: [], origin: [], level: [] }
    }


    handleDeleteButtonClick = () => {
        const filters = this.state.filters
        filters.rid = []
        filters.type = []
        filters.origin = []
        filters.level = []
        this.setState({ filters })
    }


    handleInputChangeRid = event => {
        this.setState({ rid: event.target.value })
    }

    handleInputChangeType = event => {
        this.setState({ type: event.target.value })
    }

    handleInputChangeOrigin = event => {
        this.setState({ origin: event.target.value })
    }

    handleInputChangeLevel = event => {
        this.setState({ level: event.target.value })
    }


    onKeyDownFilter = (e, value, filter) => {
        if (e.keyCode == 13) {
            const filters = this.state.filters
            filters[filter].push(value) //busca en qué filtro agregar el valor que se pone en el input
            const newState = { filters } //va a tener los filtros actualizados
            newState[filter] = '' //se borra lo que se ingreso en el input
            this.setState(newState)
        }
    }


    filter = () => {  //agarra lo que esta en state.datos y filtra por todo lo que haya en state.filter
        return this.state.datos.filter(trace => { //trace cumple cuando el rid esta vacio o cuando lo encuentra en el array
            return (this.state.filters.rid.length == 0 || this.state.filters.rid.indexOf(trace.rid) >= 0) &&
                (this.state.filters.type.length == 0 || this.state.filters.type.indexOf(trace.type) >= 0) &&
                (this.state.filters.origin.length == 0 || this.state.filters.origin.indexOf(trace.origin) >= 0) &&
                (this.state.filters.level.length == 0 || this.state.filters.level.indexOf(trace.level) >= 0)
        })
    }


    handleDeleteFilter = (value, filter) => { //dentro del () se pone cuál es el valor (3) que hay que borrar y de qué filtro (rid)
        const filters = this.state.filters
        filters[filter].splice(filters[filter].indexOf(value), 1) //el 1 es pq solo se pone un numero
        this.setState({ filters })
    }


    shouldDisplayCleanButton = (): boolean => {
        return (
            this.state.filters.rid.length > 0 ||
            this.state.filters.type.length > 0 ||
            this.state.filters.origin.length > 0 ||
            this.state.filters.level.length > 0
        )
    }

    onItemClick(item: DrawerItem): void {
        const { key: activeItem } = item
        this.setState({ activeItem })
    }

    render(): JSX.Element {

        const { style } = this.props

        let headers = [
            { label: 'ID', property: 'id' },
            { label: 'ID Requerido', property: 'rid' },
            { label: 'Codigo de Origen', property: 'app' },
            { label: 'Tipo de Evento', property: 'type' },
            { label: 'Orígen', property: 'origin' },
            { label: 'Nivel', property: 'level' },
            { label: 'Fecha', property: 'date' }
        ]

        const dataFiltered = this.filter()

        return (
            <div style={style}>
                <div style={{ marginTop: '10px' }}>

                    <input style={{ marginBottom: '30px', marginLeft: '10px' }}
                        type='text'
                        name='rid'
                        onChange={this.handleInputChangeRid}
                        onKeyDown={(e) => {
                            console.log(this.state.rid)
                            this.onKeyDownFilter(e, this.state.rid, 'rid')
                        }}
                        value={this.state.rid}
                        placeholder='ID Requerido'
                    />


                    <input style={{ marginBottom: '30px', marginLeft: '10px' }}
                        type='text'
                        name='type'
                        onChange={this.handleInputChangeType}
                        onKeyDown={(e) => {
                            console.log(this.state.type)
                            this.onKeyDownFilter(e, this.state.type, 'type')
                        }}
                        value={this.state.type}
                        placeholder='Tipo de Evento'
                    />


                    <input style={{ marginBottom: '30px', marginLeft: '10px' }}
                        type='text'
                        name='origin'
                        onChange={this.handleInputChangeOrigin}
                        onKeyDown={(e) => {
                            console.log(this.state.origin)
                            this.onKeyDownFilter(e, this.state.origin, 'origin')
                        }}
                        value={this.state.origin}
                        placeholder='Origen'
                    />


                    <input style={{ marginBottom: '30px', marginLeft: '10px' }}
                        type='text'
                        name='level'
                        onChange={this.handleInputChangeLevel}
                        onKeyDown={(e) => {
                            console.log(this.state.level)
                            this.onKeyDownFilter(e, this.state.level, 'level')
                        }}
                        value={this.state.level}
                        placeholder='Nivel'
                    />

                    {this.shouldDisplayCleanButton() && (<button onClick={this.handleDeleteButtonClick}>Limpiar</button>)
                        //llama a la funcion should para ver si hay que mostrar el boton. Si es true, lo muestra
                    }

                </div>
                <div> {this.state.filters.rid.map((rid) => { //map recorre el array y por cada elemento retorna lo q se pone
                    return (
                        <Chip
                            style={{ marginLeft: '5px', marginBottom: '5px' }}
                            label={`ID Requerido: ${rid}`}  // los `` permiten combinar textos con cariables de js
                            onDelete={() => { this.handleDeleteFilter(rid, 'rid') }} //el onDelete necesita q le pase una funcion. Si se apreta la cruz, llama al handleDeleteRid
                            color="primary" />
                    )
                })
                }
                    {this.state.filters.type.map((type) => {
                        return (
                            <Chip
                                style={{ marginLeft: '5px', marginBottom: '5px' }}
                                label={`Tipo de Evento: ${type}`}
                                onDelete={() => { this.handleDeleteFilter(type, 'type') }}
                                color="primary" />
                        )
                    })
                    }
                    {this.state.filters.origin.map((origin) => {
                        return (
                            <Chip
                                style={{ marginLeft: '5px', marginBottom: '5px' }}
                                label={`Origen: ${origin}`}
                                onDelete={() => { this.handleDeleteFilter(origin, 'origin') }}
                                color="primary" />
                        )
                    })
                    }
                    {this.state.filters.level.map((level) => {
                        return (
                            <Chip
                                style={{ marginLeft: '5px', marginBottom: '5px' }}
                                label={`Nivel: ${level}`}
                                onDelete={() => { this.handleDeleteFilter(level, 'level') }}
                                color="primary" />
                        )
                    })
                    }
                </div>

                <Tabla header={headers} rows={dataFiltered.length > 0 ? dataFiltered : this.state.datos} />
            </div>
            //le pasa a la tabla lo que tenga el atributo dataFiltered; sino le pasa datos
        )

    }
}