import React, {useState} from 'react'
import {Box, withTheme, Input, Grid, Drawer, Typography, Button, Tabs, Tab,} from '@material-ui/core'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ReportIcon from '@material-ui/icons/Report';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import ReportBlock from './ReportBlock'
import WordBlacklist from './WordBlacklist'
import WSMembers from './WSMembers'
import {connect} from 'react-redux'
import { css, jsx } from '@emotion/core'
/**@jsx jsx */

const getStyle = (props) => {
    return css`
        background-color: ${props.theme.palette.secondary.main};
        width: 750px;
        height: 100vh;

    `
}

const AdminSettings = (props) => {
    const[view, setView] = useState(0)

    const tabChangeHandler = (event, newValue) => {
        setView(newValue)
        console.log('view', view)
    }

    const getTab = () => {
        switch(view){
          case 0:
            return(
                <div>
                <h3><b>{`Your Workspace Code is: ${props.ws.code}`}</b></h3>
                <div style={{maxHeight: '70%', overflowY: 'scroll',}}>
                    <h4><b>Blacklisted Words</b></h4>
                    <WordBlacklist />
                </div>
                <div>
                    <h4><b>Workspace Members</b></h4>
                    <WSMembers />
                </div>
            </div>
            )
          case 1:
            //if there are reports to show then map them otherwise display appropriate message
            return(
            props.ws.reports ?
              <div>
                  {props.ws.reports.map((r) => {
                      return(
                         <ReportBlock report={r} users={props.users} />
                      )
                  })}
              </div>
              :
              <div>
                  There are no reports to show...
                  </div>
            )
          default:
            break;
        }
      }

    return(
        <div style={{padding: 100, marginLeft: 350,}}>
        <Box css={getStyle(props)}
        flexGrow={1}
        overflow='auto'
        display="flex"
        flexDirection="column"
        >
            <Grid
                direction="row"
                justify="space-evenly"
                container
            >
                <Tabs
                value={view}
                onChange={tabChangeHandler}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth">
                </Tabs>
                <Tab
                        label="Settings"
                        icon={view === 0 ? <SettingsApplicationsIcon /> : <SettingsApplicationsOutlinedIcon />}
                        onClick={(e) => {
                            tabChangeHandler(e, 0)
                        }}
                    />

                    <Tab
                        label="Reports"
                        icon={view === 1 ? <ReportIcon /> : <ReportOutlinedIcon />}
                        onClick={(e) => {
                            tabChangeHandler(e, 1)
                        }}
                    />
            </Grid>
            {getTab()}
            </Box>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        //get workspace and user information from loaded global state
        ws: state.workspace,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(withTheme(AdminSettings))