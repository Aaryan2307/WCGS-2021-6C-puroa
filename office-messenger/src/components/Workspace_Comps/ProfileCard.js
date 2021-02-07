import React from 'react'
import {DialogTitle, Avatar, Button} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';
import ChatIcon from '@material-ui/icons/Chat';
import ReportIcon from '@material-ui/icons/Report';
import avatar from '../../media/no_profile.png'
import {connect} from 'react-redux'
import {POST} from '../../utilities/utils'

const ProfileCard = (props) => {
    const profile = props.profile
    return(
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
        <DialogTitle><b>{profile.display_name}</b></DialogTitle>
        <Avatar src={avatar} style={{height: 150, width: 150, margin: '0 auto' }} />
        <div style={{marginTop: 30, padding: 10}}>Email: {profile.email}</div>
        {!props.self ? (
            <div style={{display: 'flex', flexDirection: 'row', padding: 15, justifyContent: 'space-evenly'}}>
            <Button variant='outlined'><ChatIcon />Chat</Button>
            <Button variant='outlined' onClick={() => {window.open(`mailto:${profile.email}`)}}> <EmailIcon />Send an Email</Button>
            <Button variant='outlined' onClick={async () => {
                let report = window.prompt(`Please enter why you are reporting ${profile.display_name}`)
                if(report !== null || report !== ''){
                    const reportObj = {
                        from: props.user.user_id,
                        to: profile.user_id,
                        msg: report,
                    }
                    try{
                        await POST('report', {report: reportObj, ws: props.ws.organisation_id})
                        alert('Report has been sent')
                        window.location.reload(false)
                    }
                    catch(e){
                        alert('Report was not able to be sent')
                    }
                    console.log('rep', reportObj)
                }
            }}><ReportIcon />Report</Button>
            </div>)
            :
            null
        }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ws: state.workspace,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(ProfileCard)