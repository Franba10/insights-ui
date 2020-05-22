import React, { useEffect, useRef } from 'react'
import ProtectedPage from '~/components/commons/ProtectedPage'
import * as d3 from "d3"
import { JWTUser } from '~/@types'
import Trazas from "c:/Users/franc/insights-ui/src/components/dashboard/Trazas"
import { CSSProperties } from '@material-ui/styles'
import { select } from 'd3-selection'

interface Periodo {
    periodo: number
    value: number
}

interface Props {
    style?: CSSProperties
    user?: Partial<JWTUser>
    activeItem?: string
}

interface State { //tipo o clase
    values: Array<Periodo>
}

export default class Graficos extends ProtectedPage<Props, State> {

    state = { //instancia del tipo State, o sea, se crea un nuevo objeto del tipo State
        values: []
    }


    getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min
    }

    componentDidMount() {
        setInterval(() => {
            const value = this.getRandom(100, 400)
            console.log(value)
            const { values } = this.state
            values.push({ periodo: values.length + 1, value })
            this.setState({ values }); //actualiza el state y react lo renderiza
        }, 5000)
    }


    histogram() {

        const periodos = this.state.values
        const xMax = periodos.length == 0 ? 0 : periodos[periodos.length - 1].periodo
        const yMax = periodos.length == 0 ? 0 : periodos[periodos.length - 1].value

        const margin = { top: 10, right: 30, bottom: 30, left: 40 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;



        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const x = d3
            .scaleLinear()
            .domain([0, xMax])
            .range([0, width]);

        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        const histogram = d3
            .histogram()
            .value((periodo) => { return periodo.value; })
            .domain(x.domain())
            .thresholds(x.ticks(70));

        const bins = histogram(periodos);

        const y = d3
            .scaleLinear()
            .range([height, 0]);

        y
            .domain([0, d3.max(bins, (d) => { return d.value; })]);

        svg
            .append("g")
            .call(d3.axisLeft(y));

        svg
            .selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", (d) => { return "translate(" + x(d.x0) + "," + y(d.value) + ")"; })
            .attr("width", (d) => { return x(d.x1) - x(d.x0) - 1; })
            .attr("height", (d) => { return height - y(d.value); })
            .style("fill", "#69b3a2")

    }


    render(): JSX.Element {

        const { style } = this.props
        const periodos = this.state.values


        return (
            <div style={style}>

                <svg id="#my_dataviz">
                </svg>

                <div>
                    {periodos.map((periodo: Periodo) => {
                        return <div> Periodo: {periodo.periodo} Valor: {periodo.value}</div>
                    })}
                </div>
            </div>

        )

    }
}