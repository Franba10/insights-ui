import React, { Component } from 'react'

import { CSSProperties } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Grid } from '@material-ui/core'
import NotificationBox from '~/components/dashboard/NotificationBox'
import InsightsHelper from '~/helpers/insightsHelper'
import InsightsApi from '~/api/insightsApi'

interface Props {
    style?: CSSProperties
}

export default class Insights extends Component<Props> {
    state = {
        insights: InsightsHelper.getCleanInsights(),
        fetching: true,
    }

    async componentDidMount(): Promise<void> {
        const { data } = await InsightsApi.getInsights()
        const { values: insights } = data

        this.setState({ insights, fetching: false })
    }

    render(): JSX.Element {
        const { insights, fetching } = this.state
        const { style } = this.props
        return (
            <Grid container justify="center" style={style}>
                {fetching ? (
                    <CircularProgress />
                ) : (
                        insights.map((insight, index) => (
                            <Grid
                                key={insight.title + index}
                                container
                                justify="center"
                            >
                                <Grid item xs={8}>
                                    <NotificationBox
                                        title={insight.title}
                                        content={insight.content}
                                        hashtags={insight.hashtags}
                                        creationDate={insight.creationDate}
                                    />
                                </Grid>
                            </Grid>
                        ))
                    )}
            </Grid>
        )
    }
}
