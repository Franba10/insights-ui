/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { FC, CSSProperties } from 'react'
import Iframe from 'react-iframe'
import { makeStyles } from '@material-ui/styles'

interface Props {
    url: string
    height?: string
    style?: CSSProperties
}

const useStyles = makeStyles({
    // @ts-ignore
    root: ({ height }) => ({
        height: `calc(100% - ${height})`,
        width: '100%',
    }),
})

const KibanaIframe: FC<Props> = ({
    url,
    height,
    style,
}: Props): JSX.Element => {
    const classes = useStyles({ height })

    return (
        <div style={style} className={classes.root}>
            <Iframe
                url={url}
                position="static"
                scrolling="yes"
                width="100%"
                height="100%"
                frameBorder={0}
            />
        </div>
    )
}

KibanaIframe.defaultProps = {
    style: {},
}

export default KibanaIframe
