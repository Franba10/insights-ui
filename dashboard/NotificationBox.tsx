import React, { FC } from 'react'
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    Grid,
} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { Theme } from '@material-ui/core/styles'
import moment from 'moment'

interface NotificationBoxProps {
    title: string
    creationDate: number
    hashtags: string[]
    content: string
    type?: string
    struct?: string
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        marginBottom: 20,
    },
    content: {
        padding: '12px 16px',
        '& h6': {
            fontSize: 18,
        },
        position: 'relative',
    },
    body: {
        fontSize: 14,
    },
    footer: {
        padding: '8px 16px',
        color: 'blue',
        '& span': {
            '&:hover': {
                color: `${theme.palette.primary.main}`,
                cursor: 'pointer',
            },
        },
    },
    cardContentMUI: {
        padding: 0,
        '&:last-child': {
            padding: 0,
        },
    },
    imageContainer: {
        height: '100%',
        '& img': {
            height: 120,
        },
    },
}))

const NotificationBox: FC<NotificationBoxProps> = ({
    title,
    creationDate,
    hashtags,
    type,
    struct,
    content,
}: NotificationBoxProps): JSX.Element => {
    // TODO: Solo temporal, hay que eliminarlo
    const randomNumber = Math.floor(Math.random() * 3) + 1

    const classes = useStyles({ randomNumber })

    return (
        <Grid className={classes.container}>
            <Card>
                <CardContent classes={{ root: classes.cardContentMUI }}>
                    <Grid container>
                        <Grid item xs={8}>
                            <Grid className={classes.content}>
                                <Typography
                                    variant="h6"
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    {title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    className={classes.body}
                                    gutterBottom
                                >
                                    {content}
                                </Typography>

                                <Grid container>
                                    <Typography
                                        variant="body2"
                                        className={classes.body}
                                        gutterBottom
                                    >
                                        <span style={{ fontWeight: 'bold' }}>
                                            Creación
                                        </span>
                                        :
                                        <span>
                                            {' '}
                                            {moment
                                                .utc(creationDate)
                                                .local()
                                                .format('YYYY-MM-DD HH:mm')}
                                        </span>
                                    </Typography>
                                </Grid>
                            </Grid>
                            {hashtags.length > 0 && (
                                <>
                                    <Divider light />
                                    <Grid className={classes.footer}>
                                        {hashtags.map((hashtag, i) => (
                                            <Typography
                                                key={hashtag + i}
                                                variant="caption"
                                            >
                                                {hashtag}
                                                <span> </span>
                                            </Typography>
                                        ))}
                                    </Grid>
                                </>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            <Grid
                                container
                                justify="center"
                                alignContent="center"
                                className={classes.imageContainer}
                            >
                                <img
                                    src={`/static/images/dashboard/insights_type_${randomNumber}.png`}
                                    alt="insight"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

NotificationBox.defaultProps = {
    hashtags: [],
}

export default NotificationBox
