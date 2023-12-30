import PropTypes from 'prop-types'

function Video(props) {
    return (
        <video autoPlay muted loop height={50}>
            <source src={"./src/assets/Wupgrade_" + props.videoState + ".mp4"} type="video/mp4" />
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