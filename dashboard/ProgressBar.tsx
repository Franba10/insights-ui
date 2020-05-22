import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Grid, Typography } from '@material-ui/core'

interface ProgressBar {
    progress: number
    label: string
}

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
    progress: {
        height: 18,
        borderRadius: 10,
        width: 500,
    },
})

const ProgressBar: FC<ProgressBar> = ({
    progress,
    label,
}: ProgressBar): JSX.Element => {
    const classes = useStyles({})

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid
                item
                xs={6}
                style={{ width: '100%', marginBottom: 50 }}
                container
                justify="center"
                alignItems="center"
            >
                <div>
                    <Grid container justify="center">
                        <Typography
                            variant="h2"
                            gutterBottom
                            style={{ fontSize: 30 }}
                        >
                            {label}
                        </Typography>
                    </Grid>
                    <LinearProgress
                        className={classes.progress}
                        variant="determinate"
                        value={progress}
                    />
                </div>
            </Grid>
        </Grid>
    )
}

export default ProgressBar
