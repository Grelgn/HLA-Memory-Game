import PropTypes from 'prop-types'

import vidLoop from "/dist/assets/Wupgrade_Loop.mp4";
import vidWon from "/dist/assets/Wupgrade_Won.mp4";
import vidLost from "/dist/assets/Wupgrade_Lost.mp4";

function Video(props) {
    let vidSource = "";
    if (props.videoState == "Loop") vidSource = vidLoop;
    if (props.videoState == "Won") vidSource = vidWon;
    if (props.videoState == "Lost") vidSource = vidLost;

    return (
        <video autoPlay muted loop height={50}>
            <source src={vidSource} type="video/mp4" />
        </video>
    );
}

Video.defaultProps = {
    videoState: "Loop",
}
Video.propTypes = {
    videoState: PropTypes.string,
}

export default Video;